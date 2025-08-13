<template>
  <div class="cms-layout browse-courses">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Browse Courses</h1>
          <button
            class="create-btn"
            @click="showCreateModal = true"
          >
            <i class="icon plus-icon"></i>
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <!-- Stats Cards -->
        <div class="browse-courses__stats-grid">
          <div class="browse-courses__stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <h3>{{ totalCourses }}</h3>
              <p>Total Courses</p>
            </div>
          </div>
          <div class="browse-courses__stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <h3>{{ featuredCourses }}</h3>
              <p>Featured Courses</p>
            </div>
          </div>
          <div class="browse-courses__stat-card">
            <div class="stat-icon">🆓</div>
            <div class="stat-info">
              <h3>{{ freeCourses }}</h3>
              <p>Free Courses</p>
            </div>
          </div>
          <div class="browse-courses__stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ totalStudents }}</h3>
              <p>Total Students</p>
            </div>
          </div>
        </div>

        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search courses..."
            />
            <FilterButton
              label="Filters"
              :isActive="showFilters"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="course-count"
              >{{ filteredCourses.length }} courses found</span
            >
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>
        </div>

        <!-- Filters Panel -->
        <div
          v-if="showFilters"
          class="browse-courses__filters-panel"
        >
          <div class="filter-group">
            <label>Category</label>
            <select
              v-model="filters.category"
              @change="applyFilters"
            >
              <option value="">All Categories</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="filter-group">
            <label>Level</label>
            <select
              v-model="filters.level"
              @change="applyFilters"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Price</label>
            <select
              v-model="filters.price"
              @change="applyFilters"
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div class="filter-group">
            <label>
              <input
                type="checkbox"
                v-model="filters.featured"
                @change="applyFilters"
              />
              Featured Only
            </label>
          </div>
        </div>

        <div
          v-if="loading"
          class="loading-state"
        >
          <div class="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>

        <div
          v-else
          class="courses-grid"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <CourseCard
            v-for="course in paginatedCourses"
            :key="course._id"
            :course="course"
            :disable-hover="true"
            :hide-edit-delete="false"
            @edit="editCourse"
            @delete="deleteCourse"
          />
        </div>

        <div class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>

        <div
          v-if="!loading && filteredCourses.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">📚</div>
          <h3>No courses found</h3>
          <p>Try adjusting your search criteria or create a new course.</p>
          <button
            class="btn btn-primary"
            @click="showCreateModal = true"
          >
            Create Course
          </button>
        </div>
      </div>
    </main>

    <!-- Create/Edit Course Modal -->
    <div
      v-if="showCreateModal"
      class="browse-courses__modal-overlay"
      @click="closeModal"
    >
      <div
        class="browse-courses__modal-content"
        @click.stop
      >
        <div class="browse-courses__modal-header">
          <h2>{{ editingCourse ? "Edit Course" : "Create New Course" }}</h2>
          <button
            class="close-btn"
            @click="closeModal"
          >
            &times;
          </button>
        </div>
        <div class="browse-courses__modal-body">
          <form @submit.prevent="saveCourse">
            <div class="form-group">
              <label>Title</label>
              <input
                v-model="courseForm.title"
                type="text"
                required
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                v-model="courseForm.description"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Category</label>
                <select
                  v-model="courseForm.category"
                  required
                >
                  <option value="">Select Category</option>
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Level</label>
                <select
                  v-model="courseForm.level"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Price</label>
                <input
                  v-model="courseForm.price"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
              <div class="form-group">
                <label>Duration (minutes)</label>
                <input
                  v-model="courseForm.duration"
                  type="number"
                  min="0"
                />
              </div>
            </div>
            <div class="form-group">
              <label>
                <input
                  type="checkbox"
                  v-model="courseForm.isFree"
                />
                Free Course
              </label>
            </div>
            <div class="form-group">
              <label>
                <input
                  type="checkbox"
                  v-model="courseForm.isFeatured"
                />
                Featured Course
              </label>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select
                v-model="courseForm.status"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div class="modal-actions">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="saving"
              >
                {{
                  saving
                    ? "Saving..."
                    : editingCourse
                      ? "Update Course"
                      : "Create Course"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useCourseStore } from "@/stores/courses";
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import FilterButton from "@/components/ui/FilterButton.vue";
import ViewToggle from "@/components/ui/ViewToggle.vue";
import CourseCard from "@/components/ui/CourseCard.vue";

export default {
  name: "BrowseCourses",
  components: {
    Sidebar,
    SearchBar,
    FilterButton,
    ViewToggle,
    CourseCard,
  },
  setup() {
    const courseStore = useCourseStore();
    const searchQuery = ref("");
    const viewMode = ref("grid");
    const showFilters = ref(false);
    const showCreateModal = ref(false);
    const editingCourse = ref(null);
    const saving = ref(false);
    const categories = ref([]);

    // Course form
    const courseForm = ref({
      title: "",
      description: "",
      shortDescription: "",
      category: "",
      level: "beginner",
      price: 0,
      duration: 0,
      isFree: false,
      isFeatured: false,
      status: "draft",
      tags: [],
      requirements: [],
      learningOutcomes: [],
    });

    // Filters
    const filters = ref({
      category: "",
      level: "",
      price: "",
      status: "",
      featured: false,
    });

    const courses = computed(() => courseStore.courses);
    const loading = computed(() => courseStore.loading);
    const currentPage = ref(1);
    const pageSize = ref(12);

    // Computed properties for stats
    const totalCourses = computed(() => courses.value.length);
    const featuredCourses = computed(
      () => courses.value.filter((c) => c.isFeatured).length
    );
    const freeCourses = computed(
      () => courses.value.filter((c) => c.isFree).length
    );
    const totalStudents = computed(() =>
      courses.value.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0)
    );

    const filteredCourses = computed(() => {
      let filtered = courses.value;

      // Search filter
      if (searchQuery.value) {
        filtered = filtered.filter(
          (course) =>
            course.title
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            course.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            course.shortDescription
              ?.toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }

      // Category filter
      if (filters.value.category) {
        filtered = filtered.filter(
          (course) => course.category === filters.value.category
        );
      }

      // Level filter
      if (filters.value.level) {
        filtered = filtered.filter(
          (course) => course.level === filters.value.level
        );
      }

      // Price filter
      if (filters.value.price === "free") {
        filtered = filtered.filter((course) => course.isFree);
      } else if (filters.value.price === "paid") {
        filtered = filtered.filter((course) => !course.isFree);
      }

      // Status filter
      if (filters.value.status) {
        filtered = filtered.filter(
          (course) => course.status === filters.value.status
        );
      }

      // Featured filter
      if (filters.value.featured) {
        filtered = filtered.filter((course) => course.isFeatured);
      }

      return filtered;
    });

    const totalPages = computed(() =>
      Math.max(1, Math.ceil(filteredCourses.value.length / pageSize.value))
    );
    const paginatedCourses = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredCourses.value.slice(start, start + pageSize.value);
    });

    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };
    const prevPage = () => goToPage(currentPage.value - 1);
    const nextPage = () => goToPage(currentPage.value + 1);

    watch([filteredCourses, viewMode], () => {
      currentPage.value = 1;
    });

    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    const toggleFilters = () => {
      showFilters.value = !showFilters.value;
    };

    const changeViewMode = (mode) => {
      viewMode.value = mode;
    };

    const applyFilters = () => {
      // Filters are applied automatically through computed property
    };

    const editCourse = (course) => {
      editingCourse.value = course;
      courseForm.value = {
        title: course.title,
        description: course.description,
        shortDescription: course.shortDescription || "",
        category: course.category,
        level: course.level,
        price: course.price,
        duration: course.duration,
        isFree: course.isFree,
        isFeatured: course.isFeatured,
        status: course.status,
        tags: course.tags || [],
        requirements: course.requirements || [],
        learningOutcomes: course.learningOutcomes || [],
      };
      showCreateModal.value = true;
    };

    const deleteCourse = async (course) => {
      if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
        try {
          await courseStore.deleteCourse(course._id);
          console.log("Course deleted successfully");
        } catch (error) {
          console.error("Failed to delete course:", error);
          alert("Failed to delete course");
        }
      }
    };

    const closeModal = () => {
      showCreateModal.value = false;
      editingCourse.value = null;
      courseForm.value = {
        title: "",
        description: "",
        shortDescription: "",
        category: "",
        level: "beginner",
        price: 0,
        duration: 0,
        isFree: false,
        isFeatured: false,
        status: "draft",
        tags: [],
        requirements: [],
        learningOutcomes: [],
      };
    };

    const saveCourse = async () => {
      saving.value = true;
      try {
        if (editingCourse.value) {
          await courseStore.updateCourse(
            editingCourse.value._id,
            courseForm.value
          );
        } else {
          await courseStore.createCourse(courseForm.value);
        }
        closeModal();
      } catch (error) {
        console.error("Failed to save course:", error);
        alert("Failed to save course");
      } finally {
        saving.value = false;
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/categories");
        const data = await response.json();
        categories.value = data.data || [];
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    onMounted(async () => {
      try {
        await courseStore.fetchCourses({
          includeAllStatuses: true,
          limit: "all",
        });
        await fetchCategories();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    });

    return {
      searchQuery,
      viewMode,
      showFilters,
      showCreateModal,
      editingCourse,
      saving,
      categories,
      courseForm,
      filters,
      courses,
      loading,
      filteredCourses,
      totalCourses,
      featuredCourses,
      freeCourses,
      totalStudents,
      currentPage,
      pageSize,
      totalPages,
      paginatedCourses,
      goToPage,
      prevPage,
      nextPage,
      handleSearch,
      toggleFilters,
      changeViewMode,
      applyFilters,
      editCourse,
      deleteCourse,
      closeModal,
      saveCourse,
    };
  },
};
</script>

<style lang="scss">
@use "@/styles/pages/cms" as *;
</style>
