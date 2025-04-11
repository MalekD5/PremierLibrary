import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BookList from "@/components/book-list";
import { headers } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<main className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">Library Inventory</h1>
			<Suspense fallback={<Loading />}>
				<BookList />
			</Suspense>
		</main>
	);
}
