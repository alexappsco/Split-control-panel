import Link from '@mui/material/Link';
import { useTranslations } from 'next-intl';
import Box, { BoxProps } from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import { Typography, TypographyProps } from '@mui/material';

import SvgColor from '../svg-color';
import Image from 'next/image';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  enableText?: boolean;
  textProps?: TypographyProps;
}

const Logo = ({ disabledLink = false, enableText = false, sx, textProps }: LogoProps) => {
  const t = useTranslations();

  const logo = (
    <Box component="div" sx={{ display: 'flex', width: 'auto', height: 'auto', cursor: 'pointer' }}>
        <Image
        src={'/logo/logo_single.png'}
        alt={'Logo'}
        width={90}
        height={90}
        style={{
          cursor: 'pointer',
          color: 'primary.main',
        }}
      />
      {enableText && (
        <Typography
          variant="h6"
          component="span"
          textTransform="capitalize"
          alignSelf="center"
          marginInlineStart={-1}
          {...textProps}
        >
          {t('Metadata.title')}

        </Typography>
      )}
      {/* <SvgColor
        src="/logo/logo_text.svg"
        sx={{
          width: 40,
          height: 40,
          cursor: 'pointer',
          color: 'primary.main',
          ...sx,
        }}
      /> */}
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

export default Logo;

// import Link from '@mui/material/Link';
// import Box, { BoxProps } from '@mui/material/Box';
// import { RouterLink } from 'src/routes/components';

// import SvgColor from '../svg-color';

// // ----------------------------------------------------------------------

// export interface LogoProps extends BoxProps {
//   disabledLink?: boolean;
// }

// const Logo = ({ disabledLink = false, sx }: LogoProps) => {
//   const logo = (
//     <Box
//       component="div"
//       sx={{
//         display: 'flex',
//         alignItems: 'center', // Align items vertically centered
//         gap: 1.5, // Space between text and icon
//         width: 'auto',
//         height: 'auto',
//         cursor: 'pointer'
//       }}
//     >
//       {/* Logo text - "Split" */}
//       {/* {enableText && (
//         <Typography
//           variant="h6" // Changed to h4 for larger size like in the image
//           component="span"
//           fontWeight="bold" // Make it bold like in the image
//           sx={{
//             color: 'primary.main',
//             lineHeight: 1,
//             ...textProps?.sx,
//           }}
//           {...textProps}
//         >
//           {t('Metadata.title') || 'Split'} {/* Fallback to 'Split' if translation not available */}
//         {/* </Typography>
//       )} */}

//     <SvgColor
//         src="/logo/logo_text.svg"
//         sx={{
//           width: 28, // Set to 48x48 as shown in the image
//           height: 28,
//           cursor: 'pointer',
//           color: 'primary.main',
//           ...sx,
//         }}
//       />
//       {/* Logo icon */}
//       <SvgColor
//         src="/logo/logo_single.svg"
//         sx={{
//           width: 28, // Set to 48x48 as shown in the image
//           height: 28,
//           cursor: 'pointer',
//           color: 'primary.main',
//           ...sx,
//         }}
//       />
//     </Box>
//   );

//   if (disabledLink) {
//     return logo;
//   }

//   return (
//     <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
//       {logo}
//     </Link>
//   );
// };

// export default Logo;