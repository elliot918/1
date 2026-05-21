'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ShaderAnimationProps {
  className?: string
}

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float elevation =
      sin(pos.x * 2.5 + uTime * 0.4) * 0.07 +
      sin(pos.y * 3.5 + uTime * 0.3) * 0.05 +
      sin((pos.x + pos.y) * 1.8 + uTime * 0.5) * 0.04;
    pos.z += elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float t = smoothstep(-0.07, 0.07, vElevation);
    float pulse = sin(uTime * 0.2) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, t);
    color = mix(color, uColorC, pulse * 0.15);
    float alpha = 0.35 + t * 0.25;
    gl_FragColor = vec4(color, alpha);
  }
`

export function ShaderAnimation({ className }: ShaderAnimationProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = 2.8

    const geometry = new THREE.PlaneGeometry(5, 5, 100, 100)
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime:   { value: 0 },
        uColorA: { value: new THREE.Color('#1A1208') },
        uColorB: { value: new THREE.Color('#251A0A') },
        uColorC: { value: new THREE.Color('#332210') },
      },
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let raf: number
    const tick = () => {
      material.uniforms.uTime.value += 0.008
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} />
}
