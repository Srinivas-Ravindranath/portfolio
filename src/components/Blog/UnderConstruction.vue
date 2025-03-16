<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const line1 = "&lt;Insert Cricket Noises&gt; Uh-oh, nothing here yet.\n"
const line2 = "Some exciting new blogs are coming soon!\n"

const fullText = line1 + line2

const typedText = ref("")
let activeIntervals: number[] = []

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runSequence() {

  await typeString(typedText, line1, 60)
  await delay(400)

  await typeString(typedText, line2, 60)
}

function skipAll() {

  activeIntervals.forEach(id => clearInterval(id))
  activeIntervals = []

  typedText.value = fullText
}


const typedTextFormatted = computed(() => {
  return typedText.value
    .split('\n')
    .map(line => `<span class="typed-line">${line}</span>`)
    .join('<br/>')
})

onMounted(() => {
  runSequence()
})
</script>

<template>
  <div class="hero-container-blog" @click="skipAll">
    <section class="blog-section fade-in">
      <img
        src="/images/under_construction.png"
        alt="Cool Blogs"
        class="blog-image"
      />
      <p class="typed-output-blog" v-html="typedTextFormatted"></p>
    </section>
  </div>
</template>

<style>

.hero-container-blog {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  cursor: pointer;
}

body.dark-mode .hero-container-blog {
  background-color: #000;
  color: #fff;
}
body.light-mode .hero-container-blog {
  background-color: #f3f3f3;
  color: #000;
}

.blog-section {
  text-align: center;
  width: 100%;
  max-width: 900px;
  margin: 1rem auto;
}

.blog-image {
  display: block;
  margin: 0 auto 1.5rem;
  max-width: 80%;
  height: auto;
}

.typed-output-blog {
  margin: 0;
  line-height: 1.4;
  font-size: 1.2rem;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1.5s forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.typed-line {
  font-weight: normal;
}
</style>
