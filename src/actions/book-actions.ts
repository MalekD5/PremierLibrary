"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import {
	createBookEntry,
	getBookById,
	updateBookStatus,
	removeBook,
} from "../lib/books";
import { bookIdZodString, createBookSchema } from "../lib/zod-schemas";
import { revalidatePath } from "next/cache";

export async function createBook(formData: FormData) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		return { error: "Not authenticated" };
	}

	const formDataAsObject = Object.fromEntries(formData);

	const parsedFormData =
		await createBookSchema.safeParseAsync(formDataAsObject);

	if (!parsedFormData.success) {
		return { error: parsedFormData.error.message };
	}

	const { title, description, imageUrl } = parsedFormData.data;

	const book = await createBookEntry(title, description, imageUrl);

	return { bookId: book.id };
}

export async function checkoutBook(bookId: string) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		return { error: "Not authenticated" };
	}

	const parsedBookId = await bookIdZodString.safeParseAsync(bookId);

	if (!parsedBookId.success) {
		return { error: "invalid book id format" };
	}

	const parsedId = parsedBookId.data;

	const book = await getBookById(parsedId);

	if (!book) {
		return { error: "Book not found" };
	}

	if (!book.available) {
		return { error: "Book is not available" };
	}

	const updatedBook = await updateBookStatus(
		parsedId,
		"Checked Out",
		session.user.id,
	);

	if (!updatedBook) {
		return { error: "Failed to check out book" };
	}

	revalidatePath("/");
	return { success: true };
}

export async function returnBook(bookId: string) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		return { error: "Not authenticated" };
	}

	const parsedBookId = await bookIdZodString.safeParseAsync(bookId);

	if (!parsedBookId.success) {
		return { error: "invalid book id format" };
	}

	const parsedId = parsedBookId.data;

	const book = await getBookById(parsedId);

	if (!book) {
		return { error: "Book not found" };
	}

	if (book.available) {
		return { error: "Book is not checked out" };
	}

	if (book.checkedOutBy !== session.user.id) {
		return { error: "You cannot return a book you didn't check out" };
	}

	const updatedBook = await updateBookStatus(parsedId, "Available");

	if (!updatedBook) {
		return { error: "Failed to return book" };
	}

	revalidatePath("/");
	return { success: true };
}

export async function deleteBook(bookId: string) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		return { error: "Not authenticated" };
	}

	const parsedBookId = await bookIdZodString.safeParseAsync(bookId);

	if (!parsedBookId.success) {
		return { error: "invalid book id format" };
	}

	const parsedId = parsedBookId.data;

	const book = await getBookById(parsedId);

	if (!book) {
		return { error: "Book not found" };
	}

	const success = await removeBook(parsedId);

	if (!success) {
		return { error: "Failed to delete book" };
	}

	return { success: true };
}
