/**
 * Тесты для HomeView.vue
 *
 * Что тестируем:
 * - компонент рендерится без ошибок
 * - заголовок страницы отображается
 * - количество карточек задач соответствует данным
 * - выполненные задачи имеют класс .done
 * - бейджи приоритета рендерятся с правильным классом
 * - язык переключается и компонент обновляется
 *
 * @vue/test-utils — ключевые методы:
 *   mount(Component)      — монтирует компонент в виртуальный DOM
 *   wrapper.text()        — возвращает весь текст компонента
 *   wrapper.find(sel)     — ищет первый элемент по CSS-селектору
 *   wrapper.findAll(sel)  — ищет все элементы
 *   wrapper.html()        — возвращает HTML строкой
 *   wrapper.classes()     — массив классов элемента
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useSettingsStore } from '@/stores/settings'

// ─── Хелпер: создаём минимальный роутер для тестов ───────────────────────────
function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: HomeView }],
  })
}

// ─── Хелпер: монтируем компонент со всеми нужными зависимостями ──────────────
async function mountHomeView() {
  const pinia = createPinia()
  const router = createTestRouter()

  const wrapper = mount(HomeView, {
    global: {
      plugins: [pinia, router], // подключаем Pinia и Router глобально
    },
  })

  await router.isReady() // ждём пока роутер инициализируется

  return { wrapper, pinia }
}

// ─── Тесты ───────────────────────────────────────────────────────────────────
describe('HomeView.vue', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  // ── Базовый рендер ───────────────────────────────────────────────────────────
  it('should render without errors', async () => {
    const { wrapper } = await mountHomeView()
    // Если компонент упал — mount бросит исключение и тест провалится
    expect(wrapper.exists()).toBe(true)
  })

  it('should render the page title', async () => {
    const { wrapper } = await mountHomeView()
    const title = wrapper.find('.page-title')
    expect(title.exists()).toBe(true)
    // По умолчанию язык ru
    expect(title.text()).toBe('Все задачи')
  })

  // ── Статистика ───────────────────────────────────────────────────────────────
  it('should render 3 stat cards', async () => {
    const { wrapper } = await mountHomeView()
    const statCards = wrapper.findAll('.stat-card')
    expect(statCards).toHaveLength(3)
  })

  // ── Список задач ─────────────────────────────────────────────────────────────
  it('should render all 6 tasks', async () => {
    const { wrapper } = await mountHomeView()
    const taskCards = wrapper.findAll('.task-card')
    expect(taskCards).toHaveLength(6)
  })

  it('should mark completed tasks with .done class', async () => {
    const { wrapper } = await mountHomeView()
    const doneTasks = wrapper.findAll('.task-card.done')
    // В наших данных 2 задачи с done: true (id 4 и 6)
    expect(doneTasks).toHaveLength(2)
  })

  it('should render priority badges', async () => {
    const { wrapper } = await mountHomeView()
    const badges = wrapper.findAll('.priority-badge')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('should render high priority badge with .high class', async () => {
    const { wrapper } = await mountHomeView()
    const highBadges = wrapper.findAll('.priority-badge.high')
    // id 1 и 2 имеют priority: 'high'
    expect(highBadges).toHaveLength(2)
  })

  // ── Фильтры ──────────────────────────────────────────────────────────────────
  it('should render 3 filter tabs', async () => {
    const { wrapper } = await mountHomeView()
    const tabs = wrapper.findAll('.tab')
    expect(tabs).toHaveLength(3)
  })

  it('should have first tab as active by default', async () => {
    const { wrapper } = await mountHomeView()
    const firstTab = wrapper.find('.tab')
    expect(firstTab.classes()).toContain('active')
  })

  // ── Локализация ──────────────────────────────────────────────────────────────
  it('should show russian task title by default', async () => {
    const { wrapper } = await mountHomeView()
    // Ищем текст первой задачи
    expect(wrapper.text()).toContain('Изучить основы Vue 3 Composition API')
  })

  it('should switch to english when locale changes', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const settings = useSettingsStore()
    settings.setLocale('en')

    const router = createTestRouter()
    const wrapper = mount(HomeView, {
      global: { plugins: [pinia, router] },
    })
    await router.isReady()

    expect(wrapper.find('.page-title').text()).toBe('All Tasks')
    expect(wrapper.text()).toContain('Learn Vue 3 Composition API basics')
  })

  it('should show english filter tab labels when locale is en', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const settings = useSettingsStore()
    settings.setLocale('en')

    const router = createTestRouter()
    const wrapper = mount(HomeView, {
      global: { plugins: [pinia, router] },
    })
    await router.isReady()

    const tabs = wrapper.findAll('.tab')
    expect(tabs[0].text()).toBe('All')
    expect(tabs[1].text()).toBe('Active')
    expect(tabs[2].text()).toBe('Completed')
  })
})
