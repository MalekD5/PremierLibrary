import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBookById } from "@/lib/books";
import BookDetail from "@/components/book-detail";
import { headers } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";

export default async function BookPage({ params }: { params: { id: string } }) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	const book = await getBookById(params.id);

	if (!book) {
		redirect("/");
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<Suspense fallback={<Loading />}>
				<BookDetail
					book={book}
					user={session.user}
					checkoutByUsername={book.checkedOutByUsername}
				/>
			</Suspense>
		</div>
	);
}
