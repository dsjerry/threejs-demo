import { CheckCircleIcon, EyeIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { useProgress } from '../../../hooks/useProgress'

interface ProgressTrackerProps {
  exampleKey?: string
  showOverall?: boolean
}

export default function ProgressTracker({ exampleKey, showOverall = false }: ProgressTrackerProps) {
  const { progress, markAsCompleted, unmarkAsCompleted, isCompleted, isViewed } = useProgress()

  if (showOverall) {
    return (
      <div className="card-elevated spacing-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-heading-3">
            学习进度
          </h3>
        </div>
        
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between text-caption mb-3">
            <span>完成进度</span>
            <span className="font-semibold text-primary-600 dark:text-primary-400">{progress.completionPercentage}%</span>
          </div>
          <div className="progress-bar h-3">
            <div 
              className="progress-fill"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {progress.completedExamples.size}
            </div>
            <div className="text-caption text-green-700 dark:text-green-300">已完成</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {progress.viewedExamples.size}
            </div>
            <div className="text-caption text-blue-700 dark:text-blue-300">已查看</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {progress.totalExamples}
            </div>
            <div className="text-caption text-gray-700 dark:text-gray-300">总数</div>
          </div>
        </div>
      </div>
    )
  }

  if (!exampleKey) return null

  const completed = isCompleted(exampleKey)
  const viewed = isViewed(exampleKey)

  return (
    <div className="flex items-center gap-3">
      {/* 查看状态 */}
      {viewed && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
          <EyeIcon className="w-4 h-4" />
          <span className="text-xs font-medium">已查看</span>
        </div>
      )}

      {/* 完成状态切换按钮 */}
      <button
        onClick={() => completed ? unmarkAsCompleted(exampleKey) : markAsCompleted(exampleKey)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 ${
          completed
            ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 shadow-sm'
            : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
        }`}
      >
        {completed ? (
          <CheckCircleIconSolid className="w-4 h-4" />
        ) : (
          <CheckCircleIcon className="w-4 h-4" />
        )}
        <span>{completed ? '已完成' : '标记完成'}</span>
      </button>
    </div>
  )
}
