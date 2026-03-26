import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { ru } from './ru'
import { en } from './en'

const messages = { ru, en }

/**
 * useI18n — возвращает реактивный объект `t` с переводами.
 * При смене locale в settingsStore все компоненты обновятся автоматически.
 *
 * Пример использования в компоненте:
 *   const { t } = useI18n()
 *   // в шаблоне: {{ t.nav.allTasks }}
 */
export function useI18n() {
  const settings = useSettingsStore()
  const t = computed(() => messages[settings.locale])
  return { t }
}
