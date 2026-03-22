import { Suspense, useState, useEffect } from 'react'
import LoadingSpinner from '../ui/LoadingSpinner'
import ThreeCanvas from '../ThreeCanvas'
import CodeEditor from '../CodeEditor'
import ControlPanel from '../ControlPanel'
import ProgressTracker from '../ui/ProgressTracker'
import ShareButton from '../ui/ShareButton'
import { examplesData } from '../../data/examples'
import { useProgress } from '../../hooks/useProgress'
import BasicCube from '../examples/BasicCube'
import BasicSphere from '../examples/BasicSphere'
import BasicPlane from '../examples/BasicPlane'
import BasicMaterials from '../examples/BasicMaterials'
import LightingDemo from '../examples/LightingDemo'
import AnimationDemo from '../examples/AnimationDemo'
import DirectionalLight from '../examples/DirectionalLight'
import PointLight from '../examples/PointLight'
import MovementAnimation from '../examples/MovementAnimation'
import ScaleAnimation from '../examples/ScaleAnimation'
import TextureDemo from '../examples/TextureDemo'
import RainParticles from '../examples/RainParticles'
import StarField from '../examples/StarField'
import ModelDemo from '../examples/ModelDemo'
import BloomEffect from '../examples/BloomEffect'

// 动态导入组件映射
const componentMap: Record<string, React.ComponentType<any>> = {
  BasicCube,
  BasicSphere,
  BasicPlane,
  BasicMaterials,
  LightingDemo,
  AnimationDemo,
  DirectionalLight,
  PointLight,
  MovementAnimation,
  ScaleAnimation,
  TextureDemo,
  RainParticles,
  StarField,
  ModelDemo,
  BloomEffect,
}

interface ExampleDetailContentProps {
  exampleKey: string
}

export default function ExampleDetailContent({ exampleKey }: ExampleDetailContentProps) {
  const example = examplesData[exampleKey]
  const [code, setCode] = useState(example?.code || '')
  const [controlParams, setControlParams] = useState<any>({})
  const { markAsViewed } = useProgress()

  // 标记示例为已查看
  useEffect(() => {
    if (exampleKey) {
      markAsViewed(exampleKey)
    }
  }, [exampleKey, markAsViewed])

  // 切换示例时同步代码内容，并重置参数状态
  useEffect(() => {
    setCode(example?.code || '')
    setControlParams({})
  }, [exampleKey, example?.code])

  if (!example) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            示例未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            请检查URL或从左侧列表选择一个有效的示例
          </p>
        </div>
      </div>
    )
  }

  const ExampleComponent = componentMap[example.component]

  const handleParametersChange = (params: any) => {
    setControlParams(params)
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部信息 */}
      <div className="card-glass border-0 border-b border-gray-200/30 dark:border-gray-700/30 rounded-none spacing-lg">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-heading-1 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {example.title}
            </h1>
            <p className="text-body">
              {example.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ProgressTracker exampleKey={exampleKey} />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="h-[900px] flex flex-col lg:flex-row overflow-hidden gap-1">
        {/* 3D预览区域 */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative min-h-80 lg:min-h-0 rounded-xl lg:rounded-r-none shadow-inner">
          <Suspense fallback={<LoadingSpinner />}>
            <ThreeCanvas>
              {ExampleComponent && <ExampleComponent {...controlParams} />}
            </ThreeCanvas>
          </Suspense>
          
          {/* 参数控制面板 */}
          {example.controls && (
            <ControlPanel 
              config={example.controls} 
              onParametersChange={handleParametersChange}
            />
          )}
        </div>

        {/* 代码编辑区域 */}
        <div className="w-full lg:w-1/2 card-elevated border-t lg:border-t-0 lg:border-l-0 rounded-xl lg:rounded-l-none flex flex-col min-h-96 lg:min-h-0 overflow-hidden">
          <div className="spacing-md border-b border-gray-200/30 dark:border-gray-700/30 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
            <h2 className="text-heading-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              示例代码
            </h2>
            <ShareButton exampleKey={exampleKey} code={code} />
          </div>
          
          <div className="flex-1 min-h-0 code-editor-container">
            <CodeEditor
              value={code}
              onChange={(value) => setCode(value || '')}
              language="typescript"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
