<template>
  <button
    class="filter-button"
    :class="{ active: isActive }"
    @click="$emit('click')"
  >
    <i class="icon"></i>
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
