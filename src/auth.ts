import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Discord]
});
