import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExamplesPage from './pages/ExamplesPage'
import ProgressPage from './pages/ProgressPage'
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            <Route path="/examples/:category/:id" element={<ExamplesPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  )
}

export default App
