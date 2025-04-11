"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Monitor, Smartphone, Laptop, Tablet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";
import {
	listSessions,
	revokeOtherSessions,
	revokeSession,
} from "@/lib/auth-client";
import type { Session } from "better-auth";
import { getSystemType } from "@/lib/utils";

export default function SessionManagement({
	currentSessionId,
}: {
	currentSessionId: string;
}) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingSessionId, setLoadingSessionId] = useState<string | null>(null);
	const [sessions, setSessions] = useState<Session[]>([]);

	useEffect(() => {
		const fetchSessions = async () => {
			const result = await listSessions();

			if (result.error) {
				setError(result.error.message ?? "An unexpected error occurred.");
			} else {
				setSessions(result.data);
			}
		};

		fetchSessions();
	}, []);

	async function handleRevokeSession(sessionId: string) {
		setLoadingSessionId(sessionId);
		setError(null);

		try {
			const result = await revokeSession({
				token: sessionId,
			});

			if (result.error) {
				setError(
					result.error.message ??
						"An unexpected error occurred. Please try again.",
				);
			} else {
				setSessions(sessions.filter((session) => session.token !== sessionId));
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setLoadingSessionId(null);
		}
	}

	async function handleRevokeAllOtherSessions() {
		setIsLoading(true);
		setError(null);

		try {
			const result = await revokeOtherSessions();
			if (result.error) {
				setError(result.error.message ?? "An unexpected error occurred.");
			} else {
				router.refresh();
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	function getDeviceIcon(userAgent: string) {
		switch (true) {
			case userAgent.includes("Mobile"):
				return <Smartphone className="h-5 w-5" />;
			case userAgent.includes("Tablet"):
				return <Tablet className="h-5 w-5" />;
			case userAgent.includes("Windows") ||
				userAgent.includes("Mac") ||
				userAgent.includes("Linux"):
				return <Laptop className="h-5 w-5" />;
			default:
				return <Monitor className="h-5 w-5" />;
		}
	}

	return (
		<div className="space-y-6 max-w-3xl mx-auto">
			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Active Sessions</CardTitle>
					<CardDescription>
						These are the devices where you're currently logged in. You can log
						out of any session.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						{sessions.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between p-4 border rounded-lg"
							>
								<div className="flex items-center space-x-4">
									<div className="bg-muted p-2 rounded-full">
										{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
										{getDeviceIcon(session.userAgent!)}
									</div>
									<div>
										<div className="font-medium flex items-center">
											{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
											{getSystemType(session.userAgent!)}

											{session.id === currentSessionId && (
												<span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
													Current
												</span>
											)}
										</div>
										<div className="text-sm text-muted-foreground">
											Last active:{" "}
											{formatDistanceToNow(new Date(session.updatedAt), {
												addSuffix: true,
											})}
										</div>
									</div>
								</div>

								{session.id !== currentSessionId ? (
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleRevokeSession(session.token)}
										disabled={loadingSessionId === session.token}
									>
										{loadingSessionId === session.token
											? "Logging out..."
											: "Log out"}
									</Button>
								) : (
									<Button variant="outline" size="sm" disabled>
										Current Session
									</Button>
								)}
							</div>
						))}
					</div>

					{sessions.length > 1 && (
						<Button
							variant="destructive"
							onClick={handleRevokeAllOtherSessions}
							disabled={isLoading}
						>
							{isLoading ? "Logging out..." : "Log out from all other devices"}
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
