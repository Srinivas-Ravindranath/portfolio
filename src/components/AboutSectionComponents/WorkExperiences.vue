<template>
  <section class="experience-section">
    <article
      v-for="(item, index) in experiences"
      :key="index"
      class="experience"
      :class="{ visible: visibleIndices.includes(index) }"
      :data-index="index"
    >
      <h2 class="job-title">{{ item.title }}</h2>


      <div class="company-line">
        <span class="company">{{ item.company }}</span>
        <span class="date-right">{{ item.date }}</span>
      </div>

      <p class="description">
        {{ item.summary }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


const experiences = [
  {
    title: 'DevOps Engineer',
    company: 'Syncron',
    date: 'Oct 2021 – Aug 2023',
    summary: `Led the development of reusable Terraform modules, boosting AWS infrastructure efficiency by 30%. Optimized GitHub CI pipelines with EKS clusters, enhancing processing speed by 15%. Transformed Jenkins workflows using Python Jinja templates, reducing runtime by 35%. Developed Python Tornado applications for automated cost-reporting and integrated real-time monitoring solutions (Grafana, Prometheus, AWS CloudWatch).`
  },
  {
    title: 'Associate DevOps Engineer',
    company: 'Syncron',
    date: 'Mar 2021 – Aug 2021',
    summary: `Enhanced infrastructure security by implementing IP whitelisting, reducing unauthorized access by 80%. Managed AWS resource optimization, achieving a 10% cost reduction. Automated infrastructure provisioning and CI/CD workflows using Jenkins, Python, and Shell scripts. Strengthened pipeline security and streamlined operational efficiency across multiple AWS accounts.`
  },
  {
    title: 'DevOps Intern',
    company: 'Syncron',
    date: 'Sep 2020 – Feb 2021',
    summary: `Implemented AWS CloudWatch Insights for comprehensive server monitoring, improving incident response times by 40%. Developed Python scripts for automating customer metadata reporting with DynamoDB integration. Maintained efficient Terraform scripts and Jenkins pipelines for AWS infrastructure provisioning.`
  },
  {
    title: 'Cloud Developer Intern',
    company: 'Pace Wisdom',
    date: 'Jun 2019 – Jul 2019',
    summary: `Built a centralized Python-based application for AWS service discovery, facilitating seamless information retrieval from AWS APIs including EC2, Lambda, Elastic Beanstalk, and more, significantly enhancing operational self-service capabilities.`
  }
]

const visibleIndices = ref<number[]>([])

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-index') || '', 10)
      if (entry.isIntersecting && !visibleIndices.value.includes(index)) {
        visibleIndices.value.push(index)
      }
    })
  }, {
    threshold: 0.1
  })

  const articles = document.querySelectorAll('.experience')
  articles.forEach(el => observer.observe(el))
})
</script>

<style scoped>
.experience-section {
  width: 80%;
  max-width: 900px;
  margin: 4rem auto;
  color: inherit;
  font-family: monospace;
}


.experience {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  padding-bottom: 2rem;
  border-bottom: 2px solid currentColor;
  margin-bottom: 2rem;
}


.experience:last-child {
  margin-bottom: 5rem;
}


.experience.visible {
  opacity: 1;
  transform: translateY(0);
}


.job-title {
  font-size: 1.8rem;
  margin: 0 0 0.3rem;
  font-weight: bold;
}

.company-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}


.company {
  font-size: 1.4rem;
}

.date-right {
  font-size: 1rem;
  color: #aaa;
}

.description {
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;
}

@media screen and (max-width: 480px) {
  .experience-section {
    width: 100%;
    margin: 2rem 1.5rem;
  }
}
</style>
