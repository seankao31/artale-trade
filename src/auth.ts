import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/prisma';
import Discord from '@auth/sveltekit/providers/discord';

declare module '@auth/sveltekit' {
  interface User {
    id: string;
    name: string;
    image: string;
  }
  interface Session {
    user: User;
  }
}

export const {
  handle: handleAuth,
  signIn,
  signOut
} = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      // Modified from default Discord provider
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber =
            profile.discriminator === '0'
              ? Number(BigInt(profile.id) >> BigInt(22)) % 6
              : parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: profile.username, // Changed from global name to username
          email: profile.email,
          image: profile.image_url
        };
      }
    })
  ],
  callbacks: {
    // Instead of user email, return id
    session: async ({ session, user }) => {
      return {
        user: {
          id: user.id,
          name: user.name,
          image: user.image
        },
        expires: session.expires
      };
    }
  }
});
