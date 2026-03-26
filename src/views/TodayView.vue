<script setup lang="ts">
import { useI18n } from '@/i18n'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()

const todayTasks = [
  { id: 1, title: { ru: 'Изучить основы Vue 3 Composition API', en: 'Learn Vue 3 Composition API basics' }, category: 'study', done: false, time: '10:00' },
  { id: 2, title: { ru: 'Настроить Pinia store для задач',      en: 'Set up Pinia store for tasks' },       category: 'study', done: false, time: '13:00' },
  { id: 5, title: { ru: 'Купить продукты',                      en: 'Buy groceries' },                      category: 'personal', done: false, time: '18:00' },
]

const categoryColor: Record<string, string> = {
  study:    '#43e97b',
  work:     '#6c63ff',
  personal: '#ff6584',
}

const now = new Date()
const dateStr = now.toLocaleDateString(settings.locale === 'ru' ? 'ru-RU' : 'en-US', {
  weekday: 'long', day: 'numeric', month: 'long',
})
</script>

<template>
  <div class="today-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ t.today.title }}</h1>
        <p class="page-sub">{{ dateStr }}</p>
      </div>
      <div class="progress-ring-wrap">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--bg-hover)" stroke-width="5"/>
          <circle cx="28" cy="28" r="22" fill="none" stroke="#6c63ff" stroke-width="5"
            stroke-dasharray="138.2"
            stroke-dashoffset="92"
            stroke-linecap="round"
            transform="rotate(-90 28 28)"
          />
        </svg>
        <span class="ring-label">33%</span>
      </div>
    </div>

    <div class="timeline">
      <div v-for="task in todayTasks" :key="task.id" class="timeline-item">
        <div class="timeline-time">{{ task.time }}</div>
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-title">{{ task.title[settings.locale] }}</div>
          <span class="task-category" :style="{ color: categoryColor[task.category], background: categoryColor[task.category] + '15' }">
            {{ t.categories[task.category as keyof typeof t.categories] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-transform: capitalize;
}

.progress-ring-wrap {
  position: relative;
  width: 56px;
  height: 56px;
}

.ring-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-soft);
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 55px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-time {
  width: 44px;
  font-size: 13px;
  color: var(--text-faint);
  flex-shrink: 0;
  padding-top: 2px;
  text-align: right;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6c63ff;
  border: 2px solid var(--bg-base);
  flex-shrink: 0;
  margin-top: 4px;
  position: relative;
  z-index: 1;
}

.timeline-card {
  flex: 1;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background 0.3s, border-color 0.3s;
}

.timeline-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.task-category {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 5px;
  align-self: flex-start;
}
</style>
