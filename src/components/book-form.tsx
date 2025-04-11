"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBook } from "@/actions/book-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function BookForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	async function handleSubmit(formData: FormData) {
		setIsLoading(true);
		setError(null);

		try {
			const result = await createBook(formData);
			if (result.error) {
				setError(result.error);
			} else {
				setSuccess(true);
				router.replace(`/book/${result.bookId}`);
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card className="w-1/2">
			<CardContent className="p-6">
				<form action={handleSubmit} className="space-y-6">
					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert variant="success">
							<AlertCircle className="size-4" />
							<AlertTitle>Success!</AlertTitle>
							<AlertDescription>
								Book added successfully! redirecting back to home page...
							</AlertDescription>
						</Alert>
					)}

					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" name="title" maxLength={128} required />
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							rows={5}
							className="resize-none"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="imageUrl">Image URL</Label>
						<Input
							id="imageUrl"
							name="imageUrl"
							type="url"
							placeholder="https://example.com/book-cover.jpg"
						/>
						<p className="text-sm text-muted-foreground">
							Enter a URL for the book cover image
						</p>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating..." : "Create Book"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
