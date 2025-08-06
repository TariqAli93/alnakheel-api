import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(6).max(255),
});

export const loginSchema = z.object({
    username: z.string().min(4).max(255),
    password: z.string().min(4).max(255),
});

export const refreshTokenSchema = z.object({
    refresh_token: z.string().min(1),
});
