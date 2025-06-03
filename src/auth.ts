import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';

export const {
  handle: handleAuth,
  signIn,
  signOut
} = SvelteKitAuth({
  providers: [Discord({ authorization: { params: { scope: 'identify' } } })],
  callbacks: {
    async jwt({ token, profile }) {
      // TODO: Error if not present
      if (profile) {
        // TODO: types
        token.userId = profile.id;
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-expect-error token.userId type is unknown
      session.user.id = token.userId;
      //@ts-expect-error Property 'username' does not exist on type 'AdapterUser & User'
      session.user.username = token.username;
      return session;
    }
  }
});
