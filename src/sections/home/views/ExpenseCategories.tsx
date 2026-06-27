// import {
//   Box,
//   Card,
//   LinearProgress,
//   Typography,
// } from "@mui/material";

// const categories = [
//   {
//     label: "رحلات",
//     value: 200,
//     progress: 85,
//   },
//   {
//     label: "فواتير",
//     value: 150,
//     progress: 75,
//   },
//   {
//     label: "تعليم",
//     value: 100,
//     progress: 55,
//   },
//   {
//     label: "ادخار",
//     value: 100,
//     progress: 55,
//   },
// ];

// export default function ExpenseCategories() {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         p: 3,
//         borderRadius: 4,
//         border: "1px solid",
//         borderColor: "#E5E7EB",
//         height: "100%",
//       }}
//     >
//       <Typography sx={{fontWeight:700, textAlign:"right", mb:4}}
//       >
//         أنواع المساحات حسب الفئة
//       </Typography>

//       {categories.map((item, index) => (
//         <Box
//           key={index}
//           sx={{
//             mb: index === categories.length - 1 ? 0 : 4,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 1.5,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: 16,
//                 fontWeight: 700,
//                 color: "#1F2937",
//               }}
//             >
//               {item.value}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 16,
//                 fontWeight: 600,
//                 color: "#1F2937",
//               }}
//             >
//               {item.label}
//             </Typography>
//           </Box>

//           <LinearProgress
//             variant="determinate"
//             value={item.progress}
//             sx={{
//               height: 8,
//               borderRadius: 999,

//               backgroundColor: "#E5E7EB",

//               "& .MuiLinearProgress-bar": {
//                 borderRadius: 999,
//                 backgroundColor: "#22C55E",
//               },
//             }}
//           />
//         </Box>
//       ))}
//     </Card>
//   );
// }
"use client";

import {
  Box,
  Card,
  Typography,
  LinearProgress,
} from "@mui/material";

interface ExpenseCategoriesProps {
  totalSpacesCount: number;
  categories: {
    name: string;
    count: number;
  }[];
}

export default function ExpenseCategories({
  totalSpacesCount,
  categories,
}: ExpenseCategoriesProps) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "#E5E7EB",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          textAlign: "right",
          mb: 4,
        }}
      >
        أنواع المساحات حسب الفئة
      </Typography>

      {categories.map((item, index) => {
        const progress =
          totalSpacesCount > 0
            ? (item.count / totalSpacesCount) * 100
            : 0;

        return (
          <Box
            key={item.name}
            sx={{
              mb: index === categories.length - 1 ? 0 : 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1F2937",
                }}
              >
                {item.count}
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1F2937",
                }}
              >
                {item.name}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 999,
                backgroundColor: "#E5E7EB",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  backgroundColor: "#22C55E",
                },
              }}
            />
          </Box>
        );
      })}
    </Card>
  );
}