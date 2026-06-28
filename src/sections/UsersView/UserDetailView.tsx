// // // "use client";

// // // import { useMemo, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import {
// // //   Avatar,
// // //   Box,
// // //   Button,
// // //   Card,
// // //   Checkbox,
// // //   Chip,
// // //   Grid2,
// // //   Switch,
// // //   Typography,
// // // } from "@mui/material";
// // // import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
// // // import Iconify from "src/components/iconify";
// // // import SimpleTable from "src/components/SimpleTable";
// // // import type { HeadCell } from "src/components/SimpleTable/types";

// // // type GroupStatusFilter = "all" | "active" | "inactive";

// // // type SpaceType = {
// // //   id: string;
// // //   spaceId: string;
// // //   spaceName: string;
// // //   categoryName: string;
// // //   isActive: boolean;
// // // };

// // // type UserType = {
// // //   id: string;
// // //   name: string;
// // //   profileImage: string;
// // //   email: string;
// // //   phoneNumber: string;
// // //   isActive: boolean;
// // // };

// // // function createGroupCheckboxColumn(
// // //   selected: string[],
// // //   onToggle: (id: string) => void,
// // //   onToggleAll: (ids: string[]) => void,
// // //   rowIds: string[]
// // // ): HeadCell<SpaceType> {
// // //   const allSelected =
// // //     rowIds.length > 0 && rowIds.every((id) => selected.includes(id));

// // //   const someSelected = rowIds.some((id) => selected.includes(id));

// // //   return {
// // //     id: "select",
// // //     label: "",
// // //     align: "center",
// // //     width: 48,
// // //     renderHeader: () => (
// // //       <Checkbox
// // //         size="small"
// // //         checked={allSelected}
// // //         indeterminate={someSelected && !allSelected}
// // //         onChange={() => onToggleAll(allSelected ? [] : rowIds)}
// // //       />
// // //     ),
// // //     renderCell: (row) => (
// // //       <Checkbox
// // //         size="small"
// // //         checked={selected.includes(row.spaceId)}
// // //         onChange={() => onToggle(row.spaceId)}
// // //         onClick={(e) => e.stopPropagation()}
// // //       />
// // //     ),
// // //   };
// // // }

// // // type UserDetailViewProps = {
// // //   user: UserType;
// // //   spaces: {
// // //     totalCount: number;
// // //     items: SpaceType[];
// // //   };
// // // };

// // // export default function UserDetailView({
// // //   user,
// // //   spaces,
// // // }: UserDetailViewProps) {
// // //   const router = useRouter();

// // //   const [groups, setGroups] = useState<SpaceType[]>(spaces.items.map(g => ({ ...g, id: g.spaceId })));
// // //   const [statusFilter, setStatusFilter] =
// // //     useState<GroupStatusFilter>("all");
// // //   const [selectedIds, setSelectedIds] = useState<string[]>([]);

// // //   const activeCount = groups.filter((group) => group.isActive).length;

// // //   const inactiveCount = groups.filter((group) => !group.isActive).length;

// // //   const filteredGroups = useMemo(() => {
// // //     if (statusFilter === "all") return groups;

// // //     return groups.filter((group) =>
// // //       statusFilter === "active"
// // //         ? group.isActive
// // //         : !group.isActive
// // //     );
// // //   }, [groups, statusFilter]);

// // //   if (!user) {
// // //     return (
// // //       <Box sx={{ textAlign: "center", py: 8 }} dir="rtl">
// // //         <Typography sx={{ mb: 2, color: "#6B7280" }}>
// // //           المستخدم غير موجود
// // //         </Typography>

// // //         <Button
// // //           variant="contained"
// // //           onClick={() => router.push("/users")}
// // //         >
// // //           العودة للمستخدمين
// // //         </Button>
// // //       </Box>
// // //     );
// // //   }

// // //   const tabs = [
// // //     {
// // //       label: "الكل",
// // //       value: "all" as const,
// // //       count: groups.length,
// // //     },
// // //     {
// // //       label: "مفعل",
// // //       value: "active" as const,
// // //       count: activeCount,
// // //     },
// // //     {
// // //       label: "معطل",
// // //       value: "inactive" as const,
// // //       count: inactiveCount,
// // //     },
// // //   ];

// // //   const toggleSelect = (id: string) => {
// // //     setSelectedIds((prev) =>
// // //       prev.includes(id)
// // //         ? prev.filter((item) => item !== id)
// // //         : [...prev, id]
// // //     );
// // //   };

// // //   const toggleSelectAll = (ids: string[]) => {
// // //     setSelectedIds(ids);
// // //   };

// // //   const handleGroupStatusToggle = (id: string) => {
// // //     setGroups((current) =>
// // //       current.map((group) =>
// // //         group.spaceId === id
// // //           ? {
// // //             ...group,
// // //             isActive: !group.isActive,
// // //           }
// // //           : group
// // //       )
// // //     );
// // //   };

// // //   const groupTableHead: HeadCell<SpaceType>[] = [
// // //     createGroupCheckboxColumn(
// // //       selectedIds,
// // //       toggleSelect,
// // //       toggleSelectAll,
// // //       filteredGroups.map((row) => row.spaceId)
// // //     ),
// // //     {
// // //       id: "spaceName",
// // //       label: "اسم المجموعة",
// // //       align: "center",
// // //       width: "30%",
// // //     },
// // //     {
// // //       id: "categoryName",
// // //       label: "الفئة",
// // //       align: "center",
// // //       width: "25%",
// // //     },
// // //     {
// // //       id: "status",
// // //       label: "الحالة",
// // //       align: "center",
// // //       width: "20%",
// // //       renderCell: (row) => {
// // //         const active = row.isActive;

