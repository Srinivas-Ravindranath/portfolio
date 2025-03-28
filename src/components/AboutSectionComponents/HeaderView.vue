<template>

  <div class="hero-container-about" @click="skipAll">
    <div class="typewriter-about">
      <div class="text-container-about">
        <p class="typed-output-about" v-html="typedTextFormatted"></p>
      </div>
    </div>

    <div class="work fade-in">
      Work Experience's Down Here
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'


const firstLine = "About me\n"
const secondLine = "I am a DevOps Engineer from DC\n"
const thirdLine = "// I'm currently a Masters student at the George Washington University In Washington DC\n"
const fourthLine =
  "In my free time I love to play Video games [icon:gaming], go cycling [icon:cycle], hike [icon:hiking], and I'm a gym freak [icon:gym]"

const fullText = firstLine + secondLine + thirdLine + fourthLine


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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runSequence() {
  // Immediately display the first line in full
  await typeString(typedText, firstLine, 60)
  await delay(400);
  await typeString(typedText, secondLine, 60);
  await delay(400);
  await typeString(typedText, thirdLine, 60);
  await delay(400);
  await typeString(typedText, fourthLine, 60);
}

function skipAll() {
  activeIntervals.forEach(id => clearInterval(id))
  activeIntervals = []
  typedText.value = fullText
}


const typedTextFormatted = computed(() => {
  return typedText.value
    .split('\n')
    .map((line, index) => {
      let formattedLine = line.trimEnd()

      if (index === 0) {
        formattedLine = `<span class="header-line-about">${formattedLine}</span>`
      } else if (formattedLine.startsWith("//")) {
        formattedLine = `<span class="comment-line-about">${formattedLine}</span>`
      } else {
        formattedLine = `<span class="normal-line-about">${formattedLine}</span>`
      }

      return formattedLine
        .replace(/\[icon:gaming\]/g, `<img src="/images/gaming.png" class="inline-icon" alt="Gaming" />`)
        .replace(/\[icon:cycle\]/g, `<img src="/images/cycle.png" class="inline-icon" alt="Cycling" />`)
        .replace(/\[icon:hiking\]/g, `<img src="/images/hiking.png" class="inline-icon" alt="Hiking" />`)
        .replace(/\[icon:gym\]/g, `<img src="/images/gym.png" class="inline-icon" alt="Gym" />`)
    })
    .join('<br/>')
})

onMounted(() => {
  runSequence()
})
</script>

<style>
.hero-container-about {
  position: relative;
  min-height: 75vh;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  cursor: pointer;
}

.typewriter-about {
  font-family: monospace;
  width: 100%;
  font-size: 2.5rem;
  font-weight: normal;
  text-align: left;
  margin-top: 0;
}

.text-container-about {
  width: 60%;
  max-width: 900px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.typed-output-about {
  margin: 0;
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
  text-align: left;
}

.header-line-about {
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.2rem;
}

.normal-line-about {
  font-size: 1.2rem;
  font-weight: normal;
  display: block;
  margin-bottom: 0;
}

.comment-line-about {
  color: #6a9953;
  font-size: 1.2rem;
  font-weight: normal;
  display: block;
  margin-bottom: 0;
}

.inline-icon {
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
  margin: 0 0.3rem;
}

.work {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: monospace;
  font-size: 1.6rem;
  display: block;
  width: 900px;
  text-align: center;
  border-bottom: 2px solid;
  padding-bottom: 0.5rem;
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

body.dark-mode .hero-container-about {
  background-color: #000;
  color: #fff;
}
body.dark-mode .work {
  border-bottom-color: #fff;
}

body.light-mode .hero-container-about {
  background-color: #f3f3f3;
  color: #000;
}
body.light-mode .work {
  border-bottom-color: #000;
}

@media screen and (max-width: 480px) {
  /* Reduce container padding for mobile */
  .hero-container-about {
    padding: 1rem;
  }

  /* Reduce font size for the typewriter effect */
  .typewriter-about {
    font-size: 1.8rem;
  }

  /* Make the text container take full width and add horizontal padding */
  .text-container-about {
    width: 95%;
    padding: 0 1rem;
    margin: 0 auto;
  }

  /* Adjust header and other text sizes */
  .header-line-about {
    font-size: 2rem;
  }
  .normal-line-about,
  .comment-line-about {
    font-size: 1rem;
  }

  /* Adjust the 'work' section so it fits on mobile
     - Pin the work experience text to the bottom */
  .work {
    position: absolute;
    bottom: 4rem;
    left: 47%;
    transform: translateX(-50%);
    width: 350px;
    font-family: monospace;
    font-size: 1.6rem;
    text-align: center;
    border-bottom: 2px solid;
    padding-bottom: 0.5rem;
    margin: 0;
  }
}
</style>
