<script setup lang="ts">
import { useI18n } from '@/i18n'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()

const completedTasks = [
  { id: 4, title: { ru: 'Написать unit тесты',           en: 'Write unit tests' },                 category: 'work',  completedDate: { ru: '25 марта 2026',  en: 'March 25, 2026' } },
  { id: 6, title: { ru: 'Прочитать статью о Vue Router', en: 'Read article about Vue Router' },    category: 'study', completedDate: { ru: '24 марта 2026',  en: 'March 24, 2026' } },
  { id: 7, title: { ru: 'Обновить зависимости проекта',  en: 'Update project dependencies' },      category: 'work',  completedDate: { ru: '23 марта 2026',  en: 'March 23, 2026' } },
  { id: 8, title: { ru: 'Тренировка в зале',             en: 'Gym workout' },                      category: 'personal', completedDate: { ru: '22 марта 2026', en: 'March 22, 2026' } },
]

const categoryColor: Record<string, string> = {
  study:    '#43e97b',
  work:     '#6c63ff',
  personal: '#ff6584',
}
</script>

<template>
  <div class="completed-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ t.completed.title }}</h1>
        <p class="page-sub">{{ t.completed.subtitle(completedTasks.length) }}</p>
      </div>
      <div class="congrats-badge">{{ t.completed.congrats }}</div>
    </div>

    <div class="task-list">
      <div v-for="task in completedTasks" :key="task.id" class="task-card">
        <div class="task-checkbox">✓</div>
        <div class="task-body">
          <div class="task-title">{{ task.title[settings.locale] }}</div>
          <div class="task-meta">
            <span class="task-category" :style="{ color: categoryColor[task.category], background: categoryColor[task.category] + '15' }">
              {{ t.categories[task.category as keyof typeof t.categories] }}
            </span>
            <span class="task-date">✓ {{ task.completedDate[settings.locale] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.page-sub {
  font-size: 14px;
  color: var(--text-faint);
  margin-top: 4px;
}

.congrats-badge {
  background: rgba(67, 233, 123, 0.1);
  border: 1px solid rgba(67, 233, 123, 0.2);
  color: #43e97b;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0.65;
  transition: opacity 0.2s, background 0.3s, border-color 0.3s;
}

.task-card:hover {
  opacity: 0.9;
}

.task-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  color: white;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
}

.task-body {
  flex: 1;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: line-through;
  opacity: 0.7;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.task-category {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 5px;
}

.task-date {
  font-size: 12px;
  color: #43e97b;
  opacity: 0.7;
}
</style>
