import { api } from "./api"

export const authApi = {
  login: ({ email, password }) => api.post("/users/login", { email, password }),
  signup: ({ full_name, email, password, phone }) =>
    api.post("/users/signup", { full_name, email, password, phone }),
  me: () => api.get("/users/me"),
}

export const reportsApi = {
  list: (params = {}) => api.get(`/reports?${new URLSearchParams(params)}`),
  create: (report) => api.post("/reports", report),
}

export const categoriesApi = {
  list: () => api.get("/categories"),
  create: (category) => api.post("/categories", category),
  update: (id, category) => api.put(`/categories/${id}`, category),
  remove: (id) => api.del(`/categories/${id}`),
}

export const adminApi = {
  stats: () => api.get("/admin/dashboard/stats"),
  users: () => api.get("/admin/users"),
  reports: (status = "all") => api.get(`/admin/reports?status=${status}`),
  setReportStatus: (id, status) => api.patch(`/admin/reports/${id}/status`, { status }),
  subscriptions: () => api.get("/admin/subscriptions"),
  verifications: () => api.get("/admin/subscriptions/verifications"),
  updateVerification: (id, status) =>
    api.patch(`/admin/subscriptions/verifications/${id}`, { status }),
}
