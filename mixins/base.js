import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      controls: null
    }
  },
  methods: {
    ...mapMutations(['addItemToGUI']),
    init() {
      this.canvas = this.$refs.webgl

      this.resizing()

      this.createCamera()

      this.createLight()

      this.createControl()

      this.createRenderer()

      this.scrolling()

      this.cursorMoving()
    },
    createLight() {
      const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
      directionalLight.position.set(1, 1, 3)
      this.scene.add(directionalLight)
    },
    createCamera() {
      this.cameraGroup = new THREE.Group()
      this.scene.add(this.cameraGroup)

      this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
      this.camera.position.z = 0.01
      this.cameraGroup.add(this.camera)

      this.gui.add(this.camera.position, 'z').min(-10).max(10).step(0.01)
    },
    resizing() {
      window.addEventListener('resize', () =>
      {
        console.log('resize')
        // Update sizes
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    },
    scrolling() {
      let currentSection = 0

      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY

        const newSection = Math.round(window.scrollY / this.sizes.height)

        if(newSection !== currentSection) {
          currentSection = newSection

          // gsap.to(
          //   this.meshes[currentSection].rotation,
          //   {
          //     duration: 1.5,
          //     ease: 'power2.inOut',
          //     x: '+=5',
          //     y: '+=6',
          //     z: '+=1.5'
          //   }
          // )
        }
      })
    },
    cursorMoving() {
      // window.addEventListener('mousemove', (event) => {
      //   this.cursor.x = (event.clientX / this.sizes.width) - 0.5
      //   this.cursor.y = (event.clientY / this.sizes.height) - 0.5
      // })
    },
    createRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    createControl() {
      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true
    },
    tick() {
      const elapsedTime = this.clock.getElapsedTime()
      const deltaTime = elapsedTime - this.previousTime
      this.previousTime = elapsedTime

      // Scroll
      // this.camera.position.y = - scrollY / this.sizes.height * this.objectsDistance

      // Parallax
      // const  parallaxX = this.cursor.x * 0.5
      // const  parallaxY = - this.cursor.y * 0.5
      // this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 5 * deltaTime
      // this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 5 * deltaTime

      // Animate Meshes
      // for(const mesh of this.meshes) {
      //   mesh.rotation.x += deltaTime * 0.1
      //   mesh.rotation.y += deltaTime * 0.12
      // }

      // Update Control
      if(this.controls) {
        this.controls.update()
      }

      // Render
      this.renderer.render(this.scene, this.camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick)
    }
  },
}
