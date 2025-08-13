<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Marketing Content</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Create Content</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search content by title, type, or description..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="content-count"
              >{{ filteredContent.length }} content items found</span
            >
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>

          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="loading-state"
          >
            <div class="loading-spinner"></div>
            <p>Loading marketing content...</p>
          </div>

          <!-- Error State -->
          <div
            v-else-if="errorMessage"
            class="error-state"
          >
            <div class="error-icon">⚠️</div>
            <h3>Error loading marketing content</h3>
            <p>{{ errorMessage }}</p>
            <button
              class="btn btn-primary"
              @click="fetchMarketingContent"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Table View -->
        <div
          v-if="!isLoading && !errorMessage"
          class="marketing-table-container"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <table class="marketing-table">
            <thead>
              <tr>
                <th>THUMBNAIL</th>
                <th>TITLE</th>
                <th>TYPE</th>
                <th>DESCRIPTION</th>
                <th>CAMPAIGN</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="content in filteredContent"
                :key="content.id"
              >
                <td class="content-thumbnail-cell">
                  <div class="content-thumbnail">
                    <img
                      :src="content.thumbnail"
                      :alt="content.title"
                    />
                  </div>
                </td>
                <td class="content-title-cell">
                  <div class="content-info">
                    <h4 class="content-title">{{ content.title }}</h4>
                    <p class="content-subtitle">{{ content.subtitle }}</p>
                  </div>
                </td>
                <td class="content-type-cell">
                  <span
                    class="type-tag"
                    :class="content.type.toLowerCase()"
                    >{{ content.type }}</span
                  >
                </td>
                <td class="content-description-cell">
                  <p class="content-text">{{ content.description }}</p>
                </td>
                <td class="content-campaign-cell">
                  <span class="campaign-tag">{{ content.campaign }}</span>
                </td>
                <td class="content-status-cell">
                  <span
                    class="status-tag"
                    :class="content.status.toLowerCase()"
                    >{{ content.status }}</span
                  >
                </td>
                <td class="content-date-cell">
                  <span class="date-text">{{ formatDate(content.date) }}</span>
                </td>
                <td class="content-actions-cell">
                  <div class="action-buttons">
                    <button
                      class="action-btn edit-btn"
                      @click="editContent(content)"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteContent(content)"
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
          v-if="!isLoading && !errorMessage && viewMode === 'grid'"
          class="marketing-grid"
        >
          <div
            v-for="content in filteredContent"
            :key="content.id"
            class="content-card"
          >
            <div class="content-header">
              <div class="content-thumbnail">
                <img
                  :src="content.thumbnail"
                  :alt="content.title"
                />
              </div>
              <div class="content-info">
                <h4 class="content-title">{{ content.title }}</h4>
                <p class="content-subtitle">{{ content.subtitle }}</p>
                <div class="content-meta">
                  <span
                    class="type-tag"
                    :class="content.type.toLowerCase()"
                    >{{ content.type }}</span
                  >
                  <span
                    class="status-tag"
                    :class="content.status.toLowerCase()"
                    >{{ content.status }}</span
                  >
                </div>
              </div>
              <div class="content-actions">
                <button
                  class="action-btn edit-btn"
                  @click="editContent(content)"
                >
                  <i class="icon edit-icon"></i>
                </button>
                <button
                  class="action-btn delete-btn"
                  @click="deleteContent(content)"
                >
                  <i class="icon delete-icon"></i>
                </button>
              </div>
            </div>

            <div class="content-body">
              <p class="content-text">{{ content.description }}</p>
            </div>

            <div class="content-footer">
              <div class="content-meta">
                <span class="campaign-tag">{{ content.campaign }}</span>
              </div>
              <div class="content-date">
                <span class="date-text">{{ formatDate(content.date) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!isLoading && !errorMessage && filteredContent.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">📢</div>
          <h3>No marketing content found</h3>
          <p>Try adjusting your search criteria or create new content.</p>
          <button class="btn btn-primary">Create Content</button>
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
  name: "MarketingContent",
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
      marketingContent: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredContent() {
      // Server-side search; tampilkan langsung hasil marketing content
      return this.marketingContent;
    },
  },
  mounted() {
    this.fetchMarketingContent();
  },
  methods: {
    async fetchMarketingContent(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/marketing", { params });
        const items = Array.isArray(data?.data) ? data.data : [];

        // Map field backend -> UI
        this.marketingContent = items.map((m) => ({
          id: m._id || m.id,
          title: m.title,
          subtitle: m.subtitle,
          thumbnail: m.thumbnail,
          type: m.type ? m.type.replace(/\b\w/g, (c) => c.toUpperCase()) : "",
          description: m.description,
          campaign: m.campaign,
          status: m.status
            ? m.status.replace(/\b\w/g, (c) => c.toUpperCase())
            : "",
          date: m.date,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load marketing content";
        this.marketingContent = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      // server-side search by q
      this.fetchMarketingContent({ q: query });
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
    editContent(content) {
      console.log("Edit content:", content);
    },
    deleteContent(content) {
      console.log("Delete content:", content);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #374151;
  }

  p {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
