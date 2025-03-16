<template>
  <div class="footer-container" ref="footerContainerRef">
    <div class="footer-hero">
      <p class="typed-text" v-html="formattedText"></p>
      <span v-if="showSkip" class="skip" @click="skipTyping">Skip</span>
    </div>

    <transition name="fade">
      <div class="footer-details" v-if="showFooterDetails">
        <p class="inline-text">
          Find me at:
          <a href="mailto:srinivasravindranath1997@gmail.com" target="_blank" class="icon">
            <img src="/images/email.png" alt="Email Icon" class="custom-icon" />
          </a>
          <a href="https://www.linkedin.com/in/srinivas-ravindranath/" target="_blank" class="icon">
            <img src="/images/linkedin.png" alt="LinkedIn Icon" class="custom-icon" />
          </a>
          <a href="https://github.com/Srinivas-Ravindranath" target="_blank" class="icon">
            <img src="/images/github.png" alt="GitHub Icon" class="custom-icon" />
          </a>
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const lines = [
  `<span class="bigbold">Pretty Cool Right!</span>`,
  `<span class="bigbold">:)</span>`
]
const message = lines.join("\n")
const displayedText = ref("")
const showSkip = ref(true)
const formattedText = computed(() => displayedText.value.replace(/\n/g, "<br/><br/>"))

const showFooterDetails = ref(false)
const footerContainerRef = ref<HTMLElement | null>(null)

function startTyping() {
  let index = 0
  const interval = window.setInterval(() => {
    displayedText.value += message[index]
    index++
    if (index >= message.length) {
      clearInterval(interval)
      showSkip.value = false

      setTimeout(() => {
        showFooterDetails.value = true
      }, 500)
    }
  }, 50)
}

function skipTyping() {
  displayedText.value = message
  showSkip.value = false
  showFooterDetails.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTyping()
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })

  if (footerContainerRef.value) {
    observer.observe(footerContainerRef.value)
  }
})
</script>

<style scoped>
.footer-container {
}

.footer-hero {
  margin-left: 16rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: left;
  /* Removed color: #fff so it can inherit from global theme */
  font-family: monospace;
  font-size: 2.5rem;
  font-weight: 900;
}

.typed-text {
  margin: 0;
  line-height: 1.4;
}

.bigbold {
  font-size: 4rem;
  font-weight: 900;
}

.skip {
  margin-top: 1rem;
  cursor: pointer;
  color: #aaa;
  font-size: 1.2rem;
  text-decoration: underline;
  transition: color 0.2s;
}
.skip:hover {
  color: #fff;
}

.footer-details {
  margin-left: 16rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: left;
  /* Removed color: #fff so it can inherit from global theme */
  font-family: monospace;
  font-size: 1.4rem;
}

.inline-text {
  display: inline;
  white-space: nowrap;
}

.icon {
  margin-left: 0.5rem;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
}

.custom-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.icon:hover .custom-icon {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 480px) {
  /* Container & hero text adjustments */
  .footer-hero {
    margin-left: 2rem;    /* Was 16rem */
    margin-right: 1rem;   /* Added to keep it balanced */
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: left;     /* Or "center" if you prefer centered text */
    font-size: 1.6rem;    /* Slightly smaller on mobile */
  }

  /* Make the big bold text more mobile-friendly */
  .bigbold {
    font-size: 2.4rem;    /* Down from 4rem */
  }

  /* The typed text itself can also be reduced slightly */
  .typed-text {
    font-size: 1.4rem;
    line-height: 1.3;
  }

  /* Position the skip button near the typed text */
  .skip {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  /* Footer details (social links, etc.) */
  .footer-details {
    margin-left: 2rem;   /* Was 16rem */
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 4rem; /* Adjust as needed */
    text-align: left;    /* Or "center," depending on your preference */
    font-size: 1.2rem;
  }

  /* Icon sizing adjustments if needed */
  .custom-icon {
    width: 1.2em;
    height: 1.2em;
  }
}

/* Light/dark mode overrides: remove color #fff from local rules and rely on global theme. */
/* For example, in main.css or here (unscoped):
   body.dark-mode .footer-hero,
   body.dark-mode .footer-details {
     color: #fff;
   }
   body.light-mode .footer-hero,
   body.light-mode .footer-details {
     color: #000;
   }
*/

/* If you prefer local overrides:
:global(body.dark-mode) .footer-hero,
:global(body.dark-mode) .footer-details {
  color: #fff;
}
:global(body.light-mode) .footer-hero,
:global(body.light-mode) .footer-details {
  color: #000;
}
*/
</style>
