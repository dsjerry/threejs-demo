import { ReactNode } from 'react'
import Navigation from './Navigation'
import { ThemeProvider } from '../contexts/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-800">
        <Navigation />
        <main className="pt-16 animate-fade-in-up">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
