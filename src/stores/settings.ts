import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'dark' | 'light'
export type Locale = 'ru' | 'en'

export const useSettingsStore = defineStore('settings', () => {
  // ── Theme ──────────────────────────────────────────────
  const theme = ref<Theme>(
    (localStorage.getItem('theme') as Theme) ?? 'dark'
  )

  function setTheme(value: Theme) {
    theme.value = value
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  // Apply theme to <html> tag and persist
  watch(
    theme,
    (val) => {
      document.documentElement.setAttribute('data-theme', val)
      localStorage.setItem('theme', val)
    },
    { immediate: true }
  )

  // ── Locale ─────────────────────────────────────────────
  const locale = ref<Locale>(
    (localStorage.getItem('locale') as Locale) ?? 'ru'
  )

  function setLocale(value: Locale) {
    locale.value = value
  }

  function toggleLocale() {
    locale.value = locale.value === 'ru' ? 'en' : 'ru'
  }

  watch(locale, (val) => {
    localStorage.setItem('locale', val)
  })

  return { theme, locale, setTheme, toggleTheme, setLocale, toggleLocale }
})
