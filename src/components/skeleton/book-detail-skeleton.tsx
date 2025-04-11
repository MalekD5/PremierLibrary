import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function BookDetailSkeleton() {
	return (
		<div className="max-w-4xl mx-auto">
			<Link
				href="/"
				className="flex items-center text-muted-foreground hover:text-foreground mb-6"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Library
			</Link>

			<Card>
				<CardContent className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="relative aspect-[3/4] w-full">
							<Skeleton className="w-full h-full" />
						</div>

						<div className="gap-2 flex items-center justify-center flex-col w-full">
							<div className="space-y-4 w-full">
								<div className="flex justify-between items-center">
									<Skeleton className="h-8 w-2/3" />
									<Skeleton className="h-6 w-24 rounded-full" />
								</div>

								<Skeleton className="h-4 w-1/2" />
							</div>

							<div className="w-full pt-6 space-y-2">
								<Skeleton className="h-6 w-32 mx-auto" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-4/6" />
							</div>

							<div className="flex flex-wrap gap-4 pt-6">
								<Skeleton className="h-10 w-36 rounded-md" />
								<Skeleton className="h-10 w-36 rounded-md" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
