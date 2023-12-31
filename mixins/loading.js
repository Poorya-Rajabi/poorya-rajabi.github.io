import * as THREE from 'three'

export default {
  methods: {
    setOverlay() {
      const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
      this.overlayMaterial = new THREE.ShaderMaterial({
        // wireframe: true,
        transparent: true,
        uniforms:
          {
            uAlpha: { value: 1 }
          },
        vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
      })
      const overlay = new THREE.Mesh(overlayGeometry, this.overlayMaterial)
      this.scene.add(overlay)
    }
  },
}
