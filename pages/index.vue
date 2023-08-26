<template>
  <div class="bg-black">
    <canvas-container />
    <template-container />
    <loading />
  </div>
</template>

<script>
import CanvasContainer from '@/components/CanvasContainer'
import TemplateContainer from '@/components/TemplateContainer'
import Loading from '@/components/Loading'

export default {
  name: 'IndexPage',
  components: {
    CanvasContainer,
    TemplateContainer,
    Loading
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.stats,
.stats canvas {
  display: flex !important;
}
</style>
