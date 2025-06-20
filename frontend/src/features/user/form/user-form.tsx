"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {NumberInput} from "@/components/number-input.tsx";
import { userSchema, type UserRequest } from "@/types/user"
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileForm({ onSubmit, isPending = false }: { onSubmit: (values: UserRequest) => void; isPending?: boolean }) {
    const form = useForm<UserRequest>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            userAmount: 1,
            repeat: 1,
        },
    })

    return (
        <div className="relative">
            {isPending && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg -m-4 p-8">
                    <div className="flex flex-col space-y-6">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-12 w-full" />
                        <div className="flex gap-3">
                            <Skeleton className="h-11 w-24" />
                            <Skeleton className="h-11 w-24" />
                        </div>
                    </div>
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => form.reset()} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="userAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Amount</FormLabel>
                                <FormDescription>This is the amount of users that will be created.</FormDescription>
                                <FormControl>
                                    <NumberInput
                                        placeholder="This is the amount of users that will be created."
                                        value={typeof field.value === 'number' ? field.value : undefined}
                                        onValueChange={val => field.onChange(val ?? undefined)}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repeat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat for</FormLabel>
                                <FormDescription>This is the amount of messages that will be sent.</FormDescription>
                                <FormControl>
                                    <NumberInput
                                        placeholder="This is the amount of messages that will be sent"
                                        value={typeof field.value === 'number' ? field.value : undefined}
                                        onValueChange={val => field.onChange(val ?? undefined)}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Submitting..." : "Submit"}
                        </Button>
                        <Button type="reset" disabled={isPending}>Reset</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
