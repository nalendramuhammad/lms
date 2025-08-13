<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Free Courses</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Create New</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search free courses by title or description..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="course-count"
              >{{ filteredCourses.length }} free courses found</span
            >
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>
        </div>

        <div
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
          v-if="filteredCourses.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">📚</div>
          <h3>No free courses found</h3>
          <p>Try adjusting your search criteria or create a new free course.</p>
          <button class="btn btn-primary">Create Free Course</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import FilterButton from "@/components/ui/FilterButton.vue";
import ViewToggle from "@/components/ui/ViewToggle.vue";
import CourseCard from "@/components/ui/CourseCard.vue";
import { useCourseStore } from "@/stores/courses";

export default {
  name: "FreeCourses",
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
    const loading = computed(() => courseStore.loading);
    const currentPage = ref(1);
    const pageSize = ref(12);

    const filteredCourses = computed(() => {
      let courses = courseStore.courses;
      // ensure only free (backend already filters, but double-guard on client)
      courses = courses.filter(
        (c) => c.isFree === true || (c.price ?? 0) === 0
      );

      if (!searchQuery.value) return courses;
      const q = searchQuery.value.toLowerCase();
      return courses.filter(
        (course) =>
          course.title?.toLowerCase().includes(q) ||
          course.description?.toLowerCase().includes(q) ||
          course.shortDescription?.toLowerCase().includes(q)
      );
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
    const toggleFilters = () => {};
    const changeViewMode = (mode) => {
      viewMode.value = mode;
    };
    const editCourse = (course) => {
      console.log("Edit course:", course);
    };
    const deleteCourse = async (course) => {
      if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
        try {
          await courseStore.deleteCourse(course._id);
        } catch (e) {
          alert("Failed to delete course");
        }
      }
    };

    onMounted(async () => {
      try {
        await courseStore.fetchCourses({ price: "free", limit: "all" });
      } catch (e) {
        console.error("Failed to fetch free courses", e);
      }
    });

    return {
      searchQuery,
      viewMode,
      loading,
      filteredCourses,
      paginatedCourses,
      currentPage,
      pageSize,
      totalPages,
      goToPage,
      prevPage,
      nextPage,
      handleSearch,
      toggleFilters,
      changeViewMode,
      editCourse,
      deleteCourse,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
