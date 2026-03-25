import { useTranslation } from 'react-i18next'

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

const rawExamplesData: Record<string, Omit<ExampleData, 'title' | 'description'>> = {
  'basics/cube': {
    id: 'cube',
    category: 'basics',
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
  'basics/sphere': {
    id: 'sphere',
    category: 'basics',
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
  'basics/plane': {
    id: 'plane',
    category: 'basics',
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
  'basics/materials': {
    id: 'materials',
    category: 'basics',
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
  'lighting/demo': {
    id: 'demo',
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
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>
      
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
      
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
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
  'animation/demo': {
    id: 'rotation',
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
      <mesh ref={cubeRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

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
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <ambientLight intensity={0.2} />
      
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh position={[2, 1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
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
      <group ref={lightRef}>
        <pointLight intensity={1} distance={10} decay={2} castShadow />
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      </group>
      
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
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

    if (cube1Ref.current) {
      cube1Ref.current.position.x = Math.sin(time) * 3
    }

    if (cube2Ref.current) {
      cube2Ref.current.position.x = Math.cos(time * 0.8) * 2
      cube2Ref.current.position.z = Math.sin(time * 0.8) * 2
      cube2Ref.current.position.y = 1 + Math.sin(time * 2) * 0.5
    }

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

    if (cube1Ref.current) {
      const scale = 1 + Math.sin(time * 2) * 0.5
      cube1Ref.current.scale.setScalar(scale)
    }

    if (cube2Ref.current) {
      cube2Ref.current.scale.x = 1 + Math.sin(time * 1.5) * 0.8
      cube2Ref.current.scale.y = 1 + Math.cos(time * 2) * 0.6
      cube2Ref.current.scale.z = 1 + Math.sin(time * 1.2) * 0.4
    }

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
      
      <mesh ref={cube1Ref} position={[-2, 1, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
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
      
      <mesh ref={sphereRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={modelColor} 
          wireframe={showWireframe}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
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
        
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight position={[0, 0, 0]} intensity={lightIntensity} color="#ffffff" />
        </mesh>

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
  },
  'geometry/torusKnot': {
    id: 'torusKnot',
    category: 'geometry',
    component: 'TorusKnotDemo',
    controls: {
      rotationSpeed: { value: 0.5, min: 0, max: 2, step: 0.1 },
      scale: { value: 1, min: 0.5, max: 2, step: 0.1 },
    },
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function TorusKnotDemo() {
  const groupRef = useRef<Group>(null!)
  const knot1Ref = useRef<any>(null!)
  const knot2Ref = useRef<any>(null!)
  const knot3Ref = useRef<any>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }

    if (knot1Ref.current) {
      knot1Ref.current.rotation.x += delta * 0.3
      knot1Ref.current.rotation.z += delta * 0.2
    }

    if (knot2Ref.current) {
      knot2Ref.current.position.y = Math.sin(time * 1.5) * 0.5
      knot2Ref.current.rotation.x = time * 0.8
      knot2Ref.current.rotation.z = time * 0.6
    }

    if (knot3Ref.current) {
      knot3Ref.current.rotation.y -= delta * 0.5
      knot3Ref.current.rotation.x -= delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4ecdc4" />

      <mesh ref={knot1Ref} position={[-4, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <meshStandardMaterial color="#e74c3c" roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh ref={knot2Ref} position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={knot3Ref} position={[4, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.6, 0.08, 200, 32, 3, 5]} />
        <meshStandardMaterial color="#10b981" roughness={0.4} metalness={0.6} />
      </mesh>

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
    </group>
  )
}`
  },
  'materials/glass': {
    id: 'glass',
    category: 'materials',
    component: 'GlassMaterial',
    controls: {
      transmission: { value: 0.95, min: 0, max: 1, step: 0.05 },
      roughness: { value: 0, min: 0, max: 1, step: 0.05 },
      ior: { value: 1.5, min: 1, max: 2.5, step: 0.1 },
    },
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export default function GlassMaterial() {
  const groupRef = useRef<Group>(null!)
  const sphere1Ref = useRef<any>(null!)
  const sphere2Ref = useRef<any>(null!)
  const sphere3Ref = useRef<any>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.y += delta * 0.5
      sphere1Ref.current.rotation.x += delta * 0.3
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = 1 + Math.sin(time * 1.2) * 0.3
      sphere2Ref.current.rotation.y -= delta * 0.4
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.rotation.z += delta * 0.6
      sphere3Ref.current.rotation.x -= delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#ff6b6b" />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#4ecdc4" />

      <mesh ref={sphere1Ref} position={[-2.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={0.95}
          thickness={1.5}
          ior={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={sphere2Ref} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#4ecdc4"
          metalness={0}
          roughness={0}
          transmission={0.9}
          thickness={2}
          ior={1.4}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={sphere3Ref} position={[2.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial
          color="#ff6b6b"
          metalness={0}
          roughness={0}
          transmission={0.92}
          thickness={1.8}
          ior={1.6}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} />
      </mesh>

      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#4a5568" metalness={1} roughness={0} />
      </mesh>
    </group>
  )
}`
  },
  'effects/fog': {
    id: 'fog',
    category: 'effects',
    component: 'FogEffect',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function FogEffect() {
  const groupRef = useRef<Group>(null!)
  const cube1Ref = useRef<Mesh>(null!)
  const cube2Ref = useRef<Mesh>(null!)
  const cube3Ref = useRef<Mesh>(null!)
  const cube4Ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }

    if (cube1Ref.current) {
      cube1Ref.current.position.y = 0.5 + Math.sin(time * 0.8) * 0.3
      cube1Ref.current.rotation.y += delta * 0.3
    }

    if (cube2Ref.current) {
      cube2Ref.current.position.y = 0.5 + Math.sin(time * 1.2 + 1) * 0.4
      cube2Ref.current.rotation.x += delta * 0.4
    }

    if (cube3Ref.current) {
      cube3Ref.current.position.y = 0.5 + Math.sin(time * 1.5 + 2) * 0.35
      cube3Ref.current.rotation.z += delta * 0.35
    }

    if (cube4Ref.current) {
      cube4Ref.current.position.y = 0.5 + Math.sin(time * 1 + 3) * 0.25
      cube4Ref.current.rotation.y -= delta * 0.25
    }
  })

  return (
    <group>
      <fog attach="fog" args={['#1a1a2e', 5, 25]} />

      <group ref={groupRef}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />

        <mesh ref={cube1Ref} position={[-2, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh ref={cube2Ref} position={[0, 0.5, -2]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={cube3Ref} position={[2, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.35} metalness={0.65} />
        </mesh>

        <mesh ref={cube4Ref} position={[0, 0.5, -6]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.45} metalness={0.55} />
        </mesh>

        {[...Array(6)].map((_, i) => (
          <mesh
            key={\`far-\${i}\`}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 8,
              0.5,
              Math.sin((i / 6) * Math.PI * 2) * 8 - 5
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.3, 0.3, 1.5]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.6} />
          </mesh>
        ))}

        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1e1e2e" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}`
  },
  'interaction/click': {
    id: 'click',
    category: 'interaction',
    component: 'ClickInteraction',
    code: `import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

export default function ClickInteraction() {
  const groupRef = useRef<Group>(null!)
  const [clickedCubes, setClickedCubes] = useState<Set<number>>(new Set())
  const [hoveredCube, setHoveredCube] = useState<number | null>(null)

  const cubeColors = [
    { base: '#ef4444', hover: '#fca5a5', clicked: '#7f1d1d' },
    { base: '#3b82f6', hover: '#93c5fd', clicked: '#1e3a8a' },
    { base: '#10b981', hover: '#6ee7b7', clicked: '#064e3b' },
    { base: '#f59e0b', hover: '#fcd34d', clicked: '#78350f' },
    { base: '#8b5cf6', hover: '#c4b5fd', clicked: '#4c1d95' },
    { base: '#ec4899', hover: '#f9a8d4', clicked: '#831843' },
  ]

  const handleCubeClick = (index: number) => {
    setClickedCubes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />

      {[...Array(6)].map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const x = (col - 1) * 2.5
        const z = (row - 0.5) * 2.5
        const isClicked = clickedCubes.has(i)
        const isHovered = hoveredCube === i
        const color = cubeColors[i]

        return (
          <mesh
            key={i}
            position={[x, 0.8, z]}
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation()
              handleCubeClick(i)
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHoveredCube(i)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHoveredCube(null)
              document.body.style.cursor = 'auto'
            }}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={isClicked ? color.clicked : isHovered ? color.hover : color.base}
              roughness={0.4}
              metalness={0.6}
              emissive={isClicked ? color.base : isHovered ? color.base : '#000000'}
              emissiveIntensity={isClicked ? 0.3 : isHovered ? 0.15 : 0}
            />
          </mesh>
        )
      })}

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  )
}`
  },
  'effects/depthOfField': {
    id: 'depthOfField',
    category: 'effects',
    component: 'DepthOfFieldEffect',
    code: `import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { Group } from 'three'

export default function DepthOfFieldEffect() {
  const groupRef = useRef<Group>(null!)
  const sphere1Ref = useRef<any>(null!)
  const sphere2Ref = useRef<any>(null!)
  const sphere3Ref = useRef<any>(null!)
  const sphere4Ref = useRef<any>(null!)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.1 * 0.1
    }

    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.cos(time * 0.5) * 5
      sphere1Ref.current.position.z = Math.sin(time * 0.5) * 5
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time * 0.5 + Math.PI) * 5
      sphere2Ref.current.position.z = Math.sin(time * 0.5 + Math.PI) * 5
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(time) * 0.5
      sphere3Ref.current.position.x = Math.cos(time * 1.5) * 2
      sphere3Ref.current.position.z = Math.sin(time * 1.5) * 2
    }

    if (sphere4Ref.current) {
      sphere4Ref.current.position.y = 1.5
      sphere4Ref.current.rotation.y += 0.2
    }
  })

  return (
    <group>
      <group ref={groupRef}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

        <mesh ref={sphere4Ref} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
          <pointLight intensity={1.5} color="#ffffff" />
        </mesh>

        <mesh ref={sphere1Ref} position={[5, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={sphere2Ref} position={[-5, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4ecdc4" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={sphere3Ref} position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ffe66d" roughness={0.2} metalness={0.8} />
        </mesh>

        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 7
          const z = Math.sin(angle) * 7
          return (
            <mesh key={i} position={[x, -1, z]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 3]} />
              <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.6} />
            </mesh>
          )
        })}

        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
        </mesh>
      </group>

      <EffectComposer>
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={8} />
        <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
        <Vignette darkness={0.5} offset={0.3} />
        <ToneMapping adaptive={false} />
      </EffectComposer>
    </group>
  )
}`
  },
  'shaders/custom': {
    id: 'customShader',
    category: 'shaders',
    component: 'CustomShader',
    code: `import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const WaveShaderMaterial = shaderMaterial(
  { uTime: 0, uColor1: new THREE.Color('#6366f1'), uColor2: new THREE.Color('#ec4899'), uColor3: new THREE.Color('#06b6d4') },
  \`
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 newPosition = position;
      float elevation = sin(position.x * 3.0 + uTime) * 0.2
                      + sin(position.z * 2.0 + uTime * 1.5) * 0.15
                      + sin((position.x + position.z) * 2.0 + uTime * 0.8) * 0.1;
      newPosition.y += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  \`,
  \`
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float t = (vElevation + 0.3) * 1.5;
      vec3 color = mix(uColor3, uColor1, smoothstep(0.0, 0.5, t));
      color = mix(color, uColor2, smoothstep(0.5, 1.0, t));
      float gridX = abs(sin(vUv.x * 30.0));
      float gridY = abs(sin(vUv.y * 30.0));
      float grid = max(gridX, gridY);
      grid = smoothstep(0.95, 1.0, grid) * 0.3;
      color += grid;
      float edge = 1.0 - smoothstep(0.0, 0.1, min(vUv.x, min(vUv.y, min(1.0 - vUv.x, 1.0 - vUv.y))));
      color += edge * 0.2;
      gl_FragColor = vec4(color, 1.0);
    }
  \`
)

extend({ WaveShaderMaterial })

export default function CustomShader() {
  const groupRef = useRef<any>(null!)
  const materialRef = useRef<any>(null!)
  const planeRef = useRef<any>(null!)

  useFrame((state, delta) => {
    if (materialRef.current) materialRef.current.uTime += delta
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
    if (planeRef.current) planeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - 0.5
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#ec4899" />

      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8, 64, 64]} />
        <waveShaderMaterial ref={materialRef} side={THREE.DoubleSide} />
      </mesh>

      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = 3
        return (
          <mesh key={i} castShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color={['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][i]}
              emissive={['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][i]}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.8}
            />
            <FloatSphere angle={angle} radius={radius} index={i} />
          </mesh>
        )
      })}

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  )
}

function FloatSphere({ angle, radius, index }: { angle: number; radius: number; index: number }) {
  const meshRef = useRef<any>(null!)
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const speed = 0.5 + index * 0.1
      meshRef.current.position.x = Math.cos(angle + time * speed) * radius
      meshRef.current.position.z = Math.sin(angle + time * speed) * radius
      meshRef.current.position.y = Math.sin(time * (1 + index * 0.2) + index) * 0.5
      meshRef.current.rotation.y += 0.02
    }
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][index]}
        emissive={['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][index]}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}`
  },
  'particles/fire': {
    id: 'fire',
    category: 'particles',
    component: 'FireParticles',
    code: `import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FireParticles() {
  const pointsRef = useRef<any>(null!)
  const lightRef = useRef<any>(null!)
  const particleCount = 500

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.5
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.random() * 3
      positions[i3 + 2] = Math.sin(angle) * radius

      const heightFactor = Math.random()
      if (heightFactor < 0.3) {
        colors[i3] = 1.0; colors[i3 + 1] = 0.1; colors[i3 + 2] = 0.0
      } else if (heightFactor < 0.6) {
        colors[i3] = 1.0; colors[i3 + 1] = 0.4 + Math.random() * 0.3; colors[i3 + 2] = 0.0
      } else if (heightFactor < 0.9) {
        colors[i3] = 1.0; colors[i3 + 1] = 0.7 + Math.random() * 0.3; colors[i3 + 2] = 0.0
      } else {
        colors[i3] = 1.0; colors[i3 + 1] = 1.0; colors[i3 + 2] = 0.8 + Math.random() * 0.2
      }

      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = 0.02 + Math.random() * 0.03
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return { positions, colors, velocities }
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const colors = pointsRef.current.geometry.attributes.color.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime * 5 + i) * 0.002
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2] + Math.cos(state.clock.elapsedTime * 5 + i) * 0.002

        if (positions[i3 + 1] > 3.5) {
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * 0.5
          positions[i3] = Math.cos(angle) * radius
          positions[i3 + 1] = 0
          positions[i3 + 2] = Math.sin(angle) * radius

          const heightFactor = Math.random()
          if (heightFactor < 0.3) {
            colors[i3] = 1.0; colors[i3 + 1] = 0.1; colors[i3 + 2] = 0.0
          } else if (heightFactor < 0.6) {
            colors[i3] = 1.0; colors[i3 + 1] = 0.4 + Math.random() * 0.3; colors[i3 + 2] = 0.0
          } else if (heightFactor < 0.9) {
            colors[i3] = 1.0; colors[i3 + 1] = 0.7 + Math.random() * 0.3; colors[i3 + 2] = 0.0
          } else {
            colors[i3] = 1.0; colors[i3 + 1] = 1.0; colors[i3 + 2] = 0.8 + Math.random() * 0.2
          }
        }

        const fadeOut = 1.0 - (positions[i3 + 1] / 3.5)
        colors[i3] = colors[i3] * fadeOut + 0.5 * (1 - fadeOut)
        colors[i3 + 1] = colors[i3 + 1] * fadeOut + 0.5 * (1 - fadeOut)
        colors[i3 + 2] = colors[i3 + 2] * fadeOut + 0.3 * (1 - fadeOut)
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.geometry.attributes.color.needsUpdate = true
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.5
    }
  })

  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} position={[0, 1, 0]} intensity={2} color="#ff6b00" distance={10} decay={2} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} blending={2} depthWrite={false} />
      </points>

      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.6, 32]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffaa00" />
        <pointLight intensity={1.5} color="#ff6600" distance={5} />
      </mesh>

      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </group>
  )
}`
  },
  'camera/controls': {
    id: 'cameraControls',
    category: 'camera',
    component: 'CameraControls',
    code: `import { useRef } from 'react'
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

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }

    if (cube1Ref.current) {
      cube1Ref.current.position.y = 1 + Math.sin(time * 1.2) * 0.5
      cube1Ref.current.rotation.y += delta * 0.5
      cube1Ref.current.rotation.x += delta * 0.3
    }

    if (cube2Ref.current) {
      cube2Ref.current.position.x = Math.sin(time * 0.8) * 3
      cube2Ref.current.position.z = Math.sin(time * 1.6) * 1.5
      cube2Ref.current.position.y = 1 + Math.cos(time) * 0.3
      cube2Ref.current.rotation.z += delta * 0.6
    }

    if (cube3Ref.current) {
      cube3Ref.current.position.x = Math.cos(time * 0.6) * 4
      cube3Ref.current.position.z = Math.sin(time * 0.6) * 4
      cube3Ref.current.position.y = 0.5 + Math.sin(time * 2) * 0.2
      cube3Ref.current.rotation.y += delta * 0.8
    }
  })

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={3} maxDistance={20} maxPolarAngle={Math.PI / 2 + 0.1} />

      <group ref={groupRef}>
        <mesh ref={cube1Ref} position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.7} />
        </mesh>

        <mesh ref={cube2Ref} position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh ref={cube3Ref} position={[4, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#10b981" roughness={0.35} metalness={0.65} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.05, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
        </mesh>

        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 2
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color={\`hsl(\${(i / 8) * 360}, 70%, 60%)\`} roughness={0.3} metalness={0.7} />
            </mesh>
          )
        })}
      </group>

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.2} />
      </mesh>

      <gridHelper args={[30, 30, '#4b5563', '#374151']} position={[0, 0.01, 0]} />
    </group>
  )
}`
  }
}

export function useExamplesData(): Record<string, ExampleData> {
  const { t } = useTranslation()
  
  const examplesData: Record<string, ExampleData> = {}
  
  Object.entries(rawExamplesData).forEach(([key, data]) => {
    const translationKey = key.replace('/', '.')
    examplesData[key] = {
      ...data,
      title: t(`examples.${translationKey}.title`),
      description: t(`examples.${translationKey}.description`)
    }
  })
  
  return examplesData
}

export { rawExamplesData }

export const TOTAL_EXAMPLES = Object.keys(rawExamplesData).length

export const getExampleKeys = (): string[] => Object.keys(rawExamplesData)
