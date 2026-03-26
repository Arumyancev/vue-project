import type { Messages } from './ru'

export const en: Messages = {
  appName: 'TaskFlow',

  nav: {
    allTasks: 'All Tasks',
    today: 'Today',
    completed: 'Completed',
  },

  categories: {
    title: 'Categories',
    work: 'Work',
    personal: 'Personal',
    study: 'Study',
  },

  topbar: {
    searchPlaceholder: 'Search tasks...',
    newTask: '+ New Task',
  },

  home: {
    title: 'All Tasks',
    subtitle: 'Manage your tasks effectively',
    statTotal: 'Total',
    statInProgress: 'In Progress',
    statDone: 'Done',
    filterAll: 'All',
    filterActive: 'Active',
    filterCompleted: 'Completed',
  },

  today: {
    title: 'Today',
  },

  completed: {
    title: 'Completed',
    subtitle: (count: number) => `${count} tasks completed`,
    congrats: '🎉 Great work!',
  },

  priority: {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  },
}
