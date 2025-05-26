"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, Calendar, Trophy, GripVertical, Trash2, Edit3, CheckCircle2, Circle, Flag, Filter, SortAsc, SortDesc } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { checkAchievements, getNewlyUnlockedAchievements } from "@/lib/achievements"
import { filterTasks, sortTasks, updateGoalProgress, getTodaysTasks, getUpcomingTasks, getWeeklyCompletedTasks } from "@/lib/task-utils"
import type { Task, Goal, Achievement, FilterOptions, SortOptions } from "@/types"
import { DashboardAnalytics } from "@/components/dashboard-analytics"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Component() {
  const { toast } = useToast()
  
  const [tasks, setTasks] = useLocalStorage<Task[]>("planner-tasks", [
    {
      id: "1",
      title: "Review project proposal",
      description: "Go through the Q1 project proposal and provide feedback",
      completed: false,
      priority: "high",
      dueDate: "2024-01-15",
      category: "Work",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Morning workout",
      completed: true,
      priority: "medium",
      category: "Health",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      title: "Call mom",
      completed: false,
      priority: "low",
      category: "Personal",
      createdAt: "2024-01-10",
    },
  ])

  const [goals, setGoals] = useLocalStorage<Goal[]>("planner-goals", [
    {
      id: "1",
      title: "Complete React Course",
      description: "Finish the advanced React development course by end of month",
      targetDate: "2024-01-31",
      progress: 65,
      category: "Learning",
      tasks: ["1"],
    },
    {
      id: "2",
      title: "Fitness Goal",
      description: "Work out 5 times per week for the entire month",
      targetDate: "2024-01-31",
      progress: 80,
      category: "Health",
      tasks: ["2"],
    },
  ])

  const [achievements, setAchievements] = useLocalStorage<Achievement[]>("planner-achievements", [
    {
      id: "1",
      title: "First Task",
      description: "Complete your first task",
      icon: "🎯",
      unlocked: false,
    },
    {
      id: "2",
      title: "Goal Setter",
      description: "Create your first goal",
      icon: "🎪",
      unlocked: false,
    },
    {
      id: "3",
      title: "Streak Master",
      description: "Complete tasks for 7 days in a row",
      icon: "🔥",
      unlocked: false,
    },
    {
      id: "4",
      title: "Productivity Pro",
      description: "Complete 50 tasks",
      icon: "⚡",
      unlocked: false,
    },
  ])

  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("today")
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sort, setSort] = useState<SortOptions>({ field: 'createdAt', direction: 'desc' })
  const [showFilters, setShowFilters] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const dragRef = useRef<HTMLDivElement>(null)

  // Check achievements and update goal progress when tasks or goals change
  useEffect(() => {
    const oldAchievements = achievements
    const updatedAchievements = checkAchievements(tasks, goals, achievements)
    const newlyUnlocked = getNewlyUnlockedAchievements(oldAchievements, updatedAchievements)
    
    if (newlyUnlocked.length > 0) {
      setAchievements(updatedAchievements)
      newlyUnlocked.forEach(achievement => {
        toast({
          title: "🎉 Achievement Unlocked!",
          description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
          duration: 5000,
        })
      })
    }
    
    // Update goal progress
    const updatedGoals = updateGoalProgress(goals, tasks)
    if (JSON.stringify(updatedGoals) !== JSON.stringify(goals)) {
      setGoals(updatedGoals)
    }
  }, [tasks, goals, achievements, setAchievements, setGoals, toast])

  // Filter and sort tasks
  const filteredAndSortedTasks = sortTasks(filterTasks(tasks, filters), sort)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault()
    if (!draggedTask || draggedTask === targetTaskId) return

    const draggedIndex = tasks.findIndex((task) => task.id === draggedTask)
    const targetIndex = tasks.findIndex((task) => task.id === targetTaskId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newTasks = [...tasks]
    const [draggedTaskObj] = newTasks.splice(draggedIndex, 1)
    newTasks.splice(targetIndex, 0, draggedTaskObj)

    setTasks(newTasks)
    setDraggedTask(null)
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || "",
      description: taskData.description,
      completed: false,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate,
      category: taskData.category || "Personal",
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const addGoal = (goalData: Partial<Goal>) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalData.title || "",
      description: goalData.description || "",
      targetDate: goalData.targetDate || "",
      progress: 0,
      category: goalData.category || "Personal",
      tasks: [],
    }
    setGoals([...goals, newGoal])
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    // Remove task from any goals
    setGoals(goals.map(goal => ({
      ...goal,
      tasks: goal.tasks.filter(id => id !== taskId)
    })))
  }

  const linkTaskToGoal = (taskId: string, goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, tasks: [...goal.tasks, taskId] }
        : goal
    ))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const editTask = (taskData: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskData.id ? { ...task, ...taskData } : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">My Planner</h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">Stay organized and achieve your goals</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Dashboard Analytics */}
          <div className="mt-6">
            <DashboardAnalytics tasks={tasks} goals={goals} achievements={achievements} />
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="today" className="data-[state=active]:bg-white">
              Today
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-white">
              Goals
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white">
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Today's Tasks</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>
                    <NewTaskForm
                      onSubmit={(data) => {
                        addTask(data)
                        setShowNewTaskDialog(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Filter Controls */}
            {showFilters && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={filters.category || ""} onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, category: value || undefined }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Learning">Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Priority</Label>
                    <Select value={filters.priority || ""} onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, priority: value || undefined }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Sort By</Label>
                    <Select value={sort.field} onValueChange={(value: any) => 
                      setSort(prev => ({ ...prev, field: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="createdAt">Created Date</SelectItem>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSort(prev => ({ 
                        ...prev, 
                        direction: prev.direction === 'asc' ? 'desc' : 'asc' 
                      }))}
                      className="flex items-center gap-1"
                    >
                      {sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-3">
              {filteredAndSortedTasks.map((task, index) => (
                <Card
                  key={task.id}
                  className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer animate-fade-in ${
                    task.completed ? "opacity-75" : ""
                  } ${draggedTask === task.id ? "opacity-50 scale-95" : ""}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, task.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-4 w-4 text-slate-400" />

                      <button
                        onClick={() => toggleTask(task.id)}
                        className="flex-shrink-0 transition-all duration-200 hover:scale-110"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3
                            className={`font-medium ${task.completed ? "line-through text-slate-500" : "text-slate-800"}`}
                          >
                            {task.title}
                          </h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          <Badge variant="secondary" className="text-xs">
                            {task.category}
                          </Badge>
                        </div>
                        {task.description && <p className="text-sm text-slate-600 mt-1">{task.description}</p>}
                        {task.dueDate && (
                          <p className="text-xs text-slate-500 mt-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 touch-target"
                          onClick={() => setEditingTask(task)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 touch-target"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Upcoming Tasks</h2>
            <div className="grid gap-4">
              {tasks
                .filter((task) => task.dueDate && !task.completed)
                .map((task) => (
                  <Card key={task.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-800">{task.title}</h3>
                          <p className="text-sm text-slate-600 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </p>
                        </div>
                        <Badge variant="secondary">{task.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Goals</h2>
              <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg">
                    <Target className="h-4 w-4 mr-2" />
                    New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                  </DialogHeader>
                  <NewGoalForm
                    onSubmit={(data) => {
                      addGoal(data)
                      setShowNewGoalDialog(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-slate-800">{goal.title}</span>
                      <Badge variant="outline">{goal.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-slate-500 flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                      {goal.tasks.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-slate-500 mb-1">Linked Tasks:</p>
                          <div className="flex flex-wrap gap-1">
                            {goal.tasks.map(taskId => {
                              const task = tasks.find(t => t.id === taskId)
                              return task ? (
                                <Badge key={taskId} variant="secondary" className="text-xs">
                                  {task.completed ? '✓' : '○'} {task.title}
                                </Badge>
                              ) : null
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Achievements</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    achievement.unlocked ? "ring-2 ring-yellow-400" : "opacity-60"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold text-slate-800 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <Badge className="bg-yellow-500 text-white">
                        <Trophy className="h-3 w-3 mr-1" />
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          onSave={editTask}
        />
      )}
    </div>
  )
}

function NewTaskForm({ onSubmit }: { onSubmit: (data: Partial<Task>) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
    category: "Personal",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: "Personal",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title..."
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Add more details..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Learning">Learning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date (Optional)</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full">
        Create Task
      </Button>
    </form>
  )
}

function NewGoalForm({ onSubmit }: { onSubmit: (data: Partial<Goal>) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "Personal",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: "",
        description: "",
        targetDate: "",
        category: "Personal",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="goalTitle">Goal Title</Label>
        <Input
          id="goalTitle"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter goal title..."
          required
        />
      </div>

      <div>
        <Label htmlFor="goalDescription">Description</Label>
        <Textarea
          id="goalDescription"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your goal..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="goalCategory">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Learning">Learning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="goalTargetDate">Target Date</Label>
          <Input
            id="goalTargetDate"
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Goal
      </Button>
    </form>
  )
}
