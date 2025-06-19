import { keepPreviousData, useQuery, type QueryFunction } from "@tanstack/react-query";
import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { PaginatedData } from "@/types/pagination";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

type Props<T> = {
  queryKey: string;
  columns: ColumnDef<T>[];
  queryFn: QueryFunction<PaginatedData<T>>;
  initialPageSize?: number;
};

export function usePageableData<T>({
  queryKey,
  columns,
  queryFn,
  initialPageSize = DEFAULT_PAGE_SIZE,
}: Props<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: initialPageSize,
  });

  const apiParams = useMemo(() => ({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  }), [pagination]);

  const { data, isFetching, error } = useQuery<PaginatedData<T>>({
    queryKey: [queryKey, apiParams],
    queryFn,
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 1000 * 20,
  });

  const table = useReactTable<T>({
    data: data?.content ?? [],
    columns,
    state: { pagination },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    rowCount: data?.page.totalElements,
  });

  return { table, isFetching, error };
} 