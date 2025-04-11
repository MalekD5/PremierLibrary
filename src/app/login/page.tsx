import { redirect } from "next/navigation";
import LoginForm from "@/components/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function LoginPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (session?.user) {
		redirect("/");
	}

	return (
		<div className="container mx-auto py-12 px-4 flex flex-col items-center">
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold mb-8 text-center">Library System</h1>
				<LoginForm />
			</div>
		</div>
	);
}
