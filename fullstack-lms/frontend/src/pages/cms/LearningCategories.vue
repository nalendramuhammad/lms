<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Learning Categories</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Create Category</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search categories by name, description, or parent..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="category-count"
              >{{ filteredCategories.length }} categories found</span
            >
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>
        </div>

        <!-- Table View -->
        <div
          class="categories-table-container"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <table class="categories-table">
            <thead>
              <tr>
                <th>ICON</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>PARENT</th>
                <th>COURSES</th>
                <th>STATUS</th>
                <th>CREATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="category in filteredCategories"
                :key="category.id"
              >
                <td class="category-icon-cell">
                  <div class="category-icon">
                    <span class="category-emoji">{{ category.icon }}</span>
                  </div>
                </td>
                <td class="category-name-cell">
                  <div class="category-info">
                    <h4 class="category-name">{{ category.name }}</h4>
                    <p class="category-slug">{{ category.slug }}</p>
                  </div>
                </td>
                <td class="category-description-cell">
                  <p class="category-text">{{ category.description }}</p>
                </td>
                <td class="category-parent-cell">
                  <span
                    class="parent-tag"
                    v-if="category.parent"
                    >{{ category.parent }}</span
                  >
                  <span
                    class="no-parent"
                    v-else
                    >—</span
                  >
                </td>
                <td class="category-courses-cell">
                  <span class="courses-count"
                    >{{ category.coursesCount }} courses</span
                  >
                </td>
                <td class="category-status-cell">
                  <span
                    class="status-tag"
                    :class="category.status.toLowerCase()"
                    >{{ category.status }}</span
                  >
                </td>
                <td class="category-date-cell">
                  <span class="date-text">{{
                    formatDate(category.createdAt)
                  }}</span>
                </td>
                <td class="category-actions-cell">
                  <div class="action-buttons">
                    <button
                      class="action-btn edit-btn"
                      @click="editCategory(category)"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteCategory(category)"
                    >
                      <i class="icon delete-icon"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Grid View -->
        <div
          class="categories-grid"
          v-if="viewMode === 'grid'"
        >
          <div
            v-for="category in filteredCategories"
            :key="category.id"
            class="category-card"
          >
            <div class="category-header">
              <div class="category-icon">
                <span class="category-emoji">{{ category.icon }}</span>
              </div>
              <div class="category-info">
                <h4 class="category-name">{{ category.name }}</h4>
                <p class="category-slug">{{ category.slug }}</p>
              </div>
              <div class="category-actions">
                <button
                  class="action-btn edit-btn"
                  @click="editCategory(category)"
                >
                  <i class="icon edit-icon"></i>
                </button>
                <button
                  class="action-btn delete-btn"
                  @click="deleteCategory(category)"
                >
                  <i class="icon delete-icon"></i>
                </button>
              </div>
            </div>

            <div class="category-body">
              <p class="category-text">{{ category.description }}</p>
            </div>

            <div class="category-footer">
              <div class="category-meta">
                <span
                  class="status-tag"
                  :class="category.status.toLowerCase()"
                  >{{ category.status }}</span
                >
                <span class="courses-count"
                  >{{ category.coursesCount }} courses</span
                >
                <span
                  class="parent-tag"
                  v-if="category.parent"
                  >{{ category.parent }}</span
                >
                <span
                  class="no-parent"
                  v-else
                  >No parent category</span
                >
              </div>
              <div class="category-date">
                <span class="date-text">{{
                  formatDate(category.createdAt)
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredCategories.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">📚</div>
          <h3>No categories found</h3>
          <p>Try adjusting your search criteria or create a new category.</p>
          <button class="btn btn-primary">Create Category</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import FilterButton from "@/components/ui/FilterButton.vue";
import ViewToggle from "@/components/ui/ViewToggle.vue";
import api from "@/utils/api.js";

export default {
  name: "LearningCategories",
  components: {
    Sidebar,
    SearchBar,
    FilterButton,
    ViewToggle,
  },
  data() {
    return {
      searchQuery: "",
      viewMode: "grid",
      categories: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredCategories() {
      // Server-side search; tampilkan langsung hasil categories
      return this.categories;
    },
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/categories", { params });
        const items = Array.isArray(data?.data) ? data.data : [];

        // Map field backend -> UI
        this.categories = items.map((c) => ({
          id: c._id || c.id,
          name: c.name,
          slug: c.slug || c.name.toLowerCase().replace(/\s+/g, "-"),
          icon: c.icon,
          description: c.description,
          parent: c.parent,
          coursesCount: c.coursesCount || 0,
          status: c.status
            ? c.status.replace(/\b\w/g, (c) => c.toUpperCase())
            : "ACTIVE",
          createdAt: c.createdAt,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load categories";
        this.categories = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      // server-side search by q
      this.fetchCategories({ q: query });
    },
    toggleFilters() {
      console.log("Toggle filters");
    },
    changeViewMode(mode) {
      this.viewMode = mode;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    editCategory(category) {
      console.log("Edit category:", category);
    },
    deleteCategory(category) {
      console.log("Delete category:", category);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
