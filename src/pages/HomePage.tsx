import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            学习 <span className="text-primary-600">Three.js</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            从基础到进阶的 Three.js 学习平台，包含交互式示例和实时代码编辑
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/examples"
              className="btn-primary text-lg px-8 py-3"
            >
              开始学习
            </Link>
            <a
              href="https://threejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-3"
            >
              Three.js 官网
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              渐进式学习
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              从基础几何体到复杂场景，循序渐进的学习路径
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              实时预览
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              在线编辑代码，实时查看 3D 效果，即时反馈学习成果
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              丰富示例
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              涵盖材质、光照、动画、粒子等各个方面的完整示例
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            快速开始
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Three.js 是什么？
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Three.js 是一个基于 WebGL 的 JavaScript 3D 图形库，让在网页中创建和显示 3D 图形变得简单。
                它提供了丰富的 API 来处理几何体、材质、光照、动画等 3D 图形的各个方面。
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  简单易用的 API
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  跨浏览器兼容
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  活跃的社区支持
                </li>
              </ul>
            </div>
            <div className="card p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                第一个 Three.js 场景
              </h4>
              <div className="code-block">
                <pre className="text-sm">
{`import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建立方体
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 渲染场景
camera.position.z = 5
renderer.render(scene, camera)`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
