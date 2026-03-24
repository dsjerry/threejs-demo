import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Group, Mesh } from 'three'

export default function CameraControls() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // 中心旋转
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }

    // 上下浮动
    if (cube1Ref.current) {
      cube1Ref.current.position.y = 1 + Math.sin(time * 1.2) * 0.5
      cube1Ref.current.rotation.y += delta * 0.5
      cube1Ref.current.rotation.x += delta * 0.3
    }

    // 8字形运动
    if (cube2Ref.current) {
      cube2Ref.current.position.x = Math.sin(time * 0.8) * 3
      cube2Ref.current.position.z = Math.sin(time * 1.6) * 1.5
      cube2Ref.current.position.y = 1 + Math.cos(time) * 0.3
      cube2Ref.current.rotation.z += delta * 0.6
    }

    // 圆形轨道
    if (cube3Ref.current) {
      cube3Ref.current.position.x = Math.cos(time * 0.6) * 4
      cube3Ref.current.position.z = Math.sin(time * 0.6) * 4
      cube3Ref.current.position.y = 0.5 + Math.sin(time * 2) * 0.2
      cube3Ref.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />

      {/* 相机控制器 - 启用后可用鼠标拖拽旋转、滚轮缩放、右键平移 */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />

      {/* 场景内容 */}
      <group ref={groupRef}>
        {/* 中心红色方块 */}
        <mesh ref={cube1Ref} position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* 蓝色方块 - 8字形运动 */}
        <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* 绿色方块 - 圆形轨道 */}
        <mesh ref={cube3Ref} position={[4, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#10b981" roughness={0.35} metalness={0.65} />
        </mesh>

        {/* 轨道环 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.05, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
        </mesh>

        {/* 环绕小圆球 */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
              castShadow
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={`hsl(${(i / 8) * 360}, 70%, 60%)`}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
          )
        })}
      </group>

      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* 参考线 */}
      <gridHelper args={[30, 30, '#4b5563', '#374151']} position={[0, 0.01, 0]} />
    </group>
  )
}
