<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Testimonials</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search testimonials by name, content, or rating..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="testimonial-count"
              >{{ filteredTestimonials.length }} testimonials found</span
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
            <p>Loading testimonials...</p>
          </div>

          <!-- Error State -->
          <div
            v-else-if="errorMessage"
            class="error-state"
          >
            <div class="error-icon">⚠️</div>
            <h3>Error loading testimonials</h3>
            <p>{{ errorMessage }}</p>
            <button
              class="btn btn-primary"
              @click="fetchTestimonials"
            >
              Try Again
            </button>
          </div>
        </div>

        <div
          v-if="!isLoading && !errorMessage"
          class="testimonials-table-container"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <table class="testimonials-table">
            <thead>
              <tr>
                <th>AVATAR</th>
                <th>NAME</th>
                <th>CONTENT</th>
                <th>RATING</th>
                <th>COURSE</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="testimonial in filteredTestimonials"
                :key="testimonial.id"
              >
                <td class="testimonial-avatar-cell">
                  <div class="testimonial-avatar">
                    <img
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                    />
                  </div>
                </td>
                <td class="testimonial-name-cell">
                  <div class="testimonial-info">
                    <h4 class="testimonial-name">{{ testimonial.name }}</h4>
                    <p class="testimonial-title">{{ testimonial.title }}</p>
                  </div>
                </td>
                <td class="testimonial-content-cell">
                  <p class="testimonial-text">{{ testimonial.content }}</p>
                </td>
                <td class="testimonial-rating-cell">
                  <div class="rating-stars">
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="star"
                      :class="{ filled: star <= testimonial.rating }"
                    >
                      ⭐
                    </span>
                  </div>
                </td>
                <td class="testimonial-course-cell">
                  <span class="course-tag">{{ testimonial.course }}</span>
                </td>
                <td class="testimonial-date-cell">
                  <span class="date-text">{{
                    formatDate(testimonial.date)
                  }}</span>
                </td>
                <td class="testimonial-actions-cell">
                  <div class="action-buttons">
                    <button
                      class="action-btn edit-btn"
                      @click="editTestimonial(testimonial)"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteTestimonial(testimonial)"
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
          class="testimonials-grid"
        >
          <div
            v-for="testimonial in filteredTestimonials"
            :key="testimonial.id"
            class="testimonial-card"
          >
            <div class="testimonial-header">
              <div class="testimonial-avatar">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                />
              </div>
              <div class="testimonial-info">
                <h4 class="testimonial-name">{{ testimonial.name }}</h4>
                <p class="testimonial-title">{{ testimonial.title }}</p>
                <div class="rating-stars">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="star"
                    :class="{ filled: star <= testimonial.rating }"
                  >
                    ⭐
                  </span>
                </div>
              </div>
              <div class="testimonial-actions">
                <button
                  class="action-btn edit-btn"
                  @click="editTestimonial(testimonial)"
                >
                  <i class="icon edit-icon"></i>
                </button>
                <button
                  class="action-btn delete-btn"
                  @click="deleteTestimonial(testimonial)"
                >
                  <i class="icon delete-icon"></i>
                </button>
              </div>
            </div>

            <div class="testimonial-content">
              <p class="testimonial-text">{{ testimonial.content }}</p>
            </div>

            <div class="testimonial-footer">
              <div class="testimonial-meta">
                <span class="course-tag">{{ testimonial.course }}</span>
              </div>
              <div class="testimonial-date">
                <span class="date-text">{{
                  formatDate(testimonial.date)
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="
            !isLoading && !errorMessage && filteredTestimonials.length === 0
          "
          class="empty-state"
        >
          <div class="empty-icon">💬</div>
          <h3>No testimonials found</h3>
          <p>Try adjusting your search criteria or add a new testimonial.</p>
          <button class="btn btn-primary">Add Testimonial</button>
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
  name: "Testimonials",
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
      testimonials: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredTestimonials() {
      // Server-side search; tampilkan langsung hasil testimonials
      return this.testimonials;
    },
  },
  mounted() {
    this.fetchTestimonials();
  },
  methods: {
    async fetchTestimonials(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/testimonials", { params });
        const items = Array.isArray(data?.data) ? data.data : [];

        // Map field backend -> UI
        this.testimonials = items.map((t) => ({
          id: t._id || t.id,
          name: t.name,
          title: t.title,
          avatar: t.avatar,
          content: t.content,
          rating: t.rating,
          course: t.course,
          date: t.date,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load testimonials";
        this.testimonials = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      // server-side search by q
      this.fetchTestimonials({ q: query });
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
    editTestimonial(testimonial) {
      console.log("Edit testimonial:", testimonial);
    },
    deleteTestimonial(testimonial) {
      console.log("Delete testimonial:", testimonial);
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
