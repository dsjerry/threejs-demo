import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useExamplesData } from '../../data/examples'

interface ExampleTreeProps {
  selectedExample?: string
  onExampleSelect: (exampleKey: string) => void
  compact?: boolean
}

interface TreeNode {
  id: string
  title: string
  children?: TreeNode[]
  exampleKey?: string
}

export default function ExampleTree({ selectedExample, onExampleSelect, compact = false }: ExampleTreeProps) {
  const { t } = useTranslation()
  const examplesData = useExamplesData()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['basics', 'materials', 'lighting', 'animation', 'geometry', 'effects', 'interaction', 'shaders', 'particles', 'camera', 'models']))

  const buildTree = (): TreeNode[] => {
    const categories: Record<string, TreeNode> = {}
    
    Object.entries(examplesData).forEach(([key, example]) => {
      const category = example.category
      
      if (!categories[category]) {
        categories[category] = {
          id: category,
          title: t(`categories.${category}`),
          children: []
        }
      }
      
      categories[category].children!.push({
        id: key,
        title: example.title,
        exampleKey: key
      })
    })
    
    return Object.values(categories)
  }

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const renderTreeNode = (node: TreeNode) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const density = compact ? 'px-3 py-2.5' : 'px-4 py-3'
    const indent = compact ? 'ml-1.5' : 'ml-2'

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            flex items-center ${density} cursor-pointer transition-all duration-200 rounded-xl hover-lift group
            ${node.exampleKey === selectedExample 
              ? 'bg-gradient-to-r from-primary-100/90 to-primary-200/70 dark:from-primary-900/35 dark:to-primary-800/25 text-primary-800 dark:text-primary-200 shadow-md border border-primary-200/60 dark:border-primary-800/60' 
              : 'hover:bg-white/60 dark:hover:bg-gray-800/40 hover:shadow-md border border-transparent hover:border-gray-200/60 dark:hover:border-gray-700/60'
            }
            ${hasChildren ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}
          `}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id)
            }
            if (node.exampleKey) {
              onExampleSelect(node.exampleKey)
            }
          }}
        >
          {hasChildren && (
            <span className="mr-3 flex-shrink-0 transition-transform duration-200">
              {isExpanded ? (
                <ChevronDownIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
              )}
            </span>
          )}
          
          {!hasChildren && (
            <span className="mr-3 flex-shrink-0 flex items-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 shadow-sm shadow-primary-500/50 animate-pulse-slow"></div>
            </span>
          )}
          
          <span className="truncate group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
            {node.title}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className={indent}>
            {node.children!.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    )
  }

  const treeData = buildTree()

  return (
    <div className="min-h-0">
      {!compact && (
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white/40 to-white/10 dark:from-slate-900/30 dark:to-transparent backdrop-blur-xl sticky top-0 z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {t('tree.title')}
          </h2>
          <p className="text-caption mt-1">
            {t('tree.hint')}
          </p>
        </div>
      )}

      <div className={compact ? 'p-1.5' : 'p-2'}>
        {treeData.map(node => renderTreeNode(node))}
      </div>
    </div>
  )
}
