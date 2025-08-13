<template>
  <div class="search-bar">
    <i class="search-icon"></i>
    <input
      type="text"
      class="search-input"
      :placeholder="placeholder"
      v-model="searchQuery"
      @input="handleSearch"
      @keyup.enter="handleSearch"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <button
      v-if="searchQuery"
      class="clear-btn"
      @click="clearSearch"
      type="button"
    >
      <i class="clear-icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: "Search courses...",
    },
    debounce: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      searchQuery: "",
      debounceTimer: null,
    };
  },
  methods: {
    handleSearch() {
      // Clear existing timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      // Set new timer for debounced search
      this.debounceTimer = setTimeout(() => {
        this.$emit("search", this.searchQuery);
      }, this.debounce);
    },

    clearSearch() {
      this.searchQuery = "";
      this.$emit("search", "");
    },

    handleFocus() {
      this.$emit("focus");
    },

    handleBlur() {
      this.$emit("blur");
    },
  },

  beforeUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
