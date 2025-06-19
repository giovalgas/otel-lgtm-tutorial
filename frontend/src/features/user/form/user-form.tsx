"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {NumberInput} from "@/components/number-input.tsx";

const formSchema = z.object({
    userAmount: z.number().min(1).max(5000),
    repeat: z.number().min(1).max(5000),
})

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userAmount: 1,
            repeat: 1,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

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
