import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from './auth';
import { paraglideMiddleware } from '$lib/paraglide/server';

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

export const handle = sequence(handleAuth, handleParaglide, handleChromeDevTools);
