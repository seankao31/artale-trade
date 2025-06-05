import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from './auth';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleProtected: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth();
  console.log(session);
  console.log(event.route.id);
  if (event.route.id?.includes('/(protected)/') && !session) {
    redirect(302, '/');
  }
  return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });

const handleChromeDevTools: Handle = async ({ event, resolve }) => {
  // Suppress well-known Chrome DevTools requests
  if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response(null, { status: 204 }); // No content
  }

  return resolve(event);
};

export const handle = sequence(handleAuth, handleProtected, handleParaglide, handleChromeDevTools);
