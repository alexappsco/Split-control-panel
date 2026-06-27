// // "use client";

// // import type { HeadCell } from "src/components/SimpleTable/types";

// // import { useMemo } from "react";
// // import Iconify from "src/components/iconify";
// // import { useFormat } from "src/utils/format-time";
// // import SimpleTable from "src/components/SimpleTable";
// // import {
// //   Box,
// //   Select,
// //   MenuItem,
// //   TextField,
// //   InputAdornment,
// //   type SelectChangeEvent,
// // } from "@mui/material";

// // import type { ReportSpace } from "../constants";
// // import type { SpacesTabParams } from "../reports-params";

// // import {
// //   asRecord,
// //   useTabQuery,
// //   filterFieldSx,
// //   searchFieldSx,
// //   useRowSelection,
// //   useDebouncedSearch,
// //   createCheckboxColumn,
// // } from "./report-table-shared";

// // type SpacesReportTableProps = {
// //   params: SpacesTabParams;
// //   items: unknown[];
// //   totalCount: number;
// // };

// // function normalizeSpace(row: unknown, index: number): ReportSpace {

// //   const data = asRecord(row);
// //   const membersCount = data.membersCount ?? data.memberCount ?? 0;

// //   return {
// //     id: String(data.id ?? index),
// //     spaceName: String(data.spaceName ?? data.name ?? ""),
// //     operationsCount: String(
// //       data.operationsCount ?? data.transactionsCount ?? `${data.operations ?? 0} عملية`
// //     ),
// //     totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
// //     membersCount: String(
// //       typeof membersCount === "number" ? `${membersCount} أعضاء` : membersCount
// //     ),
// //     lastActivityDate: String(data.lastActivityDate ?? data.lastActiveDate ?? data.updatedAt ?? ""),
// //   };
// // }

// // const MEMBERS_OPTIONS = [
// //   { value: "", label: "عدد الأعضاء" },
// //   { value: "2", label: "2 أعضاء" },
// //   { value: "3", label: "3 أعضاء" },
// //   { value: "4", label: "4 أعضاء" },
// //   { value: "5", label: "5 أعضاء وأكثر" },
// // ];

// // export default function SpacesReportTable({
// //   params,
// //   items,
// //   totalCount,
// // }: SpacesReportTableProps) {
// //   const { formatDate } = useFormat();
// //   const { updateParams, pagination } = useTabQuery("spaces", params);
// //   const { searchInput, setSearchInput } = useDebouncedSearch(
// //     "spaces",
// //     params,
// //     updateParams
// //   );
// //   const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
// //     useRowSelection();

// //   const rows = useMemo(() => items.map(normalizeSpace), [items]);

// //   const headCells: HeadCell<ReportSpace>[] = [
// //     createCheckboxColumn(
// //       selectedIds,
// //       toggleSelect,
// //       toggleSelectAll,
// //       rows.map((row) => row.id)
// //     ),
// //     { id: "spaceName", label: "اسم المساحة", align: "center" },
// //     { id: "operationsCount", label: "عدد العمليات", align: "center" },
// //     { id: "totalExpenses", label: "إجمالي المصروفات", align: "center" },
// //     { id: "membersCount", label: "عدد الأعضاء", align: "center" },
// //     { id: "lastActivityDate", label: "آخر نشاط", align: "center", renderCell: (row) => formatDate(row.lastActivityDate as any, "dd/MM/yyyy") },
// //   ];

// //   return (
// //     <Box>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: { xs: "column", sm: "row" },
// //           alignItems: { xs: "stretch", sm: "center" },
// //           justifyContent: "space-between",
// //           gap: 2,
// //           mb: 2.5,
// //         }}
// //       >
// //         <TextField
// //           value={searchInput}
// //           onChange={(e) => setSearchInput(e.target.value)}
// //           placeholder="بحث..."
// //           size="small"
// //           slotProps={{
// //             input: {
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <Iconify
// //                     icon="solar:magnifer-linear"
// //                     width={20}
// //                     sx={{ color: "#9CA3AF" }}
// //                   />
// //                 </InputAdornment>
// //               ),
// //             },
// //           }}
// //           sx={searchFieldSx}
// //         />

