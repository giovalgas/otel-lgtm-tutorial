/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

import { api } from "./api";

export const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await api.get(queryKey[0]);
  return data;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

type DefaultPageableQueryFnProps = {
    queryKey: QueryKey;
    endpoint: string;
};

export const defaultPageableQueryFn = async <T>({ queryKey, endpoint }: DefaultPageableQueryFnProps): Promise<T> => {
    const [, params] = queryKey;
    
    const searchParams = new URLSearchParams();
    if (params && typeof params === 'object') {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                searchParams.append(key, String(value));
            }
        });
    }

    const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Failed to fetch pageable data:", error);
        throw error;
    }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn,
    },
  },
});
