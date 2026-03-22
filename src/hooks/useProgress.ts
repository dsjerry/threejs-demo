import { useState, useEffect, useCallback } from 'react'
import { examplesData } from '../data/examples'

interface ProgressData {
  completedExamples: Set<string>
  viewedExamples: Set<string>
  totalExamples: number
  completionPercentage: number
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({
    completedExamples: new Set(),
    viewedExamples: new Set(),
    totalExamples: Object.keys(examplesData).length,
    completionPercentage: 0
  })

  // 从localStorage加载进度
  useEffect(() => {
    const savedProgress = localStorage.getItem('threejs-learning-progress')
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        setProgress(prev => ({
          ...prev,
          completedExamples: new Set(parsed.completedExamples || []),
          viewedExamples: new Set(parsed.viewedExamples || []),
          completionPercentage: calculateCompletionPercentage(
            new Set(parsed.completedExamples || []),
            Object.keys(examplesData).length
          )
        }))
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }
  }, [])

  // 计算完成百分比
  const calculateCompletionPercentage = (completed: Set<string>, total: number): number => {
    return Math.round((completed.size / total) * 100)
  }

  // 保存进度到localStorage
  const saveProgress = (newProgress: ProgressData) => {
    const toSave = {
      completedExamples: Array.from(newProgress.completedExamples),
      viewedExamples: Array.from(newProgress.viewedExamples),
      completionPercentage: newProgress.completionPercentage
    }
    localStorage.setItem('threejs-learning-progress', JSON.stringify(toSave))
  }

  // 标记示例为已查看
  const markAsViewed = useCallback((exampleKey: string) => {
    setProgress(prev => {
      const newViewedExamples = new Set(prev.viewedExamples)
      newViewedExamples.add(exampleKey)
      
      const newProgress = {
        ...prev,
        viewedExamples: newViewedExamples
      }
      
      saveProgress(newProgress)
      return newProgress
    })
  }, [])

  // 标记示例为已完成
  const markAsCompleted = useCallback((exampleKey: string) => {
    setProgress(prev => {
      const newCompletedExamples = new Set(prev.completedExamples)
      const newViewedExamples = new Set(prev.viewedExamples)
      
      newCompletedExamples.add(exampleKey)
      newViewedExamples.add(exampleKey)
      
      const newProgress = {
        ...prev,
        completedExamples: newCompletedExamples,
        viewedExamples: newViewedExamples,
        completionPercentage: calculateCompletionPercentage(newCompletedExamples, prev.totalExamples)
      }
      
      saveProgress(newProgress)
      return newProgress
    })
  }, [])

  // 取消完成标记
  const unmarkAsCompleted = useCallback((exampleKey: string) => {
    setProgress(prev => {
      const newCompletedExamples = new Set(prev.completedExamples)
      newCompletedExamples.delete(exampleKey)
      
      const newProgress = {
        ...prev,
        completedExamples: newCompletedExamples,
        completionPercentage: calculateCompletionPercentage(newCompletedExamples, prev.totalExamples)
      }
      
      saveProgress(newProgress)
      return newProgress
    })
  }, [])

  // 重置所有进度
  const resetProgress = () => {
    const newProgress = {
      completedExamples: new Set<string>(),
      viewedExamples: new Set<string>(),
      totalExamples: Object.keys(examplesData).length,
      completionPercentage: 0
    }
    
    setProgress(newProgress)
    localStorage.removeItem('threejs-learning-progress')
  }

  return {
    progress,
    markAsViewed,
    markAsCompleted,
    unmarkAsCompleted,
    resetProgress,
    isCompleted: (exampleKey: string) => progress.completedExamples.has(exampleKey),
    isViewed: (exampleKey: string) => progress.viewedExamples.has(exampleKey)
  }
}
