<template>
  <div class="cms-layout">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">Analytics Dashboard</h1>
          <div class="header-actions">
            <select class="date-range-select">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button class="export-btn">
              <i class="icon download-icon"></i>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div class="content-body">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="loading-state"
        >
          <div class="loading-spinner"></div>
          <p>Loading analytics data...</p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="errorMessage"
          class="error-state"
        >
          <div class="error-icon">⚠️</div>
          <h3>Error loading analytics</h3>
          <p>{{ errorMessage }}</p>
          <button
            class="btn btn-primary"
            @click="fetchAnalytics"
          >
            Try Again
          </button>
        </div>

        <!-- Dashboard Content -->
        <div
          v-else
          class="analytics-dashboard"
        >
          <!-- Key Metrics Row -->
          <div class="metrics-row">
            <div class="metric-card">
              <div class="metric-icon">👥</div>
              <div class="metric-content">
                <h3 class="metric-value">
                  {{
                    formatNumber(analytics.keyMetrics?.totalUsers?.value || 0)
                  }}
                </h3>
                <p class="metric-label">Total Users</p>
                <span class="metric-growth positive"
                  >+{{ analytics.keyMetrics?.totalUsers?.growth || 0 }}%</span
                >
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon">📚</div>
              <div class="metric-content">
                <h3 class="metric-value">
                  {{
                    formatNumber(analytics.keyMetrics?.totalCourses?.value || 0)
                  }}
                </h3>
                <p class="metric-label">Total Courses</p>
                <span class="metric-growth positive"
                  >+{{ analytics.keyMetrics?.totalCourses?.growth || 0 }}%</span
                >
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon">💰</div>
              <div class="metric-content">
                <h3 class="metric-value">
                  {{
                    formatCurrency(
                      analytics.keyMetrics?.totalRevenue?.value || 0
                    )
                  }}
                </h3>
                <p class="metric-label">Total Revenue</p>
                <span class="metric-growth positive"
                  >+{{ analytics.keyMetrics?.totalRevenue?.growth || 0 }}%</span
                >
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon">✅</div>
              <div class="metric-content">
                <h3 class="metric-value">
                  {{
                    formatNumber(
                      analytics.keyMetrics?.activeEnrollments?.value || 0
                    )
                  }}
                </h3>
                <p class="metric-label">Active Enrollments</p>
                <span class="metric-growth positive"
                  >+{{
                    analytics.keyMetrics?.activeEnrollments?.growth || 0
                  }}%</span
                >
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="charts-row">
            <!-- Revenue Trend Chart -->
            <div class="chart-card">
              <div class="chart-header">
                <h3>Revenue Trend (6 Months)</h3>
                <div class="chart-actions">
                  <button class="chart-btn active">Monthly</button>
                  <button class="chart-btn">Weekly</button>
                </div>
              </div>
              <div class="chart-container">
                <div class="revenue-chart">
                  <div
                    v-for="(item, index) in analytics.revenueTrend"
                    :key="index"
                    class="chart-bar"
                    :style="{ height: getBarHeight(item.revenue) }"
                  >
                    <div class="bar-value">
                      {{ formatCurrency(item.revenue) }}
                    </div>
                    <div class="bar-label">{{ item.month }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Revenue by Category Chart -->
            <div class="chart-card">
              <div class="chart-header">
                <h3>Revenue by Category</h3>
              </div>
              <div class="chart-container">
                <div class="pie-chart">
                  <div
                    class="pie-visual"
                    :style="{ background: pieGradient }"
                  ></div>
                  <div class="pie-legend">
                    <div
                      v-for="(item, index) in analytics.revenueByCategory"
                      :key="index"
                      class="legend-item"
                    >
                      <div
                        class="legend-color"
                        :style="{ background: getCategoryColor(index) }"
                      ></div>
                      <div class="legend-text">
                        <div class="legend-label">{{ item._id }}</div>
                        <div class="legend-value">
                          {{ formatCurrency(item.revenue) }} ·
                          {{ calculatePercentage(item.revenue) }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tables Row -->
          <div class="tables-row">
            <!-- Top Performing Courses -->
            <div class="table-card">
              <div class="table-header">
                <h3>Top Performing Courses</h3>
              </div>
              <div class="table-container">
                <table class="analytics-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Enrollments</th>
                      <th>Revenue</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="course in analytics.topPerformingCourses"
                      :key="course._id"
                    >
                      <td class="course-name">{{ course.title }}</td>
                      <td>{{ formatNumber(course.enrollmentCount) }}</td>
                      <td>{{ formatCurrency(course.revenue) }}</td>
                      <td>
                        <div class="rating">
                          <span class="stars">★★★★★</span>
                          <span class="rating-value">{{ course.rating }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Geographic Distribution -->
            <div class="table-card">
              <div class="table-header">
                <h3>Geographic Distribution</h3>
              </div>
              <div class="table-container">
                <table class="analytics-table">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Users</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="country in analytics.geographicDistribution"
                      :key="country.country"
                    >
                      <td class="country-name">{{ country.country }}</td>
                      <td>{{ formatNumber(country.users) }}</td>
                      <td>
                        <div class="percentage-bar">
                          <div
                            class="bar-fill"
                            :style="{ width: country.percentage + '%' }"
                          ></div>
                          <span class="percentage-text"
                            >{{ country.percentage }}%</span
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Additional Charts Row -->
          <div class="charts-row">
            <!-- User Activity Chart -->
            <div class="chart-card">
              <div class="chart-header">
                <h3>User Activity (24h)</h3>
              </div>
              <div class="chart-container">
                <div class="activity-chart">
                  <div
                    v-for="(activity, index) in analytics.userActivity"
                    :key="index"
                    class="activity-point"
                    :data-value="`${activity.count} users`"
                    :style="{
                      left: `${(activity._id / 24) * 100}%`,
                      height: `${(activity.count / maxActivity) * 100}%`,
                    }"
                  ></div>
                  <div class="time-labels">
                    <span>00:00</span>
                    <span>04:00</span>
                    <span>08:00</span>
                    <span>12:00</span>
                    <span>16:00</span>
                    <span>20:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Device Usage Chart -->
            <div class="chart-card">
              <div class="chart-header">
                <h3>Device Usage</h3>
              </div>
              <div class="chart-container">
                <div class="device-chart">
                  <div
                    v-for="device in analytics.deviceUsage"
                    :key="device.device"
                    class="device-bar"
                  >
                    <div class="device-label">{{ device.device }}</div>
                    <div class="device-bar-container">
                      <div
                        class="device-bar-fill"
                        :style="{ width: device.percentage + '%' }"
                      ></div>
                      <span class="device-percentage"
                        >{{ device.percentage }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar.vue";
import api from "@/utils/api.js";

export default {
  name: "Analytics",
  components: {
    Sidebar,
  },
  data() {
    return {
      analytics: {
        keyMetrics: {},
        revenueTrend: [],
        revenueByCategory: [],
        topPerformingCourses: [],
        userActivity: [],
        deviceUsage: [],
        geographicDistribution: [],
      },
      isLoading: false,
      errorMessage: "",
      maxActivity: 0,
      pieGradient: "",
    };
  },
  mounted() {
    this.fetchAnalytics();
  },
  methods: {
    async fetchAnalytics() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const { data } = await api.get("/analytics/dashboard");
        this.analytics = data.data;

        // Calculate max activity for chart scaling
        if (this.analytics.userActivity.length > 0) {
          this.maxActivity = Math.max(
            ...this.analytics.userActivity.map((a) => a.count)
          );
        }
        this.updatePieGradient();
      } catch (err) {
        this.errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load analytics";
      } finally {
        this.isLoading = false;
      }
    },
    updatePieGradient() {
      const total = this.analytics.revenueByCategory.reduce(
        (s, i) => s + i.revenue,
        0
      );
      if (!total) {
        this.pieGradient = "conic-gradient(#e5e7eb 0 360deg)";
        return;
      }
      let current = 0;
      const stops = this.analytics.revenueByCategory.map((item, idx) => {
        const start = (current / total) * 360;
        const end = ((current + item.revenue) / total) * 360;
        current += item.revenue;
        return `${this.getCategoryColor(idx)} ${start}deg ${end}deg`;
      });
      this.pieGradient = `conic-gradient(${stops.join(", ")})`;
    },
    formatNumber(num) {
      return new Intl.NumberFormat("en-US").format(num);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    },
    getBarHeight(revenue) {
      const maxRevenue = Math.max(
        ...this.analytics.revenueTrend.map((r) => r.revenue)
      );
      return `${(revenue / maxRevenue) * 200}px`;
    },
    getCategoryColor(index) {
      const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
      return colors[index % colors.length];
    },
    getPieSliceRotation(index) {
      return index * 72; // 360 / 5 = 72 degrees per slice
    },
    calculatePercentage(revenue) {
      const totalRevenue = this.analytics.revenueByCategory.reduce(
        (sum, item) => sum + item.revenue,
        0
      );
      return ((revenue / totalRevenue) * 100).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/pages/analytics.scss" as *;
</style>
