
export const paths = {
  // AUTH
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
  },
  // Control Panel
  controlPanel: {
    main: '/',
    profile:{
      viewProfileEdit:'/edit-profile'
    },
    categories: {
      list: '/categories',
      single: (id: string) => `/categories/${id}`,
    },
    subCategories: {
      list: '/sub-categories',
      single: (id: string) => `/sub-categories/${id}`,
    },
    products: {
      list: '/products',
      single: (id: string) => `/products/${id}`,
      new: '/products/new',
      details: (id: string) => `/products/details/${id}`,
    },
    orders: {
      list: '/orders',
      single: (id: string) => `/orders/${id}`,
    },
    returnOrders: {
      list: '/orders/return-orders',
      single: (id: string) => `/orders/return-orders/${id}`,
    },
    units: {
      list: '/products/units',
    },
    marketings: {
      root: '/marketings',
      offers: {
        list: '/marketings/offers',
        new: '/marketings/offers/new',
        edit: (id: string) => `/marketings/offers/${id}`,
      },
      banners: {
        list: '/marketings/banners',
        single: (id: string) => `/marketings/banners/${id}`,
        new: '/marketings/banners/new',
        edit: (id: string) => `/marketings/banners/edit/${id}`,
      },
      barcodeDiscount: {
        list: '/marketings/coupons',
        new: '/marketings/coupons/new',
      },
      notifications: {
        list: '/marketings/notifications',
        new: '/marketings/notifications/new',
      },
    },
    workArea: {
      list: '/work-area',
      single: (id: string) => `/work-area/${id}`,
      new: '/work-area/new',
      edit: (id: string) => `/work-area/${id}`,
    },
    users: {
      root: '/users',
      drivers: {
        list: '/users/drivers',
        driverOrders: (id: string) => `/users/drivers/orders/${id}`,
        edit: (id: string) =>`/users/drivers/edit/${id}`,
        single: (id: string) => `/users/drivers/${id}`,
      },
      clients: {
        list: '/users/clients',
        edit: (id: string) => `/users/clients/edit/${id}`,
        single: (id: string) => `/users/clients/${id}`,
      },
      employee: {
        list: '/users/employee',
        edit: (id: string) => `/users/employee/edit/${id}`,
        register: '/users/employee/register',
        single: (id: string) => `/users/employees/${id}`,
      },
    },
    policy: {
      root: '/policy',
      PrivacyPolicy: {
        list: '/policy/privacy-policy', // Matches your privacy policy path
      },
      ReturnPolicy: {
        list: '/policy/return-policy', // Matches your return policy path
      },
    },
    contactUs: {
      list: '/contact-us',
    },
    reports:{
      list: '/reports',
    },
    deliveryFees:{
      list:'/delivery-fees'
    }
  },
};
