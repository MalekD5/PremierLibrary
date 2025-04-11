import { createAuthClient } from "better-auth/react";
import { multiSessionClient, usernameClient } from "better-auth/client/plugins";

export const {
	signIn,
	signUp,
	signOut,
	useSession,
	deleteUser,
	changePassword,
	updateUser,
	revokeSession,
	revokeOtherSessions,
	multiSession,
	listSessions,
} = createAuthClient({
	plugins: [usernameClient(), multiSessionClient()],
});
