import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

export default async function BookList() {
	const books = await getAllBooks();

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Available Books</h2>
				<Link href="/book/create">
					<Button>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Book
					</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{books.length === 0 ? (
					<p className="col-span-full text-center py-12 text-muted-foreground">
						No books available. Add your first book!
					</p>
				) : (
					books.map((book) => (
						<Link key={book.id} href={`/book/${book.id}`}>
							<Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
								<div className="aspect-[3/2] relative w-full h-64 overflow-hidden">
									<img
										src={
											book.imageUrl || "/placeholder.svg?height=300&width=450"
										}
										alt={book.title}
										className="absolute inset-0 w-full h-full object-cover object-center"
									/>
								</div>
								<CardContent className="p-4">
									<div className="flex justify-between items-start">
										<h3 className="font-semibold text-lg line-clamp-1">
											{book.title}
										</h3>
										<Badge variant={book.available ? "default" : "secondary"}>
											{book.available ? "Available" : "Checked Out"}
										</Badge>
									</div>
								</CardContent>
							</Card>
						</Link>
					))
				)}
			</div>
		</div>
	);
}