// //         <Select
// //           value={params.MinMembersCount}
// //           onChange={(e: SelectChangeEvent) => {
// //             clearSelection();
// //             updateParams({
// //               MinMembersCount: e.target.value || null,
// //               SkipCount: "0",
// //             });
// //           }}
// //           size="small"
// //           displayEmpty
// //           sx={filterFieldSx}
// //         >
// //           {MEMBERS_OPTIONS.map((opt) => (
// //             <MenuItem key={opt.value || "all"} value={opt.value}>
// //               {opt.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </Box>

// //       <SimpleTable<ReportSpace>
// //         data={rows}
// //         headCells={headCells}
// //         serverPagination={{
// //           ...pagination,
// //           count: totalCount || rows.length,
// //         }}
// //       />
// //     </Box>
// //   );
// // }
// "use client";

// import { useMemo } from "react";
// import {
//   Box,
//   InputAdornment,
//   MenuItem,
//   Select,
//   TextField,
//   type SelectChangeEvent,
// } from "@mui/material";
// import Iconify from "src/components/iconify";
// import SimpleTable from "src/components/SimpleTable";
// import type { HeadCell } from "src/components/SimpleTable/types";
// import type { ReportSpace } from "../constants";
// import type { SpacesTabParams } from "../reports-params";
// import {
//   asRecord,
//   createCheckboxColumn,
//   filterFieldSx,
//   searchFieldSx,
//   useDebouncedSearch,
//   useRowSelection,
//   useTabQuery,
// } from "./report-table-shared";
// import { useFormat } from "@/utils/format-time";

// type SpacesReportTableProps = {
//   params: SpacesTabParams;
//   items: unknown[];
//   totalCount: number;
// };

// function normalizeSpace(row: unknown, index: number): ReportSpace {

//   const data = asRecord(row);
//   const membersCount = data.membersCount ?? data.memberCount ?? 0;

//   return {
//     id: String(data.id ?? index),
//     spaceName: String(data.spaceName ?? data.name ?? ""),
//     operationsCount: String(
//       data.operationsCount ?? data.transactionsCount ?? `${data.operations ?? 0} عملية`
//     ),
//     totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
//     membersCount: String(
//       typeof membersCount === "number" ? `${membersCount} أعضاء` : membersCount
//     ),
//     lastActivityDate: String(data.lastActivityDate ?? data.lastActiveDate ?? data.updatedAt ?? ""),
//   };
// }

// const MEMBERS_OPTIONS = [
//   { value: "", label: "عدد الأعضاء" },
//   { value: "2", label: "2 أعضاء" },
//   { value: "3", label: "3 أعضاء" },
//   { value: "4", label: "4 أعضاء" },
//   { value: "5", label: "5 أعضاء وأكثر" },
// ];

// export default function SpacesReportTable({
//   params,
//   items,
//   totalCount,
// }: SpacesReportTableProps) {
//   const { formatDate } = useFormat();
//   const { updateParams, pagination } = useTabQuery("spaces", params);
//   const { searchInput, setSearchInput } = useDebouncedSearch(
//     "spaces",
//     params,
//     updateParams
//   );
//   const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
//     useRowSelection();

//   const rows = useMemo(() => items.map(normalizeSpace), [items]);

//   const headCells: HeadCell<ReportSpace>[] = [
//     createCheckboxColumn(
//       selectedIds,
//       toggleSelect,
//       toggleSelectAll,
//       rows.map((row) => row.id)
//     ),
//     { id: "spaceName", label: "اسم المساحة", align: "center" },
//     { id: "operationsCount", label: "عدد العمليات", align: "center" },
//     { id: "totalExpenses", label: "إجمالي المصروفات", align: "center" },
//     { id: "membersCount", label: "عدد الأعضاء", align: "center" },
//     { id: "lastActivityDate", label: "آخر نشاط", align: "center", renderCell: (row) => formatDate(row.lastActivityDate as any, "dd/MM/yyyy") },
//   ];

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: { xs: "stretch", sm: "center" },
//           justifyContent: "space-between",
//           gap: 2,
//           mb: 2.5,
//         }}
//       >
//         <TextField
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           placeholder="بحث..."
//           size="small"
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify
//                     icon="solar:magnifer-linear"
//                     width={20}
//                     sx={{ color: "#9CA3AF" }}
//                   />
//                 </InputAdornment>
//               ),
//             },
//           }}
//           sx={searchFieldSx}
//         />

