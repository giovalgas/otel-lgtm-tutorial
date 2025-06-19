import {z} from "zod"

export const userSchema = z.object({
    userAmount: z.number().min(1).max(5000),
    repeat: z.number().min(1).max(5000),
})

export type UserRequest = z.infer<typeof userSchema>;
