import { ReactNode } from 'react'
import Navigation from './Navigation'
import { ThemeProvider } from '../contexts/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-indigo-900/10 relative overflow-hidden">
        {/* 全局背景装饰层 */}
        <div aria-hidden className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-400/8 to-indigo-400/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400/8 to-primary-500/6 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-400/4 via-transparent to-cyan-400/4 blur-3xl" />
        </div>

        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
