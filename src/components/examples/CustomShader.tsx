import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#6366f1'),
    uColor2: new THREE.Color('#ec4899'),
    uColor3: new THREE.Color('#06b6d4'),
  },
  // 顶点着色器
  `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;

      vec3 newPosition = position;

      // 创建波浪效果
      float elevation = sin(position.x * 3.0 + uTime) * 0.2
                      + sin(position.z * 2.0 + uTime * 1.5) * 0.15
                      + sin((position.x + position.z) * 2.0 + uTime * 0.8) * 0.1;

      newPosition.y += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // 片段着色器
  `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // 基于高度混合颜色
      float t = (vElevation + 0.3) * 1.5;
      vec3 color = mix(uColor3, uColor1, smoothstep(0.0, 0.5, t));
      color = mix(color, uColor2, smoothstep(0.5, 1.0, t));

      // 添加网格效果
      float gridX = abs(sin(vUv.x * 30.0));
      float gridY = abs(sin(vUv.y * 30.0));
      float grid = max(gridX, gridY);
      grid = smoothstep(0.95, 1.0, grid) * 0.3;

      color += grid;

      // 发光边缘
      float edge = 1.0 - smoothstep(0.0, 0.1, min(vUv.x, min(vUv.y, min(1.0 - vUv.x, 1.0 - vUv.y))));
      color += edge * 0.2;

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ WaveShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: any
    }
  }
}

export default function CustomShader() {
  const materialRef = useRef<any>(null!)
  const groupRef = useRef<any>(null!)

  useFrame((_state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  const planeRef = useRef<any>(null!)

  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={1} color="#ec4899" />

      {/* 自定义着色器的平面 */}
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8, 64, 64]} />
        <waveShaderMaterial ref={materialRef} side={THREE.DoubleSide} />
      </mesh>

      {/* 漂浮的球体 */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = 3
        return (
          <FloatingSphere
            key={i}
            index={i}
            angle={angle}
            radius={radius}
            color={['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'][i]}
          />
        )
      })}

      {/* 地面 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  )
}

function FloatingSphere({ index, angle, radius, color }: { index: number; angle: number; radius: number; color: string }) {
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
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}
