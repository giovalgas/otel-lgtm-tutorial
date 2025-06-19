import {createFileRoute} from '@tanstack/react-router'
import {ProfileForm} from "@/features/user/form/user-form.tsx";

export const Route = createFileRoute('/users/create')({
    component: CreateUserPage,
})

function CreateUserPage() {
    return <ProfileForm />
}
