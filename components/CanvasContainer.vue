<template>
  <canvas ref="webgl" class="webgl" />
</template>

<script>
import * as THREE from 'three'
import * as dat from 'lil-gui'
import base from '@/mixins/base'
import loaders from '@/mixins/loaders'
import loading from "@/mixins/loading"
import firstSection from '@/mixins/firstSection'
import secondSection from "@/mixins/secondSection"

export default {
  name: 'CanvasContainer',
  mixins: [base, firstSection, secondSection, loaders, loading],
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
      scrollY: window.scrollY,
      cursor: new THREE.Vector2(),
      tars: {},
      earth: null,
      overlayMaterial: null,
      secondSection: new THREE.Group(),
      spaceCraft: null,
      planets: new THREE.Group(),
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      parameters: {
        materialColor: '#317ea5'
      },
      gui: new dat.GUI()
    }
  },
  mounted() {
    this.init()

    this.setOverlay()

    this.loadModels()

    this.createFirstSection()

    this.createParticles()

    this.tick()
  },
  methods: {
    createParticles() {
      const particlesCount = 200
      const positions = new Float32Array(particlesCount * 3)
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3

        positions[i3] = (Math.random() - 0.5) * 10
        // positions[i3 + 1] = this.objectsDistance * 0.5 - Math.random() * this.objectsDistance * this.meshes.length
        positions[i3 + 1] =
          this.objectsDistance * 0.5 - Math.random() * this.objectsDistance * 3
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
    }
  }
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
