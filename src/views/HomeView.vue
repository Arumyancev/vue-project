<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()

const stats = [
  { key: 'statTotal',      value: 10, color: '#6c63ff' },
  { key: 'statInProgress', value: 4,  color: '#f59e0b' },
  { key: 'statDone',       value: 6,  color: '#43e97b' },
] as const

const tasks = [
  { id: 1, title: { ru: 'Изучить основы Vue 3 Composition API', en: 'Learn Vue 3 Composition API basics' }, category: 'study', priority: 'high',   done: false, date: { ru: 'Сегодня', en: 'Today' } },
  { id: 2, title: { ru: 'Настроить Pinia store для задач',      en: 'Set up Pinia store for tasks' },       category: 'study', priority: 'high',   done: false, date: { ru: 'Сегодня', en: 'Today' } },
  { id: 3, title: { ru: 'Созвон с командой по проекту',         en: 'Team call about the project' },        category: 'work',  priority: 'medium', done: false, date: { ru: 'Завтра',  en: 'Tomorrow' } },
  { id: 4, title: { ru: 'Написать unit тесты',                  en: 'Write unit tests' },                   category: 'work',  priority: 'low',    done: true,  date: { ru: 'Вчера',   en: 'Yesterday' } },
  { id: 5, title: { ru: 'Купить продукты',                      en: 'Buy groceries' },                      category: 'personal', priority: 'medium', done: false, date: { ru: 'Сегодня', en: 'Today' } },
  { id: 6, title: { ru: 'Прочитать статью о Vue Router',        en: 'Read article about Vue Router' },      category: 'study', priority: 'low',    done: true,  date: { ru: 'Вчера',   en: 'Yesterday' } },
]

import { useSettingsStore } from '@/stores/settings'
const settings = useSettingsStore()

const categoryColor: Record<string, string> = {
  study:    '#43e97b',
  work:     '#6c63ff',
  personal: '#ff6584',
}
</script>

<template>
  <div class="tasks-page">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ t.home.title }}</h1>
        <p class="page-sub">{{ t.home.subtitle }}</p>
      </div>
    </div>

    <!-- Stats row -->
    <div class="stats-row">
      <div v-for="stat in stats" :key="stat.key" class="stat-card">
        <div class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</div>
        <div class="stat-label">{{ t.home[stat.key] }}</div>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: (stat.value / 10 * 100) + '%', background: stat.color }"></div>
        </div>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs">
      <button class="tab active">{{ t.home.filterAll }}</button>
      <button class="tab">{{ t.home.filterActive }}</button>
      <button class="tab">{{ t.home.filterCompleted }}</button>
    </div>

    <!-- Task list -->
    <div class="task-list">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-card"
        :class="{ done: task.done }"
      >
        <div class="task-checkbox" :class="{ checked: task.done }">
          <span v-if="task.done">✓</span>
        </div>

        <div class="task-body">
          <div class="task-title">{{ task.title[settings.locale] }}</div>
          <div class="task-meta">
            <span
              class="task-category"
              :style="{
                color: categoryColor[task.category],
                borderColor: categoryColor[task.category] + '44',
                background: categoryColor[task.category] + '15'
              }"
            >
              {{ t.categories[task.category as keyof typeof t.categories] }}
            </span>
            <span class="task-date">🕐 {{ task.date[settings.locale] }}</span>
          </div>
        </div>

        <div class="task-right">
          <span class="priority-badge" :class="task.priority">
            {{ t.priority[task.priority as keyof typeof t.priority] }}
          </span>
          <button class="task-menu">···</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-page {
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

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
  transition: background 0.3s, border-color 0.3s;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--text-faint);
  margin-top: 6px;
  margin-bottom: 14px;
}

.stat-bar {
  height: 4px;
  background: var(--bg-hover);
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s;
}

/* Filter tabs */
.filter-tabs {
  display: flex;
  gap: 8px;
}

.tab {
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: transparent;
  color: var(--text-faint);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.tab:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.tab.active {
  background: var(--accent-bg);
  color: var(--accent-soft);
  border-color: var(--accent-border);
}

/* Tasks */
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
  transition: border-color 0.2s, transform 0.15s, background 0.3s;
  cursor: pointer;
}

.task-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.task-card.done {
  opacity: 0.5;
}

.task-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  border: 2px solid var(--border-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  color: white;
  transition: all 0.2s;
}

.task-checkbox.checked {
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  border-color: transparent;
}

.task-body {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.done .task-title {
  text-decoration: line-through;
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
  border: 1px solid;
}

.task-date {
  font-size: 12px;
  color: var(--text-disabled);
}

.task-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
}

.priority-badge.high   { background: rgba(239,68,68,0.15);  color: #f87171; }
.priority-badge.medium { background: rgba(245,158,11,0.15); color: #fbbf24; }
.priority-badge.low    { background: rgba(67,233,123,0.15); color: #43e97b; }

.task-menu {
  background: transparent;
  color: var(--text-disabled);
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 6px;
  transition: background 0.2s;
  letter-spacing: 1px;
}

.task-menu:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}
</style>
