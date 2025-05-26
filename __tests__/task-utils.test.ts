import { filterTasks, sortTasks, calculateGoalProgress, updateGoalProgress } from '../lib/task-utils'
import { Task, Goal } from '../types'

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    completed: false,
    priority: 'high',
    category: 'Work',
    createdAt: '2024-01-01T00:00:00Z',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Task 2',
    completed: true,
    priority: 'medium',
    category: 'Personal',
    createdAt: '2024-01-02T00:00:00Z',
    dueDate: '2024-01-10'
  },
  {
    id: '3',
    title: 'Task 3',
    completed: false,
    priority: 'low',
    category: 'Work',
    createdAt: '2024-01-03T00:00:00Z'
  }
]

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Goal 1',
    description: 'Test goal',
    targetDate: '2024-01-31',
    progress: 0,
    category: 'Work',
    tasks: ['1', '2']
  }
]

describe('Task Utils', () => {
  describe('filterTasks', () => {
    it('should filter tasks by category', () => {
      const result = filterTasks(mockTasks, { category: 'Work' })
      expect(result).toHaveLength(2)
      expect(result.every(task => task.category === 'Work')).toBe(true)
    })

    it('should filter tasks by priority', () => {
      const result = filterTasks(mockTasks, { priority: 'high' })
      expect(result).toHaveLength(1)
      expect(result[0].priority).toBe('high')
    })

    it('should filter tasks by completion status', () => {
      const result = filterTasks(mockTasks, { completed: true })
      expect(result).toHaveLength(1)
      expect(result[0].completed).toBe(true)
    })

    it('should apply multiple filters', () => {
      const result = filterTasks(mockTasks, { category: 'Work', completed: false })
      expect(result).toHaveLength(2)
      expect(result.every(task => task.category === 'Work' && !task.completed)).toBe(true)
    })
  })

  describe('sortTasks', () => {
    it('should sort tasks by priority descending', () => {
      const result = sortTasks(mockTasks, { field: 'priority', direction: 'desc' })
      expect(result[0].priority).toBe('high')
      expect(result[1].priority).toBe('medium')
      expect(result[2].priority).toBe('low')
    })

    it('should sort tasks by title ascending', () => {
      const result = sortTasks(mockTasks, { field: 'title', direction: 'asc' })
      expect(result[0].title).toBe('Task 1')
      expect(result[1].title).toBe('Task 2')
      expect(result[2].title).toBe('Task 3')
    })

    it('should sort tasks by due date', () => {
      const result = sortTasks(mockTasks, { field: 'dueDate', direction: 'asc' })
      expect(result[0].dueDate).toBe('2024-01-10')
      expect(result[1].dueDate).toBe('2024-01-15')
    })
  })

  describe('calculateGoalProgress', () => {
    it('should calculate progress correctly', () => {
      const progress = calculateGoalProgress(mockGoals[0], mockTasks)
      expect(progress).toBe(50) // 1 out of 2 tasks completed
    })

    it('should return 0 for goals with no tasks', () => {
      const emptyGoal: Goal = { ...mockGoals[0], tasks: [] }
      const progress = calculateGoalProgress(emptyGoal, mockTasks)
      expect(progress).toBe(0)
    })
  })

  describe('updateGoalProgress', () => {
    it('should update progress for all goals', () => {
      const result = updateGoalProgress(mockGoals, mockTasks)
      expect(result[0].progress).toBe(50)
    })
  })
}) 