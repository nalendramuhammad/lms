<template>
  <div class="job-card">
    <div class="job-header">
      <div class="company-logo">
        <img
          :src="job.companyLogo"
          :alt="job.company"
        />
      </div>
      <div class="job-meta">
        <h3 class="job-title">{{ job.title }}</h3>
        <p class="company-name">{{ job.company }}</p>
        <div class="job-tags">
          <span
            v-for="tag in job.tags"
            :key="tag"
            class="tag"
            >{{ tag }}</span
          >
        </div>
      </div>
      <div class="job-actions">
        <button
          class="edit-btn"
          @click="$emit('edit', job)"
        >
          <i class="icon edit-icon"></i>
        </button>
        <button
          class="delete-btn"
          @click="$emit('delete', job)"
        >
          <i class="icon delete-icon"></i>
        </button>
      </div>
    </div>

    <div class="job-content">
      <p class="job-description">{{ job.description }}</p>

      <div class="job-details">
        <div class="detail-item">
          <i class="icon location-icon"></i>
          <span>{{ job.location }}</span>
        </div>
        <div class="detail-item">
          <i class="icon salary-icon"></i>
          <span>{{ formatSalary(job.salary) }}</span>
        </div>
        <div class="detail-item">
          <i class="icon type-icon"></i>
          <span>{{ job.type }}</span>
        </div>
        <div class="detail-item">
          <i class="icon experience-icon"></i>
          <span>{{ job.experience }}</span>
        </div>
      </div>

      <div class="job-footer">
        <div class="posted-date">
          <i class="icon calendar-icon"></i>
          <span>Posted {{ formatDate(job.postedDate) }}</span>
        </div>
        <div class="job-actions-footer">
          <button class="btn btn-secondary">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobCard",
  props: {
    job: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        companyLogo:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
        description:
          "We are looking for a talented Frontend Developer to join our team.",
        location: "Jakarta, Indonesia",
        salary: "Rp 15.000.000 - 25.000.000",
        type: "Full-time",
        experience: "3-5 years",
        tags: ["React", "Vue.js", "JavaScript"],
        postedDate: "2024-01-15",
      }),
    },
  },
  methods: {
    formatSalary(salary) {
      return salary;
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("id-ID", options);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
