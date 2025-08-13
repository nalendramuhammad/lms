<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Search Jobs</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search jobs by title, company, or location..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="job-count">{{ filteredJobs.length }} jobs found</span>
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>
        </div>

        <div
          class="jobs-grid"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <JobCard
            v-for="job in filteredJobs"
            :key="job.id"
            :job="job"
            @edit="editJob"
            @delete="deleteJob"
          />
        </div>

        <div
          v-if="filteredJobs.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">💼</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria or post a new job.</p>
          <button class="btn">Post New Job</button>
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
import JobCard from "@/components/ui/JobCard.vue";
import api from "@/utils/api.js";

export default {
  name: "SearchJobs",
  components: {
    Sidebar,
    SearchBar,
    FilterButton,
    ViewToggle,
    JobCard,
  },
  data() {
    return {
      searchQuery: "",
      viewMode: "grid",
      jobs: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredJobs() {
      // Server-side search; tampilkan langsung hasil jobs
      return this.jobs;
    },
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/jobs", { params });
        const items = Array.isArray(data?.data) ? data.data : [];

        // Map field backend -> UI
        this.jobs = items.map((j) => ({
          id: j._id || j.id,
          title: j.title,
          company: j.company,
          companyLogo: j.companyLogo,
          description: j.description,
          location: j.location,
          salary: j.salaryText || "",
          type: j.type
            ? j.type.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/-/g, "-")
            : "",
          experience: j.experienceText || "",
          tags: j.tags || [],
          postedDate: j.postedDate,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message || err.message || "Failed to load jobs";
        this.jobs = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      // server-side search by q
      this.fetchJobs({ q: query });
    },
    toggleFilters() {
      console.log("Toggle filters");
    },
    changeViewMode(mode) {
      this.viewMode = mode;
    },
    editJob(job) {
      console.log("Edit job:", job);
    },
    deleteJob(job) {
      console.log("Delete job:", job);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
