<template>
  <div
    class="course-card"
    :class="{ 'no-hover': disableHover }"
  >
    <div class="course-card__image">
      <img
        :src="course.thumbnail || defaultImage"
        :alt="course.title"
      />
      <div
        v-if="!hideEditDelete"
        class="course-overlay"
      >
        <button
          class="edit-btn"
          @click="$emit('edit', course)"
          title="Edit Course"
        >
          <i class="icon edit-icon"></i>
        </button>
        <button
          class="delete-btn"
          @click="$emit('delete', course)"
          title="Delete Course"
        >
          <i class="icon delete-icon"></i>
        </button>
      </div>
      <div
        v-if="course.isFeatured"
        class="featured-badge"
      >
        ⭐ Featured
      </div>
      <div
        v-if="course.isFree"
        class="free-badge"
      >
        🆓 Free
      </div>
    </div>

    <div class="course-card__content">
      <div class="course-card__header">
        <h3 class="course-card__title">{{ course.title }}</h3>
        <div
          class="course-card__status"
          :class="course.status"
        >
          {{ course.status }}
        </div>
      </div>

      <p class="course-card__description">
        {{ course.shortDescription || course.description }}
      </p>

      <div class="course-card__meta">
        <div class="course-card__price">
          <span
            v-if="course.isFree"
            class="free-text"
            >Free</span
          >
          <span
            v-else
            class="price"
            >${{ formatPrice(course.price) }}</span
          >
          <span
            v-if="course.originalPrice && course.originalPrice > course.price"
            class="original-price"
            >${{ formatPrice(course.originalPrice) }}</span
          >
        </div>
        <div class="course-card__duration">
          <i class="icon clock-icon"></i>
          <span>{{ formatDuration(course.duration) }}</span>
        </div>
      </div>

      <div class="course-card__stats">
        <div class="course-card__stat-item">
          <span class="stat-label">Level:</span>
          <span class="stat-value">{{ formatLevel(course.level) }}</span>
        </div>
        <div class="course-card__stat-item">
          <span class="stat-label">Rating:</span>
          <span class="stat-value">⭐ {{ course.rating || 0 }}/5</span>
        </div>
        <div class="course-card__stat-item">
          <span class="stat-label">Students:</span>
          <span class="stat-value">{{ course.enrolledStudents || 0 }}</span>
        </div>
      </div>

      <div
        class="course-card__tags"
        v-if="course.tags && course.tags.length"
      >
        <span
          v-for="tag in course.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
        <span
          v-if="course.tags.length > 3"
          class="more-tags"
        >
          +{{ course.tags.length - 3 }} more
        </span>
      </div>

      <div class="course-card__actions">
        <button
          class="btn btn-primary"
          @click="$emit('view', course)"
        >
          View Course
        </button>
        <button
          class="btn btn-secondary"
          @click="$emit('edit', course)"
        >
          Edit
        </button>
        <button
          class="btn btn-danger"
          @click="$emit('delete', course)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({
        _id: 1,
        title: "Data Science Fundamentals",
        description: "Learn the basics of data science and analytics.",
        shortDescription: "Master data science fundamentals",
        price: 99.99,
        originalPrice: 149.99,
        duration: 1200,
        level: "beginner",
        rating: 4.5,
        enrolledStudents: 1234,
        isFree: false,
        isFeatured: false,
        status: "published",
        tags: ["data science", "python", "analytics"],
        thumbnail: "",
      }),
    },
    disableHover: {
      type: Boolean,
      default: false,
    },
    hideEditDelete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    defaultImage() {
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop";
    },
  },
  methods: {
    formatPrice(price) {
      if (!price) return "0.00";
      return parseFloat(price).toFixed(2);
    },
    formatDuration(minutes) {
      if (!minutes) return "0h";
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours === 0) return `${mins}m`;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    },
    formatLevel(level) {
      const levels = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      };
      return levels[level] || level;
    },
  },
};
</script>

<style lang="scss">
@use "@/styles/components/course-card" as *;
</style>
