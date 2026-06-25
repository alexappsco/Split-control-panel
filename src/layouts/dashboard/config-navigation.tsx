import { useMemo } from 'react';
import { paths } from 'src/routes/paths';
import { ICONS } from 'src/config-icons';

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        items: [
          {
            title: 'main',
            path: paths.controlPanel.main,
            icon: ICONS.navbar.main,
          },
          {
            title: 'categories',
            path: paths.controlPanel.categories.list,
            icon: ICONS.navbar.categories,
          },
          {
            title: 'subcategories',
            path: paths.controlPanel.subCategories.list,
            icon: ICONS.navbar.subCategories,
          },
          {
            title: 'products',
            path: paths.controlPanel.products.list,
            icon: ICONS.navbar.products,
            children: [
              {
                title: 'products',
                path: paths.controlPanel.products.list,
              },
              {
                title: 'units',
                path: paths.controlPanel.units.list,
              },
            ],
          },
          {
            title: 'orders',
            path: paths.controlPanel.orders.list,
            icon: ICONS.navbar.orders,
          },
          {
            title: 'return-orders',
            path: paths.controlPanel.returnOrders.list,
            icon: ICONS.navbar.returnedOrders,
          },
          {
            title: 'Marketing.title',
            path: paths.controlPanel.marketings.root,
            icon: ICONS.navbar.marketings,
            children: [
              {
                title: 'Marketing.offers',
                path: paths.controlPanel.marketings.offers.list,
              },
              {
                title: 'Marketing.coupons',
                path: paths.controlPanel.marketings.barcodeDiscount.list,
              },
              {
              title: 'Marketing.notifications',
              path: paths.controlPanel.marketings.notifications.list,
            },
              {
                title: 'Marketing.banners',
                path: paths.controlPanel.marketings.banners.list,
              },
            ],
          },
           {
            title: 'reports',
            path: paths.controlPanel.reports.list,
            icon: ICONS.navbar.reports
          },
          {
            title: 'Users.title',
            path: paths.controlPanel.users.root,
            icon: ICONS.navbar.users,
            children: [
              {
                title: 'Users.drivers',
                path: paths.controlPanel.users.drivers.list,
              },
              {
                title: 'Users.clients',
                path: paths.controlPanel.users.clients.list,
              },
              {
                title: 'Users.employees',
                path: paths.controlPanel.users.employee.list,
              },
            ],
          },
          {
            title: 'return-policy',
            path: paths.controlPanel.policy.ReturnPolicy.list,
            icon: ICONS.navbar.policy,
          },
          {
            title: 'privacy-policy',
            path: paths.controlPanel.policy.PrivacyPolicy.list,
            icon: ICONS.navbar.policy,
          },
          {
            title: 'contact-us',
            path: paths.controlPanel.contactUs.list,
            icon: ICONS.navbar.contactUs,
          },
          {
            title: 'Work-area',
            path: paths.controlPanel.workArea.list,
            icon: ICONS.navbar.workArea,
          },
          {
            title: 'delivery-fees',
            path: paths.controlPanel.deliveryFees.list,
            icon: ICONS.navbar.deliveryFees,
          },
        ],
      },
    ],
    []
  );

  return data;
}