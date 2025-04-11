import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function BookSkeleton() {
	return (
		<Card className="h-full overflow-hidden">
			<div className="aspect-[3/2] relative w-full h-64 overflow-hidden">
				<Skeleton className="absolute inset-0 w-full h-full object-cover object-center" />
			</div>
			<CardContent className="p-4">
				<div className="flex justify-between items-start">
					<Skeleton className="h-5 w-3/4 rounded" />
					<Skeleton className="h-5 w-16 rounded" />
				</div>
			</CardContent>
		</Card>
	);
}
