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
      {#if page.data.session.user?.image}
        <img src={page.data.session.user.image} alt="User Profile" />
      {/if}
      <button class="btn preset-filled-primary-500 btn-base" onclick={() => signOut()}>
        {m.signout()}
      </button>
    {:else}
      <button class="btn preset-filled-primary-500 btn-base" onclick={() => signIn('discord')}>
        {m.signin()}
      </button>
    {/if}
  </div>
</div>
