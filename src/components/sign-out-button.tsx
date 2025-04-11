"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
	const router = useRouter();

	const handleClick = async () => {
		signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace("/sign-in");
				},
			},
		});
	};

	return (
		<Button variant="ghost" size="sm" type="submit" onClick={handleClick}>
			<LogOut className="h-4 w-4 mr-1" />
			Logout
		</Button>
	);
}
