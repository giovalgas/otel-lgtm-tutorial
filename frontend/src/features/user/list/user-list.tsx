import {columns, type User} from "@/features/user/list/columns.tsx";
import {DataTable} from "@/components/data-table.tsx";
import { usePageableData } from "@/hooks/use-pageable-data";
import { defaultPageableQueryFn } from "@/lib/react-query";
import type { QueryFunctionContext } from "@tanstack/react-query";

function UsersList() {
    const { table } = usePageableData<User>({
        queryKey: "users",
        columns,
        queryFn: (context: QueryFunctionContext) => defaultPageableQueryFn({ queryKey: context.queryKey, endpoint: "/api/v1/users" }),
    });

    return (
        <div className="container mx-auto">
            <DataTable table={table} columns={columns} />
        </div>
    );
}

export { UsersList }