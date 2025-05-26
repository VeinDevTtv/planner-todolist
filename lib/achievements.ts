import { Task, Goal, Achievement } from '../types'

export interface AchievementCondition {
  id: string
  check: (tasks: Task[], goals: Goal[], achievements: Achievement[]) => boolean
}

export const achievementConditions: AchievementCondition[] = [
  {
    id: "1", // First Task
    check: (tasks) => tasks.length > 0
  },
  {
    id: "2", // Goal Setter
    check: (tasks, goals) => goals.length > 0
  },
  {
    id: "3", // Streak Master - Complete tasks for 7 days in a row
    check: (tasks) => {
      const completedTasks = tasks.filter(task => task.completed)
      if (completedTasks.length < 7) return false
      
      // Check if we have completed tasks in the last 7 consecutive days
      const today = new Date()
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        return date.toDateString()
      })
      
      return last7Days.every(day => 
        completedTasks.some(task => {
          const taskDate = new Date(task.createdAt)
          return taskDate.toDateString() === day
        })
      )
    }
  },
  {
    id: "4", // Productivity Pro - Complete 50 tasks
    check: (tasks) => tasks.filter(task => task.completed).length >= 50
  }
]

export function checkAchievements(
  tasks: Task[], 
  goals: Goal[], 
  achievements: Achievement[]
): Achievement[] {
  return achievements.map(achievement => {
    if (achievement.unlocked) return achievement
    
    const condition = achievementConditions.find(c => c.id === achievement.id)
    if (condition && condition.check(tasks, goals, achievements)) {
      return {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      }
    }
    
    return achievement
  })
}

export function getNewlyUnlockedAchievements(
  oldAchievements: Achievement[],
  newAchievements: Achievement[]
): Achievement[] {
  return newAchievements.filter((newAch, index) => 
    newAch.unlocked && !oldAchievements[index]?.unlocked
  )
} 