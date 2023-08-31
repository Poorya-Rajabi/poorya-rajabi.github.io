<template>
  <div class="main">
    <section class="section">
      <div class="flex flex-col">
        <span class="mb-0 mt-16 text-5xl">Hello, I'm</span>
        <h2 ref="name" class="mb-40">Poorya Rajabi</h2>
      </div>
    </section>
    <section
      v-if="firstAnimationIsDone"
      class="section">
      <div class="flex flex-col">
        <h2 class="mb-0 mt-16">Experience</h2>
        <span class="mb-40">Lorem ipsum doet lorem skills javascript</span>
      </div>
    </section>
    <!--    <section class="section">-->
    <!--      <h2>Contact me</h2>-->
    <!--    </section>-->
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'TemplateContainer',
  computed: {
    ...mapState(['firstAnimationIsDone'])
  },
  mounted() {
    const title = this.$refs.name
    const CHAR_TIME = 60

    let text, index

    function requestCharAnimation(char, value) {
      setTimeout(function() {
        char.textContent = value
        char.classList.add("fade-in")
      }, CHAR_TIME)
    }

    function addChar() {
      const char = document.createElement("span")
      char.classList.add("char")
      char.textContent = "▌"
      title.appendChild(char)
      requestCharAnimation(char, text.substr(index++, 1))
      if (index < text.length) {
        requestChar()
      }
    }

    function requestChar(delay = 0) {
      setTimeout(addChar, CHAR_TIME + delay)
    }

    function start() {
      index = 0
      text = title.textContent.trim()
      title.textContent = ""
      requestChar(1000)
    }

    start();
  }
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

h2 {
  font-weight: normal;
  letter-spacing: 0.5rem;
}
.char {
  color: #fff;
  transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
  text-shadow: 0 0 4rem #fff;

  &.fade-in {
    color: #0cf;
    transition: color ease-out 0.3s, text-shadow ease-out 0.3s;
    text-shadow: 0 0 1rem #0cf;
  }
}
</style>
