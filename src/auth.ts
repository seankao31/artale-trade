import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';

export const {
  handle: handleAuth,
  signIn,
  signOut
} = SvelteKitAuth({
  providers: [Discord({ authorization: { params: { scope: 'identify' } } })]
});
