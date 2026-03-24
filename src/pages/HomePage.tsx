import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* 背景装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-primary-400/25 to-indigo-400/20 blur-3xl" />
        <div className="absolute top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/15 to-primary-400/15 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        {/* Hero Section */}
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 shadow-lg mb-6">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary-500 animate-pulse-slow" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
              交互式示例 · 实时代码 · 进度追踪
            </span>
          </div>

          <h1 className="text-heading-1 mb-6">
            学习 <span className="gradient-text">Three.js</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            从基础到进阶的 Three.js 学习平台，包含交互式示例和实时代码编辑
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/examples"
              className="btn-primary text-lg px-9 py-3.5"
            >
              开始学习
            </Link>
            <a
              href="https://threejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-9 py-3.5"
            >
              Three.js 官网
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-caption">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-900/30 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>暗色模式支持</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-900/30 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              <span>更顺滑的动效</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="card-float p-6 text-left">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              渐进式学习
            </h3>
            <p className="text-caption">
              从基础几何体到复杂场景，循序渐进的学习路径
            </p>
          </div>

          <div className="card-float p-6 text-left">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              实时预览
            </h3>
            <p className="text-caption">
              在线编辑代码，实时查看 3D 效果，即时反馈学习成果
            </p>
          </div>

          <div className="card-float p-6 text-left">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/25 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              丰富示例
            </h3>
            <p className="text-caption">
              涵盖材质、光照、动画、粒子等各个方面的完整示例
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 lg:mt-20">
          <div className="divider mb-10" />
          <h2 className="text-heading-2 text-center mb-10">
            快速开始
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-heading-3 mb-4">
                Three.js 是什么？
              </h3>
              <p className="text-body mb-6">
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
            <div className="card-elevated p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
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