// // //         return (
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               gap: 1,
// // //             }}
// // //           >
// // //             <Typography
// // //               sx={{
// // //                 fontSize: 13,
// // //                 fontWeight: 600,
// // //                 color: "#4b5563",
// // //               }}
// // //             >
// // //               {active ? "مفعل" : "معطل"}
// // //             </Typography>

// // //             <Switch
// // //               size="small"
// // //               checked={active}
// // //               onChange={() =>
// // //                 handleGroupStatusToggle(row.spaceId)
// // //               }
// // //               sx={{
// // //                 "& .MuiSwitch-track": {
// // //                   backgroundColor: active
// // //                     ? "#00A76F"
// // //                     : "#e5e7eb",
// // //                   opacity: 1,
// // //                 },
// // //                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
// // //                 {
// // //                   backgroundColor: "#00A76F",
// // //                   opacity: 1,
// // //                 },
// // //               }}
// // //             />
// // //           </Box>
// // //         );
// // //       },
// // //     },
// // //   ];

// // //   const statusBadge = user.isActive
// // //     ? {
// // //       label: "مفعل",
// // //       bg: "#ECFDF3",
// // //       color: "#027A48",
// // //     }
// // //     : {
// // //       label: "معطل",
// // //       bg: "#F2F4F7",
// // //       color: "#667085",
// // //     };

// // //   return (
// // //     <Box dir="rtl">
// // //       <CustomBreadcrumbs
// // //         links={[
// // //           {
// // //             name: "المستخدمين",
// // //             href: "/users",
// // //           },
// // //           {
// // //             name: user.name,
// // //           },
// // //         ]}
// // //         sx={{ mb: 3 }}
// // //       />

// // //       <Typography
// // //         sx={{
// // //           fontSize: 22,
// // //           fontWeight: 700,
// // //           color: "#111827",
// // //           mb: 2,
// // //         }}
// // //       >
// // //         بيانات المستخدم
// // //       </Typography>

// // //       <Card
// // //         sx={{
// // //           borderRadius: "20px",
// // //           border: "1px solid #E5E7EB",
// // //           boxShadow: "none",
// // //           p: 3,
// // //           mb: 3,
// // //         }}
// // //       >
// // //         <Grid2
// // //           container
// // //           spacing={3}
// // //           sx={{ alignItems: "center" }}
// // //         >
// // //           <Grid2 size={{ xs: 12, md: 3 }}>
// // //             <Box
// // //               sx={{
// // //                 display: "flex",
// // //                 justifyContent: {
// // //                   xs: "center",
// // //                   md: "flex-start",
// // //                 },
// // //               }}
// // //             >
// // //               <Avatar
// // //                 src={user.profileImage}
// // //                 sx={{
// // //                   width: 120,
// // //                   height: 120,
// // //                   bgcolor: "#E5E7EB",
// // //                   color: "#9CA3AF",
// // //                   fontSize: 40,
// // //                 }}
// // //               >
// // //                 <Iconify
// // //                   icon="solar:user-bold"
// // //                   width={48}
// // //                 />
// // //               </Avatar>
// // //             </Box>
// // //           </Grid2>

// // //           <Grid2 size={{ xs: 12, md: 9 }}>
// // //             <Grid2 container spacing={2}>
// // //               {[
// // //                 {
// // //                   label: "اسم المستخدم",
// // //                   value: user.name,
// // //                 },
// // //                 {
// // //                   label: "البريد الإلكتروني",
// // //                   value: user.email,
// // //                 },
// // //                 {
// // //                   label: "رقم الهاتف",
// // //                   value: user.phoneNumber,
// // //                 },
// // //               ].map((field) => (
// // //                 <Grid2
// // //                   key={field.label}
// // //                   size={{ xs: 12, sm: 6 }}
// // //                 >
// // //                   <Typography
// // //                     sx={{
// // //                       fontSize: 13,
// // //                       color: "#6B7280",
// // //                       mb: 0.5,
// // //                     }}
// // //                   >
// // //                     {field.label}
// // //                   </Typography>

// // //                   <Typography
// // //                     sx={{
// // //                       fontSize: 16,
// // //                       fontWeight: 600,
// // //                       color: "#111827",
// // //                     }}
// // //                   >
// // //                     {field.value}
// // //                   </Typography>
// // //                 </Grid2>
// // //               ))}

// // //               <Grid2 size={{ xs: 12, sm: 6 }}>
// // //                 <Typography
// // //                   sx={{
// // //                     fontSize: 13,
// // //                     color: "#6B7280",
// // //                     mb: 0.5,
// // //                   }}
// // //                 >
// // //                   الحالة
// // //                 </Typography>

// // //                 <Chip
// // //                   label={statusBadge.label}
// // //                   sx={{
// // //                     bgcolor: statusBadge.bg,
// // //                     color: statusBadge.color,
// // //                     fontWeight: 600,
// // //                     borderRadius: "8px",
// // //                     height: 28,
// // //                   }}
// // //                 />
// // //               </Grid2>
// // //             </Grid2>
// // //           </Grid2>
// // //         </Grid2>
// // //       </Card>

