import { useState } from 'react'
import { ShareIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ShareButtonProps {
  exampleKey: string
  code: string
}

export default function ShareButton({ exampleKey, code }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  // 生成分享链接
  const generateShareUrl = () => {
    const baseUrl = window.location.origin
    const encodedCode = encodeURIComponent(code)
    return `${baseUrl}/examples/${exampleKey}?code=${encodedCode}`
  }

  // 复制到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = () => {
    const shareUrl = generateShareUrl()
    copyToClipboard(shareUrl)
    setShowShareMenu(false)
  }

  const handleCopyCode = () => {
    copyToClipboard(code)
    setShowShareMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="btn-primary hover-lift flex items-center gap-2 px-4 py-2 text-sm"
      >
        <ShareIcon className="w-4 h-4" />
        <span>分享</span>
      </button>

      {showShareMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="btn-ghost hover-lift flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 rounded-xl text-sm font-medium border border-primary-200 dark:border-primary-800 shadow-sm hover:shadow-md"
                title="分享示例"
              >
                <ShareIcon className="w-4 h-4" />
                <span>分享</span>
              </button>
              
              <button
                onClick={handleCopyCode}
                className={`btn-ghost hover-lift flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border shadow-sm hover:shadow-md transition-all duration-200 ${
                  copied 
                    ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
                title="复制代码"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 animate-bounce-gentle" />
                ) : (
                  <ClipboardIcon className="w-4 h-4" />
                )}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 点击外部关闭菜单 */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}
