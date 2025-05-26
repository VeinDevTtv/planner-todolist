import { Task, Goal, FilterOptions, SortOptions } from '../types'

export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
  return tasks.filter(task => {
    if (filters.category && task.category !== filters.category) return false
    if (filters.priority && task.priority !== filters.priority) return false
    if (filters.completed !== undefined && task.completed !== filters.completed) return false
    return true
  })
}

export function sortTasks(tasks: Task[], sort: SortOptions): Task[] {
  return [...tasks].sort((a, b) => {
    let aValue: any
    let bValue: any
    
    switch (sort.field) {
      case 'dueDate':
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
        break
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        aValue = priorityOrder[a.priority]
        bValue = priorityOrder[b.priority]
        break
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      default:
        return 0
    }
    
    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1
    return 0
  })
}

export function calculateGoalProgress(goal: Goal, tasks: Task[]): number {
  if (goal.tasks.length === 0) return 0
  
  const linkedTasks = tasks.filter(task => goal.tasks.includes(task.id))
  const completedTasks = linkedTasks.filter(task => task.completed)
  
  return Math.round((completedTasks.length / linkedTasks.length) * 100)
}

export function updateGoalProgress(goals: Goal[], tasks: Task[]): Goal[] {
  return goals.map(goal => ({
    ...goal,
    progress: calculateGoalProgress(goal, tasks)
  }))
}

export function getTodaysTasks(tasks: Task[]): Task[] {
  const today = new Date().toDateString()
  return tasks.filter(task => {
    if (!task.dueDate) return true // Tasks without due date are considered "today"
    const taskDate = new Date(task.dueDate).toDateString()
    return taskDate === today || new Date(task.dueDate) < new Date()
  })
}

export function getUpcomingTasks(tasks: Task[]): Task[] {
  const today = new Date()
  today.setHours(23, 59, 59, 999) // End of today
  
  return tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    return new Date(task.dueDate) > today
  })
}

export function getWeeklyCompletedTasks(tasks: Task[]): Task[] {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  return tasks.filter(task => 
    task.completed && new Date(task.createdAt) >= oneWeekAgo
  )
} 