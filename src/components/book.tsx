"use client";

import type { BookType } from "@/db/schemas";
import { Link } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

type BookProps = {
	book: BookType;
};

export default function Book({ book }: BookProps) {
	return (
		<Link key={book.id} href={`/book/${book.id}`}>
			<Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
				<div className="aspect-[3/2] relative w-full h-64 overflow-hidden">
					<img
						src={book.imageUrl || "/placeholder.svg?height=300&width=450"}
						alt={book.title}
						className="absolute inset-0 w-full h-full object-cover object-center"
					/>
				</div>
				<CardContent className="p-4">
					<div className="flex justify-between items-start">
						<h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
						<Badge variant={book.available ? "default" : "secondary"}>
							{book.available ? "Available" : "Checked Out"}
						</Badge>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
