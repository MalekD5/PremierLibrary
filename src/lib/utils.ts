import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getSystemType(userAgent: string) {
	const ua = userAgent.toLowerCase();

	if (ua.includes("windows nt")) return "Windows";
	if (ua.includes("macintosh") || ua.includes("mac os x")) return "macOS";
	if (ua.includes("linux") && !ua.includes("android")) return "Linux";
	if (ua.includes("android")) return "Android";
	if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
		return "iOS";

	return "Unknown";
}
