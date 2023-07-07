<template>
  <canvas class="webgl" ref="webgl"/>
</template>

<script>
import * as THREE from 'three'
import base from "~/mixins/base";

export default {
  name: "CanvasContainer",
  mixins: [base],
  data() {
    return {
      canvas: null,
      scene: new THREE.Scene(),
      camera: null,
      cameraGroup: null,
      renderer: null,
      clock: new THREE.Clock(),
      previousTime: 0,
      objectsDistance: 4,
      meshes: [],
      scrollY: window.scrollY,
      cursor: new THREE.Vector2(),
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      parameters: {
        materialColor: '#317ea5'
      }
    }
  },
  mounted() {
    this.init()

    this.createObjects()

    this.createParticles()

    this.tick()
  },
  methods: {
    createParticles() {
      const particlesCount = 200
      const positions = new Float32Array(particlesCount * 3)
      for( let i = 0; i < particlesCount; i++ ) {
        const i3 = i * 3

        positions[i3    ] = (Math.random() - 0.5) * 10
        positions[i3 + 1] = this.objectsDistance * 0.5 - Math.random() * this.objectsDistance * this.meshes.length
        positions[i3 + 2] = (Math.random() - 0.5) * 10
      }
      const particlesGeometry = new THREE.BufferGeometry()
      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )
      const particlesMaterial = new THREE.PointsMaterial({
        color: this.parameters.materialColor,
        sizeAttenuation: true,
        size: 0.03
      })
      const particles = new THREE.Points(particlesGeometry, particlesMaterial)
      this.scene.add(particles)
    },
    createObjects() {
      const material = new THREE.MeshStandardMaterial({
        color: this.parameters.materialColor
      })

      const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.7, 0.4, 16, 60),
        material
      )
      const mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 1.7, 100),
        material
      )
      const mesh3 = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.6, 0.25, 100, 16),
        material
      )
      mesh1.position.y = - this.objectsDistance * 0
      mesh2.position.y = - this.objectsDistance * 1
      mesh3.position.y = - this.objectsDistance * 2

      mesh1.position.x = this.sizes.width * 0.1 / 100
      mesh2.position.x = - this.sizes.width * 0.1 / 100
      mesh3.position.x = this.sizes.width * 0.1 / 100

      this.scene.add(mesh1, mesh2, mesh3)

      this.meshes = [ mesh1, mesh2, mesh3 ]
    }
  },
}
</script>

<style scoped lang="scss">
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
