import { createAuthClient } from "better-auth/react";
import { multiSessionClient, usernameClient } from "better-auth/client/plugins";

export const {
	signIn,
	signUp,
	signOut,
    listSessions,
    revokeOtherSessions,
    revokeSession,
} = createAuthClient({
	plugins: [usernameClient(), multiSessionClient()],
});