// // //       <Card
// // //         sx={{
// // //           borderRadius: "20px",
// // //           boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
// // //           border: "1px solid rgba(0,0,0,0.04)",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         <Box sx={{ p: 3, bgcolor: "#fff" }}>
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               gap: 3,
// // //               borderBottom: "1px solid #f3f4f6",
// // //               pb: 2,
// // //               overflowX: "auto",
// // //             }}
// // //           >
// // //             {tabs.map((tab) => (
// // //               <Button
// // //                 key={tab.value}
// // //                 onClick={() => setStatusFilter(tab.value)}
// // //                 sx={{
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: 1,
// // //                   pb: 1,
// // //                   px: 0,
// // //                   color:
// // //                     statusFilter === tab.value
// // //                       ? "#111827"
// // //                       : "#6b7280",
// // //                   fontWeight: 600,
// // //                   textTransform: "none",
// // //                   fontSize: "0.95rem",
// // //                   borderBottom:
// // //                     statusFilter === tab.value
// // //                       ? "2px solid #111827"
// // //                       : "none",
// // //                   borderRadius: 0,
// // //                   mb: "-1px",
// // //                   whiteSpace: "nowrap",
// // //                   "&:hover": {
// // //                     backgroundColor: "transparent",
// // //                     color: "#38A8AC",
// // //                   },
// // //                 }}
// // //               >
// // //                 <Box
// // //                   sx={{
// // //                     backgroundColor:
// // //                       tab.value === "active"
// // //                         ? "#d1fae5"
// // //                         : tab.value === "inactive"
// // //                           ? "#f3f4f6"
// // //                           : "#1f2937",
// // //                     color:
// // //                       tab.value === "active"
// // //                         ? "#059669"
// // //                         : tab.value === "inactive"
// // //                           ? "#6b7280"
// // //                           : "#fff",
// // //                     fontSize: "0.75rem",
// // //                     fontWeight: 600,
// // //                     px: 1.5,
// // //                     py: 0.5,
// // //                     borderRadius: "6px",
// // //                   }}
// // //                 >
// // //                   {tab.count}
// // //                 </Box>

// // //                 {tab.label}
// // //               </Button>
// // //             ))}
// // //           </Box>
// // //         </Box>

// // //         <SimpleTable
// // //           data={filteredGroups}
// // //           headCells={groupTableHead}
// // //         />
// // //       </Card>
// // //     </Box>
// // //   );
// // // }
// // "use client";

// // import { useMemo, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Avatar,
// //   Box,
// //   Button,
// //   Card,
// //   Checkbox,
// //   Chip,
// //   Grid2,
// //   Switch,
// //   Typography,
// // } from "@mui/material";
// // import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
// // import Iconify from "src/components/iconify";
// // import SimpleTable from "src/components/SimpleTable";
// // import type { HeadCell } from "src/components/SimpleTable/types";

// // type GroupStatusFilter = "all" | "active" | "inactive";

// // type SpaceType = {
// //   id: string;
// //   spaceId: string;
// //   spaceName: string;
// //   categoryName: string;
// //   isActive: boolean;
// // };

// // type UserType = {
// //   id: string;
// //   name: string;
// //   profileImage: string;
// //   email: string;
// //   phoneNumber: string;
// //   isActive: boolean;
// // };

// // function createGroupCheckboxColumn(
// //   selected: string[],
// //   onToggle: (id: string) => void,
// //   onToggleAll: (ids: string[]) => void,
// //   rowIds: string[]
// // ): HeadCell<SpaceType> {
// //   const allSelected =
// //     rowIds.length > 0 && rowIds.every((id) => selected.includes(id));

// //   const someSelected = rowIds.some((id) => selected.includes(id));

// //   return {
// //     id: "select",
// //     label: "",
// //     align: "center",
// //     width: 48,
// //     renderHeader: () => (
// //       <Checkbox
// //         size="small"
// //         checked={allSelected}
// //         indeterminate={someSelected && !allSelected}
// //         onChange={() => onToggleAll(allSelected ? [] : rowIds)}
// //       />
// //     ),
// //     renderCell: (row) => (
// //       <Checkbox
// //         size="small"
// //         checked={selected.includes(row.spaceId)}
// //         onChange={() => onToggle(row.spaceId)}
// //         onClick={(e) => e.stopPropagation()}
// //       />
// //     ),
// //   };
// // }

// // type UserDetailViewProps = {
// //   user: UserType;
// //   spaces: {
// //     totalCount: number;
// //     items: SpaceType[];
// //   };
// // };

// // export default function UserDetailView({
// //   user,
// //   spaces,
// // }: UserDetailViewProps) {
// //   const router = useRouter();

// //   const [groups, setGroups] = useState<SpaceType[]>(
// //     spaces.items.map((g) => ({ ...g, id: g.spaceId }))
// //   );
// //   const [statusFilter, setStatusFilter] =
// //     useState<GroupStatusFilter>("all");
// //   const [selectedIds, setSelectedIds] = useState<string[]>([]);

// //   const activeCount = groups.filter((group) => group.isActive).length;
// //   const inactiveCount = groups.filter((group) => !group.isActive).length;

