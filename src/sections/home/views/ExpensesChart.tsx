// "use client";

// import dynamic from "next/dynamic";
// import { Box, Card, Typography } from "@mui/material";
// import type { ApexOptions } from "apexcharts";

// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// export default function ExpensesChart() {
//   const series = [85, 70, 60];

//   const options: ApexOptions = {
//     chart: {
//       type: "radialBar",
//       toolbar: {
//         show: false,
//       },
//     },

//     colors: ["#35C57A", "#F5B11A", "#D64545"],

//     stroke: {
//       lineCap: "round",
//     },

//     legend: {
//       show: false,
//     },

//     plotOptions: {
//       radialBar: {
//         hollow: {
//           size: "38%",
//         },

//         track: {
//           background: "#ECEEF2",
//           strokeWidth: "100%",
//           margin: 8,
//         },

//         dataLabels: {
//           name: {
//             show: false,
//           },

//           value: {
//             show: false,
//           },

//           total: {
//             show: false,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         borderRadius: 4,
//         border: "1px solid #E5E7EB",
//         bgcolor: "#fff",
//        height: "100%",
//       }}
//     >
//       <Box sx={{ p: 3 }}>
//         <Typography
//           sx={{
//             fontWeight: 700,
//             textAlign: "right",
//             mb: 4,
//           }}
//           color="text.primary"
//         >
//           المصروفات
//         </Typography>

//         <Box
//           sx={{
//             position: "relative",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >

//           <Box
//   sx={{
//     height: 200,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <Chart
//     options={options}
//     series={series}
//     type="radialBar"
//     height="100%"
//     width="100%"
//   />
// </Box>

//           <Box
//             sx={{
//               position: "absolute",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               pointerEvents: "none",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: 16,
//                 fontWeight: 500,
//                 color: "#64748B",
//               }}
//             >
//               Total
//             </Typography>

//             <Typography
//               sx={{
//                 mt: 1,
//                 fontWeight: 700,
//                 color: "#1E293B",
//                 lineHeight: 1,
//               }}
//             >
//               10,989
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           borderTop: "1px dashed #E5E7EB",
//           px: 3,
//           py: 2.5,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <LegendItem label="مكتملة" color="#35C57A" />
//         <LegendItem label="معلقة" color="#F5B11A" />
//         <LegendItem label="مرفوضة" color="#D64545" />
//       </Box>
//     </Card>
//   );
// }

// function LegendItem({
//   label,
//   color,
// }: {
//   label: string;
//   color: string;
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: 14,
//           color: "#374151",
//         }}
//       >
//         {label}
//       </Typography>

//       <Box
//         sx={{
//           width: 12,
//           height: 12,
//           borderRadius: "50%",
//           bgcolor: color,
//         }}
//       />
//     </Box>
//   );
// }
"use client";

import type { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { Box, Card, Typography } from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ExpensesChartProps {
  expensesBreakdown: {
    approvedAmount: number;
    approvedPercentage: number;
    pendingAmount: number;
    pendingPercentage: number;
    rejectedAmount: number;
    rejectedPercentage: number;
    totalAmount: number;
  };
}

export default function ExpensesChart({
  expensesBreakdown,
}: ExpensesChartProps) {
  const series = [
    expensesBreakdown.approvedPercentage,
    expensesBreakdown.pendingPercentage,
    expensesBreakdown.rejectedPercentage,
  ];

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },

    colors: ["#35C57A", "#F5B11A", "#D64545"],

    stroke: {
      lineCap: "round",
    },

    legend: {
      show: false,
    },

    plotOptions: {
      radialBar: {
        hollow: {
          size: "38%",
        },

        track: {
          background: "#ECEEF2",
          strokeWidth: "100%",
          margin: 8,
        },

        dataLabels: {
          name: {
            show: false,
          },

          value: {
            show: false,
          },

          total: {
            show: false,
          },
        },
      },
    },
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        bgcolor: "#fff",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            textAlign: "right",
            mb: 4,
          }}
          color="text.primary"
        >
          المصروفات
        </Typography>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height="100%"
              width="100%"
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: "#64748B",
              }}
            >
              Total
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "#1E293B",
                lineHeight: 1,
              }}
            >
              {expensesBreakdown.totalAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px dashed #E5E7EB",
          px: 3,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <LegendItem
          label={`مكتملة (${expensesBreakdown.approvedAmount.toLocaleString()})`}
          color="#35C57A"
        />

        <LegendItem
          label={`معلقة (${expensesBreakdown.pendingAmount.toLocaleString()})`}
          color="#F5B11A"
        />

        <LegendItem
          label={`مرفوضة (${expensesBreakdown.rejectedAmount.toLocaleString()})`}
          color="#D64545"
        />
      </Box>
    </Card>
  );
}

function LegendItem({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          color: "#374151",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: color,
        }}
      />
    </Box>
  );
}