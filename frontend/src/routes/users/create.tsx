import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/users/create')({
    component: CreateUserPage,
})

function CreateUserPage() {
    return <div className="p-2">Hello from create!</div>
}
