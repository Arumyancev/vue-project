/**
 * Тесты для системы локализации
 *
 * Что тестируем:
 * - структура переводов (все ключи присутствуют)
 * - корректность переводов для ru и en
 * - функция subtitle() с подстановкой числа
 * - composable useI18n() реагирует на смену locale
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { ru } from '@/i18n/ru'
import { en } from '@/i18n/en'

// ─── Тесты структуры переводов ─────────────────────────────────────────────────
describe('i18n translations', () => {

  // ── Проверяем что все ключи есть в обоих языках ──────────────────────────────
  describe('translation keys completeness', () => {
    it('en should have all keys that ru has', () => {
      // Рекурсивно собираем все пути ключей объекта
      function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
        return Object.entries(obj).flatMap(([key, val]) => {
          const fullKey = prefix ? `${prefix}.${key}` : key
          if (typeof val === 'object' && val !== null && typeof val !== 'function') {
            return getKeys(val as Record<string, unknown>, fullKey)
          }
          return [fullKey]
        })
      }

      const ruKeys = getKeys(ru as unknown as Record<string, unknown>)
      const enKeys = getKeys(en as unknown as Record<string, unknown>)

      // Каждый ключ из ru должен быть в en
      ruKeys.forEach((key) => {
        expect(enKeys).toContain(key)
      })
    })
  })

  // ── Русские переводы ─────────────────────────────────────────────────────────
  describe('Russian (ru)', () => {
    it('should have correct app name', () => {
      expect(ru.appName).toBe('TaskFlow')
    })

    it('should have correct nav translations', () => {
      expect(ru.nav.allTasks).toBe('Все задачи')
      expect(ru.nav.today).toBe('Сегодня')
      expect(ru.nav.completed).toBe('Выполненные')
    })

    it('should have correct priority translations', () => {
      expect(ru.priority.high).toBe('Высокий')
      expect(ru.priority.medium).toBe('Средний')
      expect(ru.priority.low).toBe('Низкий')
    })

    it('subtitle() should format count correctly', () => {
      expect(ru.completed.subtitle(4)).toBe('4 задач завершено')
      expect(ru.completed.subtitle(0)).toBe('0 задач завершено')
      expect(ru.completed.subtitle(100)).toBe('100 задач завершено')
    })
  })

  // ── Английские переводы ──────────────────────────────────────────────────────
  describe('English (en)', () => {
    it('should have correct app name', () => {
      expect(en.appName).toBe('TaskFlow')
    })

    it('should have correct nav translations', () => {
      expect(en.nav.allTasks).toBe('All Tasks')
      expect(en.nav.today).toBe('Today')
      expect(en.nav.completed).toBe('Completed')
    })

    it('should have correct priority translations', () => {
      expect(en.priority.high).toBe('High')
      expect(en.priority.medium).toBe('Medium')
      expect(en.priority.low).toBe('Low')
    })

    it('subtitle() should format count correctly', () => {
      expect(en.completed.subtitle(4)).toBe('4 tasks completed')
      expect(en.completed.subtitle(1)).toBe('1 tasks completed')
    })
  })

  // ── app name одинаков в обоих языках ────────────────────────────────────────
  it('app name should be the same in both languages', () => {
    expect(ru.appName).toBe(en.appName)
  })
})

// ─── Тесты composable useI18n ─────────────────────────────────────────────────
describe('useI18n composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should return russian translations by default', async () => {
    // Динамический импорт чтобы Pinia была уже создана
    const { useI18n } = await import('@/i18n')
    const { t } = useI18n()
    expect(t.value.nav.allTasks).toBe('Все задачи')
  })

  it('should return english translations when locale is en', async () => {
    const { useSettingsStore } = await import('@/stores/settings')
    const { useI18n } = await import('@/i18n')

    const settings = useSettingsStore()
    settings.setLocale('en')

    const { t } = useI18n()
    expect(t.value.nav.allTasks).toBe('All Tasks')
  })

  it('should reactively update when locale changes', async () => {
    const { useSettingsStore } = await import('@/stores/settings')
    const { useI18n } = await import('@/i18n')

    const settings = useSettingsStore()
    const { t } = useI18n()

    expect(t.value.nav.today).toBe('Сегодня')

    settings.toggleLocale()

    expect(t.value.nav.today).toBe('Today')
  })
})
