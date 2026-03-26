<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from '@/i18n'

const route = useRoute()
const settings = useSettingsStore()
const { t } = useI18n()
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">✓</span>
        <span class="logo-text">{{ t.appName }}</span>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/" class="nav-item" :class="{ active: route.name === 'home' }">
          <span class="nav-icon">📋</span>
          <span>{{ t.nav.allTasks }}</span>
        </RouterLink>
        <RouterLink to="/today" class="nav-item" :class="{ active: route.name === 'today' }">
          <span class="nav-icon">☀️</span>
          <span>{{ t.nav.today }}</span>
        </RouterLink>
        <RouterLink to="/completed" class="nav-item" :class="{ active: route.name === 'completed' }">
          <span class="nav-icon">✅</span>
          <span>{{ t.nav.completed }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-categories">
        <div class="categories-title">{{ t.categories.title }}</div>
        <div class="category-item">
          <span class="category-dot" style="background: #6c63ff"></span>
          <span>{{ t.categories.work }}</span>
          <span class="category-count">3</span>
        </div>
        <div class="category-item">
          <span class="category-dot" style="background: #ff6584"></span>
          <span>{{ t.categories.personal }}</span>
          <span class="category-count">5</span>
        </div>
        <div class="category-item">
          <span class="category-dot" style="background: #43e97b"></span>
          <span>{{ t.categories.study }}</span>
          <span class="category-count">2</span>
        </div>
      </div>

      <!-- Settings controls at the bottom -->
      <div class="sidebar-settings">
        <!-- Theme toggle -->
        <button class="settings-btn" @click="settings.toggleTheme" :title="settings.theme === 'dark' ? 'Switch to light' : 'Switch to dark'">
          <span>{{ settings.theme === 'dark' ? '☀️' : '🌙' }}</span>
          <span class="settings-label">{{ settings.theme === 'dark' ? 'Light mode' : 'Dark mode' }}</span>
        </button>

        <!-- Locale toggle -->
        <button class="settings-btn" @click="settings.toggleLocale">
          <span class="locale-flag">{{ settings.locale === 'ru' ? '🇷🇺' : '🇬🇧' }}</span>
          <span class="settings-label">{{ settings.locale === 'ru' ? 'English' : 'Русский' }}</span>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-wrapper">
      <header class="topbar">
        <div class="topbar-search">
          <span class="search-icon">🔍</span>
          <input type="text" :placeholder="t.topbar.searchPlaceholder" class="search-input" />
        </div>
        <div class="topbar-actions">
          <button class="btn-add">{{ t.topbar.newTask }}</button>
          <div class="user-avatar">{{ settings.locale === 'ru' ? 'А' : 'A' }}</div>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* ── Sidebar ── */
.sidebar {
  width: 260px;
  min-height: 100vh;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.3px;
}

/* Nav */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-muted);
  transition: all 0.2s;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.nav-item.active {
  background: var(--accent-bg);
  color: var(--accent-soft);
  font-weight: 500;
}

.nav-icon {
  font-size: 16px;
}

/* Categories */
.sidebar-categories {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.categories-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-disabled);
  padding: 0 12px;
  margin-bottom: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s;
}

.category-item:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.category-count {
  margin-left: auto;
  font-size: 12px;
  background: var(--bg-hover);
  color: var(--text-faint);
  padding: 1px 7px;
  border-radius: 10px;
}

/* Settings */
.sidebar-settings {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.settings-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  font-size: 14px;
  width: 100%;
  text-align: left;
  transition: all 0.2s;
}

.settings-btn:hover {
  background: var(--bg-hover);
  color: var(--text-secondary);
}

.settings-label {
  font-size: 13px;
}

/* ── Topbar ── */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.topbar {
  height: 64px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  gap: 16px;
  flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s;
}

.topbar-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-base);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 14px;
  flex: 1;
  max-width: 400px;
  transition: background 0.3s, border-color 0.3s;
}

.search-icon {
  font-size: 14px;
  opacity: 0.5;
}

.search-input {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 14px;
  width: 100%;
}

.search-input::placeholder {
  color: var(--text-disabled);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-add {
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;
}

.btn-add:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-add:active {
  transform: translateY(0);
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c63ff, #ff6584);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

/* ── Content ── */
.content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: var(--bg-base);
  transition: background 0.3s;
}
</style>
