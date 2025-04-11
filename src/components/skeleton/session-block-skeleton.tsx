import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function SessionSkeleton() {
	return (
		<div className="flex items-center justify-between p-4 border rounded-lg">
			<div className="flex items-center space-x-4">
				<div className="bg-muted p-2 rounded-full">
					<Skeleton className="h-6 w-6 rounded-full" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-40" />
				</div>
			</div>
			<Button variant="outline" size="sm" disabled>
				<Skeleton className="h-4 w-16" />
			</Button>
		</div>
	);
}
