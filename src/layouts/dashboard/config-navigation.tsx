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
            title: 'reports',
            path: paths.controlPanel.reports.list,
            icon: ICONS.navbar.reports
          },
          {
            title: 'Users.title',
            path: paths.controlPanel.users.clients.list,
            icon: ICONS.navbar.users,
          },
          {
            title: 'contact-us',
            path: paths.controlPanel.contactUs.list,
            icon: ICONS.navbar.contactUs,
          },
          {
            title: 'LegalInformation.title',
            path: paths.controlPanel.marketings.root,
            icon: ICONS.navbar.marketings,
            children: [
              {
                title: 'LegalInformation.privacy-policy',
                path: paths.controlPanel.policy.root,
              }
            ],
          },
        ],
      },
    ],
    []
  );

  return data;
}