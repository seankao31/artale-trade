<script>
  import { m } from '$lib/paraglide/messages.js';
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/state';
  console.log(page.data);
</script>

<div class="flex justify-center">
  <div class="flex max-w-lg flex-col items-center">
    <p class="p-4">{m.introduction()}</p>
    {#if page.data.session}
      <p>{m.hello({ name: page.data.session.user?.name ?? 'User' })}</p>
      <button class="btn preset-filled-primary-500 btn-base" on:click={() => signOut()}>
        {m.signout()}
      </button>
    {:else}
      <button class="btn preset-filled-primary-500 btn-base" on:click={() => signIn('discord')}>
        {m.signin()}
      </button>
    {/if}
  </div>
</div>