// //   const filteredGroups = useMemo(() => {
// //     if (statusFilter === "all") return groups;

// //     return groups.filter((group) =>
// //       statusFilter === "active" ? group.isActive : !group.isActive
// //     );
// //   }, [groups, statusFilter]);

// //   if (!user) {
// //     return (
// //       <Box sx={{ textAlign: "center", py: 8 }} dir="rtl">
// //         <Typography sx={{ mb: 2, color: "#6B7280" }}>
// //           المستخدم غير موجود
// //         </Typography>

// //         <Button
// //           variant="contained"
// //           onClick={() => router.push("/users")}
// //         >
// //           العودة للمستخدمين
// //         </Button>
// //       </Box>
// //     );
// //   }

// //   const tabs = [
// //     {
// //       label: "الكل",
// //       value: "all" as const,
// //       count: groups.length,
// //     },
// //     {
// //       label: "مفعل",
// //       value: "active" as const,
// //       count: activeCount,
// //     },
// //     {
// //       label: "معطل",
// //       value: "inactive" as const,
// //       count: inactiveCount,
// //     },
// //   ];

// //   const toggleSelect = (id: string) => {
// //     setSelectedIds((prev) =>
// //       prev.includes(id)
// //         ? prev.filter((item) => item !== id)
// //         : [...prev, id]
// //     );
// //   };

// //   const toggleSelectAll = (ids: string[]) => {
// //     setSelectedIds(ids);
// //   };

// //   const handleGroupStatusToggle = (id: string) => {
// //     setGroups((current) =>
// //       current.map((group) =>
// //         group.spaceId === id
// //           ? {
// //             ...group,
// //             isActive: !group.isActive,
// //           }
// //           : group
// //       )
// //     );
// //   };

// //   const groupTableHead: HeadCell<SpaceType>[] = [
// //     createGroupCheckboxColumn(
// //       selectedIds,
// //       toggleSelect,
// //       toggleSelectAll,
// //       filteredGroups.map((row) => row.spaceId)
// //     ),
// //     {
// //       id: "spaceName",
// //       label: "اسم المجموعة",
// //       align: "center",
// //       width: "30%",
// //     },
// //     {
// //       id: "categoryName",
// //       label: "الفئة",
// //       align: "center",
// //       width: "25%",
// //     },
// //     {
// //       id: "status",
// //       label: "الحالة",
// //       align: "center",
// //       width: "20%",
// //       renderCell: (row) => {
// //         const active = row.isActive;

// //         return (
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               gap: 1,
// //             }}
// //           >
// //             <Typography
// //               sx={{
// //                 fontSize: 13,
// //                 fontWeight: 600,
// //                 color: "#4b5563",
// //               }}
// //             >
// //               {active ? "مفعل" : "معطل"}
// //             </Typography>

// //             <Switch
// //               size="small"
// //               checked={active}
// //               onChange={() => handleGroupStatusToggle(row.spaceId)}
// //               sx={{
// //                 "& .MuiSwitch-track": {
// //                   backgroundColor: active ? "#00A76F" : "#e5e7eb",
// //                   opacity: 1,
// //                 },
// //                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
// //                   backgroundColor: "#00A76F",
// //                   opacity: 1,
// //                 },
// //               }}
// //             />
// //           </Box>
// //         );
// //       },
// //     },
// //   ];

// //   const statusBadge = user.isActive
// //     ? {
// //       label: "مفعل",
// //       bg: "#ECFDF3",
// //       color: "#027A48",
// //     }
// //     : {
// //       label: "معطل",
// //       bg: "#F2F4F7",
// //       color: "#667085",
// //     };

// //   return (
// //     <Box dir="rtl">
// //       <CustomBreadcrumbs
// //         links={[
// //           {
// //             name: "المستخدمين",
// //             href: "/users",
// //           },
// //           {
// //             name: user.name,
// //           },
// //         ]}
// //         sx={{ mb: 3 }}
// //       />

// //       <Typography
// //         sx={{
// //           fontSize: 22,
// //           fontWeight: 700,
// //           color: "#111827",
// //           mb: 2,
// //         }}
// //       >
// //         بيانات المستخدم
// //       </Typography>

// //       <Card
// //         sx={{
// //           borderRadius: "20px",
// //           border: "1px solid #E5E7EB",
// //           boxShadow: "none",
// //           p: 3,
// //           mb: 3,
// //         }}
// //       >
// //         <Grid2 container spacing={3} sx={{ alignItems: "center" }}>
// //           <Grid2 size={{ xs: 12, md: 3 }}>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: {
// //                   xs: "center",
// //                   md: "flex-end", // تم التعديل إلى flex-end لتتوافق مع محاذاة RTL بالصورة
// //                 },
// //               }}
// //             >
// //               <Avatar
// //                 src={user.profileImage}
// //                 sx={{
// //                   width: 120,
// //                   height: 120,
// //                   bgcolor: "#E5E7EB",
// //                   color: "#9CA3AF",
// //                   fontSize: 40,
// //                 }}
// //               >
// //                 <Iconify icon="solar:user-bold" width={48} />
// //               </Avatar>
// //             </Box>
// //           </Grid2>

