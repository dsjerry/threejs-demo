import { useControls } from 'leva'
import { useEffect } from 'react'

export interface ControlConfig {
  [key: string]: any
}

interface ControlPanelProps {
  config?: ControlConfig
  onParametersChange?: (params: any) => void
}

export default function ControlPanel({ config, onParametersChange }: ControlPanelProps) {
  // 默认配置
  const defaultConfig = {
    // 基础控制
    rotationSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    
    // 颜色控制
    color: '#3b82f6',
    
    // 光照控制
    lightIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    
    // 材质控制
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    
    // 动画控制
    enableAnimation: true,
    animationSpeed: { value: 1, min: 0, max: 3, step: 0.1 },
    
    // 场景控制
    showGrid: true,
    enableShadows: true,
  }

  // 使用传入的配置或默认配置
  const finalConfig = config || defaultConfig
  const controls = useControls(finalConfig)

  // 当参数改变时通知父组件
  useEffect(() => {
    if (onParametersChange) {
      onParametersChange(controls)
    }
  }, [controls, onParametersChange])

  return null // Leva 会自动渲染控制面板
}
