"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkoutBook, returnBook, deleteBook } from "@/actions/book-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowLeft, Trash } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { BookType } from "@/db/schemas";
import type { User } from "better-auth";

type BookDetailProps = {
	book: BookType;
	user: User & { username?: string | null };
	checkoutByUsername: string | null;
};

export default function BookDetail({
	book,
	user,
	checkoutByUsername,
}: BookDetailProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isCheckedOutByUser = book.checkedOutBy === user.id;

	const [checkoutByUsernameState, setCheckoutByUsername] = useState<
		string | null
	>(checkoutByUsername);

	async function handleCheckout() {
		setIsLoading(true);
		setError(null);

		try {
			const result = await checkoutBook(book.id);
			if (result.error) {
				setError(result.error);
			} else {
				if (user.username) {
					setCheckoutByUsername(user.username);
				}
				book.available = false;
				book.checkedOutBy = user.id;
			}
		} catch (err) {
			console.error(err);
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	async function handleReturn() {
		setIsLoading(true);
		setError(null);

		try {
			const result = await returnBook(book.id);
			if (result.error) {
				setError(result.error);
			} else {
				setCheckoutByUsername(null);
				book.available = true;
				book.checkedOutBy = null;
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	async function handleDelete() {
		setIsLoading(true);
		setError(null);

		try {
			const result = await deleteBook(book.id);
			if (result.error) {
				setError(result.error);
			} else {
				router.push("/");
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="max-w-4xl mx-auto">
			<Link
				href="/"
				className="flex items-center text-muted-foreground hover:text-foreground mb-6"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Library
			</Link>

			{error && (
				<Alert variant="destructive" className="mb-6">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Card>
				<CardContent className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="relative aspect-[3/4] w-full">
							<div className="relative w-full h-full overflow-hidden">
								<img
									src={book.imageUrl || "/placeholder.svg?height=300&width=450"}
									alt={book.title}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							</div>
						</div>

						<div className="gap-2 flex items-center justify-center flex-col">
							<div className="space-y-2">
								<div className="flex justify-center items-center flex-col">
									<Badge
										variant={book.available ? "default" : "destructive"}
										className="text-sm"
									>
										{book.available ? "Available" : "Checked Out"}
									</Badge>
									<h1 className="text-3xl font-bold">{book.title}</h1>
								</div>

								{!book.available && book.checkedOutBy && (
									<p className="text-muted-foreground">
										Checked out by:{" "}
										<span className="font-medium">
											{checkoutByUsernameState}
										</span>
									</p>
								)}
							</div>

							<div className="prose max-w-none self-center text-center">
								<div className="whitespace-pre-wrap">{book.description}</div>
							</div>

							<div className="flex flex-wrap gap-4 pt-4">
								{book.available ? (
									<Button onClick={handleCheckout} disabled={isLoading}>
										Check Out Book
									</Button>
								) : isCheckedOutByUser ? (
									<Button
										onClick={handleReturn}
										disabled={isLoading}
										variant="outline"
									>
										Return Book
									</Button>
								) : null}

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive">
											<Trash className="mr-2 h-4 w-4" />
											Delete Book
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the book from the library system.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={handleDelete}
												disabled={isLoading}
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
