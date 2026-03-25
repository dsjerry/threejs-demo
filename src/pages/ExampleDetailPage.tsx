import { useParams } from 'react-router-dom'
import { Suspense, useState } from 'react'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ThreeCanvas from '../components/ThreeCanvas'
import CodeEditor from '../components/CodeEditor'
import { rawExamplesData, useExamplesData } from '../data/examples'
import BasicCube from '../components/examples/BasicCube'
import BasicSphere from '../components/examples/BasicSphere'
import BasicPlane from '../components/examples/BasicPlane'
import BasicMaterials from '../components/examples/BasicMaterials'
import LightingDemo from '../components/examples/LightingDemo'
import AnimationDemo from '../components/examples/AnimationDemo'

// 动态导入组件映射
const componentMap: Record<string, React.ComponentType> = {
  BasicCube,
  BasicSphere,
  BasicPlane,
  BasicMaterials,
  LightingDemo,
  AnimationDemo,
}

export default function ExampleDetailPage() {
  const { category, id } = useParams<{ category: string; id: string }>()
  const exampleKey = `${category}/${id}`
  const exampleBase = rawExamplesData[exampleKey]
  const examplesData = useExamplesData()
  const example = examplesData[exampleKey]

  const [code, setCode] = useState(exampleBase?.code || '')

  if (!exampleBase) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            示例未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            请检查URL或返回示例列表
          </p>
        </div>
      </div>
    )
  }

  const ExampleComponent = componentMap[example.component]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {example.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            分类: {category} | {example.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D 预览区域 */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3D 预览
            </h2>
            <div className="aspect-square">
              <Suspense fallback={<LoadingSpinner />}>
                <ThreeCanvas>
                  {ExampleComponent && <ExampleComponent />}
                </ThreeCanvas>
              </Suspense>
            </div>
          </div>

          {/* 代码编辑器区域 */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              代码编辑器
            </h2>
            <CodeEditor
              value={code}
              onChange={(value) => setCode(value || '')}
              language="typescript"
              height="400px"
            />
          </div>
        </div>

        {/* 说明文档 */}
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            示例说明
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {example.description}
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              学习要点
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-1">
              {example.id === 'cube' && (
                <>
                  <li>• 创建基础的立方体几何体 (BoxGeometry)</li>
                  <li>• 使用标准材质 (MeshStandardMaterial)</li>
                  <li>• 实现旋转动画 (useFrame hook)</li>
                  <li>• 启用阴影效果 (castShadow, receiveShadow)</li>
                </>
              )}
              {example.id === 'sphere' && (
                <>
                  <li>• 创建球体几何体 (SphereGeometry)</li>
                  <li>• 调整材质的粗糙度和金属度</li>
                  <li>• 实现上下浮动动画</li>
                  <li>• 使用时间函数创建平滑动画</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
