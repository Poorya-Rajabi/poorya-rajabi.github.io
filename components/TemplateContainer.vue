<template>
  <div class="main">
    <section class="section">
      <div class="flex flex-col">
        <span class="mb-0">Hi, I'm</span>
        <h2>Poorya Rajabi</h2>
      </div>
    </section>
    <!--    <section class="section">-->
    <!--      <h2>My projects</h2>-->
    <!--    </section>-->
    <!--    <section class="section">-->
    <!--      <h2>Contact me</h2>-->
    <!--    </section>-->
  </div>
</template>

<script>
export default {
  name: 'TemplateContainer'
}
</script>

<style scoped></style>

<style scoped lang="scss">
.main {
  .section {
    display: flex;
    align-items: center;
    height: 100vh;
    position: relative;
    color: white;
    font-size: 7vmin;
    padding-left: 10%;
    padding-right: 10%;

    &:nth-child(even) {
      justify-content: flex-end;
    }

    span {
      margin-bottom: 0;
    }

    h2 {
      margin-top: 16px;
    }
  }
}
</style>
