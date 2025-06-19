import { type PaginationState } from "@tanstack/react-table";
import type { Page } from "@/types/page";

export type PaginatedData<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  page: Page;
};

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${"asc" | "desc"}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;
