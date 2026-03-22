import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function TextureDemo() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
    
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.5
      cube1Ref.current.rotation.y += delta * 0.3
    }
    
    if (cube2Ref.current) {
      cube2Ref.current.rotation.x -= delta * 0.3
      cube2Ref.current.rotation.z += delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />
      
      {/* 方向光 */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      {/* 棋盘格纹理立方体 */}
      <mesh ref={cube1Ref} position={[-2, 1, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial>
          <canvasTexture
            attach="map"
            args={[
              (() => {
                const canvas = document.createElement('canvas')
                canvas.width = 256
                canvas.height = 256
                const ctx = canvas.getContext('2d')!
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, 256, 256)
                ctx.fillStyle = '#000000'
                for (let i = 0; i < 8; i++) {
                  for (let j = 0; j < 8; j++) {
                    if ((i + j) % 2 === 0) {
                      ctx.fillRect(i * 32, j * 32, 32, 32)
                    }
                  }
                }
                return canvas
              })()
            ]}
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* 渐变纹理球体 */}
      <mesh ref={cube2Ref} position={[2, 1, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial>
          <canvasTexture
            attach="map"
            args={[
              (() => {
                const canvas = document.createElement('canvas')
                canvas.width = 256
                canvas.height = 256
                const ctx = canvas.getContext('2d')!
                const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
                gradient.addColorStop(0, '#ff6b6b')
                gradient.addColorStop(0.5, '#4ecdc4')
                gradient.addColorStop(1, '#45b7d1')
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, 256, 256)
                return canvas
              })()
            ]}
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* 程序化纹理圆柱体 */}
      <mesh position={[0, 1, 2]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
        <meshStandardMaterial>
          <canvasTexture
            attach="map"
            args={[
              (() => {
                const canvas = document.createElement('canvas')
                canvas.width = 256
                canvas.height = 256
                const ctx = canvas.getContext('2d')!
                ctx.fillStyle = '#2c3e50'
                ctx.fillRect(0, 0, 256, 256)
                ctx.strokeStyle = '#e74c3c'
                ctx.lineWidth = 2
                for (let i = 0; i < 10; i++) {
                  ctx.beginPath()
                  ctx.arc(128, 128, i * 12, 0, Math.PI * 2)
                  ctx.stroke()
                }
                return canvas
              })()
            ]}
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}
