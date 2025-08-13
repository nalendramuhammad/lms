<template>
  <div class="cms-layout user-management">
    <Sidebar />

    <main class="main-content">
      <div class="content-header">
        <div class="header-info">
          <h1 class="page-title">User Management</h1>
          <button class="create-btn">
            <i class="icon plus-icon"></i>
            <span>Add New User</span>
          </button>
        </div>
      </div>

      <div class="content-body">
        <!-- Stats Cards -->
        <div class="user-management__stats-grid">
          <div class="user-management__stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ totalUsers }}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div class="user-management__stat-card">
            <div class="stat-icon">👨‍🏫</div>
            <div class="stat-info">
              <h3>{{ instructorCount }}</h3>
              <p>Instructors</p>
            </div>
          </div>
          <div class="user-management__stat-card">
            <div class="stat-icon">👨‍🎓</div>
            <div class="stat-info">
              <h3>{{ studentCount }}</h3>
              <p>Students</p>
            </div>
          </div>
          <div class="user-management__stat-card">
            <div class="stat-icon">👨‍💼</div>
            <div class="stat-info">
              <h3>{{ adminCount }}</h3>
              <p>Admins</p>
            </div>
          </div>
        </div>

        <div class="search-section">
          <div class="search-row">
            <SearchBar
              @search="handleSearch"
              placeholder="Search users..."
            />
            <FilterButton
              label="Filters"
              :isActive="showFilters"
              @click="toggleFilters"
            />
          </div>

          <div class="results-info">
            <span class="user-count"
              >{{ filteredUsers.length }} users found</span
            >
          </div>
        </div>

        <!-- Filters Panel -->
        <div
          v-if="showFilters"
          class="user-management__filters-panel"
        >
          <div class="filter-group">
            <label>Search Users</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name or email..."
              @input="applyFilters"
            />
          </div>
          <div class="filter-group">
            <label>Role</label>
            <select
              v-model="filters.role"
              @change="applyFilters"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="filter-group">
            <label>
              <input
                v-model="filters.verified"
                type="checkbox"
                @change="applyFilters"
              />
              Verified Users Only
            </label>
          </div>
        </div>

        <!-- Users Table -->
        <div class="user-management__content">
          <div class="user-management__table-container">
            <table class="user-management__table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in filteredUsers"
                  :key="user._id"
                  class="user-row"
                >
                  <td class="user-info">
                    <div class="user-avatar">
                      <img
                        v-if="user.avatar"
                        :src="user.avatar"
                        :alt="user.name"
                      />
                      <div
                        v-else
                        class="avatar-placeholder"
                      >
                        {{ user.name.charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <div class="user-details">
                      <h4>{{ user.name }}</h4>
                      <span
                        v-if="user.verified"
                        class="verified-badge"
                        >✓ Verified</span
                      >
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span :class="`role-badge role-${user.role}`">
                      {{ user.role }}
                    </span>
                  </td>
                  <td>
                    <span
                      :class="`status-badge status-${user.status || 'active'}`"
                    >
                      {{ user.status || "active" }}
                    </span>
                  </td>
                  <td>{{ formatDate(user.createdAt) }}</td>
                  <td class="actions">
                    <button
                      @click="viewUser(user)"
                      class="action-btn view-btn"
                      title="View Details"
                    >
                      <i class="icon eye-icon"></i>
                    </button>
                    <button
                      @click="editUser(user)"
                      class="action-btn edit-btn"
                      title="Edit User"
                    >
                      <i class="icon edit-icon"></i>
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="action-btn delete-btn"
                      title="Delete User"
                    >
                      <i class="icon delete-icon"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="user-management__pagination">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              Previous
            </button>
            <span class="page-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- User Detail Modal -->
    <div
      v-if="showUserModal"
      class="user-management__modal-overlay"
      @click="closeModal"
    >
      <div
        class="user-management__modal-content"
        @click.stop
      >
        <div class="user-management__modal-header">
          <h2>User Details</h2>
          <button
            @click="closeModal"
            class="close-btn"
          >
            ×
          </button>
        </div>
        <div
          class="user-management__modal-body"
          v-if="selectedUser"
        >
          <div class="user-detail-grid">
            <div class="detail-item">
              <label>Name:</label>
              <span>{{ selectedUser.name }}</span>
            </div>
            <div class="detail-item">
              <label>Email:</label>
              <span>{{ selectedUser.email }}</span>
            </div>
            <div class="detail-item">
              <label>Role:</label>
              <span class="role-badge role-{{ selectedUser.role }}">
                {{ selectedUser.role }}
              </span>
            </div>
            <div class="detail-item">
              <label>Status:</label>
              <span
                class="status-badge status-{{ selectedUser.status || 'active' }}"
              >
                {{ selectedUser.status || "active" }}
              </span>
            </div>
            <div class="detail-item">
              <label>Verified:</label>
              <span>{{ selectedUser.verified ? "Yes" : "No" }}</span>
            </div>
            <div class="detail-item">
              <label>Joined:</label>
              <span>{{ formatDate(selectedUser.createdAt) }}</span>
            </div>
            <div
              class="detail-item"
              v-if="selectedUser.bio"
            >
              <label>Bio:</label>
              <span>{{ selectedUser.bio }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import api from "@/utils/api";
import Sidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import FilterButton from "@/components/ui/FilterButton.vue";

// Reactive data
const users = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const showUserModal = ref(false);
const selectedUser = ref(null);
const showFilters = ref(false);

// Filters
const filters = ref({
  search: "",
  role: "",
  status: "",
  verified: false,
});

// Computed properties
const totalUsers = computed(() => users.value.length);
const instructorCount = computed(
  () => users.value.filter((user) => user.role === "instructor").length
);
const studentCount = computed(
  () => users.value.filter((user) => user.role === "student").length
);
const adminCount = computed(
  () => users.value.filter((user) => user.role === "admin").length
);

const filteredUsers = computed(() => {
  let filtered = users.value;

  // Search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  // Role filter
  if (filters.value.role) {
    filtered = filtered.filter((user) => user.role === filters.value.role);
  }

  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(
      (user) => (user.status || "active") === filters.value.status
    );
  }

  // Verified filter
  if (filters.value.verified) {
    filtered = filtered.filter((user) => user.verified);
  }

  return filtered;
});

// Methods
const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await api.get("/users");
    users.value = response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  // Reset to first page when filters change
  currentPage.value = 1;
};

const handleSearch = (searchTerm) => {
  filters.value.search = searchTerm;
  applyFilters();
};

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const viewUser = (user) => {
  selectedUser.value = user;
  showUserModal.value = true;
};

const editUser = (user) => {
  // TODO: Implement edit user functionality
  console.log("Edit user:", user);
};

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    try {
      await api.delete(`/users/${user._id}`);

      // Remove user from local state
      const userIndex = users.value.findIndex((u) => u._id === user._id);
      if (userIndex !== -1) {
        users.value.splice(userIndex, 1);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }
};

const closeModal = () => {
  showUserModal.value = false;
  selectedUser.value = null;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Lifecycle
onMounted(() => {
  fetchUsers();
});
</script>

<style lang="scss">
@use "@/styles/pages/cms" as *;
</style>
