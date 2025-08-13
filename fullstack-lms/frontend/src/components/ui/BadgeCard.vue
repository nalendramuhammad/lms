<template>
  <div class="badge-card">
    <div class="badge-header">
      <div class="badge-icon">
        <i :class="`icon ${badge.icon}`"></i>
      </div>
      <div class="badge-meta">
        <h3 class="badge-name">{{ badge.name }}</h3>
        <p class="badge-category">{{ badge.category }}</p>
        <div class="badge-tags">
          <span
            v-for="tag in badge.tags"
            :key="tag"
            class="tag"
            >{{ tag }}</span
          >
        </div>
      </div>
      <div class="badge-actions">
        <button
          class="edit-btn"
          @click="$emit('edit', badge)"
        >
          <i class="icon edit-icon"></i>
        </button>
        <button
          class="delete-btn"
          @click="$emit('delete', badge)"
        >
          <i class="icon delete-icon"></i>
        </button>
      </div>
    </div>

    <div class="badge-content">
      <p class="badge-description">{{ badge.description }}</p>

      <div class="badge-details">
        <div class="detail-item">
          <i class="icon requirement-icon"></i>
          <span>{{ badge.requirement }}</span>
        </div>
        <div class="detail-item">
          <i class="icon points-icon"></i>
          <span>{{ badge.points }} points</span>
        </div>
        <div class="detail-item">
          <i class="icon rarity-icon"></i>
          <span
            class="rarity-badge"
            :class="badge.rarity"
            >{{ badge.rarity }}</span
          >
        </div>
        <div class="detail-item">
          <i class="icon users-icon"></i>
          <span>{{ badge.earnedCount }} earned</span>
        </div>
      </div>

      <div class="badge-footer">
        <div class="badge-status">
          <i class="icon status-icon"></i>
          <span>{{ badge.status }}</span>
        </div>
        <div class="badge-actions-footer">
          <button class="btn btn-secondary">Preview</button>
          <button class="btn btn-primary">Edit Badge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BadgeCard",
  props: {
    badge: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        name: "First Steps",
        category: "Learning",
        description:
          "Complete your first course and earn this achievement badge.",
        icon: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
        requirement: "Complete 1 course",
        points: 100,
        rarity: "common",
        earnedCount: 1250,
        status: "Active",
        tags: ["Beginner", "Learning"],
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
