import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ExampleTree from '../components/ExampleTree'
import ExampleDetailContent from '../components/ExampleDetailContent'
import ProgressTracker from '../components/ui/ProgressTracker'

export default function ExamplesPage() {
  const { category, id } = useParams<{ category?: string; id?: string }>()
  const navigate = useNavigate()
  const [selectedExample, setSelectedExample] = useState<string | undefined>()

  // 根据URL参数设置选中的示例
  useEffect(() => {
    if (category && id) {
      const exampleKey = `${category}/${id}`
      setSelectedExample(exampleKey)
    }
  }, [category, id])

  const handleExampleSelect = (exampleKey: string) => {
    setSelectedExample(exampleKey)
    navigate(`/examples/${exampleKey}`)
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* 移动端/平板端导航 */}
        <div className="lg:hidden card-glass border-0 border-b border-gray-200/50 dark:border-gray-700/50 rounded-none">
          <div className="spacing-md">
            <h2 className="text-heading-3 mb-4">
              Three.js 示例
            </h2>
            <div className="max-h-48 overflow-y-auto">
              <ExampleTree
                selectedExample={selectedExample}
                onExampleSelect={handleExampleSelect}
                compact={true}
              />
            </div>
          </div>
        </div>

        {/* 桌面端左侧树形导航 */}
        <div className="hidden lg:block w-80 card-glass border-0 border-r border-gray-200/50 dark:border-gray-700/50 rounded-none flex-shrink-0 flex flex-col">
          <div className="spacing-md border-b border-gray-200/30 dark:border-gray-700/30">
            <ProgressTracker showOverall={true} />
          </div>
          <div className="flex-1 overflow-y-auto spacing-sm">
            <ExampleTree
              selectedExample={selectedExample}
              onExampleSelect={handleExampleSelect}
            />
          </div>
        </div>

        {/* 示例详情区域 */}
        <div className="flex-1 overflow-hidden">
          {selectedExample ? (
            <ExampleDetailContent exampleKey={selectedExample} />
          ) : (
            <div className="h-full flex items-center justify-center spacing-md">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 lg:w-28 lg:h-28 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-3xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 lg:w-14 lg:h-14 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-heading-2 mb-3">
                  选择一个示例
                </h3>
                <p className="text-body opacity-75">
                  {window.innerWidth < 1024 ? '从上方列表中选择' : '从左侧列表中选择'}一个Three.js示例来查看详情和代码
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
