import type React from "react";
import "./globals.css";
import { headers } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { Book, User } from "lucide-react";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/sign-out-button";

export const metadata: Metadata = {
	title: "Library Inventory System",
	description: "A simple library inventory management system",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	return (
		<html lang="en">
			<body className="min-h-screen bg-background">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{session && (
						<header className="border-b">
							<div className="container mx-auto px-4 flex h-16 items-center justify-between">
								<div className="flex items-center gap-6">
									<Link
										href="/"
										className="flex items-center gap-2 font-semibold"
									>
										<Book className="h-5 w-5" />
										<span>Library System</span>
									</Link>
								</div>
								<nav className="flex items-center gap-4">
									<Link
										href="/sessions"
										className="text-sm font-medium hover:underline"
									>
										<User className="h-4 w-4 inline mr-1" />
										Sessions
									</Link>
									<SignOutButton />
								</nav>
							</div>
						</header>
					)}
					<div className="flex-1">{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
