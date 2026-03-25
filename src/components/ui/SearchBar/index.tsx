import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useExamplesData, TOTAL_EXAMPLES } from '../../../data/examples'

interface SearchBarProps {
  onResultsChange: (results: string[]) => void
  onSearchChange?: (query: string) => void
}

export default function SearchBar({ onResultsChange, onSearchChange }: SearchBarProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const examplesData = useExamplesData()

  // 获取所有类别
  const categories = useMemo(() => {
    const cats = new Set<string>()
    Object.values(examplesData).forEach(example => {
      cats.add(example.category)
    })
    return Array.from(cats)
  }, [examplesData])

  // 搜索和过滤逻辑
  const filteredResults = useMemo(() => {
    let results = Object.keys(examplesData)

    // 按类别过滤
    if (selectedCategory !== 'all') {
      results = results.filter(key => examplesData[key].category === selectedCategory)
    }

    // 按搜索词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(key => {
        const example = examplesData[key]
        return (
          example.title.toLowerCase().includes(query) ||
          example.description.toLowerCase().includes(query) ||
          example.category.toLowerCase().includes(query)
        )
      })
    }

    return results
  }, [searchQuery, selectedCategory, examplesData])

  // 当结果改变时通知父组件
  useMemo(() => {
    onResultsChange(filteredResults)
  }, [filteredResults, onResultsChange])

  // 当搜索词改变时通知父组件
  useMemo(() => {
    if (onSearchChange) {
      onSearchChange(searchQuery)
    }
  }, [searchQuery, onSearchChange])

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const getCategoryTitle = (category: string): string => {
    const categoryKeys: Record<string, string> = {
      basic: 'categories.basics',
      lighting: 'categories.lighting',
      animation: 'categories.animation',
      materials: 'categories.materials',
      particles: 'categories.particles',
      models: 'categories.models',
      effects: 'categories.effects',
      geometry: 'categories.geometry',
      interaction: 'categories.interaction',
      shaders: 'categories.shaders',
      camera: 'categories.camera',
      basics: 'categories.basics'
    }
    return t(categoryKeys[category] || `categories.${category}`)
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-primary-500 dark:text-primary-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="input-primary w-full pl-12 pr-12 py-3 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover-scale"
          >
            <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200" />
          </button>
        )}
      </div>

      {/* 类别过滤器 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover-scale ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700 shadow-sm'
              : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400'
          }`}
        >
          {t('search.all')} ({TOTAL_EXAMPLES})
        </button>

        {categories.map(category => {
          const count = Object.values(examplesData).filter(ex => ex.category === category).length
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover-scale ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700 shadow-sm'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {getCategoryTitle(category)} ({count})
            </button>
          )
        })}
      </div>

      {/* 搜索结果统计 */}
      {searchQuery && (
        <div className="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 rounded-xl border border-primary-200 dark:border-primary-800 text-xs font-medium animate-slide-in-right">
          {t('search.found', { count: filteredResults.length })}
        </div>
      )}
    </div>
  )
}
