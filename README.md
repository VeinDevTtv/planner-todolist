# 📋 Planner & Todo List Application

A modern, feature-rich task management and goal tracking application built with Next.js 15, React 19, and TypeScript. Stay organized and achieve your goals with this beautiful, responsive planner app.

![Planner App](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Task Management
- **Create, Edit, Delete Tasks**: Full CRUD operations with inline editing
- **Priority Levels**: High, Medium, Low priority with visual indicators
- **Categories**: Organize tasks by Personal, Work, Health, Learning
- **Due Dates**: Set and track task deadlines
- **Drag & Drop**: Reorder tasks with smooth animations
- **Filtering & Sorting**: Filter by category, priority, completion status
- **Persistent Storage**: All data saved to localStorage

### 🎪 Goal Tracking
- **Create Goals**: Set meaningful objectives with target dates
- **Progress Tracking**: Automatic progress calculation based on linked tasks
- **Task Linking**: Connect tasks to goals for progress updates
- **Visual Progress Bars**: See goal completion at a glance
- **Goal Categories**: Organize goals by different life areas

### 🏆 Achievement System
- **Automatic Unlocking**: Achievements unlock based on your activity
- **Visual Badges**: Beautiful emoji badges with descriptions
- **Toast Notifications**: Celebrate achievements with notifications
- **Progress Tracking**: See which achievements you've unlocked

#### Available Achievements:
- 🎯 **First Task**: Create your first task
- 🎪 **Goal Setter**: Create your first goal  
- 🔥 **Streak Master**: Complete tasks for 7 days in a row
- ⚡ **Productivity Pro**: Complete 50 tasks

### 📊 Dashboard Analytics
- **Completion Rate**: Visual progress of all tasks
- **Active Goals**: Track goals in progress
- **Weekly Stats**: See tasks completed this week
- **Priority Alerts**: Highlight high-priority and overdue tasks
- **Achievement Counter**: Track unlocked achievements

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes
- **Glassmorphism Design**: Modern, translucent UI elements
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Polished transitions and hover effects
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd planner-todolist
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
planner-todolist/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main page component
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── dashboard-analytics.tsx
│   ├── edit-task-dialog.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/                # Custom React hooks
│   ├── use-local-storage.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                  # Utility functions
│   ├── achievements.ts   # Achievement logic
│   ├── task-utils.ts     # Task filtering/sorting
│   └── utils.ts          # General utilities
├── types/                # TypeScript type definitions
│   └── index.ts
└── planner-app.tsx       # Main application component
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **UI Components**: Radix UI primitives with Shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Storage**: localStorage for data persistence
- **Animations**: CSS transitions and transforms

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🎯 Usage Guide

### Creating Tasks
1. Click the "Add Task" button
2. Fill in task details (title, description, priority, category, due date)
3. Click "Create Task"

### Managing Tasks
- **Complete**: Click the circle icon to mark as complete
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove
- **Reorder**: Drag and drop tasks to reorder

### Setting Goals
1. Go to the "Goals" tab
2. Click "New Goal"
3. Set title, description, target date, and category
4. Link tasks to goals for automatic progress tracking

### Filtering & Sorting
1. Click the "Filters" button in the Today tab
2. Filter by category, priority, or completion status
3. Sort by creation date, due date, priority, or title
4. Toggle sort direction with the arrow button

### Achievements
- Achievements unlock automatically based on your activity
- View all achievements in the "Achievements" tab
- Unlocked achievements show with a golden ring and trophy icon

## 🔧 Customization

### Adding New Categories
Update the category options in:
- `components/edit-task-dialog.tsx`
- `planner-app.tsx` (NewTaskForm and NewGoalForm)

### Adding New Achievements
1. Add achievement definition to initial data in `planner-app.tsx`
2. Add achievement condition to `lib/achievements.ts`

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize glassmorphism effects with backdrop-blur utilities

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for clean, consistent icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**Built with ❤️ using Next.js and React** 