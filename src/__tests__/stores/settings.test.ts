/**
 * Тесты для useSettingsStore
 *
 * Что тестируем:
 * - начальные значения (default state)
 * - переключение темы toggleTheme()
 * - переключение языка toggleLocale()
 * - явная установка значений setTheme() / setLocale()
 * - сохранение в localStorage
 * - применение data-theme на <html>
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

// ─── Подготовка перед каждым тестом ───────────────────────────────────────────
beforeEach(() => {
  // Создаём свежий экземпляр Pinia для каждого теста,
  // чтобы тесты не влияли друг на друга
  setActivePinia(createPinia())

  // Очищаем localStorage чтобы каждый тест начинался с чистого листа
  localStorage.clear()

  // Сбрасываем data-theme на html элементе
  document.documentElement.removeAttribute('data-theme')
})

// ─── describe группирует связанные тесты ──────────────────────────────────────
describe('useSettingsStore', () => {

  // ── Начальное состояние ──────────────────────────────────────────────────────
  describe('initial state', () => {
    it('should have dark theme by default', () => {
      const store = useSettingsStore()
      // expect(полученное).toBe(ожидаемое)
      expect(store.theme).toBe('dark')
    })

    it('should have russian locale by default', () => {
      const store = useSettingsStore()
      expect(store.locale).toBe('ru')
    })

    it('should restore theme from localStorage', () => {
      // Симулируем что пользователь уже выбирал тему ранее
      localStorage.setItem('theme', 'light')
      const store = useSettingsStore()
      expect(store.theme).toBe('light')
    })

    it('should restore locale from localStorage', () => {
      localStorage.setItem('locale', 'en')
      const store = useSettingsStore()
      expect(store.locale).toBe('en')
    })
  })

  // ── Переключение темы ────────────────────────────────────────────────────────
  describe('toggleTheme()', () => {
    it('should switch from dark to light', () => {
      const store = useSettingsStore()
      expect(store.theme).toBe('dark')

      store.toggleTheme()

      expect(store.theme).toBe('light')
    })

    it('should switch back from light to dark', () => {
      localStorage.setItem('theme', 'light')
      const store = useSettingsStore()

      store.toggleTheme()

      expect(store.theme).toBe('dark')
    })

    it('should toggle twice and return to original', () => {
      const store = useSettingsStore()
      store.toggleTheme()
      store.toggleTheme()
      expect(store.theme).toBe('dark')
    })
  })

  // ── Явная установка темы ─────────────────────────────────────────────────────
  describe('setTheme()', () => {
    it('should set theme to light', () => {
      const store = useSettingsStore()
      store.setTheme('light')
      expect(store.theme).toBe('light')
    })

    it('should set theme to dark', () => {
      localStorage.setItem('theme', 'light')
      const store = useSettingsStore()
      store.setTheme('dark')
      expect(store.theme).toBe('dark')
    })
  })

  // ── Переключение языка ───────────────────────────────────────────────────────
  describe('toggleLocale()', () => {
    it('should switch from ru to en', () => {
      const store = useSettingsStore()
      store.toggleLocale()
      expect(store.locale).toBe('en')
    })

    it('should switch from en back to ru', () => {
      localStorage.setItem('locale', 'en')
      const store = useSettingsStore()
      store.toggleLocale()
      expect(store.locale).toBe('ru')
    })
  })

  // ── Сохранение в localStorage ────────────────────────────────────────────────
  describe('localStorage persistence', () => {
    it('should save theme to localStorage on toggle', async () => {
      const store = useSettingsStore()
      store.toggleTheme()

      // Watcher во Vue асинхронный — ждём следующего тика
      await Promise.resolve()

      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('should save locale to localStorage on toggle', async () => {
      const store = useSettingsStore()
      store.toggleLocale()

      await Promise.resolve()

      expect(localStorage.getItem('locale')).toBe('en')
    })
  })

  // ── Применение data-theme на <html> ─────────────────────────────────────────
  describe('DOM side effects', () => {
    it('should set data-theme attribute on html element immediately', async () => {
      useSettingsStore() // store сразу запускает watch с { immediate: true }

      await Promise.resolve()

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should update data-theme when theme changes', async () => {
      const store = useSettingsStore()
      store.setTheme('light')

      await Promise.resolve()

      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })
  })
})
