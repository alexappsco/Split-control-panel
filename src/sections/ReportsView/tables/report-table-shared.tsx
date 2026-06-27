// // "use client";

// // import type { HeadCell } from "src/components/SimpleTable/types";

// // import { Chip, Checkbox } from "@mui/material";
// // import { useQuery } from "src/components/use-query";
// // import { useMemo, useState, useEffect, useCallback } from "react";

// // import { ReportTabValue } from "../constants";
// // import {
// //   tabQueryKey,
// //   getReportsPage,
// //   getTabQueryKeys,
// //   type BaseTabParams,
// // } from "../reports-params";

// // export function asRecord(value: unknown): Record<string, unknown> {
// //   return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
// // }

// // export function StatusChip({
// //   label,
// //   variant,
// // }: {
// //   label: string;
// //   variant: "success" | "warning" | "error";
// // }) {
// //   const styles = {
// //     success: { bg: "#ECFDF3", color: "#027A48" },
// //     warning: { bg: "#FFF4E5", color: "#B76E00" },
// //     error: { bg: "#FFE5E5", color: "#B91C1C" },
// //   };
// //   const { bg, color } = styles[variant];

// //   return (
// //     <Chip
// //       label={label}
// //       size="small"
// //       sx={{
// //         bgcolor: bg,
// //         color,
// //         fontWeight: 600,
// //         fontSize: 12,
// //         height: 26,
// //         borderRadius: "999px",
// //         "& .MuiChip-label": { px: 1.25 },
// //       }}
// //     />
// //   );
// // }

// // export function createCheckboxColumn<T extends { id: string }>(
// //   selected: string[],
// //   onToggle: (id: string) => void,
// //   onToggleAll: (ids: string[]) => void,
// //   rowIds: string[]
// // ): HeadCell<T> {
// //   const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.includes(id));
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
// //         checked={selected.includes(row.id)}
// //         onChange={() => onToggle(row.id)}
// //         onClick={(e) => e.stopPropagation()}
// //       />
// //     ),
// //   };
// // }

// // export const filterFieldSx = {
// //   height: 44,
// //   minWidth: 160,
// //   borderRadius: "10px",
// //   bgcolor: "#fff",
// //   fontSize: 14,
// //   alignSelf: { xs: "flex-start", sm: "auto" },
// //   "& .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "#E5E7EB",
// //   },
// // } as const;

// // export const searchFieldSx = {
// //   width: { xs: "100%", sm: 320 },
// //   "& .MuiOutlinedInput-root": {
// //     height: 44,
// //     borderRadius: "10px",
// //     bgcolor: "#fff",
// //   },
// // } as const;

// // export function useTabQuery<T extends BaseTabParams>(
// //   tab: ReportTabValue,
// //   serverParams: T
// // ) {
// //   const queryKeys = useMemo(() => getTabQueryKeys(tab), [tab]);
// //   const { set } = useQuery(queryKeys, { replace: true });

// //   const updateParams = useCallback(
// //     (updates: Partial<Record<keyof T, string | null>>) => {
// //       const prefixedUpdates = Object.fromEntries(
// //         Object.entries(updates).map(([key, value]) => [
// //           tabQueryKey(tab, key),
// //           value,
// //         ])
// //       );

// //       set(
// //         {
// //           tab,
// //           ...prefixedUpdates,
// //         },
// //         { replace: true }
// //       );
// //     },
// //     [set, tab]
// //   );

// //   const page = getReportsPage(serverParams);

// //   const pagination = {
// //     count: 0,
// //     page,
// //     rowsPerPage: serverParams.MaxResultCount,
// //     onPageChange: (
// //       _event: React.MouseEvent<HTMLButtonElement> | null,
// //       newPage: number
// //     ) => {
// //       updateParams({
// //         SkipCount: String(newPage * serverParams.MaxResultCount),
// //       } as Partial<Record<keyof T, string | null>>);
// //     },
// //     onRowsPerPageChange: (
// //       event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //     ) => {
// //       updateParams({
// //         MaxResultCount: event.target.value,
// //         SkipCount: "0",
// //       } as Partial<Record<keyof T, string | null>>);
// //     },
// //   };

// //   return { updateParams, pagination, page };
// // }

// // export function useDebouncedSearch<T extends BaseTabParams>(
// //   tab: ReportTabValue,
// //   serverParams: T,
// //   updateParams: (updates: Partial<Record<keyof T, string | null>>) => void
// // ) {
// //   const [searchInput, setSearchInput] = useState(serverParams.SearchTerm);

// //   useEffect(() => {
// //     setSearchInput(serverParams.SearchTerm);
// //   }, [serverParams.SearchTerm, tab]);

// //   useEffect(() => {
// //     const timer = window.setTimeout(() => {
// //       if (searchInput === serverParams.SearchTerm) return;

