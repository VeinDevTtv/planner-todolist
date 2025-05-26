# 📋 Planner & Todo List App

A modern, feature-rich task management and goal tracking application built with Next.js 15, React 19, and TypeScript. Stay organized, track your progress, and achieve your goals with this beautiful, responsive web application.

![Planner App](./public/og-image.png)

## ✨ Features

### 🎯 Task Management
- **Create, Edit, Delete Tasks**: Full CRUD operations with inline editing
- **Priority Levels**: High, Medium, Low priority with visual indicators
- **Categories**: Organize tasks by Work, Personal, Health, Learning, etc.
- **Due Dates**: Set and track task deadlines
- **Drag & Drop**: Reorder tasks with smooth animations
- **Completion Tracking**: Mark tasks as complete with visual feedback

### 🎪 Goal Tracking
- **Goal Creation**: Set meaningful goals with target dates
- **Progress Calculation**: Automatic progress tracking based on linked tasks
- **Visual Progress Bars**: See your progress at a glance
- **Goal Categories**: Organize goals by different life areas

### 🏆 Achievement System
- **Automatic Unlocking**: Achievements unlock based on your activity
- **4 Built-in Achievements**:
  - 🎯 **First Task**: Complete your first task
  - 🎪 **Goal Setter**: Create your first goal
  - 🔥 **Streak Master**: Complete tasks for 7 days in a row
  - ⚡ **Productivity Pro**: Complete 50 tasks total
- **Toast Notifications**: Get notified when you unlock achievements

### 📊 Dashboard Analytics
- **Completion Rate**: Visual progress of your overall task completion
- **Active Goals**: Track how many goals you're working on
- **Weekly Progress**: See tasks completed in the last 7 days
- **Priority Alerts**: Get notified about high-priority and overdue tasks
- **Interactive Tooltips**: Hover for detailed information

### 🔍 Advanced Filtering & Sorting
- **Filter by**: Category, Priority, Completion Status
- **Sort by**: Due Date, Priority, Creation Date, Title
- **Search**: Find tasks quickly with real-time search
- **Combination Filters**: Apply multiple filters simultaneously

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Touch-Friendly**: Optimized for mobile interactions

### 💾 Data Persistence
- **localStorage Integration**: All data persists across sessions
- **Graceful Degradation**: Works even when localStorage is unavailable
- **Error Handling**: Robust error boundaries and fallbacks

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
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📁 Project Structure

```
planner-todolist/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── dashboard-analytics.tsx
│   ├── edit-task-dialog.tsx
│   ├── error-boundary.tsx
│   └── theme-toggle.tsx
├── hooks/                # Custom React hooks
│   └── use-local-storage.ts
├── lib/                  # Utility functions
│   ├── achievements.ts   # Achievement logic
│   └── task-utils.ts     # Task filtering/sorting utilities
├── types/                # TypeScript type definitions
│   └── index.ts
├── __tests__/            # Test files
│   ├── achievements.test.ts
│   └── task-utils.test.ts
├── public/               # Static assets
│   ├── favicon.ico
│   ├── manifest.json
│   └── og-image.png
└── planner-app.tsx       # Main application component
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence
- **Testing**: Jest with React Testing Library
- **Build Tool**: Next.js built-in bundler

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Bold, slate-800/slate-100
- **Body**: Regular, slate-600/slate-300
- **Captions**: Small, slate-500/slate-400

### Spacing
- **Base unit**: 4px (0.25rem)
- **Component padding**: 16px (1rem)
- **Section margins**: 24px-32px (1.5rem-2rem)

## 📱 PWA Features

- **Web App Manifest**: Installable as a PWA
- **Responsive Design**: Mobile-first approach
- **Offline-Ready**: Works without internet (localStorage)
- **Touch Optimized**: 44px minimum touch targets

## 🔧 Configuration

### Environment Variables
No environment variables required - the app works out of the box!

### Customization
- **Themes**: Modify `app/globals.css` for custom color schemes
- **Achievements**: Add new achievements in `lib/achievements.ts`
- **Categories**: Update category options in form components

## 🐛 Troubleshooting

### Common Issues

1. **localStorage not working**
   - The app gracefully falls back to memory storage
   - Check browser privacy settings

2. **Build errors**
   - Ensure Node.js 18+ is installed
   - Clear `.next` folder and rebuild

3. **Tests failing**
   - Run `npm install` to ensure all dependencies are installed
   - Check Jest configuration in `jest.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ using Next.js 15 and React 19** 