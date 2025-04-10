"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn } from "@/lib/auth-client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type InferredLoginSchema, loginSchema } from "@/lib/zod-schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<InferredLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function handleSubmit(data: InferredLoginSchema) {
		setIsLoading(true);
		setError(null);

		try {
			const result = await signIn.username({
				username: data.username,
				password: data.password,
			});

			if (result.error) {
				setError(
					result.error.message ??
						"An unexpected error occurred. Please try again.",
				);
			} else {
				router.push("/");
				router.refresh();
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardContent className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
						<div className="text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link href="/signup" className="text-blue-600 underline">
								Sign up
							</Link>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
