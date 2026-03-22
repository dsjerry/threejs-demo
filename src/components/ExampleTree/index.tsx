import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { examplesData } from '../../data/examples'

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

export default function ExampleTree({ selectedExample, onExampleSelect }: ExampleTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['basics', 'materials', 'lighting', 'animation']))

  // 构建树形结构
  const buildTree = (): TreeNode[] => {
    const categories: Record<string, TreeNode> = {}
    
    Object.entries(examplesData).forEach(([key, example]) => {
      const category = example.category
      
      if (!categories[category]) {
        categories[category] = {
          id: category,
          title: getCategoryTitle(category),
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

  const getCategoryTitle = (category: string): string => {
    const titles: Record<string, string> = {
      'basics': '基础示例',
      'materials': '材质系统',
      'lighting': '光照效果',
      'animation': '动画效果'
    }
    return titles[category] || category
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
    const isCategory = !node.exampleKey

    return (
      <div key={node.id} className="select-none">
        <div
          key={node.id}
          className={`
            flex items-center px-4 py-3 cursor-pointer transition-all duration-200 rounded-xl hover-lift group
            ${node.exampleKey === selectedExample 
              ? 'bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-800' 
              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 hover:shadow-sm'
            }
            ${isCategory ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}
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
                <ChevronDownIcon className="w-4 h-4 text-primary-600 dark:text-primary-400 transform rotate-0 transition-transform duration-200" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
              )}
            </span>
          )}
          
          {!hasChildren && (
            <span className="mr-7 flex-shrink-0 flex items-center">
              <div className="w-2 h-2 bg-primary-400 dark:bg-primary-500 rounded-full opacity-60"></div>
            </span>
          )}
          
          <span className="truncate group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">{node.title}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {node.children!.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    )
  }

  const treeData = buildTree()

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          示例列表
        </h2>
      </div>
      
      <div className="p-2">
        {treeData.map(node => renderTreeNode(node))}
      </div>
    </div>
  )
}
