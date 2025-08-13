<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Certifications</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Create Certification</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search certifications by name, provider, or description..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="certification-count"
              >{{ filteredCertifications.length }} certifications found</span
            >
            <ViewToggle
              :viewMode="viewMode"
              @change="changeViewMode"
            />
          </div>
        </div>

        <!-- Table View -->
        <div
          class="certifications-table-container"
          :class="{ 'list-view': viewMode === 'list' }"
        >
          <table class="certifications-table">
            <thead>
              <tr>
                <th>LOGO</th>
                <th>NAME</th>
                <th>PROVIDER</th>
                <th>DESCRIPTION</th>
                <th>LEVEL</th>
                <th>DURATION</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="certification in filteredCertifications"
                :key="certification.id"
              >
                <td class="certification-logo-cell">
                  <div class="certification-logo">
                    <img
                      :src="certification.logo"
                      :alt="certification.name"
                    />
                  </div>
                </td>
                <td class="certification-name-cell">
                  <div class="certification-info">
                    <h4 class="certification-name">{{ certification.name }}</h4>
                    <p class="certification-code">{{ certification.code }}</p>
                  </div>
                </td>
                <td class="certification-provider-cell">
                  <span class="provider-tag">{{ certification.provider }}</span>
                </td>
                <td class="certification-description-cell">
                  <p class="certification-text">
                    {{ certification.description }}
                  </p>
                </td>
                <td class="certification-level-cell">
                  <span
                    class="level-tag"
                    :class="certification.level.toLowerCase()"
                    >{{ certification.level }}</span
                  >
                </td>
                <td class="certification-duration-cell">
                  <span class="duration-text">{{
                    certification.duration
                  }}</span>
                </td>
                <td class="certification-price-cell">
                  <span class="price-text">{{
                    formatPrice(certification.price)
                  }}</span>
                </td>
                <td class="certification-status-cell">
                  <span
                    class="status-tag"
                    :class="certification.status.toLowerCase()"
                    >{{ certification.status }}</span
                  >
                </td>
                <td class="certification-actions-cell">
                  <div class="action-buttons">
                    <button
                      class="action-btn edit-btn"
                      @click="editCertification(certification)"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteCertification(certification)"
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
          class="certifications-grid"
          v-if="viewMode === 'grid'"
        >
          <div
            v-for="certification in filteredCertifications"
            :key="certification.id"
            class="certification-card"
          >
            <div class="certification-header">
              <div class="certification-logo">
                <img
                  :src="certification.logo"
                  :alt="certification.name"
                />
              </div>
              <div class="certification-info">
                <h4 class="certification-name">{{ certification.name }}</h4>
                <p class="certification-code">{{ certification.code }}</p>
                <div class="certification-meta">
                  <span class="provider-tag">{{ certification.provider }}</span>
                  <span
                    class="status-tag"
                    :class="certification.status.toLowerCase()"
                    >{{ certification.status }}</span
                  >
                </div>
              </div>
              <div class="certification-actions">
                <button
                  class="action-btn edit-btn"
                  @click="editCertification(certification)"
                >
                  <i class="icon edit-icon"></i>
                </button>
                <button
                  class="action-btn delete-btn"
                  @click="deleteCertification(certification)"
                >
                  <i class="icon delete-icon"></i>
                </button>
              </div>
            </div>

            <div class="certification-body">
              <p class="certification-text">{{ certification.description }}</p>
            </div>

            <div class="certification-footer">
              <div class="certification-meta">
                <span
                  class="level-tag"
                  :class="certification.level.toLowerCase()"
                  >{{ certification.level }}</span
                >
                <span class="duration-text">{{ certification.duration }}</span>
                <span class="price-text">{{
                  formatPrice(certification.price)
                }}</span>
              </div>
              <div class="certification-date">
                <span class="date-text">{{
                  formatDate(certification.createdAt)
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredCertifications.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">🏆</div>
          <h3>No certifications found</h3>
          <p>
            Try adjusting your search criteria or create a new certification.
          </p>
          <button class="btn btn-primary">Create Certification</button>
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
  name: "Certifications",
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
      certifications: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    filteredCertifications() {
      // Server-side search; tampilkan langsung hasil certifications
      return this.certifications;
    },
  },
  mounted() {
    this.fetchCertifications();
  },
  methods: {
    async fetchCertifications(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/certificates", { params });
        const items = Array.isArray(data?.data) ? data.data : [];

        // Map field backend -> UI
        this.certifications = items.map((c) => ({
          id: c._id || c.id,
          name: c.name,
          code: c.code,
          logo: c.logo,
          provider: c.provider,
          description: c.description,
          level: c.level
            ? c.level.replace(/\b\w/g, (c) => c.toUpperCase())
            : "",
          duration: c.duration,
          price: c.price,
          status: c.status
            ? c.status.replace(/\b\w/g, (c) => c.toUpperCase())
            : "",
          createdAt: c.createdAt,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load certifications";
        this.certifications = [];
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      // server-side search by q
      this.fetchCertifications({ q: query });
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
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    },
    editCertification(certification) {
      console.log("Edit certification:", certification);
    },
    deleteCertification(certification) {
      console.log("Delete certification:", certification);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