// //       updateParams({
// //         SearchTerm: searchInput.trim() || null,
// //         SkipCount: "0",
// //       } as Partial<Record<keyof T, string | null>>);
// //     }, 400);

// //     return () => window.clearTimeout(timer);
// //   }, [searchInput, serverParams.SearchTerm, updateParams]);

// //   return { searchInput, setSearchInput };
// // }

// // export function useRowSelection() {
// //   const [selectedIds, setSelectedIds] = useState<string[]>([]);

// //   const toggleSelect = (id: string) => {
// //     setSelectedIds((prev) =>
// //       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleSelectAll = (ids: string[]) => {
// //     setSelectedIds(ids);
// //   };

// //   const clearSelection = () => setSelectedIds([]);

// //   return { selectedIds, toggleSelect, toggleSelectAll, clearSelection };
// // }
// "use client";

// import type { HeadCell } from "src/components/SimpleTable/types";

// import { Chip, Checkbox } from "@mui/material";
// import { useQuery } from "src/components/use-query";
// import { useMemo, useState, useEffect, useCallback } from "react";

// import { ReportTabValue } from "../constants";
// import {
//   tabQueryKey,
//   getReportsPage,
//   getTabQueryKeys,
//   type BaseTabParams,
// } from "../reports-params";

// export function asRecord(value: unknown): Record<string, unknown> {
//   return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
// }

// export function StatusChip({
//   label,
//   variant,
// }: {
//   label: string;
//   variant: "success" | "warning" | "error";
// }) {
//   const styles = {
//     success: { bg: "#ECFDF3", color: "#027A48" },
//     warning: { bg: "#FFF4E5", color: "#B76E00" },
//     error: { bg: "#FFE5E5", color: "#B91C1C" },
//   };
//   const { bg, color } = styles[variant];

//   return (
//     <Chip
//       label={label}
//       size="small"
//       sx={{
//         bgcolor: bg,
//         color,
//         fontWeight: 600,
//         fontSize: 12,
//         height: 26,
//         borderRadius: "999px",
//         "& .MuiChip-label": { px: 1.25 },
//       }}
//     />
//   );
// }

// export function createCheckboxColumn<T extends { id: string }>(
//   selected: string[],
//   onToggle: (id: string) => void,
//   onToggleAll: (ids: string[]) => void,
//   rowIds: string[]
// ): HeadCell<T> {
//   const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.includes(id));
//   const someSelected = rowIds.some((id) => selected.includes(id));

//   return {
//     id: "select",
//     label: "",
//     align: "center",
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
//         checked={selected.includes(row.id)}
//         onChange={() => onToggle(row.id)}
//         onClick={(e) => e.stopPropagation()}
//       />
//     ),
//   };
// }

// export const filterFieldSx = {
//   height: 44,
//   minWidth: 160,
//   borderRadius: "10px",
//   bgcolor: "#fff",
//   fontSize: 14,
//   alignSelf: { xs: "flex-start", sm: "auto" },
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#E5E7EB",
//   },
// } as const;

// export const searchFieldSx = {
//   width: { xs: "100%", sm: 320 },
//   "& .MuiOutlinedInput-root": {
//     height: 44,
//     borderRadius: "10px",
//     bgcolor: "#fff",
//   },
// } as const;

// export function useTabQuery<T extends BaseTabParams>(
//   tab: ReportTabValue,
//   serverParams: T
// ) {
//   const queryKeys = useMemo(() => getTabQueryKeys(tab), [tab]);
//   const { set } = useQuery(queryKeys, { replace: true });

//   const updateParams = useCallback(
//     (updates: Partial<Record<keyof T, string | null>>) => {
//       const prefixedUpdates = Object.fromEntries(
//         Object.entries(updates).map(([key, value]) => [
//           tabQueryKey(tab, key),
//           value,
//         ])
//       );

//       set(
//         {
//           tab,
//           ...prefixedUpdates,
//         },
//         { replace: true }
//       );
//     },
//     [set, tab]
//   );

//   const page = getReportsPage(serverParams);

//   const pagination = {
//     count: 0,
//     page,
//     rowsPerPage: serverParams.MaxResultCount,
//     onPageChange: (
//       _event: React.MouseEvent<HTMLButtonElement> | null,
//       newPage: number
//     ) => {
//       updateParams({
//         SkipCount: String(newPage * serverParams.MaxResultCount),
//       } as Partial<Record<keyof T, string | null>>);
//     },
//     onRowsPerPageChange: (
//       event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//       updateParams({
//         MaxResultCount: event.target.value,
//         SkipCount: "0",
//       } as Partial<Record<keyof T, string | null>>);
//     },
//   };

//   return { updateParams, pagination, page };
// }

// export function useDebouncedSearch<T extends BaseTabParams>(
//   tab: ReportTabValue,
//   serverParams: T,
//   updateParams: (updates: Partial<Record<keyof T, string | null>>) => void
// ) {
//   const [searchInput, setSearchInput] = useState(serverParams.SearchTerm);

