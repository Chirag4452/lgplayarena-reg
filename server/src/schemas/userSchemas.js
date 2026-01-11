import { z } from "zod";

// Individual user data schema
export const userDataSchema = z.object({
    name: z.string().min(3).max(50),
    coach_name: z.string().min(3).max(50),
    parent_name: z.string().min(3).max(50),
    parent_phone: z.string().min(10).max(10),
    grade: z.string().min(1).max(4),
    gender: z.enum(['male', 'female']),
    address: z.string().min(10).max(200),
});

// Complete registration request schema
export const registrationSchema = z.object({
    user: userDataSchema,
});

// Legacy schema for backward compatibility
export const userSchema = userDataSchema;