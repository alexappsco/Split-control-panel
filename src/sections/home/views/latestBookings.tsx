// 'use client';

// import {
//   Card,
//   Stack,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
// } from '@mui/material';

// import { useTranslations } from 'next-intl';
// import { useState } from 'react';

// export type Booking = {
//   index: number;
//   title: string;
//   spaceName: string;
//   amount: number;
//   status: string;
//   date: string;
// };

// type Props = {
//   bookings: Booking[];
// };

// export default function LatestBookings({ bookings }: Props) {
//   const [showAll, setShowAll] = useState(false);

//   const displayedBookings = showAll
//     ? bookings
//     : bookings.slice(0, 6);

//   return (
//     <Card
//       sx={{
//         p: 3,
//         borderRadius: 4,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'background.paper',
//         border: '1px solid #E5E7EB',
//       }}
//     >
//       <Stack
//         sx={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 20,
//             fontWeight: 700,
//           }}
//         >
//           أحدث المساهمات
//         </Typography>

     
//       </Stack>

//       <TableContainer
//         sx={{
//           width: '100%',
//           overflowY: showAll ? 'auto' : 'hidden',
//           overflowX: 'auto',
//         }}
//       >
//         <Table
//           sx={{
//             minWidth: 700,
//             whiteSpace: 'nowrap',
//           }}
//           stickyHeader
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//                 #
//               </TableCell>

//               <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//                 عنوان المساهمة
//               </TableCell>

//               <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//                 المساحة
//               </TableCell>

             

//               <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//                المبلغ
//               </TableCell>
//                 <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//               الحالة
//               </TableCell>
//                 <TableCell
//                 align="right"
//                 sx={{ backgroundColor: '#F3F4F6' }}
//               >
//                التاريخ
//               </TableCell>

//               <TableCell sx={{ backgroundColor: '#F3F4F6' }} />
//             </TableRow>
//           </TableHead>

//           <TableBody>
//           {displayedBookings.map((booking) => (
//               <TableRow
//                 key={booking.index}
//                 hover
//               >
//                 <TableCell align="right">
//                   {booking.index}
//                 </TableCell>

//                 <TableCell align="right">
//                  {booking.title}
//                 </TableCell>

              

//                 <TableCell align="right">
//                   {booking.spaceName}
//                 </TableCell>

//                 <TableCell align="right">
//                   {booking.amount}
//                 </TableCell>
//                   <TableCell align="right">
//                   {booking.status}
//                 </TableCell>
//                 <TableCell align="right">
//                   {booking.date}
//                 </TableCell>

//                 <TableCell align="center" />
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Card>
//   );
// }
'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

export type Booking = {
  index: number;
  title: string;
  spaceName: string;
  amount: number;
  status: string;
  date: string;
};

type Props = {
  bookings: Booking[];
};

export default function LatestBookings({ bookings }: Props) {
  const t = useTranslations();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        width: '100%',
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid #E5E7EB',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {t('Pages.Home.latest_contributions')}
        </Typography>
      </Stack>

      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Table
          sx={{
            minWidth: 700,
            whiteSpace: 'nowrap',
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                #
              </TableCell>

              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                {t('Pages.Home.contribution_title')}
              </TableCell>

              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                {t('Pages.Home.space')}
              </TableCell>

              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                {t('Pages.Home.amount')}
              </TableCell>

              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                {t('Global.Label.status')}
              </TableCell>

              <TableCell
                align="right"
                sx={{ backgroundColor: '#F3F4F6' }}
              >
                {t('Pages.Home.date')}
              </TableCell>

              <TableCell sx={{ backgroundColor: '#F3F4F6' }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking.index}
                hover
              >
                <TableCell align="right">
                  {booking.index}
                </TableCell>

                <TableCell align="right">
                  {booking.title}
                </TableCell>

                <TableCell align="right">
                  {booking.spaceName}
                </TableCell>

                <TableCell align="right">
                  {booking.amount}
                </TableCell>

                <TableCell align="right">
                  {booking.status}
                </TableCell>

                <TableCell align="right">
                  {formatDate(booking.date)}
                </TableCell>

                <TableCell align="center" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}