<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Badges</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Create Badge</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search badges by name, category, or description..."
            />
            <FilterButton
              label="Filters"
              :isActive="false"
              @click="toggleFilters"
            />
          </div>
        </div>

        <div class="badges-table-container">
          <table class="badges-table">
            <thead>
              <tr>
                <th>BADGE</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>RARITY</th>
                <th>POINTS</th>
                <th>REQUIREMENTS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="badge in filteredBadges"
                :key="badge.id"
              >
                <td class="badge-icon-cell">
                  <div class="badge-icon">
                    <span class="badge-emoji">{{ badge.icon }}</span>
                  </div>
                </td>
                <td class="badge-name-cell">
                  <div class="badge-info">
                    <h4 class="badge-title">{{ badge.name }}</h4>
                    <p class="badge-description">{{ badge.description }}</p>
                  </div>
                </td>
                <td class="badge-category-cell">
                  <span class="category-tag">{{ badge.category }}</span>
                </td>
                <td class="badge-rarity-cell">
                  <span
                    class="rarity-tag"
                    :class="badge.rarity"
                    >{{ badge.rarity }}</span
                  >
                </td>
                <td class="badge-points-cell">
                  <span class="points-value">{{ badge.points }} pts</span>
                </td>
                <td class="badge-requirements-cell">
                  <span class="requirements-text">{{ badge.requirement }}</span>
                </td>
                <td class="badge-status-cell">
                  <span
                    class="status-tag"
                    :class="badge.status.toLowerCase()"
                    >{{ badge.status }}</span
                  >
                </td>
                <td class="badge-actions-cell">
                  <div class="action-buttons">
                    <button
                      class="action-btn edit-btn"
                      @click="editBadge(badge)"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteBadge(badge)"
                    >
                      <i class="icon delete-icon"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="filteredBadges.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">🏆</div>
          <h3>No badges found</h3>
          <p>Try adjusting your search criteria or create a new badge.</p>
          <button class="btn btn-primary">Create Badge</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import FilterButton from "@/components/ui/FilterButton.vue";
import BadgeCard from "@/components/ui/BadgeCard.vue";

export default {
  name: "Badges",
  components: {
    Sidebar,
    SearchBar,
    FilterButton,
    BadgeCard,
  },
  data() {
    return {
      searchQuery: "",
      badges: [
        {
          id: 1,
          name: "Data Master",
          category: "Data Science",
          description: "Achievement for mastering data analysis skills",
          icon: "📊",
          requirement: "Complete 3 data analysis courses",
          points: 100,
          rarity: "rare",
          status: "ACTIVE",
        },
        {
          id: 2,
          name: "Cloud Architect",
          category: "Cloud Computing",
          description: "Expert badge for cloud infrastructure design",
          icon: "☁️",
          requirement: "Complete AWS and Azure certifications",
          points: 200,
          rarity: "epic",
          status: "ACTIVE",
        },
        {
          id: 3,
          name: "Network Guru",
          category: "Networking",
          description: "Master of networking fundamentals and protocols",
          icon: "🌐",
          requirement: "Complete CCNA certification",
          points: 150,
          rarity: "rare",
          status: "ACTIVE",
        },
        {
          id: 4,
          name: "Project Leader",
          category: "Project Management",
          description: "Leadership badge for project management excellence",
          icon: "🎯",
          requirement: "Complete PMP certification",
          points: 300,
          rarity: "legendary",
          status: "ACTIVE",
        },
        {
          id: 5,
          name: "Quick Learner",
          category: "General",
          description: "Fast completion badge for rapid skill acquisition",
          icon: "⚡",
          requirement: "Complete 5 courses in 30 days",
          points: 50,
          rarity: "common",
          status: "ACTIVE",
        },
        {
          id: 6,
          name: "Perfect Score",
          category: "Achievement",
          description: "Achievement for scoring 100% on any certification exam",
          icon: "🏆",
          requirement: "Score 100% on any exam",
          points: 250,
          rarity: "epic",
          status: "DRAFT",
        },
      ],
    };
  },
  computed: {
    filteredBadges() {
      if (!this.searchQuery) return this.badges;

      return this.badges.filter(
        (badge) =>
          badge.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          badge.category
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          badge.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    toggleFilters() {
      console.log("Toggle filters");
    },
    editBadge(badge) {
      console.log("Edit badge:", badge);
    },
    deleteBadge(badge) {
      console.log("Delete badge:", badge);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
