import { createAuthClient } from "better-auth/react";
import { multiSessionClient, usernameClient } from "better-auth/client/plugins";

export const {
	signIn,
	signUp,
	signOut,
} = createAuthClient({
	plugins: [usernameClient(), multiSessionClient()],
});