// //           <Grid2 size={{ xs: 12, md: 9 }}>
// //             <Grid2 container spacing={2}>
// //               {[
// //                 {
// //                   label: "اسم المستخدم",
// //                   value: user.name,
// //                 },
// //                 {
// //                   label: "البريد الإلكتروني",
// //                   value: user.email,
// //                 },
// //                 {
// //                   label: "رقم الهاتف",
// //                   value: user.phoneNumber,
// //                 },
// //               ].map((field) => (
// //                 <Grid2 key={field.label} size={{ xs: 12, sm: 6 }}>
// //                   <Typography
// //                     sx={{
// //                       fontSize: 13,
// //                       color: "#6B7280",
// //                       mb: 0.5,
// //                     }}
// //                   >
// //                     {field.label}
// //                   </Typography>

// //                   <Typography
// //                     sx={{
// //                       fontSize: 16,
// //                       fontWeight: 600,
// //                       color: "#111827",
// //                     }}
// //                   >
// //                     {field.value}
// //                   </Typography>
// //                 </Grid2>
// //               ))}

// //               <Grid2 size={{ xs: 12, sm: 6 }}>
// //                 <Typography
// //                   sx={{
// //                     fontSize: 13,
// //                     color: "#6B7280",
// //                     mb: 0.5,
// //                   }}
// //                 >
// //                   الحالة
// //                 </Typography>

// //                 <Chip
// //                   label={statusBadge.label}
// //                   sx={{
// //                     bgcolor: statusBadge.bg,
// //                     color: statusBadge.color,
// //                     fontWeight: 600,
// //                     borderRadius: "8px",
// //                     height: 28,
// //                   }}
// //                 />
// //               </Grid2>
// //             </Grid2>
// //           </Grid2>
// //         </Grid2>
// //       </Card>

// //       <Card
// //         sx={{
// //           borderRadius: "20px",
// //           boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
// //           border: "1px solid rgba(0,0,0,0.04)",
// //           overflow: "hidden",
// //         }}
// //       >
// //         <Box sx={{ p: 3, bgcolor: "#fff" }}>
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "flex-start",
// //               gap: 3,
// //               borderBottom: "1px solid #f3f4f6",
// //               pb: 2,
// //               overflowX: "auto",
// //             }}
// //           >
// //             {tabs.map((tab) => (
// //               <Button
// //                 key={tab.value}
// //                 onClick={() => setStatusFilter(tab.value)}
// //                 sx={{
// //                   display: "flex",
// //                   flexDirection: "row-reverse", // لضمان ظهور الرقم على يسار النص في الـ RTL
// //                   alignItems: "center",
// //                   gap: 1,
// //                   pb: 1,
// //                   px: 0,
// //                   color: statusFilter === tab.value ? "#111827" : "#6b7280",
// //                   fontWeight: 600,
// //                   textTransform: "none",
// //                   fontSize: "0.95rem",
// //                   borderBottom:
// //                     statusFilter === tab.value
// //                       ? "2px solid #111827"
// //                       : "none",
// //                   borderRadius: 0,
// //                   mb: "-1px",
// //                   whiteSpace: "nowrap",
// //                   "&:hover": {
// //                     backgroundColor: "transparent",
// //                     color: "#38A8AC",
// //                   },
// //                 }}
// //               >
// //                 <Box
// //                   sx={{
// //                     backgroundColor:
// //                       tab.value === "active"
// //                         ? "#d1fae5"
// //                         : tab.value === "inactive"
// //                           ? "#f3f4f6"
// //                           : "#1f2937",
// //                     color:
// //                       tab.value === "active"
// //                         ? "#059669"
// //                         : tab.value === "inactive"
// //                           ? "#6b7280"
// //                           : "#fff",
// //                     fontSize: "0.75rem",
// //                     fontWeight: 600,
// //                     px: 1.5,
// //                     py: 0.5,
// //                     borderRadius: "6px",
// //                   }}
// //                 >
// //                   {tab.count}
// //                 </Box>

// //                 <Typography sx={{ fontWeight: "inherit", fontSize: "inherit" }}>
// //                   {tab.label}
// //                 </Typography>
// //               </Button>
// //             ))}
// //           </Box>
// //         </Box>

// //         <SimpleTable data={filteredGroups} headCells={groupTableHead} />
// //       </Card>
// //     </Box>
// //   );
// // }
// 'use client';

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Checkbox,
//   Chip,
//   Grid2,
//   Switch,
//   Typography,
// } from '@mui/material';

// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import Iconify from 'src/components/iconify';
// import SimpleTable from 'src/components/SimpleTable';
// import type { HeadCell } from 'src/components/SimpleTable/types';

// type GroupStatusFilter = 'all' | 'active' | 'inactive';

// type SpaceType = {
//   id: string;
//   spaceId: string;
//   spaceName: string;
//   categoryName: string;
//   isActive: boolean;
// };

// type UserType = {
//   id: string;
//   name: string;
//   profileImage: string;
//   email: string;
//   phoneNumber: string;
//   isActive: boolean;
// };

// function createGroupCheckboxColumn(
//   selected: string[],
//   onToggle: (id: string) => void,
//   onToggleAll: (ids: string[]) => void,
//   rowIds: string[]
// ): HeadCell<SpaceType> {
//   const allSelected =
//     rowIds.length > 0 && rowIds.every((id) => selected.includes(id));

//   const someSelected = rowIds.some((id) => selected.includes(id));

