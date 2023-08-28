import { mapMutations } from 'vuex'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
// import { ScrollTrigger } from "gsap/ScrollTrigger"

export default {
  data() {
    return {
      loadingManager: null,
      dracoLoader: new DRACOLoader(),
      gltfLoader: null,
      textureLoader: null,
      cubeTextureLoader: null,
      earthTextures: {},
      tarsEnv: null
    }
  },
  methods: {
    ...mapMutations(['setProgressRatio', 'setLoadingStatus', 'setFirstAnimationStatus']),
    loadModels() {
      this.loadingManager = new THREE.LoadingManager(
        () => {
          this.setLoadingStatus(false)
          gsap.delayedCall(0.4, () => {
            // Animate overlay
            gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 1, value: 0, delay: 0 })
          })
          this.setStartAnimations()
        },
        (itemUrl, itemsLoaded, itemsTotal) => {
          this.setProgressRatio(itemsLoaded / itemsTotal)
        }
      )

      this.gltfLoader = new GLTFLoader(this.loadingManager)
      this.textureLoader = new THREE.TextureLoader(this.loadingManager)
      this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)

      this.dracoLoader.setDecoderPath('/draco/')
      this.gltfLoader.setDRACOLoader(this.dracoLoader)

      this.loadEarthTexture()

      this.loadCubeTexture()

      this.loadCorridor()

      this.loadTars()
    },
    loadEarthTexture() {
      this.earthTextures.map = this.textureLoader.load(
        '/textures/earth/earth-map.jpg'
      )
    },
    loadCubeTexture() {
      this.tarsEnv = this.cubeTextureLoader.load([
        '/textures/envMap/3/px.png',
        '/textures/envMap/3/nx.png',
        '/textures/envMap/3/py.png',
        '/textures/envMap/3/ny.png',
        '/textures/envMap/3/nx.png',
        '/textures/envMap/3/pz.png'
      ])
      this.tarsEnv.encoding = THREE.sRGBEncoding
    },
    loadCorridor() {
      this.gltfLoader.load('/models/corridor/corridor.gltf', (gltf) => {
        gltf.scene.rotation.y = -Math.PI * 0.5
        gltf.scene.scale.set(0.5, 0.5, 0.5)
        gltf.scene.position.set(-2, 0, 10)
        gltf.scene.receiveShadow = true
        this.scene.add(gltf.scene)
      })
    },
    loadTars() {
      this.gltfLoader.load('/models/tars.gltf', (gltf) => {
        const model = gltf.scene
        const children = ['Tars001', 'Tars002', 'Tars003', 'Tars004']

        this.tars = new THREE.Group()
        for (let _ in children) {
          let i = +_ + 1
          this.tars[`tars00${i}`] = model.children.find((mesh) => {
            return mesh.name === children[_]
          })
          this.tars.add(this.tars[`tars00${i}`])
        }

        this.tars.tars001.rotation.z = -Math.PI * 0.5
        this.tars.tars003.rotation.z = -Math.PI * 0.25
        this.tars.tars004.rotation.z = -Math.PI * 0.8
        this.tars.scale.set(0.7, 0.7, 0.7)
        this.tars.position.set(-5.93, -0.62, 11)

        this.scene.add(this.tars)

        this.updateTarsEnvMaterials(this.tars)
      })
    },
    updateTarsEnvMaterials(tars) {
      tars.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.tarsEnv
          child.material.envMapIntensity = 2.5
          child.material.needsUpdate = true
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    },
    setStartAnimations() {
      // TODO: create timeline
      // earth animation
      gsap.to(this.earth.scale, { x: 0, y: 0, z: 0, duration: 30, ease: 'none' })
      gsap.to(this.earth.rotation, {
        y: Math.PI * 2,
        repeat: -1,
        duration: 60,
        ease: 'none'
      })

      // camera animation
      gsap.to(this.camera.position, { z: 17, duration: 3, delay: 0.5 })

      // tars animation
      // gsap.to(this.tars.tars001?.rotation, { z: -Math.PI * 0.5, duration: 0.8, delay: 2.5 })
      // gsap.to(this.tars.tars003?.rotation, { z: -Math.PI * 0.25, duration: 0.8, delay: 2.5 })
      // gsap.to(this.tars.tars004?.rotation, { z: -Math.PI * 0.8, duration: 0.8, delay: 2.5 })

      // V2
      gsap.to(this.tars.position, { x: 1.5, duration: 3, delay: 2.5 })
      gsap.to(this.tars.rotation, { z: -Math.PI * 4, duration: 3, delay: 2.5 })

      gsap.to(this.tars.tars001?.rotation, { z: 0, duration: 1, delay: 4.5 })
      gsap.to(this.tars.tars003?.rotation, { z: 0, duration: 1, delay: 4.5 })
      gsap.to(this.tars.tars004?.rotation, { z: 0, duration: 1, delay: 4.5 })

      gsap.to(this.tars.rotation, { y: -Math.PI * 0.65, duration: 1.2, delay: 4.3 })
      gsap.to(this.tars.position, { z: 11.3, duration: 1, delay: 4.3 }).then(() => {
        this.setFirstAnimationStatus()
      })
    }
  }
}
