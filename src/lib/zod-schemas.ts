import { z } from "zod";

import { isStrongPassword } from "validator";

export const loginSchema = z.object({
	username: z.string().min(3).max(32),
	password: z.string().min(8).refine(isStrongPassword),
});

export const registerSchema = z
	.object({
		name: z.string().min(3).max(32),
		username: z.string().min(3).max(32),
		password: z.string().min(8).refine(isStrongPassword),
		confirmPassword: z.string().min(8).refine(isStrongPassword),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type InferredLoginSchema = z.infer<typeof loginSchema>;
export type InferredRegisterSchema = z.infer<typeof registerSchema>;
