import { Link } from 'react-router-dom'
import { CheckCircleIcon, EyeIcon, ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { useProgress } from '../hooks/useProgress'
import { examplesData } from '../data/examples'

export default function ProgressPage() {
  const { progress, markAsCompleted, isCompleted, isViewed } = useProgress()

  const categoryTitles: Record<string, string> = {
    'basics': '基础示例',
    'materials': '材质系统',
    'lighting': '光照效果',
    'animation': '动画效果',
    'geometry': '几何体',
    'effects': '后处理效果',
    'interaction': '交互效果',
    'shaders': '着色器',
    'particles': '粒子效果',
    'camera': '相机控制',
    'models': '模型展示',
  }

  const groupedExamples = Object.entries(examplesData).reduce((acc, [key, example]) => {
    const category = example.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push({ key, ...example })
    return acc
  }, {} as Record<string, Array<{ key: string; id: string; title: string; description: string; category: string }>>)

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* 背景装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary-400/15 to-indigo-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-primary-500/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* 返回按钮 */}
        <Link
          to="/examples"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors px-3 py-2 rounded-xl hover:bg-primary-50/70 dark:hover:bg-primary-900/20"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>返回示例</span>
        </Link>

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-heading-2 mb-2">
            学习进度
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            追踪你的 Three.js 学习旅程
          </p>
        </div>

        {/* 总体进度卡片 */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                总体进度
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                继续保持，你的学习进度正在累积
              </p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-2">
              <span className="tag tag-primary">已完成 {progress.completedExamples.size}</span>
              <span className="tag tag-primary">已查看 {progress.viewedExamples.size}</span>
            </div>
          </div>

          {/* 进度条 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">完成进度</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {progress.completionPercentage}%
              </span>
            </div>
            <div className="progress-bar h-4">
              <div
                className="progress-fill"
                style={{ width: `${progress.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {progress.completedExamples.size}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-green-700 dark:text-green-300">
                <CheckCircleIcon className="w-4 h-4" />
                已完成
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {progress.viewedExamples.size}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-blue-700 dark:text-blue-300">
                <EyeIcon className="w-4 h-4" />
                已查看
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-1">
                {progress.totalExamples}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                <BookOpenIcon className="w-4 h-4" />
                总数
              </div>
            </div>
          </div>
        </div>

        {/* 分类进度 */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          分类进度
        </h2>
        <div className="space-y-4">
          {Object.entries(groupedExamples).map(([category, examples]) => {
            const completedCount = examples.filter(e => isCompleted(e.key)).length
            const total = examples.length
            const categoryPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0

            return (
              <div key={category} className="card-elevated p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {categoryTitles[category] || category}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {completedCount}/{total}
                  </span>
                </div>
                <div className="progress-bar h-2 mb-3">
                  <div
                    className="progress-fill"
                    style={{ width: `${categoryPercentage}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {examples.map(example => {
                    const completed = isCompleted(example.key)
                    const viewed = isViewed(example.key)
                    return (
                      <div
                        key={example.key}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all duration-200 border backdrop-blur-sm ${
                          completed
                            ? 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/25 dark:to-emerald-900/25 border-green-200/60 dark:border-green-800/60'
                            : viewed
                              ? 'bg-gradient-to-r from-blue-50/90 to-cyan-50/90 dark:from-blue-900/25 dark:to-cyan-900/20 border-blue-200/60 dark:border-blue-800/60'
                              : 'bg-white/60 dark:bg-gray-800/40 border-gray-200/60 dark:border-gray-700/60 hover:border-primary-300/70 dark:hover:border-primary-600/60'
                        }`}
                      >
                        {viewed && (
                          <EyeIcon className="w-3.5 h-3.5 text-blue-500" />
                        )}
                        {completed ? (
                          <CheckCircleIconSolid className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <CheckCircleIcon className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        <Link
                          to={`/examples/${example.key}`}
                          className={`hover:text-primary-700 dark:hover:text-primary-300 transition-colors ${
                            completed
                              ? 'text-green-700 dark:text-green-200'
                              : viewed
                                ? 'text-blue-700 dark:text-blue-200'
                                : 'text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {example.title}
                        </Link>
                        {!completed && (
                          <button
                            onClick={() => markAsCompleted(example.key)}
                            className="ml-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            title="标记完成"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* 操作按钮 */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/examples"
            className="btn-primary px-6 py-3"
          >
            继续学习
          </Link>
        </div>
      </div>
    </div>
  )
}
