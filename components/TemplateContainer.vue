<template>
  <div class="main">
    <section
      id="section-1"
      class="section">
      <div class="flex flex-col">
        <span class="mb-0 mt-16 text-xl md:text-3xl">Hello, I'm</span>
        <h2 ref="name" class="text-4xl">Poorya Rajabi</h2>
        <p class="md:mb-40 mt-4 md:mt-8 md:text-xl max-w-2xl">
          A <span class="text-orange-300">Creative Developer</span> with over 6 years of experience in design and development across various technologies focusing on front-end development.
        </p>
      </div>
    </section>
    <section
      id="section-2"
      v-if="firstAnimationIsDone"
      class="section md:justify-end">
      <div
        :class="{ 'opacity-0' : !isCompanyDetailsHidden }"
        class="flex flex-col transition-opacity duration-500 h-screen justify-end md:justify-center">
        <h2 class="mb-0 mt-16 md:text-4xl">Experience</h2>
        <ul class="max-w-2xl md:mt-4 py-2">
          <li
            v-for="company of companies"
            :key="company.name"
            class="mt-2 md:mt-4">
            <div
              class="cursor-pointer"
              @click="showCompanyDetails(company)">
              <div class="flex items-center">
                <span class="text-xl md:text-3xl mr-4 font-medium">{{ company.name }}</span>
                <span class="text-xs md:text-sm text-orange-300">{{ company.fromDate }} - {{ company.toDate }}</span>
                <span class="ml-2 text-sm text-slate-400 hover:text-slate-500 whitespace-nowrap">
                  →
                </span>
              </div>
              <p class="text-lg mt-1 text-white hidden md:block">
                {{ company.description }}
                <span class="text-lg text-slate-400 hover:text-slate-500 whitespace-nowrap">
                  [ read more → ]
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section
      v-if="firstAnimationIsDone"
      id="section-3"
      class="section overflow-hidden flex flex-col justify-center h-screen">
      <h2 class="mb-0 mt-16 text-4xl">Skills</h2>
      <div class="bg-white my-16 overflow-hidden w-screen relative">
        <div class="text-black ticker-container to-left flex w-screen relative">
          <span
            v-for="(skill, index) of skills"
            :key="index"
            class="text-8xl font-bold mx-16 whitespace-nowrap uppercase">{{ skill }}</span>
        </div>
      </div>
    </section>
    <div
      v-if="!isCompanyDetailsHidden"
      class="company-details fixed top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2">
      <div
        class="backdrop-blur-3xl p-4 md:p-8 rounded-xl border-white border mx-4">
        <div class="flex justify-between">
          <div class="flex items-center">
            <span class="md:text-3xl mr-4 font-bold text-white">{{ selectedCompany.name }}</span>
            <span class="text-xs md:text-sm text-orange-300">{{ selectedCompany.fromDate }} - {{ selectedCompany.toDate }}</span>
          </div>
          <button
            class="btn text-orange-300 hover:text-orange-200 cursor-pointer whitespace-nowrap"
            @click="hideCompanyDetails">[ CLOSE ]</button>
        </div>
        <p class="text-sm md:text-lg mt-1 text-white pt-4">
          {{ selectedCompany.description }}
          <a
            :href="selectedCompany.website"
            target="_blank"
            class="text-sky-300 whitespace-nowrap">[ {{ selectedCompany.website }} ]</a>
        </p>
        <ul>
          <li
            v-for="item of selectedCompany.responsibilities"
            class="text-white text-sm list-disc ml-4 my-4 font-medium">
            {{ item }}
          </li>
        </ul>
        <!--<template v-if="selectedCompany.links">-->
        <!--  <a-->
        <!--    v-for="link of selectedCompany.links"-->
        <!--    :href="link.url"-->
        <!--    target="_blank"-->
        <!--    class="text-sky-300 whitespace-nowrap">[ {{ link.title }} ]</a>-->
        <!--</template>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'TemplateContainer',
  data() {
    return {
      isCompanyDetailsHidden: true
    }
  },
  computed: {
    ...mapState(['firstAnimationIsDone', 'selectedCompany']),
    companies() {
      return [
        {
          name: 'Nobitex',
          website: 'https://nobitex.ir/',
          fromDate: 'Sep 2020',
          toDate: 'Present',
          description: 'Nobitex is the largest cryptocurrency exchange platform in terms of turnover in Iran with 5M+ users.',
          responsibilities: [
            'Created a new large-scale and highly structured SSR panel.',
            'Engineered the software and developed most of the infrastructure of the codebase.',
            'Wrote 50+ reusable and reliable components, mixins, plugins, stores, and styles.',
            'Mentored 4+ new junior team members and reviewed their codes, and trained their for code quality.',
            'Ideation, design and implementation of more than 6 landing pages for special events in limited time.'
          ],
          // links: [
          //   { url: 'https://owshen.io/', title: 'OWSHEN' }
          // ],
          spaceCraftValues: {
            position: {
              x: -10,
              y: 0,
              z: 10,
            },
            rotation: {
              x: 0,
              y: Math.PI * 0.19,
              z: 0,
            }
          }
        },
        {
          name: 'Rayanparsi',
          website: 'https://rayanparsi.com/',
          fromDate: 'Jun 2019',
          toDate: 'Dec 2019',
          description: 'Rayanparsi is the most famous platform in Iran that implements many big-scale fintech projects.',
          responsibilities: [
            'Implemented a single-page organization Panel that eliminated paper by up to 90% in administrative affairs.',
            'Improved page speed insight (new protocol) score from 10% to 90% on the mobile version and 97% on the desktop version.',
            'Connected external software while maintaining information security'
          ],
          spaceCraftValues: {
            position: {
              x: -11,
              y: 0,
              z: 8,
            },
            rotation: {
              x: 0,
              y: Math.PI * 1.25,
              z: Math.PI * 0.25,
            }
          }
        },
        {
          name: 'Bugloos',
          website: 'https://bugloos.com/',
          fromDate: 'Jun 2018',
          toDate: 'May 2019',
          description: 'Bugloos has more than 15 years of experience in making customized web solutions based in the Netherlands.',
          responsibilities: [
            'Created +3 multi languages websites and web applications for international companies.',
            'Produced 5+ responsive landing pages with modern animation and UI',
            'Learning the correct organizational culture and establishing effective communication with teammates'
          ],
          spaceCraftValues: {
            position: {
              x: -11,
              y: 0.5,
              z: 12,
            },
            rotation: {
              x: 0,
              y: Math.PI * 0.25,
              z: Math.PI * 0.75,
            }
          }
        }
      ]
    },
    skills() {
      return ['HTML', 'CSS', 'Javascript', 'Vue.js', 'Nuxt.js', 'Three.js', 'Tailwind', 'Bootstrap', 'Adobe Xd']
    }
  },
  mounted() {
    const title = this.$refs.name
    const CHAR_TIME = 60

    let text, index

    function requestCharAnimation(char, value) {
      setTimeout(function() {
        char.textContent = value
        char.classList.add("fade-in")
        char.classList.add("font-bold")
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
  },
  methods: {
    ...mapMutations(['setSelectedCompany', 'setSpaceCraftUpdateStatus', 'setSpaceCraftNewValues']),
    showCompanyDetails(company) {
      this.setSelectedCompany(company)
      this.isCompanyDetailsHidden = false
      this.setSpaceCraftUpdateStatus(true)
      this.setSpaceCraftNewValues(company.spaceCraftValues)
    },
    hideCompanyDetails() {
      this.setSelectedCompany(null)
      this.isCompanyDetailsHidden = true
      this.setSpaceCraftUpdateStatus(false)
    }
  },
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
    padding-left: 10%;
    padding-right: 10%;

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

#section-3 {
  .ticker-container {
    &.to-left {
      float: left;
      animation-name: tickerAnimationToLeft;
    }

    &.to-right {
      float: right;
      animation-name: tickerAnimationToRight;
    }

    &:hover {
      animation-play-state: paused;
    }

    animation: 20s linear infinite;

    & > div {
      white-space: nowrap;
    }
  }

  @keyframes tickerAnimationToLeft {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-270%);
    }
  }

  @keyframes tickerAnimationToRight {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(100%);
    }
  }
}
</style>
