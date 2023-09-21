import { mapState } from "vuex";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from 'stats.js'
import gsap from 'gsap'

export default {
  data() {
    return {
      controls: null,
      stats: null,
      isScrolling: false
    }
  },
  computed: {
    ...mapState(['firstAnimationIsDone', 'secondAnimationIsDone']),
  },
  methods: {
    init() {
      this.canvas = this.$refs.webgl

      this.statsInit()

      this.resizing()

      this.createCamera()

      this.createLight()

      this.createControl()

      this.createRenderer()

      this.scrolling()
    },
    statsInit() {
      this.stats = new Stats()
      this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      this.stats.showPanel(1)
      this.stats.showPanel(2)
      this.stats.dom.className = "stats";
      document.body.appendChild(this.stats.dom)
    },
    createLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
      this.scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
      directionalLight.castShadow = true
      directionalLight.shadow.camera.far = 15
      directionalLight.shadow.mapSize.set(1024, 1024)
      directionalLight.shadow.normalBias = 0.05
      directionalLight.position.set(3, 2, 3)
      this.scene.add(directionalLight)
    },
    createCamera() {
      this.cameraGroup = new THREE.Group()
      this.scene.add(this.cameraGroup)

      this.camera = new THREE.PerspectiveCamera(
        35,
        this.sizes.width / this.sizes.height,
        0.1,
        100
      )
      this.cameraGroup.position.z = 0.01
      this.cameraGroup.add(this.camera)
    },
    resizing() {
      window.addEventListener('resize', () => {
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
      let currentSection = 1

      window.addEventListener('scroll', (event) => {

        if(!this.isScrolling) {
          this.isScrolling = true
          const offset = Math.floor(window.scrollY / this.sizes.height) + 1
          const next = offset >= currentSection ? currentSection + 1 : currentSection - 1
          location.href = `#section-${next}`

          if (next === 1) {
            gsap.to(this.camera.position, { z: 17, x: 0, duration: 2, ease: "power2" }).then(() => {
              this.isScrolling = false
            })
          } else if (next === 2) {
            gsap.to(this.cameraGroup.rotation, { z: 0, duration: 2, ease: "power2" })
            gsap.to(this.camera.position, { z: 2, x: 7, duration: 2, ease: "power2" }).then(() => {
              this.isScrolling = false
            })
            !this.secondAnimationIsDone && this.startSecondSectionAnimation()
          } else if (next === 3) {
            gsap.to(this.cameraGroup.rotation, { z: Math.PI * 0.5, duration: 2, ease: "power2" }).then(() => {
              this.isScrolling = false
            })
          }
          currentSection = next
        } else {
          event.preventDefault()
          location.href = `#section-${currentSection}`
          history.replaceState({}, '', '/')
        }
      })
    },
    createRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.physicallyCorrectLights = true
      this.renderer.outputEncoding = THREE.sRGBEncoding
    },
    createControl() {
      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true
    },
    tick() {
      const elapsedTime = this.clock.getElapsedTime()
      const deltaTime = elapsedTime - this.previousTime
      this.previousTime = elapsedTime

      // Update Control
      if (this.controls) {
        this.controls.update()
      }

      // Render
      this.renderer.render(this.scene, this.camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick)
      this.stats.update()
    }
  }
}
