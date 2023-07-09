import * as THREE from "three";
import gsap from "gsap";

export default {
  methods: {
    init() {
      this.canvas = this.$refs.webgl

      this.resizing()

      this.createCamera()

      this.createLight()

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
      this.camera.position.z = 6
      this.cameraGroup.add(this.camera)
    },
    resizing() {
      window.addEventListener('resize', () =>
      {
        // Update sizes
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(this.sizes.width, this.sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    },
    scrolling() {
      let currentSection = 0

      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY

        const newSection = Math.round(window.scrollY / this.sizes.height)

        if(newSection !== currentSection) {
          currentSection = newSection

          gsap.to(
            this.meshes[currentSection].rotation,
            {
              duration: 1.5,
              ease: 'power2.inOut',
              x: '+=5',
              y: '+=6',
              z: '+=1.5'
            }
          )
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
        alpha: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    tick() {
      const elapsedTime = this.clock.getElapsedTime()
      const deltaTime = elapsedTime - this.previousTime
      this.previousTime = elapsedTime

      // Scroll
      this.camera.position.y = - scrollY / this.sizes.height * this.objectsDistance

      // Parallax
      const  parallaxX = this.cursor.x * 0.5
      const  parallaxY = - this.cursor.y * 0.5
      this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 5 * deltaTime
      this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 5 * deltaTime

      // Animate Meshes
      for(const mesh of this.meshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
      }

      // Render
      this.renderer.render(this.scene, this.camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick)
    }
  },
}
