import { db } from "@/db";
import { user } from "@/db/auth-schemas";
import { books } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function getAllBooks() {
	return db.select().from(books);
}

export async function getBookById(id: string) {
	const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
	if (result.length === 0) {
		return null;
	}
	const book = result[0];
	let checkedOutByUsername = null;

	if (book.checkedOutBy) {
		const userResult = await db
			.select()
			.from(user)
			.where(eq(user.id, book.checkedOutBy))
			.limit(1);
		if (userResult.length > 0) {
			checkedOutByUsername = userResult[0].username;
		}
	}
	return { ...result[0], checkedOutByUsername };
}

export async function createBookEntry(
	title: string,
	description: string,
	imageUrl: string | null,
) {
	const newBook = {
		id: uuidv4(),
		title,
		description,
		imageUrl,
		available: true,
		checkedOutBy: null,
	};

	await db.insert(books).values(newBook);

	return newBook;
}

export async function updateBookStatus(
	id: string,
	status: "Available" | "Checked Out",
	userId: string | null = null,
) {
	const updated = await db
		.update(books)
		.set({
			available: status === "Available",
			checkedOutBy: userId,
		})
		.where(eq(books.id, id))
		.returning();

	return updated[0] ?? null;
}

export async function removeBook(id: string) {
	const deleted = await db.delete(books).where(eq(books.id, id)).returning();
	return deleted.length > 0;
}
