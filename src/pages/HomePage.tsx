import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

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
              {t('pages.home.badge')}
            </span>
          </div>

          <h1 className="text-heading-1 mb-6">
            {t('pages.home.title', { name: 'Three.js' })}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('pages.home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/examples"
              className="btn-primary text-lg px-9 py-3.5"
            >
              {t('pages.home.startLearning')}
            </Link>
            <a
              href="https://threejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-9 py-3.5"
            >
              {t('pages.home.threejsOfficial')}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-caption">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-900/30 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>{t('pages.home.darkMode')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-900/30 backdrop-blur-xl border border-white/50 dark:border-gray-700/40 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              <span>{t('pages.home.smoothAnimations')}</span>
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
              {t('pages.home.features.progressive.title')}
            </h3>
            <p className="text-caption">
              {t('pages.home.features.progressive.desc')}
            </p>
          </div>

          <div className="card-float p-6 text-left">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/20 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('pages.home.features.realtime.title')}
            </h3>
            <p className="text-caption">
              {t('pages.home.features.realtime.desc')}
            </p>
          </div>

          <div className="card-float p-6 text-left">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/25 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {t('pages.home.features.rich.title')}
            </h3>
            <p className="text-caption">
              {t('pages.home.features.rich.desc')}
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 lg:mt-20">
          <div className="divider mb-10" />
          <h2 className="text-heading-2 text-center mb-10">
            {t('pages.home.quickStart')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-heading-3 mb-4">
                {t('pages.home.whatIsThreejs')}
              </h3>
              <p className="text-body mb-6">
                {t('pages.home.threejsIntro')}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  {t('pages.home.benefits.easyApi')}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  {t('pages.home.benefits.crossBrowser')}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  {t('pages.home.benefits.community')}
                </li>
              </ul>
            </div>
            <div className="card-elevated p-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {t('pages.home.firstScene')}
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
