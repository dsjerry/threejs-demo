import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ExampleTree from '../components/ExampleTree'
import ExampleDetailContent from '../components/ExampleDetailContent'

export default function ExamplesPage() {
  const { category, id } = useParams<{ category?: string; id?: string }>()
  const navigate = useNavigate()
  const [selectedExample, setSelectedExample] = useState<string | undefined>()

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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* 背景装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-28 h-80 w-80 rounded-full bg-gradient-to-br from-primary-400/15 to-indigo-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-primary-500/10 blur-3xl" />
      </div>

      {/* 移动端/平板端导航 */}
      <div className="lg:hidden flex-shrink-0 max-h-56 overflow-y-auto nav-glass rounded-none relative z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-3">
              Three.js 示例
            </h2>
            {selectedExample && (
              <button
                className="btn-icon"
                onClick={() => setSelectedExample(undefined)}
                aria-label="清空选择"
                title="清空选择"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-4 max-h-36 overflow-y-auto">
            <ExampleTree
              selectedExample={selectedExample}
              onExampleSelect={handleExampleSelect}
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* 桌面端左侧树形导航 */}
      <div className="hidden lg:flex w-80 xl:w-96 flex-shrink-0 flex-col h-full card-glass border-0 border-r border-gray-200/40 dark:border-gray-700/40 rounded-none relative z-10">
        {/* 示例树列表 - 独立滚动 */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <ExampleTree
            selectedExample={selectedExample}
            onExampleSelect={handleExampleSelect}
          />
        </div>
      </div>

      {/* 示例详情区域 */}
      <div className="flex-1 min-w-0 overflow-hidden relative z-10">
        {selectedExample ? (
          <ExampleDetailContent exampleKey={selectedExample} />
        ) : (
          <div className="h-full flex items-center justify-center p-6 lg:p-10">
            <div className="w-full max-w-2xl">
              <div className="p-8 lg:p-10 text-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <svg
                    className="w-10 h-10 lg:w-12 lg:h-12 text-primary-600 dark:text-primary-400"
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
                <p className="text-body opacity-80 max-w-lg mx-auto">
                  从左侧列表中选择一个示例，即可同时查看 3D 预览与可编辑代码；也可以在进度页标记完成。
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/" className="btn-secondary px-7 py-3">
                    返回首页
                  </Link>
                  <Link to="/progress" className="btn-primary px-7 py-3">
                    查看进度
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <span className="tag tag-primary">预览</span>
                  <span className="tag tag-primary">编辑</span>
                  <span className="tag tag-primary">分享</span>
                  <span className="tag tag-success">追踪</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
