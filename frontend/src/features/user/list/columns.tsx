"use client"

import type {ColumnDef} from "@tanstack/react-table"

export type User = {
    id: number
    firstName: string
    lastName: string
    fullAdress: string
    birthday: Date
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "fullAddress",
        header: "Address",
    },
    {
        accessorKey: "birthday",
        header: "Birthday",
    },
]