<template>
  <div class="main">
    <section class="section">
      <h1>My Portfolio</h1>
    </section>
    <section class="section">
      <h2>My projects</h2>
    </section>
    <section class="section">
      <h2>Contact me</h2>
    </section>
  </div>
</template>

<script>
export default {
  name: "TemplateContainer"
}
</script>

<style scoped>

</style>

<style scoped lang="scss">
.main {
  background-color: black;

  .section {
    display: flex;
    align-items: center;
    height: 100vh;
    position: relative;
    font-family: 'Cabin', sans-serif;
    color: #317ea5;
    text-transform: uppercase;
    font-size: 7vmin;
    padding-left: 10%;
    padding-right: 10%;

    &:nth-child(even) {
      justify-content: flex-end;
    }
  }
}
</style>