//         <Select
//           value={params.MinMembersCount}
//           onChange={(e: SelectChangeEvent) => {
//             clearSelection();
//             updateParams({
//               MinMembersCount: e.target.value || null,
//               SkipCount: "0",
//             });
//           }}
//           size="small"
//           displayEmpty
//           sx={filterFieldSx}
//         >
//           {MEMBERS_OPTIONS.map((opt) => (
//             <MenuItem key={opt.value || "all"} value={opt.value}>
//               {opt.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </Box>

//       <SimpleTable<ReportSpace>
//         data={rows}
//         headCells={headCells}
//         serverPagination={{
//           ...pagination,
//           count: totalCount || rows.length,
//         }}
//       />
//     </Box>
//   );
// }
"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { useMemo } from "react";
import Iconify from "src/components/iconify";
import { useFormat } from "src/utils/format-time"; // ✅ Fixed import path
import SimpleTable from "src/components/SimpleTable";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material";

import type { ReportSpace } from "../constants";
import type { SpacesTabParams } from "../reports-params";

import {
  asRecord,
  useTabQuery,
  filterFieldSx,
  searchFieldSx,
  useRowSelection,
  useDebouncedSearch,
  createCheckboxColumn,
} from "./report-table-shared";

type SpacesReportTableProps = {
  params: SpacesTabParams;
  items: unknown[];
  totalCount: number;
};

function normalizeSpace(row: unknown, index: number): ReportSpace {
  const data = asRecord(row);
  const membersCount = data.membersCount ?? data.memberCount ?? 0;

  return {
    id: String(data.id ?? index),
    spaceName: String(data.spaceName ?? data.name ?? ""),
    operationsCount: String(
      data.operationsCount ?? data.transactionsCount ?? `${data.operations ?? 0} عملية`
    ),
    totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
    membersCount: String(
      typeof membersCount === "number" ? `${membersCount} أعضاء` : membersCount
    ),
    lastActivityDate: String(data.lastActivityDate ?? data.lastActiveDate ?? data.updatedAt ?? ""),
  };
}

const MEMBERS_OPTIONS = [
  { value: "", label: "عدد الأعضاء" },
  { value: "2", label: "2 أعضاء" },
  { value: "3", label: "3 أعضاء" },
  { value: "4", label: "4 أعضاء" },
  { value: "5", label: "5 أعضاء وأكثر" },
];

export default function SpacesReportTable({
  params,
  items,
  totalCount,
}: SpacesReportTableProps) {
  const { formatDate } = useFormat(); // ✅ Now this works correctly
  const { updateParams, pagination } = useTabQuery("spaces", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "spaces",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
    useRowSelection();

  const rows = useMemo(() => items.map(normalizeSpace), [items]);

  const headCells: HeadCell<ReportSpace>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "spaceName", label: "اسم المساحة", align: "center" },
    { id: "operationsCount", label: "عدد العمليات", align: "center" },
    { id: "totalExpenses", label: "إجمالي المصروفات", align: "center" },
    { id: "membersCount", label: "عدد الأعضاء", align: "center" },
    {
      id: "lastActivityDate",
      label: "آخر نشاط",
      align: "center",
      renderCell: (row) => formatDate(row.lastActivityDate, "dd/MM/yyyy")
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="بحث..."
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="solar:magnifer-linear"
                    width={20}
                    sx={{ color: "#9CA3AF" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={searchFieldSx}
        />

        <Select
          value={params.MinMembersCount}
          onChange={(e: SelectChangeEvent) => {
            clearSelection();
            updateParams({
              MinMembersCount: e.target.value || null,
              SkipCount: "0",
            });
          }}
          size="small"
          displayEmpty
          sx={filterFieldSx}
        >
          {MEMBERS_OPTIONS.map((opt) => (
            <MenuItem key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <SimpleTable<ReportSpace>
        data={rows}
        headCells={headCells}
        serverPagination={{
          ...pagination,
          count: totalCount || rows.length,
        }}
      />
    </Box>
  );
}