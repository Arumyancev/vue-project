export const ru = {
  appName: 'TaskFlow',

  nav: {
    allTasks: 'Все задачи',
    today: 'Сегодня',
    completed: 'Выполненные',
  },

  categories: {
    title: 'Категории',
    work: 'Работа',
    personal: 'Личное',
    study: 'Учёба',
  },

  topbar: {
    searchPlaceholder: 'Поиск задач...',
    newTask: '+ Новая задача',
  },

  home: {
    title: 'Все задачи',
    subtitle: 'Управляй своими задачами эффективно',
    statTotal: 'Всего',
    statInProgress: 'В процессе',
    statDone: 'Выполнено',
    filterAll: 'Все',
    filterActive: 'Активные',
    filterCompleted: 'Выполненные',
  },

  today: {
    title: 'Сегодня',
  },

  completed: {
    title: 'Выполненные',
    subtitle: (count: number) => `${count} задач завершено`,
    congrats: '🎉 Отличная работа!',
  },

  priority: {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
  },
}

export type Messages = typeof ru