//   useEffect(() => {
//     setSearchInput(serverParams.SearchTerm);
//   }, [serverParams.SearchTerm, tab]);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       if (searchInput === serverParams.SearchTerm) return;

//       updateParams({
//         SearchTerm: searchInput.trim() || null,
//         SkipCount: "0",
//       } as Partial<Record<keyof T, string | null>>);
//     }, 400);

//     return () => window.clearTimeout(timer);
//   }, [searchInput, serverParams.SearchTerm, updateParams]);

//   return { searchInput, setSearchInput };
// }

// export function useRowSelection() {
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   const toggleSelect = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = (ids: string[]) => {
//     setSelectedIds(ids);
//   };

//   const clearSelection = () => setSelectedIds([]);

//   return { selectedIds, toggleSelect, toggleSelectAll, clearSelection };
// }
"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { Chip, Checkbox } from "@mui/material";
import { useQuery } from "src/components/use-query";
import { useMemo, useState, useEffect, useCallback } from "react";

import { ReportTabValue } from "../constants";
import {
  tabQueryKey,
  getReportsPage,
  getTabQueryKeys,
  type BaseTabParams,
} from "../reports-params";

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export function StatusChip({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "warning" | "error";
}) {
  const styles = {
    success: { bg: "#ECFDF3", color: "#027A48" },
    warning: { bg: "#FFF4E5", color: "#B76E00" },
    error: { bg: "#FFE5E5", color: "#B91C1C" },
  };
  const { bg, color } = styles[variant];

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color,
        fontWeight: 600,
        fontSize: 12,
        height: 26,
        borderRadius: "999px",
        "& .MuiChip-label": { px: 1.25 },
      }}
    />
  );
}

export function createCheckboxColumn<T extends { id: string }>(
  selected: string[],
  onToggle: (id: string) => void,
  onToggleAll: (ids: string[]) => void,
  rowIds: string[]
): HeadCell<T> {
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.includes(id));
  const someSelected = rowIds.some((id) => selected.includes(id));

  return {
    id: "select",
    label: "",
    align: "center",
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
        checked={selected.includes(row.id)}
        onChange={() => onToggle(row.id)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
}

export const filterFieldSx = {
  height: 44,
  minWidth: 160,
  borderRadius: "10px",
  bgcolor: "#fff",
  fontSize: 14,
  alignSelf: { xs: "flex-start", sm: "auto" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
  },
} as const;

export const searchFieldSx = {
  width: { xs: "100%", sm: 320 },
  "& .MuiOutlinedInput-root": {
    height: 44,
    borderRadius: "10px",
    bgcolor: "#fff",
  },
} as const;

export function useTabQuery<T extends BaseTabParams>(
  tab: ReportTabValue,
  serverParams: T
) {
  const queryKeys = useMemo(() => getTabQueryKeys(tab), [tab]);
  const { set } = useQuery(queryKeys, { replace: true });

  const updateParams = useCallback(
    (updates: Partial<Record<keyof T, string | null>>) => {
      const prefixedUpdates = Object.fromEntries(
        Object.entries(updates).map(([key, value]) => [
          tabQueryKey(tab, key),
          value,
        ])
      );

      set(
        {
          tab,
          ...prefixedUpdates,
        },
        { replace: true }
      );
    },
    [set, tab]
  );

  const page = getReportsPage(serverParams);

  const pagination = {
    count: 0,
    page,
    rowsPerPage: serverParams.MaxResultCount,
    onPageChange: (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      updateParams({
        SkipCount: String(newPage * serverParams.MaxResultCount),
      } as Partial<Record<keyof T, string | null>>);
    },
    onRowsPerPageChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      updateParams({
        MaxResultCount: event.target.value,
        SkipCount: "0",
      } as Partial<Record<keyof T, string | null>>);
    },
  };

  return { updateParams, pagination, page };
}

export function useDebouncedSearch<T extends BaseTabParams>(
  tab: ReportTabValue,
  serverParams: T,
  updateParams: (updates: Partial<Record<keyof T, string | null>>) => void
) {
  const [searchInput, setSearchInput] = useState(serverParams.SearchTerm);

  useEffect(() => {
    setSearchInput(serverParams.SearchTerm);
  }, [serverParams.SearchTerm, tab]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput === serverParams.SearchTerm) return;

      updateParams({
        SearchTerm: searchInput.trim() || null,
        SkipCount: "0",
      } as Partial<Record<keyof T, string | null>>);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, serverParams.SearchTerm, updateParams]);

  return { searchInput, setSearchInput };
}

export function useRowSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const clearSelection = () => setSelectedIds([]);

  return { selectedIds, toggleSelect, toggleSelectAll, clearSelection };
}