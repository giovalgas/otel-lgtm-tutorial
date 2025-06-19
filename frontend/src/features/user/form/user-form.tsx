"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {NumberInput} from "@/components/number-input.tsx";
import { userSchema, type UserRequest } from "@/types/user"

export function ProfileForm({ onSubmit }: { onSubmit: (values: UserRequest) => void }) {
    const form = useForm<UserRequest>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            userAmount: 1,
            repeat: 1,
        },
    })

    return (
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
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Reset</Button>
                </div>
            </form>
        </Form>
    )
}