//   return {
//     id: 'select',
//     label: '',
//     align: 'center',
//     width: 48,
//     renderHeader: () => (
//       <Checkbox
//         size="small"
//         checked={allSelected}
//         indeterminate={someSelected && !allSelected}
//         onChange={() => onToggleAll(allSelected ? [] : rowIds)}
//       />
//     ),
//     renderCell: (row) => (
//       <Checkbox
//         size="small"
//         checked={selected.includes(row.spaceId)}
//         onChange={() => onToggle(row.spaceId)}
//         onClick={(e) => e.stopPropagation()}
//       />
//     ),
//   };
// }

// type UserDetailViewProps = {
//   user: UserType;
//   spaces: {
//     totalCount: number;
//     items: SpaceType[];
//   };
// };

// export default function UserDetailView({ user, spaces }: UserDetailViewProps) {
//   const router = useRouter();

//   const [groups, setGroups] = useState<SpaceType[]>(
//     spaces.items.map((g) => ({ ...g, id: g.spaceId }))
//   );
//   const [statusFilter, setStatusFilter] = useState<GroupStatusFilter>('all');
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   const activeCount = groups.filter((group) => group.isActive).length;
//   const inactiveCount = groups.filter((group) => !group.isActive).length;

//   const filteredGroups = useMemo(() => {
//     if (statusFilter === 'all') return groups;

//     return groups.filter((group) =>
//       statusFilter === 'active' ? group.isActive : !group.isActive
//     );
//   }, [groups, statusFilter]);

//   if (!user) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 8 }} dir="rtl">
//         <Typography sx={{ mb: 2, color: '#6B7280' }}>
//           المستخدم غير موجود
//         </Typography>

//         <Button variant="contained" onClick={() => router.push('/users')}>
//           العودة للمستخدمين
//         </Button>
//       </Box>
//     );
//   }

//   const tabs = [
//     {
//       label: 'الكل',
//       value: 'all' as const,
//       count: groups.length,
//     },
//     {
//       label: 'مفعل',
//       value: 'active' as const,
//       count: activeCount,
//     },
//     {
//       label: 'معطل',
//       value: 'inactive' as const,
//       count: inactiveCount,
//     },
//   ];

//   const toggleSelect = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = (ids: string[]) => {
//     setSelectedIds(ids);
//   };

//   const handleGroupStatusToggle = (id: string) => {
//     setGroups((current) =>
//       current.map((group) =>
//         group.spaceId === id
//           ? {
//             ...group,
//             isActive: !group.isActive,
//           }
//           : group
//       )
//     );
//   };

//   const groupTableHead: HeadCell<SpaceType>[] = [
//     createGroupCheckboxColumn(
//       selectedIds,
//       toggleSelect,
//       toggleSelectAll,
//       filteredGroups.map((row) => row.spaceId)
//     ),
//     {
//       id: 'spaceName',
//       label: 'اسم المجموعة',
//       align: 'center',
//       width: '30%',
//     },
//     {
//       id: 'categoryName',
//       label: 'الفئة',
//       align: 'center',
//       width: '25%',
//     },
//     {
//       id: 'status',
//       label: 'الحالة',
//       align: 'center',
//       width: '20%',
//       renderCell: (row) => {
//         const active = row.isActive;

//         return (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: 1,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: 13,
//                 fontWeight: 600,
//                 color: '#4b5563',
//               }}
//             >
//               {active ? 'مفعل' : 'معطل'}
//             </Typography>

//             <Switch
//               size="small"
//               checked={active}
//               onChange={() => handleGroupStatusToggle(row.spaceId)}
//               sx={{
//                 '& .MuiSwitch-track': {
//                   backgroundColor: active ? '#00A76F' : '#e5e7eb',
//                   opacity: 1,
//                 },
//                 '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//                   backgroundColor: '#00A76F',
//                   opacity: 1,
//                 },
//               }}
//             />
//           </Box>
//         );
//       },
//     },
//   ];

//   const statusBadge = user.isActive
//     ? {
//       label: 'مفعل',
//       bg: '#ECFDF3',
//       color: '#027A48',
//     }
//     : {
//       label: 'معطل',
//       bg: '#F2F4F7',
//       color: '#667085',
//     };

//   return (
//     <Box dir="rtl">
//       <CustomBreadcrumbs
//         links={[
//           {
//             name: 'المستخدمين',
//             href: '/users',
//           },
//           {
//             name: user.name,
//           },
//         ]}
//         sx={{ mb: 3 }}
//       />

//       <Typography
//         sx={{
//           fontSize: 22,
//           fontWeight: 700,
//           color: '#111827',
//           mb: 2,
//         }}
//       >
//         بيانات المستخدم
//       </Typography>

//       <Card
//         sx={{
//           borderRadius: '20px',
//           border: '1px solid #E5E7EB',
//           boxShadow: 'none',
//           p: 3,
//           mb: 3,
//         }}
//       >
//         <Grid2 container spacing={3} sx={{ alignItems: 'center' }}>
//           <Grid2 size={{ xs: 12, md: 3 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: {
//                   xs: 'center',
//                   md: 'flex-end',
//                 },
//               }}
//             >
//               <Avatar
//                 src={user.profileImage}
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   bgcolor: '#E5E7EB',
//                   color: '#9CA3AF',
//                   fontSize: 40,
//                 }}
//               >
//                 <Iconify icon="solar:user-bold" width={48} />
//               </Avatar>
//             </Box>
//           </Grid2>

