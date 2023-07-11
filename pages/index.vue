<template>
  <div>
    <template-container />
    <canvas-container />
  </div>
</template>

<script>
import CanvasContainer from "~/components/CanvasContainer";
import TemplateContainer from "~/components/TemplateContainer";

export default {
  name: 'IndexPage',
  components: {
    CanvasContainer,
    TemplateContainer
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
