import { checkAchievements, getNewlyUnlockedAchievements } from '../lib/achievements'
import { Task, Goal, Achievement } from '../types'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    completed: true,
    priority: 'high',
    category: 'Work',
    createdAt: '2024-01-01T00:00:00Z'
  }
]

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Goal 1',
    description: 'Test goal',
    targetDate: '2024-01-31',
    progress: 50,
    category: 'Work',
    tasks: ['1']
  }
]

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Task',
    description: 'Complete your first task',
    icon: '🎯',
    unlocked: false,
    unlockedAt: undefined
  }
]

describe('Achievements', () => {
  it('should unlock first task achievement', () => {
    const result = checkAchievements(mockTasks, mockGoals, mockAchievements)
    const firstTaskAchievement = result.find(a => a.id === '1')
    expect(firstTaskAchievement?.unlocked).toBe(true)
  })
}) 