//           <Grid2 size={{ xs: 12, md: 9 }}>
//             <Grid2 container spacing={2}>
//               {[
//                 {
//                   label: 'اسم المستخدم',
//                   value: user.name,
//                 },
//                 {
//                   label: 'البريد الإلكتروني',
//                   value: user.email,
//                 },
//                 {
//                   label: 'رقم الهاتف',
//                   value: user.phoneNumber,
//                 },
//               ].map((field) => (
//                 <Grid2 key={field.label} size={{ xs: 12, sm: 6 }}>
//                   <Typography
//                     sx={{
//                       fontSize: 13,
//                       color: '#6B7280',
//                       mb: 0.5,
//                     }}
//                   >
//                     {field.label}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       fontSize: 16,
//                       fontWeight: 600,
//                       color: '#111827',
//                     }}
//                   >
//                     {field.value}
//                   </Typography>
//                 </Grid2>
//               ))}

//               <Grid2 size={{ xs: 12, sm: 6 }}>
//                 <Typography
//                   sx={{
//                     fontSize: 13,
//                     color: '#6B7280',
//                     mb: 0.5,
//                   }}
//                 >
//                   الحالة
//                 </Typography>

//                 <Chip
//                   label={statusBadge.label}
//                   sx={{
//                     bgcolor: statusBadge.bg,
//                     color: statusBadge.color,
//                     fontWeight: 600,
//                     borderRadius: '8px',
//                     height: 28,
//                   }}
//                 />
//               </Grid2>
//             </Grid2>
//           </Grid2>
//         </Grid2>
//       </Card>

//       <Card
//         sx={{
//           borderRadius: '20px',
//           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
//           border: '1px solid rgba(0,0,0,0.04)',
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ p: 3, bgcolor: '#fff' }}>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'flex-start',
//               gap: 3,
//               borderBottom: '1px solid #f3f4f6',
//               pb: 2,
//               overflowX: 'auto',
//             }}
//           >
//             {tabs.map((tab) => (
//               <Button
//                 key={tab.value}
//                 onClick={() => setStatusFilter(tab.value)}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'row-reverse',
//                   alignItems: 'center',
//                   gap: 1,
//                   pb: 1,
//                   px: 0,
//                   color: statusFilter === tab.value ? '#111827' : '#6b7280',
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   fontSize: '0.95rem',
//                   borderBottom:
//                     statusFilter === tab.value ? '2px solid #111827' : 'none',
//                   borderRadius: 0,
//                   mb: '-1px',
//                   whiteSpace: 'nowrap',
//                   '&:hover': {
//                     backgroundColor: 'transparent',
//                     color: '#38A8AC',
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor:
//                       tab.value === 'active'
//                         ? '#d1fae5'
//                         : tab.value === 'inactive'
//                           ? '#f3f4f6'
//                           : '#1f2937',
//                     color:
//                       tab.value === 'active'
//                         ? '#059669'
//                         : tab.value === 'inactive'
//                           ? '#6b7280'
//                           : '#fff',
//                     fontSize: '0.75rem',
//                     fontWeight: 600,
//                     px: 1.5,
//                     py: 0.5,
//                     borderRadius: '6px',
//                   }}
//                 >
//                   {tab.count}
//                 </Box>

//                 <Typography sx={{ fontWeight: 'inherit', fontSize: 'inherit' }}>
//                   {tab.label}
//                 </Typography>
//               </Button>
//             ))}
//           </Box>
//         </Box>

//         <SimpleTable data={filteredGroups} headCells={groupTableHead} />
//       </Card>
//     </Box>
//   );
// }
'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Grid2,
  Switch,
  Typography,
} from '@mui/material';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import SimpleTable from 'src/components/SimpleTable';
import type { HeadCell } from 'src/components/SimpleTable/types';

type GroupStatusFilter = 'all' | 'active' | 'inactive';

type SpaceType = {
  id: string;
  spaceId: string;
  spaceName: string;
  categoryName: string;
  isActive: boolean;
};

type UserType = {
  id: string;
  name: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
};

