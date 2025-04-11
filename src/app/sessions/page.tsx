import { redirect } from "next/navigation";
import SessionManagement from "@/components/session-management";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";

export default async function SessionsPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (!session?.user) {
		redirect("/login");
	}

	const userSession = session.session;

	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">Manage Sessions</h1>
			<Suspense fallback={<Loading />}>
				<SessionManagement currentSessionId={userSession.id} />
			</Suspense>
		</div>
	);
}
