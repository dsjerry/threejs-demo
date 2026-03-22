import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

interface ModelDemoProps {
  rotationSpeed?: number
  scale?: number
  showWireframe?: boolean
  modelColor?: string
  lightIntensity?: number
}

export default function ModelDemo({
  rotationSpeed = 0.5,
  scale = 1,
  showWireframe = false,
  modelColor = '#4a90e2',
  lightIntensity = 1
}: ModelDemoProps) {
  const groupRef = useRef<Group>(null!)
  const torusRef = useRef<Group>(null!)
  const sphereRef = useRef<Group>(null!)

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
      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      
      {/* 主光源 */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={lightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 补光 */}
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
        
        <mesh position={[0, 0, 3]} castShadow receiveShadow>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color="#f39c12" 
            wireframe={showWireframe}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        <mesh position={[0, 0, -3]} castShadow receiveShadow>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color="#9b59b6" 
            wireframe={showWireframe}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
      
      {/* 复杂几何体组合 */}
      <group position={[0, 3, 0]}>
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#1abc9c" 
            wireframe={showWireframe}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </group>
      
      <group position={[0, -3, 0]}>
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#e67e22" 
            wireframe={showWireframe}
            roughness={0.4}
            metalness={0.6}
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
}
