<script lang="ts">
  import '../app.css';
  import { AppBar } from '@skeletonlabs/skeleton-svelte';
  import { m } from '$lib/paraglide/messages';
  import { page } from '$app/state';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { Avatar } from '@skeletonlabs/skeleton-svelte';

  let { children } = $props();
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
  <AppBar>
    {#snippet lead()}
      <a href="/" class="h5">Artale Trade</a>
    {/snippet}
    {#snippet trail()}
      <a href="/listings">{m.listings()}</a>
      {#if page.data.session}
        {#if page.data.session.user?.image}
          <button class="btn preset-filled-primary-500 btn-base" onclick={() => signOut()}>
            {m.signout()}
          </button>
          <Avatar
            size="size-9"
            src={page.data.session.user.image}
            name={page.data.session.user.name ?? 'User'}
          />
        {/if}
      {:else}
        <button class="btn preset-filled-primary-500 btn-base" onclick={() => signIn('discord')}>
          {m.signin()}
        </button>
      {/if}
    {/snippet}
  </AppBar>
  <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]">
    <aside class="p-4">(ad-left)</aside>
    <main class="p-4">
      {@render children()}
    </main>
    <aside class="p-4">(ad-right)</aside>
  </div>
  <footer class="p-4">(footer)</footer>
</div>
