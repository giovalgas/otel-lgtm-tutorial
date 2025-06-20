import {createFileRoute} from '@tanstack/react-router'
import {ProfileForm} from "@/features/user/form/user-form.tsx";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import type { UserRequest } from '@/types/user';

export const Route = createFileRoute('/users/create')({
    component: CreateUserPage,
})

function CreateUserPage() {
    const { mutate, isPending } = useMutation({
      mutationFn: (values: UserRequest) => api.post("/api/v1/users", values),
      onSuccess: () => {
        toast.success("Users requested successfully, wait for the process to finish...");     
      },
      onError: () => toast.error("Error requesting users, please try again later."),
    });
  
    const onSubmit = async (values: UserRequest) => mutate(values);

    return <ProfileForm onSubmit={onSubmit} isPending={isPending}/>
}
