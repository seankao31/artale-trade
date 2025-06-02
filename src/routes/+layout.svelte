<script lang="ts">
	import '../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { m } from '$lib/paraglide/messages.js';

	import CircleUser from '@lucide/svelte/icons/circle-user';

	let { children } = $props();
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<AppBar>
		{#snippet lead()}
			<a href="/" class="h5">Artale Trade</a>
		{/snippet}
		{#snippet trail()}
			<a href="/listings">{m.listings()}</a>
			<CircleUser size={25} />
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
