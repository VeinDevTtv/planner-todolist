export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
  category: string
  createdAt: string
}

export interface Goal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  category: string
  tasks: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

export interface FilterOptions {
  category?: string
  priority?: string
  completed?: boolean
}

export interface SortOptions {
  field: 'dueDate' | 'priority' | 'createdAt' | 'title'
  direction: 'asc' | 'desc'
} 