
export const endpoints = {
  home:{
    reports:"/admin/home/report",
    mostPurchasedProducts:"/admin/home/most-purchased-products",
    salesRenveu:"/admin/home/sales",
    freeShipping:"/admin/settings",
    editFreeShipping:(id:string)=>`/admin/settings/${id}`
  },
  auth: {
    login: '/Admin/auth/login',
    refreshToken: '/Admin/auth/refresh-token',
    sendOtp: '/Admin/auth/forget-password',
    verifyOtp: '/Admin/auth/verify-forget-password-otp',
    changePassword: '/Admin/auth/change-password',
    viewProf:"/Admin/profile/get-profile",
    editProf:"/Admin/profile/update-profile"
  },
   dashboard:{
    stats: "/Admin/dashboard/stats",
    latestContributions: "/Admin/dashboard/latest-contributions",
  },
    privacy:{
    get: "/Admin/privacy-policy",
    put: "/Admin/privacy-policy",
  },
    reports:{
    summary: '/Admin/reports/summary',
    expenses: '/Admin/reports/general-expenses',
    users: '/Admin/reports/users',
    spaces: '/Admin/reports/spaces',
    categories: '/Admin/reports/categories',
  },
  users:{
    get:"/Admin/users",
    single: (id: string) => `/Admin/users/${id}`,
    space: (id: string) => `/Admin/users/${id}/spaces`,
    update:(id:string) => `/Admin/users/${id}/change-status`
  },
  contact:{
    list: "/Admin/contact-us",
    put: "/Admin/contact-us",
  },
  notifications:{
    list:"/Admin/notifications",
    single: (id: string) => `/Admin/notifications/${id}`,
    post: "/Admin/notifications/send",
  }

};