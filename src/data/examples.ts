export interface ExampleData {
  id: string
  title: string
  description: string
  code: string
  component: string
  category: string
  controls?: {
    [key: string]: any
  }
}

export const examplesData: Record<string, ExampleData> = {
  'basic/cube': {
    id: 'cube',
    title: '旋转立方体',
    description: '创建一个简单的旋转立方体，学习基础的几何体、材质和动画',
    category: 'basic',
    component: 'BasicCube',
    controls: {
      rotationSpeed: { value: 0.5, min: 0, max: 3, step: 0.1 },
      scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
      color: '#3b82f6',
      wireframe: false,
      enableAnimation: true,
    },
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export default function BasicCube() {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  )
}`
  },
  'basic/sphere': {
    id: 'sphere',
    title: '球体',
    description: '创建和渲染球体几何，学习不同的材质属性',
    category: 'basic',
    component: 'BasicSphere',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export default function BasicSphere() {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.1} />
    </mesh>
  )
}`
  },
  'basic/plane': {
    id: 'plane',
    title: '平面',
    description: '创建平面几何体，学习基础的平面渲染',
    category: 'basic',
    component: 'BasicPlane',
    code: `import { useRef } from 'react'
import { Mesh } from 'three'

export default function BasicPlane() {
  const meshRef = useRef<Mesh>(null!)

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="#10b981" />
    </mesh>
  )
}`
  },
  'basic/materials': {
    id: 'materials',
    title: '材质',
    description: '探索不同的材质类型和属性',
    category: 'basic',
    component: 'BasicMaterials',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function BasicMaterials() {
  const groupRef = useRef<Group>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[-2, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ef4444" roughness={0.5} metalness={0.5} />
      </mesh>
      
      <mesh position={[2, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#10b981" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}`
  },
  'lighting/ambient': {
    id: 'ambient',
    title: '环境光',
    description: '学习环境光的使用和光照效果',
    category: 'lighting',
    component: 'LightingDemo',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function LightingDemo() {
  const groupRef = useRef<Group>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* 中心球体 */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* 环绕的小球体 */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
              color={\`hsl(\${i * 45}, 70%, 60%)\`} 
              roughness={0.2} 
              metalness={0.8} 
            />
          </mesh>
        )
      })}
      
      {/* 地面 */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* 点光源 */}
      <pointLight 
        position={[0, 3, 0]} 
        intensity={1} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  )
}`
  },
  'animation/rotation': {
    id: 'rotation',
    title: '旋转动画',
    description: '学习各种旋转和运动动画效果',
    category: 'animation',
    component: 'AnimationDemo',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function AnimationDemo() {
  const groupRef = useRef<Group>(null!)
  const cubeRef = useRef<Mesh>(null!)
  const sphereRef = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.5
    }

    if (cubeRef.current) {
      cubeRef.current.position.y = Math.sin(time * 2) * 0.5
      cubeRef.current.rotation.x = time
      cubeRef.current.rotation.z = time * 0.5
    }

    if (sphereRef.current) {
      sphereRef.current.position.x = Math.cos(time * 1.5) * 2
      sphereRef.current.position.z = Math.sin(time * 1.5) * 2
      sphereRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.2)
    }
  })

  return (
    <group ref={groupRef}>
      {/* 中心旋转立方体 */}
      <mesh ref={cubeRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* 轨道运动球体 */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {/* 静态环形 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        )
      })}

      {/* 地面 */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
    </group>
  )
}`
  },
  'lighting/directional': {
    id: 'directional',
    title: '方向光',
    description: '学习方向光的使用和阴影效果',
    category: 'lighting',
    component: 'DirectionalLight',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function DirectionalLight() {
  const groupRef = useRef<Group>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* 方向光 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 环境光 */}
      <ambientLight intensity={0.2} />
      
      {/* 场景物体 */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh position={[2, 1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}`
  },
  'lighting/point': {
    id: 'point',
    title: '点光源',
    description: '学习点光源的动态光照效果',
    category: 'lighting',
    component: 'PointLight',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function PointLight() {
  const lightRef = useRef<Group>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(time) * 3
      lightRef.current.position.z = Math.sin(time) * 3
      lightRef.current.position.y = 2 + Math.sin(time * 2) * 0.5
    }
  })

  return (
    <group>
      {/* 移动的点光源 */}
      <group ref={lightRef}>
        <pointLight intensity={1} distance={10} decay={2} castShadow />
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      </group>
      
      {/* 场景物体 */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* 地面 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}`
  },
  'animation/movement': {
    id: 'movement',
    title: '移动动画',
    description: '学习各种移动轨迹和路径动画',
    category: 'animation',
    component: 'MovementAnimation',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function MovementAnimation() {
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // 线性移动
    if (cube1Ref.current) {
      cube1Ref.current.position.x = Math.sin(time) * 3
    }

    // 圆形轨道
    if (cube2Ref.current) {
      cube2Ref.current.position.x = Math.cos(time * 0.8) * 2
      cube2Ref.current.position.z = Math.sin(time * 0.8) * 2
      cube2Ref.current.position.y = 1 + Math.sin(time * 2) * 0.5
    }

    // 8字形轨道
    if (cube3Ref.current) {
      cube3Ref.current.position.x = Math.sin(time * 0.6) * 2.5
      cube3Ref.current.position.z = Math.sin(time * 1.2) * 1.5
      cube3Ref.current.rotation.y = time * 2
    }
  })

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      <mesh ref={cube1Ref} position={[0, 1, 2]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      <mesh ref={cube3Ref} position={[0, 0.5, -2]} castShadow>
        <coneGeometry args={[0.4, 1, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}`
  },
  'animation/scale': {
    id: 'scale',
    title: '缩放动画',
    description: '学习各种缩放和变形动画效果',
    category: 'animation',
    component: 'ScaleAnimation',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function ScaleAnimation() {
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // 均匀缩放
    if (cube1Ref.current) {
      const scale = 1 + Math.sin(time * 2) * 0.5
      cube1Ref.current.scale.setScalar(scale)
    }

    // 非均匀缩放
    if (cube2Ref.current) {
      cube2Ref.current.scale.x = 1 + Math.sin(time * 1.5) * 0.8
      cube2Ref.current.scale.y = 1 + Math.cos(time * 2) * 0.6
      cube2Ref.current.scale.z = 1 + Math.sin(time * 1.2) * 0.4
    }

    // 脉冲效果
    if (cube3Ref.current) {
      const pulse = Math.abs(Math.sin(time * 4))
      cube3Ref.current.scale.setScalar(0.5 + pulse * 1.5)
      cube3Ref.current.rotation.y = time * 2
    }
  })

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      <mesh ref={cube1Ref} position={[-3, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      <mesh ref={cube3Ref} position={[3, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}`
  },
  'materials/texture': {
    id: 'texture',
    title: '纹理贴图',
    description: '学习程序化纹理的创建和应用',
    category: 'materials',
    component: 'TextureDemo',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function TextureDemo() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      
      {/* 棋盘格纹理立方体 */}
      <mesh ref={cube1Ref} position={[-2, 1, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* 渐变纹理球体 */}
      <mesh ref={cube2Ref} position={[2, 1, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}`
  },
  'particles/rain': {
    id: 'rain',
    title: '雨滴粒子',
    description: '创建逼真的雨滴粒子系统效果',
    category: 'particles',
    component: 'RainParticles',
    controls: {
      particleCount: { value: 1000, min: 100, max: 3000, step: 100 },
      speed: { value: 2, min: 0.5, max: 5, step: 0.1 },
      area: { value: 20, min: 10, max: 50, step: 1 },
      color: '#87ceeb',
      size: { value: 0.1, min: 0.05, max: 0.5, step: 0.01 },
    },
    code: `import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

export default function RainParticles({
  particleCount = 1000,
  speed = 2,
  area = 20,
  color = '#87ceeb',
  size = 0.1
}) {
  const pointsRef = useRef()
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * area
      positions[i3 + 1] = Math.random() * area
      positions[i3 + 2] = (Math.random() - 0.5) * area
      velocities[i] = Math.random() * 0.5 + 0.5
    }
    
    return { positions, velocities }
  }, [particleCount, area])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] -= velocities[i] * speed * delta
        
        if (positions[i3 + 1] < -area / 2) {
          positions[i3 + 1] = area / 2
          positions[i3] = (Math.random() - 0.5) * area
          positions[i3 + 2] = (Math.random() - 0.5) * area
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} color="#b0c4de" />
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      <mesh position={[0, -area / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[area, area]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
    </group>
  )
}`
  },
  'particles/stars': {
    id: 'stars',
    title: '星空粒子',
    description: '创建美丽的星空和星云效果',
    category: 'particles',
    component: 'StarField',
    controls: {
      starCount: { value: 2000, min: 500, max: 5000, step: 100 },
      radius: { value: 50, min: 20, max: 100, step: 5 },
      twinkleSpeed: { value: 1, min: 0.1, max: 3, step: 0.1 },
      starSize: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
      color: '#ffffff',
    },
    code: `import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

export default function StarField({
  starCount = 2000,
  radius = 50,
  twinkleSpeed = 1,
  starSize = 0.5,
  color = '#ffffff'
}) {
  const pointsRef = useRef()
  
  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      const r = Math.random() * radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
    }
    
    return positions
  }, [starCount, radius])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime * twinkleSpeed
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = time * 0.02
    }
  })

  return (
    <group>
      <color attach="background" args={['#000011']} />
      <ambientLight intensity={0.1} />
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={starSize}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
        />
      </points>
    </group>
  )
}`
  },
  'models/demo': {
    id: 'demo',
    title: '3D模型展示',
    description: '展示复杂3D几何体组合和材质效果',
    category: 'models',
    component: 'ModelDemo',
    controls: {
      rotationSpeed: { value: 0.5, min: 0, max: 2, step: 0.1 },
      scale: { value: 1, min: 0.5, max: 2, step: 0.1 },
      showWireframe: false,
      modelColor: '#4a90e2',
      lightIntensity: { value: 1, min: 0.1, max: 3, step: 0.1 },
    },
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function ModelDemo({
  rotationSpeed = 0.5,
  scale = 1,
  showWireframe = false,
  modelColor = '#4a90e2',
  lightIntensity = 1
}) {
  const groupRef = useRef()
  const torusRef = useRef()
  const sphereRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.3
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * rotationSpeed
      torusRef.current.rotation.z += delta * rotationSpeed * 0.5
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={lightIntensity}
        castShadow
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff6b6b" />
      
      {/* 中心球体 */}
      <mesh ref={sphereRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={modelColor} 
          wireframe={showWireframe}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* 环绕的圆环 */}
      <group ref={torusRef}>
        <mesh position={[3, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color="#e74c3c" 
            wireframe={showWireframe}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        <mesh position={[-3, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color="#2ecc71" 
            wireframe={showWireframe}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
      
      {/* 地面 */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#34495e" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  )
}`
  },
  'effects/bloom': {
    id: 'bloom',
    title: '辉光效果',
    description: '使用后处理创建美丽的辉光和发光效果',
    category: 'effects',
    component: 'BloomEffect',
    controls: {
      bloomIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
      bloomRadius: { value: 0.4, min: 0.1, max: 1, step: 0.05 },
      rotationSpeed: { value: 0.5, min: 0, max: 2, step: 0.1 },
      lightIntensity: { value: 2, min: 0.5, max: 5, step: 0.1 },
      enableBloom: true,
    },
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { Group, Mesh } from 'three'

export default function BloomEffect({
  bloomIntensity = 1.5,
  bloomRadius = 0.4,
  rotationSpeed = 0.5,
  lightIntensity = 2,
  enableBloom = true
}) {
  const groupRef = useRef()
  const sphere1Ref = useRef()
  const sphere2Ref = useRef()
  const sphere3Ref = useRef()

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.2
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.cos(time) * 3
      sphere1Ref.current.position.z = Math.sin(time) * 3
      sphere1Ref.current.rotation.y += delta * rotationSpeed
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time + Math.PI * 2/3) * 3
      sphere2Ref.current.position.z = Math.sin(time + Math.PI * 2/3) * 3
      sphere2Ref.current.rotation.x += delta * rotationSpeed
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.cos(time + Math.PI * 4/3) * 3
      sphere3Ref.current.position.z = Math.sin(time + Math.PI * 4/3) * 3
      sphere3Ref.current.rotation.z += delta * rotationSpeed
    }
  })

  return (
    <group>
      <group ref={groupRef}>
        <ambientLight intensity={0.1} />
        
        {/* 中心发光球体 */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity} color="#ffffff" />
        </mesh>

        {/* 轨道发光球体 */}
        <mesh ref={sphere1Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ff6b6b" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#ff6b6b" />
        </mesh>

        <mesh ref={sphere2Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#4ecdc4" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#4ecdc4" />
        </mesh>

        <mesh ref={sphere3Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffe66d" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity * 0.8} color="#ffe66d" />
        </mesh>
      </group>

      {/* 后处理效果 */}
      {enableBloom && (
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            radius={bloomRadius}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <ToneMapping adaptive={false} />
        </EffectComposer>
      )}
    </group>
  )
}`
  }
}
