<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <div class="header-left">
            <h1 class="page-title">Pricing & Marketing</h1>
            <p class="page-subtitle">
              Manage pricing plans and marketing campaigns
            </p>
          </div>
          <button
            class="create-btn"
            @click="showCreateModal = true"
          >
            <i class="icon plus-icon"></i>
            <span>Create New</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <!-- Tabs Navigation -->
        <div class="tabs-navigation">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'pricing' }"
            @click="activeTab = 'pricing'"
          >
            <i class="mdi mdi-currency-usd"></i>
            <span>Pricing Plans</span>
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'campaigns' }"
            @click="activeTab = 'campaigns'"
          >
            <i class="mdi mdi-bullhorn"></i>
            <span>Marketing Campaigns</span>
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'promotions' }"
            @click="activeTab = 'promotions'"
          >
            <i class="mdi mdi-tag"></i>
            <span>Promotions & Discounts</span>
          </button>
        </div>

        <!-- Pricing Plans Tab -->
        <div
          v-if="activeTab === 'pricing'"
          class="tab-content"
        >
          <div class="section-header">
            <h2>Pricing Plans</h2>
            <div class="section-actions">
              <SearchBar
                @search="handleSearch"
                placeholder="Search plans..."
              />
              <ViewToggle v-model="viewMode" />
            </div>
          </div>

          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="loading-state"
          >
            <div class="loading-spinner"></div>
            <p>Loading pricing plans...</p>
          </div>

          <!-- Error State -->
          <div
            v-else-if="errorMessage"
            class="error-state"
          >
            <div class="error-icon">⚠️</div>
            <h3>Error loading pricing plans</h3>
            <p>{{ errorMessage }}</p>
            <button
              class="btn btn-primary"
              @click="fetchPricingPlans"
            >
              Try Again
            </button>
          </div>

          <!-- Content -->
          <div
            v-else
            class="pricing-content"
          >
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid'"
              class="pricing-grid"
            >
              <div
                v-for="plan in filteredPlans"
                :key="plan.id"
                class="pricing-card"
                :class="{ featured: plan.featured }"
              >
                <div class="plan-header">
                  <div class="plan-name">{{ plan.name }}</div>
                  <div class="plan-price">
                    <span class="currency">{{ plan.currency }}</span>
                    <span class="amount">{{ plan.price }}</span>
                    <span class="period">/{{ plan.period }}</span>
                  </div>
                  <div
                    v-if="plan.featured"
                    class="featured-badge"
                  >
                    Most Popular
                  </div>
                </div>

                <div class="plan-description">{{ plan.description }}</div>

                <div class="plan-features">
                  <div
                    v-for="feature in plan.features"
                    :key="feature"
                    class="feature-item"
                  >
                    <i class="mdi mdi-check text-success"></i>
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <div class="plan-actions">
                  <button
                    class="btn btn-outline"
                    @click="editPlan(plan)"
                  >
                    <i class="mdi mdi-pencil"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="duplicatePlan(plan)"
                  >
                    <i class="mdi mdi-content-copy"></i>
                    <span>Duplicate</span>
                  </button>
                </div>

                <div class="plan-stats">
                  <div class="stat">
                    <span class="stat-label">Subscribers</span>
                    <span class="stat-value">{{ plan.subscribers }}</span>
                  </div>
                  <div class="stat">
                    <span class="stat-label">Revenue</span>
                    <span class="stat-value">
                      {{ formatCurrency(plan.revenue) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table View -->
            <div
              v-else
              class="pricing-table-container"
            >
              <table class="pricing-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Period</th>
                    <th>Features</th>
                    <th>Subscribers</th>
                    <th>Revenue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="plan in filteredPlans"
                    :key="plan.id"
                  >
                    <td class="plan-name-cell">
                      <div class="plan-info">
                        <div class="plan-name">{{ plan.name }}</div>
                        <div class="plan-description">
                          {{ plan.description }}
                        </div>
                      </div>
                    </td>
                    <td class="price-cell">
                      <div class="price-info">
                        <span class="currency">{{ plan.currency }}</span>
                        <span class="amount">{{ plan.price }}</span>
                      </div>
                    </td>
                    <td>{{ plan.period }}</td>
                    <td class="features-cell">
                      <div class="features-list">
                        <span
                          v-for="feature in plan.features.slice(0, 3)"
                          :key="feature"
                          class="feature-tag"
                        >
                          {{ feature }}
                        </span>
                        <span
                          v-if="plan.features.length > 3"
                          class="more-features"
                        >
                          +{{ plan.features.length - 3 }} more
                        </span>
                      </div>
                    </td>
                    <td>{{ plan.subscribers }}</td>
                    <td>{{ formatCurrency(plan.revenue) }}</td>
                    <td>
                      <span
                        class="status-badge"
                        :class="plan.status"
                      >
                        {{ plan.status }}
                      </span>
                    </td>
                    <td class="actions-cell">
                      <div class="action-buttons">
                        <button
                          class="btn-icon"
                          @click="editPlan(plan)"
                          title="Edit"
                        >
                          <i class="mdi mdi-pencil"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="duplicatePlan(plan)"
                          title="Duplicate"
                        >
                          <i class="mdi mdi-content-copy"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="deletePlan(plan)"
                          title="Delete"
                        >
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Marketing Campaigns Tab -->
        <div
          v-if="activeTab === 'campaigns'"
          class="tab-content"
        >
          <div class="section-header">
            <h2>Marketing Campaigns</h2>
            <div class="section-actions">
              <SearchBar
                @search="handleSearch"
                placeholder="Search campaigns..."
              />
              <ViewToggle v-model="viewMode" />
            </div>
          </div>

          <div class="campaigns-content">
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid'"
              class="campaigns-grid"
            >
              <div
                v-for="campaign in campaigns"
                :key="campaign.id"
                class="campaign-card"
                :class="campaign.status"
              >
                <div class="campaign-header">
                  <div class="campaign-name">{{ campaign.name }}</div>
                  <div class="campaign-status">
                    <span
                      class="status-badge"
                      :class="campaign.status"
                    >
                      {{ campaign.status }}
                    </span>
                  </div>
                </div>

                <div class="campaign-description">
                  {{ campaign.description }}
                </div>

                <div class="campaign-metrics">
                  <div class="metric">
                    <span class="metric-label">Budget</span>
                    <span class="metric-value">
                      {{ formatCurrency(campaign.budget) }}
                    </span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Spent</span>
                    <span class="metric-value">
                      {{ formatCurrency(campaign.spent) }}
                    </span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Clicks</span>
                    <span class="metric-value">{{ campaign.clicks }}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Conversions</span>
                    <span class="metric-value">{{ campaign.conversions }}</span>
                  </div>
                </div>

                <div class="campaign-progress">
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      :style="{
                        width: `${(campaign.spent / campaign.budget) * 100}%`,
                      }"
                    ></div>
                  </div>
                  <span class="progress-text"
                    >{{ Math.round((campaign.spent / campaign.budget) * 100) }}%
                    spent</span
                  >
                </div>

                <div class="campaign-actions">
                  <button
                    class="btn btn-outline"
                    @click="editCampaign(campaign)"
                  >
                    <i class="mdi mdi-pencil"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="viewCampaign(campaign)"
                  >
                    <i class="mdi mdi-eye"></i>
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Table View -->
            <div
              v-else
              class="campaigns-table-container"
            >
              <table class="campaigns-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Spent</th>
                    <th>Clicks</th>
                    <th>Conversions</th>
                    <th>CTR</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="campaign in campaigns"
                    :key="campaign.id"
                  >
                    <td class="campaign-name-cell">
                      <div class="campaign-info">
                        <div class="campaign-name">{{ campaign.name }}</div>
                        <div class="campaign-description">
                          {{ campaign.description }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        class="status-badge"
                        :class="campaign.status"
                      >
                        {{ campaign.status }}
                      </span>
                    </td>
                    <td>{{ formatCurrency(campaign.budget) }}</td>
                    <td>{{ formatCurrency(campaign.spent) }}</td>
                    <td>{{ campaign.clicks }}</td>
                    <td>{{ campaign.conversions }}</td>
                    <td>
                      {{
                        (
                          (campaign.clicks / campaign.impressions) *
                          100
                        ).toFixed(2)
                      }}%
                    </td>
                    <td class="actions-cell">
                      <div class="action-buttons">
                        <button
                          class="btn-icon"
                          @click="editCampaign(campaign)"
                          title="Edit"
                        >
                          <i class="mdi mdi-pencil"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="viewCampaign(campaign)"
                          title="View"
                        >
                          <i class="mdi mdi-eye"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="deleteCampaign(campaign)"
                          title="Delete"
                        >
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Promotions Tab -->
        <div
          v-if="activeTab === 'promotions'"
          class="tab-content"
        >
          <div class="section-header">
            <h2>Promotions & Discounts</h2>
            <div class="section-actions">
              <SearchBar
                @search="handleSearch"
                placeholder="Search promotions..."
              />
              <ViewToggle v-model="viewMode" />
            </div>
          </div>

          <div class="promotions-content">
            <!-- Grid View -->
            <div
              v-if="viewMode === 'grid'"
              class="promotions-grid"
            >
              <div
                v-for="promotion in promotions"
                :key="promotion.id"
                class="promotion-card"
                :class="promotion.status"
              >
                <div class="promotion-header">
                  <div class="promotion-code">{{ promotion.code }}</div>
                  <div class="promotion-status">
                    <span
                      class="status-badge"
                      :class="promotion.status"
                    >
                      {{ promotion.status }}
                    </span>
                  </div>
                </div>

                <div class="promotion-details">
                  <div class="promotion-name">{{ promotion.name }}</div>
                  <div class="promotion-description">
                    {{ promotion.description }}
                  </div>
                </div>

                <div class="promotion-metrics">
                  <div class="metric">
                    <span class="metric-label">Discount</span>
                    <span class="metric-value">{{ promotion.discount }}%</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Used</span>
                    <span class="metric-value"
                      >{{ promotion.used }}/{{ promotion.limit }}</span
                    >
                  </div>
                  <div class="metric">
                    <span class="metric-label">Revenue</span>
                    <span class="metric-value">
                      {{ formatCurrency(promotion.revenue) }}
                    </span>
                  </div>
                </div>

                <div class="promotion-dates">
                  <div class="date-info">
                    <span class="date-label">Valid from:</span>
                    <span class="date-value">
                      {{ formatDate(promotion.validFrom) }}
                    </span>
                  </div>
                  <div class="date-info">
                    <span class="date-label">Valid until:</span>
                    <span class="date-value">
                      {{ formatDate(promotion.validUntil) }}
                    </span>
                  </div>
                </div>

                <div class="promotion-actions">
                  <button
                    class="btn btn-outline"
                    @click="editPromotion(promotion)"
                  >
                    <i class="mdi mdi-pencil"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="viewPromotion(promotion)"
                  >
                    <i class="mdi mdi-eye"></i>
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Table View -->
            <div
              v-else
              class="promotions-table-container"
            >
              <table class="promotions-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Discount</th>
                    <th>Usage</th>
                    <th>Revenue</th>
                    <th>Valid Period</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="promotion in promotions"
                    :key="promotion.id"
                  >
                    <td class="code-cell">
                      <div class="code-info">
                        <span class="promotion-code">{{ promotion.code }}</span>
                      </div>
                    </td>
                    <td class="name-cell">
                      <div class="promotion-info">
                        <div class="promotion-name">{{ promotion.name }}</div>
                        <div class="promotion-description">
                          {{ promotion.description }}
                        </div>
                      </div>
                    </td>
                    <td>{{ promotion.discount }}%</td>
                    <td>{{ promotion.used }}/{{ promotion.limit }}</td>
                    <td>{{ formatCurrency(promotion.revenue) }}</td>
                    <td class="dates-cell">
                      <div class="dates-info">
                        <div class="date-row">
                          <span class="date-label">From:</span>
                          <span class="date-value">
                            {{ formatDate(promotion.validFrom) }}
                          </span>
                        </div>
                        <div class="date-row">
                          <span class="date-label">To:</span>
                          <span class="date-value">
                            {{ formatDate(promotion.validUntil) }}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        class="status-badge"
                        :class="promotion.status"
                      >
                        {{ promotion.status }}
                      </span>
                    </td>
                    <td class="actions-cell">
                      <div class="action-buttons">
                        <button
                          class="btn-icon"
                          @click="editPromotion(promotion)"
                          title="Edit"
                        >
                          <i class="mdi mdi-pencil"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="viewPromotion(promotion)"
                          title="View"
                        >
                          <i class="mdi mdi-eye"></i>
                        </button>
                        <button
                          class="btn-icon"
                          @click="deletePromotion(promotion)"
                          title="Delete"
                        >
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import ViewToggle from "@/components/ui/ViewToggle.vue";
import api from "@/utils/api.js";

export default {
  name: "PricingMarketing",
  components: {
    Sidebar,
    SearchBar,
    ViewToggle,
  },
  data() {
    return {
      activeTab: "pricing",
      viewMode: "grid",
      isLoading: false,
      errorMessage: "",
      searchQuery: "",
      showCreateModal: false,

      // Server data
      pricingPlans: [],
      campaigns: [],
      promotions: [],
    };
  },
  mounted() {
    this.fetchPricingPlans();
    this.fetchCampaigns();
    this.fetchPromotions();
  },
  computed: {
    filteredPlans() {
      // Server-side search; tampilkan langsung hasil pricingPlans
      return this.pricingPlans;
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
      const params = query ? { q: query } : {};
      if (this.activeTab === "pricing") this.fetchPricingPlans(params);
      else if (this.activeTab === "campaigns") this.fetchCampaigns(params);
      else this.fetchPromotions(params);
    },
    async fetchPricingPlans(params = {}) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/pricing", { params });
        const items = Array.isArray(data?.data) ? data.data : [];
        this.pricingPlans = items.map((p) => ({
          id: p._id || p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          currency: p.currency,
          period: p.period,
          features: Array.isArray(p.features) ? p.features : [],
          subscribers: p.subscribers ?? 0,
          revenue: p.revenue ?? 0,
          status: p.status,
          featured: !!p.featured,
        }));
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load pricing plans";
        this.pricingPlans = [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCampaigns(params = {}) {
      try {
        const { data } = await api.get("/campaigns", { params });
        const items = Array.isArray(data?.data) ? data.data : [];
        this.campaigns = items.map((c) => ({
          id: c._id || c.id,
          name: c.name,
          description: c.description,
          status: c.status,
          budget: c.budget ?? 0,
          spent: c.spent ?? 0,
          clicks: c.clicks ?? 0,
          impressions: c.impressions ?? 0,
          conversions: c.conversions ?? 0,
        }));
      } catch (err) {
        // Silent error for non-active tab
        this.campaigns = [];
      }
    },
    async fetchPromotions(params = {}) {
      try {
        const { data } = await api.get("/promotions", { params });
        const items = Array.isArray(data?.data) ? data.data : [];
        this.promotions = items.map((p) => ({
          id: p._id || p.id,
          code: p.code,
          name: p.name,
          description: p.description,
          discount: p.discount,
          used: p.used ?? 0,
          limit: p.limit ?? 0,
          revenue: p.revenue ?? 0,
          validFrom: p.validFrom,
          validUntil: p.validUntil,
          status: p.status,
        }));
      } catch (err) {
        // Silent error for non-active tab
        this.promotions = [];
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    editPlan(plan) {
      console.log("Edit plan:", plan);
    },
    duplicatePlan(plan) {
      console.log("Duplicate plan:", plan);
    },
    deletePlan(plan) {
      console.log("Delete plan:", plan);
    },
    editCampaign(campaign) {
      console.log("Edit campaign:", campaign);
    },
    viewCampaign(campaign) {
      console.log("View campaign:", campaign);
    },
    deleteCampaign(campaign) {
      console.log("Delete campaign:", campaign);
    },
    editPromotion(promotion) {
      console.log("Edit promotion:", promotion);
    },
    viewPromotion(promotion) {
      console.log("View promotion:", promotion);
    },
    deletePromotion(promotion) {
      console.log("Delete promotion:", promotion);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
@use "@/styles/pages/pricing-marketing" as *;
</style>
