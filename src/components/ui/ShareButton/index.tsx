import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShareIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ShareButtonProps {
  exampleKey: string
  code: string
}

export default function ShareButton({ exampleKey, code }: ShareButtonProps) {
  const { t } = useTranslation()
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
        className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
      >
        <ShareIcon className="w-4 h-4" />
        <span>{t('share.share')}</span>
      </button>

      {showShareMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 z-50 animate-fade-in-scale overflow-hidden">
          <div className="p-2 space-y-1">
            <button
              onClick={handleShare}
              className="w-full btn-ghost hover-lift flex items-center gap-2 px-3 py-2.5 text-sm font-medium"
              title={t('share.shareExample')}
            >
              <ShareIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span>{t('share.shareLink')}</span>
            </button>
            
            <div className="h-px bg-gray-200/50 dark:bg-gray-700/50 my-1" />

            <button
              onClick={handleCopyCode}
              className={`w-full btn-ghost hover-lift flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                copied 
                  ? 'text-green-700 dark:text-green-300 bg-green-50/70 dark:bg-green-900/20'
                  : 'text-gray-700 dark:text-gray-200'
              }`}
              title={t('share.copyCode')}
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 animate-bounce-gentle" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )}
              <span>{copied ? t('share.copied') : t('share.copyCode')}</span>
            </button>
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
