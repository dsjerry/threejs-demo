import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { ReactNode } from 'react'

interface ThreeCanvasProps {
  children?: ReactNode
  showGrid?: boolean
  enableControls?: boolean
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
}

export default function ThreeCanvas({ 
  children, 
  showGrid = true, 
  enableControls = true,
  camera = { position: [0, 0, 5], fov: 75 }
}: ThreeCanvasProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas
        camera={camera}
        gl={{ antialias: true }}
        shadows
      >
        {/* 基础光照 */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* 网格 */}
        {showGrid && (
          <Grid 
            args={[10, 10]} 
            cellSize={1} 
            cellThickness={0.5} 
            cellColor="#6b7280" 
            sectionSize={5} 
            sectionThickness={1} 
            sectionColor="#9ca3af" 
            fadeDistance={25} 
            fadeStrength={1} 
            followCamera={false} 
            infiniteGrid 
          />
        )}
        
        {/* 轨道控制器 */}
        {enableControls && (
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            dampingFactor={0.05}
            enableDamping
          />
        )}
        
        {/* 用户内容 */}
        {children}
      </Canvas>
    </div>
  )
}
