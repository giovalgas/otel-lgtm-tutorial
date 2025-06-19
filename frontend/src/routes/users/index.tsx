import {createFileRoute} from '@tanstack/react-router'
import {UsersList} from "@/features/user/list/user-list.tsx";

export const Route = createFileRoute('/users/')({
    component: UsersPage,
})

function UsersPage() {
    return <UsersList />
}
