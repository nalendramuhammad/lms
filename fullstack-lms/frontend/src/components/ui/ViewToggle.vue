<template>
  <div class="view-toggle">
    <button
      class="toggle-btn grid-view"
      :class="{ active: viewMode === 'grid' }"
      @click="$emit('change', 'grid')"
    >
      <i class="icon"></i>
    </button>
    <button
      class="toggle-btn list-view"
      :class="{ active: viewMode === 'list' }"
      @click="$emit('change', 'list')"
    >
      <i class="icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "ViewToggle",
  props: {
    viewMode: {
      type: String,
      default: "grid",
      validator: (value) => ["grid", "list"].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
