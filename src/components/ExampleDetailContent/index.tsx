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
import TorusKnotDemo from '../examples/TorusKnotDemo'
import GlassMaterial from '../examples/GlassMaterial'
import FogEffect from '../examples/FogEffect'
import ClickInteraction from '../examples/ClickInteraction'
import DepthOfFieldEffect from '../examples/DepthOfFieldEffect'
import CustomShader from '../examples/CustomShader'
import FireParticles from '../examples/FireParticles'
import CameraControlsExample from '../examples/CameraControls'

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
  TorusKnotDemo,
  GlassMaterial,
  FogEffect,
  ClickInteraction,
  DepthOfFieldEffect,
  CustomShader,
  FireParticles,
  CameraControls: CameraControlsExample,
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
  const canvasKey = exampleKey
  const disableDefaultOrbit = example.component === 'CameraControls'

  const handleParametersChange = (params: any) => {
    setControlParams(params)
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 背景装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary-400/12 to-indigo-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-400/10 to-primary-500/10 blur-3xl" />
      </div>

      {/* 头部信息 */}
      <div className="flex-shrink-0 nav-glass rounded-none px-4 py-3 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {example.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {example.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ProgressTracker exampleKey={exampleKey} />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden gap-3 p-3 lg:p-4 relative z-10">
        {/* 3D预览区域 */}
        <div
          className="w-full lg:w-1/2 relative min-h-80 lg:min-h-0 rounded-2xl shadow-2xl overflow-hidden border border-white/50 dark:border-gray-700/60"
          style={{
            backgroundImage: 'var(--canvas-bg-light)',
          }}
        >
          <div
            aria-hidden
            className="hidden dark:block absolute inset-0"
            style={{ backgroundImage: 'var(--canvas-bg-dark)' }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-primary-500/10 dark:from-white/5 dark:to-primary-500/10" />
          <Suspense fallback={<LoadingSpinner />}>
            <ThreeCanvas key={canvasKey} enableControls={!disableDefaultOrbit}>
              {ExampleComponent ? <ExampleComponent {...controlParams} /> : null}
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
        <div className="w-full lg:w-1/2 card-elevated flex flex-col min-h-96 lg:min-h-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200/40 dark:border-gray-700/40 flex items-center justify-between bg-gradient-to-r from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl">
            <h2 className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              代码
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
