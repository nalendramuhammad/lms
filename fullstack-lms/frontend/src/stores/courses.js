import { defineStore } from "pinia";
import api from "@/utils/api";

export const useCourseStore = defineStore("courses", {
  state: () => ({
    courses: [],
    currentCourse: null,
    loading: false,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    filters: {
      search: "",
      category: "",
      level: "",
      price: "",
      featured: false,
    },
  }),

  actions: {
    async fetchCourses(params = {}) {
      this.loading = true;
      try {
        const response = await api.get("/courses", { params });
        this.courses = response.data.data;
        this.pagination = response.data.pagination;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchCourse(id) {
      try {
        const response = await api.get(`/courses/${id}`);
        this.currentCourse = response.data.data;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async createCourse(courseData) {
      try {
        const response = await api.post("/courses", courseData);
        this.courses.unshift(response.data.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async updateCourse(id, courseData) {
      try {
        const response = await api.put(`/courses/${id}`, courseData);
        const index = this.courses.findIndex((c) => c._id === id);
        if (index !== -1) {
          this.courses[index] = response.data.data;
        }
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async deleteCourse(id) {
      try {
        await api.delete(`/courses/${id}`);
        this.courses = this.courses.filter((c) => c._id !== id);
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
  },
});
