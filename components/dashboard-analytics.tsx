"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle2, Target, Trophy, TrendingUp, Calendar } from "lucide-react"
import { Task, Goal, Achievement } from "@/types"
import { getWeeklyCompletedTasks } from "@/lib/task-utils"

interface DashboardAnalyticsProps {
  tasks: Task[]
  goals: Goal[]
  achievements: Achievement[]
}

export function DashboardAnalytics({ tasks, goals, achievements }: DashboardAnalyticsProps) {
  const completedTasksCount = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0
  
  const weeklyCompletedTasks = getWeeklyCompletedTasks(tasks)
  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    return new Date(task.dueDate) < new Date()
  }).length

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Task Completion Rate */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Tasks Completed</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {completedTasksCount}/{totalTasks}
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CheckCircle2 className="h-8 w-8 text-green-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overall task completion rate</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{Math.round(completionRate)}% complete</p>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Active Goals</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{goals.length}</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Target className="h-8 w-8 text-blue-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of active goals you're working on</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Avg. Progress: {goals.length > 0 ? Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length) : 0}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Achievements</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{unlockedAchievements}</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trophy className="h-8 w-8 text-yellow-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Achievements you've unlocked</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {unlockedAchievements}/{achievements.length} unlocked
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">This Week</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{weeklyCompletedTasks.length}</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TrendingUp className="h-8 w-8 text-purple-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tasks completed in the last 7 days</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">Tasks completed</p>
            </div>
          </CardContent>
        </Card>

        {/* Priority & Overdue Tasks */}
        {(highPriorityTasks > 0 || overdueTasks > 0) && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Attention Needed</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                {highPriorityTasks > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {highPriorityTasks} High Priority
                  </Badge>
                )}
                {overdueTasks > 0 && (
                  <Badge variant="outline" className="text-xs border-red-200 text-red-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {overdueTasks} Overdue
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  )
} 