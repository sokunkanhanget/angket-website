import { api } from "./api"

export const authApi = {
  login: ({ email, password }) => api.post("/users/login", { email, password }),
  signup: ({ full_name, email, password, phone }) =>
    api.post("/users/signup", { full_name, email, password, phone }),
  me: () => api.get("/users/me"),
}

export const usersApi = {
  updateMe: ({ name, phone }) => api.put("/users/me", { name, phone }),
  avatar: (file) => {
    const formData = new FormData()
    formData.append("avatar", file)
    return api.postForm("/users/avatar", formData)
  },
  changePassword: ({ currentPassword, newPassword }) =>
    api.post("/users/change-password", { currentPassword, newPassword }),
}

export const uploadsApi = {
  screenshot: (file) => {
    const formData = new FormData()
    formData.append("screenshot", file)
    return api.postForm("/uploads/screenshot", formData)
  },
}

export const reportsApi = {
  list: (params = {}) => api.get(`/reports?${new URLSearchParams(params)}`),
  create: (report) => api.post("/reports", report),
  save: (reportId) => api.post(`/saved-reports/${reportId}`),
  unsave: (reportId) => api.del(`/saved-reports/${reportId}`),
  listSaved: () => api.get("/saved-reports"),
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
  userDetail: (id) => api.get(`/admin/users/${id}`),
  reports: (status = "all", category = "all") =>
    api.get(`/admin/reports?status=${status}&category=${category}`),
  setReportStatus: (id, status) => api.patch(`/admin/reports/${id}/status`, { status }),
  subscriptions: () => api.get("/admin/subscriptions"),
  verifications: () => api.get("/admin/subscriptions/verifications"),
  updateVerification: (id, status) =>
    api.patch(`/admin/subscriptions/verifications/${id}`, { status }),
}