function createGroupCheckboxColumn(
  selected: string[],
  onToggle: (id: string) => void,
  onToggleAll: (ids: string[]) => void,
  rowIds: string[]
): HeadCell<SpaceType> {
  const allSelected =
    rowIds.length > 0 && rowIds.every((id) => selected.includes(id));

  const someSelected = rowIds.some((id) => selected.includes(id));

  return {
    id: 'select',
    label: '',
    align: 'center',
    width: 48,
    renderHeader: () => (
      <Checkbox
        size="small"
        checked={allSelected}
        indeterminate={someSelected && !allSelected}
        onChange={() => onToggleAll(allSelected ? [] : rowIds)}
      />
    ),
    renderCell: (row) => (
      <Checkbox
        size="small"
        checked={selected.includes(row.spaceId)}
        onChange={() => onToggle(row.spaceId)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
}

type UserDetailViewProps = {
  user: UserType;
  spaces: {
    totalCount: number;
    items: SpaceType[];
  };
};

export default function UserDetailView({ user, spaces }: UserDetailViewProps) {
  const router = useRouter();

  const [groups, setGroups] = useState<SpaceType[]>(
    spaces.items.map((g) => ({ ...g, id: g.spaceId }))
  );
  const [statusFilter, setStatusFilter] = useState<GroupStatusFilter>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const activeCount = groups.filter((group) => group.isActive).length;
  const inactiveCount = groups.filter((group) => !group.isActive).length;

  const filteredGroups = useMemo(() => {
    if (statusFilter === 'all') return groups;

    return groups.filter((group) =>
      statusFilter === 'active' ? group.isActive : !group.isActive
    );
  }, [groups, statusFilter]);

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }} dir="rtl">
        <Typography sx={{ mb: 2, color: '#6B7280' }}>
          المستخدم غير موجود
        </Typography>

        <Button variant="contained" onClick={() => router.push('/users')}>
          العودة للمستخدمين
        </Button>
      </Box>
    );
  }

  const tabs = [
    {
      label: 'الكل',
      value: 'all' as const,
      count: groups.length,
    },
    {
      label: 'مفعل',
      value: 'active' as const,
      count: activeCount,
    },
    {
      label: 'معطل',
      value: 'inactive' as const,
      count: inactiveCount,
    },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleGroupStatusToggle = (id: string) => {
    setGroups((current) =>
      current.map((group) =>
        group.spaceId === id
          ? {
            ...group,
            isActive: !group.isActive,
          }
          : group
      )
    );
  };

  const groupTableHead: HeadCell<SpaceType>[] = [
    createGroupCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      filteredGroups.map((row) => row.spaceId)
    ),
    {
      id: 'spaceName',
      label: 'اسم المجموعة',
      align: 'center',
      width: '30%',
    },
    {
      id: 'categoryName',
      label: 'الفئة',
      align: 'center',
      width: '25%',
    },
    {
      id: 'status',
      label: 'الحالة',
      align: 'center',
      width: '20%',
      renderCell: (row) => {
        const active = row.isActive;

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#4b5563',
              }}
            >
              {active ? 'مفعل' : 'معطل'}
            </Typography>

            <Switch
              size="small"
              checked={active}
              onChange={() => handleGroupStatusToggle(row.spaceId)}
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: active ? '#00A76F' : '#e5e7eb',
                  opacity: 1,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#00A76F',
                  opacity: 1,
                },
              }}
            />
          </Box>
        );
      },
    },
  ];

  const statusBadge = user.isActive
    ? {
      label: 'مفعل',
      bg: '#ECFDF3',
      color: '#027A48',
    }
    : {
      label: 'معطل',
      bg: '#F2F4F7',
      color: '#667085',
    };

  return (
    <Box dir="rtl">
      <CustomBreadcrumbs
        links={[
          {
            name: 'المستخدمين',
            href: '/users',
          },
          {
            name: user.name,
          },
        ]}
        sx={{ mb: 3 }}
      />

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: '#111827',
          mb: 2,
        }}
      >
        بيانات المستخدم
      </Typography>

      <Card
        sx={{
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          p: 3,
          mb: 3,
        }}
      >
        <Grid2 container spacing={3} sx={{ alignItems: 'center' }}>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'flex-end',
                },
              }}
            >
              <Avatar
                src={user.profileImage}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: '#E5E7EB',
                  color: '#9CA3AF',
                  fontSize: 40,
                }}
              >
                <Iconify icon="solar:user-bold" width={48} />
              </Avatar>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 9 }}>
            <Grid2 container spacing={2}>
              {[
                {
                  label: 'اسم المستخدم',
                  value: user.name,
                },
                {
                  label: 'البريد الإلكتروني',
                  value: user.email,
                },
                {
                  label: 'رقم الهاتف',
                  value: user.phoneNumber,
                },
              ].map((field) => (
                <Grid2 key={field.label} size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: '#6B7280',
                      mb: 0.5,
                    }}
                  >
                    {field.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    {field.value}
                  </Typography>
                </Grid2>
              ))}

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: '#6B7280',
                    mb: 0.5,
                  }}
                >
                  الحالة
                </Typography>

                <Chip
                  label={statusBadge.label}
                  sx={{
                    bgcolor: statusBadge.bg,
                    color: statusBadge.color,
                    fontWeight: 600,
                    borderRadius: '8px',
                    height: 28,
                  }}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Card>

      <Card
        sx={{
          borderRadius: '20px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, bgcolor: '#fff' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 3,
              borderBottom: '1px solid #f3f4f6',
              pb: 2,
              overflowX: 'auto',
            }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  gap: 1,
                  pb: 1,
                  px: 0,
                  color: statusFilter === tab.value ? '#111827' : '#6b7280',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  borderBottom:
                    statusFilter === tab.value ? '2px solid #111827' : 'none',
                  borderRadius: 0,
                  mb: '-1px',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#38A8AC',
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      tab.value === 'active'
                        ? '#d1fae5'
                        : tab.value === 'inactive'
                          ? '#f3f4f6'
                          : '#1f2937',
                    color:
                      tab.value === 'active'
                        ? '#059669'
                        : tab.value === 'inactive'
                          ? '#6b7280'
                          : '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '6px',
                  }}
                >
                  {tab.count}
                </Box>

                <Typography sx={{ fontWeight: 'inherit', fontSize: 'inherit' }}>
                  {tab.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>

        <SimpleTable data={filteredGroups} headCells={groupTableHead} />
      </Card>
    </Box>
  );
}