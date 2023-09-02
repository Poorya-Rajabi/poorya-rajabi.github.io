import { mapMutations, mapState } from "vuex";
import gsap from 'gsap'

export default {
  data() {
    return {
      default: {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: Math.PI,
          z: 0,
        }
      }
    }
  },
  watch: {
    spaceCraftNeedUpdate(status) {
      if (status) {
        gsap.to(this.spaceCraft.position, {
          duration: 1,
          x: this.spaceCraftDefaults.position.x,
          y: this.spaceCraftDefaults.position.y,
          z: this.spaceCraftDefaults.position.z
        })
        gsap.to(this.spaceCraft.rotation, {
          duration: 1,
          x: this.spaceCraftDefaults.rotation.x,
          y: this.spaceCraftDefaults.rotation.y,
          z: this.spaceCraftDefaults.rotation.z
        })
      } else {
        gsap.to(this.spaceCraft.position, {
          duration: 1,
          x: this.default.position.x,
          y: this.default.position.y,
          z: this.default.position.z
        })
        gsap.to(this.spaceCraft.rotation, {
          duration: 1,
          x: this.default.rotation.x,
          y: this.default.rotation.y,
          z: this.default.rotation.z
        })
      }
    }
  },
  computed: {
    ...mapState(['spaceCraftNeedUpdate', 'spaceCraftDefaults'])
  },
  methods: {
    ...mapMutations(['setSpaceCraftUpdateStatus'])
  },
}
