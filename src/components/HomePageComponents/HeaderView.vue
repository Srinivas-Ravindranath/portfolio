<template>

  <div class="hero-container" @click="skipAll">
    <div class="typewriter">
      <div class="text-container">

        <p class="header-text" v-html="typedFirstLineFormatted"></p>

        <p v-if="showSecondLine" class="second-line">
          I am a
          <span class="variant-part">{{ currentVariant }}</span>
          Enthusiast
        </p>
      </div>
    </div>

    <div class="portfolio fade-in">
      THE PORTFOLIO IS DOWN HERE!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'




const firstLine = `Hello, I'm Srinivas Ravindranath\n\n`
const commentLine = `//To skip the animations just click anywhere\n\n`
const variants = ["DevOps", "MLOps", "DevSecOps"]
const cycles = 1
const finalVariant = "DevOps"




const typedFirstLine = ref("")
const currentVariant = ref("")
const showSecondLine = ref(false)
const showSkip = ref(true)
let activeIntervals: number[] = []




const typedFirstLineFormatted = computed(() => {
  return typedFirstLine.value
    .split('\n')
    .map(line => {
      const trimmed = line.trimStart()
      if (trimmed.startsWith('//')) {

        return `<span class="comment-line">${line}</span>`
      }
      return line
    })
    .join('<br/>')
})




function typeString(target: { value: string }, text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const intervalId = window.setInterval(() => {
      target.value += text[i]
      i++
      if (i >= text.length) {
        clearInterval(intervalId)
        activeIntervals = activeIntervals.filter(id => id !== intervalId)
        resolve()
      }
    }, speed)
    activeIntervals.push(intervalId)
  })
}

function eraseAll(target: { value: string }, speed: number): Promise<void> {
  return new Promise((resolve) => {
    const intervalId = window.setInterval(() => {
      target.value = target.value.slice(0, -1)
      if (target.value.length === 0) {
        clearInterval(intervalId)
        activeIntervals = activeIntervals.filter(id => id !== intervalId)
        resolve()
      }
    }, speed)
    activeIntervals.push(intervalId)
  })
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}




async function runSequence() {
  showSkip.value = true

  await typeString(typedFirstLine, firstLine, 60)
  await delay(400)

  await typeString(typedFirstLine, commentLine, 60)
  await delay(500)

  showSecondLine.value = true

  for (let c = 0; c < cycles; c++) {
    for (const v of variants) {
      await eraseAll(currentVariant, 30)
      await typeString(currentVariant, v, 60)
      await delay(800)
    }
  }

  await eraseAll(currentVariant, 30)
  await typeString(currentVariant, finalVariant, 60)
  showSkip.value = false
}

function skipAll() {

  activeIntervals.forEach(id => clearInterval(id))
  activeIntervals = []

  typedFirstLine.value = firstLine + commentLine
  showSecondLine.value = true
  currentVariant.value = finalVariant
}

onMounted(() => {
  runSequence()
})
</script>


<style>
/* Base layout without hard-coded colors */
.hero-container {
  min-height: 100vh;
  /* Background and text color will be inherited from global theme classes */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}

.typewriter {
  font-family: monospace;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 2rem;
}

.text-container {
  width: 100%;
  max-width: 900px;
  height: 8em;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Combined typed text: Hello + comment line */
.header-text {
  margin: 0;
  line-height: 1.4;
}

/* Second typed line: smaller & unbolded */
.second-line {
  margin: 0;
  line-height: 1.4;
  font-size: 1.8rem;
  font-weight: 400;
}

/* The changing word (DevOps, MLOps, etc.) */
.variant-part {
  display: inline-block;
  text-align: center;
}

/* Comment line remains green in all modes */
.comment-line {
  color: #6a9953;
  font-size: 1.4rem;
  font-weight: normal;
  font-family: monospace;
}

/* Skip link styling */
.skip {
  margin-top: 1rem;
  cursor: pointer;
  color: #aaa;
  font-size: 1rem;
  font-weight: normal;
  text-decoration: underline;
  transition: color 0.2s;
}
.skip:hover {
  color: #fff;
}

/* Underlined portfolio text */
.portfolio {
  font-family: monospace;
  font-size: 1.6rem;
  display: block;
  width: 900px;
  margin: 0 auto 2rem;
  text-align: center;
  border-bottom: 2px solid;
  padding-bottom: 0.5rem;
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  animation: fadeIn 1.5s forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Global theme overrides: these can also be placed in main.css if preferred */

/* Dark mode */
body.dark-mode .hero-container {
  background-color: #000;
  color: #fff;
}
body.dark-mode .portfolio {
  border-bottom-color: #fff;
}

/* Light mode */
body.light-mode .hero-container {
  background-color: #f3f3f3;
  color: #000;
}
body.light-mode .portfolio {
  border-bottom-color: #000;
}

.safari .text-container {
  display: block !important;
  overflow: visible !important;
  height: auto !important;
}

@media screen and (max-width: 480px) {
  /* Give the hero container a little breathing room on small screens */
  .hero-container {
    position: relative;
    padding: 1rem;
    justify-content: flex-start; /* or center, if you prefer */
    min-height: 70vh;
  }

  /* Adjust the large typewriter text for small screens */
  .typewriter {
    font-size: 2rem; /* slightly smaller so it doesn’t wrap awkwardly */
    margin-top: 1rem;
  }

  /* Fine-tune the second line’s font size */
  .second-line {
    font-size: 1.4rem;
  }

  /* Update the portfolio section to be fixed at the bottom */
  .portfolio {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    font-family: monospace;
    font-size: 1.3rem;
    text-align: center;
    border-bottom: 2px solid;
    padding-bottom: 0.5rem;
    margin: 0;
  }
}

</style>
