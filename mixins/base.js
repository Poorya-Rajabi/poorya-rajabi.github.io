import { mapState } from "vuex";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from 'stats.js'
// import gsap from 'gsap'

export default {
  data() {
    return {
      controls: null,
      stats: null
    }
  },
  computed: {
    ...mapState(['firstAnimationIsDone', 'secondAnimationIsDone'])
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

      this.cursorMoving()
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
      let currentSection = 0

      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY

        const newSection = Math.round(window.scrollY / this.sizes.height)

        if (newSection !== currentSection) {
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

        if (this.firstAnimationIsDone) {
          this.camera.position.z = 17 - (scrollY / this.sizes.height * 15)
          this.cameraGroup.position.x = scrollY / this.sizes.height * 7
          this.cameraGroup.rotation.y = scrollY / this.sizes.height * Math.PI / 10
        }

        if (currentSection === 1 && !this.secondAnimationIsDone) {
          this.startSecondSectionAnimation()
        }
      })
    },
    cursorMoving() {
      window.addEventListener('mousemove', (event) => {
        this.cursor.x = (event.clientX / this.sizes.width) - 0.5
        this.cursor.y = (event.clientY / this.sizes.height) - 0.5
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

      // Scroll
      // this.camera.position.z = - scrollY / this.sizes.height
      // this.camera.rotation.y = - scrollY / this.sizes.height

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
