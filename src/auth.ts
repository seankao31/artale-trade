import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/prisma';
import Discord from '@auth/sveltekit/providers/discord';

export const {
  handle: handleAuth,
  signIn,
  signOut
} = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Discord]
});
