import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BookForm from "@/components/book-form";
import { headers } from "next/headers";

export default async function CreateBookPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	return (
		<div className="container py-8 flex flex-col items-center">
			<h1 className="text-3xl font-bold mb-8">Add New Book</h1>
			<BookForm />
		</div>
	);
}
