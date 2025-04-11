import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignupForm from "@/components/signup-form";
import { headers } from "next/headers";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	if (session?.user) {
		redirect("/");
	}

	return (
		<div className="container mx-auto py-12 px-4 flex flex-col items-center">
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
				<SignupForm />
			</div>
		</div>
	);
}
