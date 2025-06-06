<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { CreateListingRequestSchema } from './schema.js';
  import { page } from '$app/state';
  import { zod4Client } from 'sveltekit-superforms/adapters';

  let { data } = $props();
  const { form, errors, message, enhance } = superForm(data.form, {
    validators: zod4Client(CreateListingRequestSchema)
  });

  // For programmatically rendering fields with i18n
  const fieldText = {
    wts: m.wantToSell(),
    wtb: m.wantToBuy(),
    equipment: m.equipment(),
    notEquipment: m.notEquipment(),

    str: m.str(),
    dex: m.dex(),
    int: m.int(),
    luk: m.luk(),

    hp: m.hp(),
    mp: m.mp(),
    watk: m.watk(),
    matk: m.matk(),
    wdef: m.wdef(),
    mdef: m.mdef(),

    acc: m.acc(),
    avoid: m.avoid(),
    speed: m.speed(),
    jump: m.jump(),
    availableScrollSlots: m.availableScrollSlots()
  };
</script>

<h3 class="h3">{m.createListing()}</h3>

<SuperDebug data={$form} />

{#if $message}
  <div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
    {$message}
  </div>
{/if}

<!-- TODO: better layout and styling -->
<!-- TODO: customize validation message -->
<!-- TODO: i18n for error message -->
<!-- TODO: blur number input on scroll -->
<form class="m-3 flex flex-col gap-3" method="POST" use:enhance>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <label class="label">
      <span class="label-text">{m.tradeType()}</span>
      <div class="flex gap-3">
        <!-- TODO: db schema for wts/wtb -->
        <!-- TODO: floating tooltip: unavailable -->
        {#each ['wts', 'wtb'] as tradeType}
          <label class="flex cursor-pointer items-center gap-1">
            <input
              class="radio"
              type="radio"
              name="tradeType"
              value={tradeType}
              disabled={tradeType === 'wtb'}
              bind:group={$form.tradeType}
            />
            {#if $errors.tradeType}
              <small class="text-error-500">{$errors.tradeType}</small>
            {/if}
            <span class="label-text">{fieldText[tradeType as keyof typeof fieldText]}</span>
          </label>
        {/each}
      </div>
    </label>
    <label class="label">
      <span class="label-text">{m.itemListingType()}</span>
      <div class="flex gap-3">
        <!-- TODO: floating tooltip: unavailable -->
        {#each ['equipment', 'notEquipment'] as itemListingType}
          <label class="flex cursor-pointer items-center gap-1">
            <input
              class="radio"
              type="radio"
              name="itemListingType"
              value={itemListingType}
              disabled={itemListingType === 'notEquipment'}
              bind:group={$form.itemListingType}
            />
            {#if $errors.itemListingType}
              <small class="text-error-500">{$errors.itemListingType}</small>
            {/if}
            <span class="label-text">{fieldText[itemListingType as keyof typeof fieldText]}</span>
          </label>
        {/each}
      </div>
    </label>
  </div>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
    <label class="label">
      <span class="label-text">{m.itemName()}</span>
      <input class="input" type="text" name="itemName" bind:value={$form.itemName} />
      {#if $errors.itemName}
        <small class="text-error-500">{$errors.itemName}</small>
      {/if}
    </label>
    <label class="label">
      <span class="label-text">{m.itemQuantity()}</span>
      <input class="input" type="number" name="itemQuantity" bind:value={$form.itemQuantity} />
      {#if $errors.itemQuantity}
        <small class="text-error-500">{$errors.itemQuantity}</small>
      {/if}
    </label>
    <label class="label">
      <span class="label-text">{m.price()}</span>
      <div class="input-group grid-cols-[1fr_auto]">
        <input class="ig-input" type="number" name="priceAmount" bind:value={$form.priceAmount} />
        <select class="ig-select" name="priceCurrency" bind:value={$form.priceCurrency}>
          {#each data.currencyTypes as currencyType}
            <option value={currencyType} selected={$form.priceCurrency == currencyType}
              >{m[currencyType]()}</option
            >
          {/each}
        </select>
      </div>
      {#if $errors.priceAmount}
        <small class="text-error-500">{$errors.priceAmount}</small>
      {/if}
      {#if $errors.priceCurrency}
        <small class="text-error-500">{$errors.priceCurrency}</small>
      {/if}
    </label>
  </div>
  <!-- TODO: animation on appear and disappear -->
  {#if $form.itemListingType === 'equipment'}
    <h4>{m.equipmentStats()}</h4>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div class="flex flex-col gap-2">
        {#each ['str', 'dex', 'int', 'luk'] as stat}
          <label class="label">
            <span class="label-text">{fieldText[stat as keyof typeof fieldText]}</span>
            <input
              class="input"
              type="number"
              name={stat}
              bind:value={$form[stat as keyof typeof $form]}
              placeholder="0"
            />
            {#if $errors[stat as keyof typeof $errors]}
              <small class="text-error-500">{$errors[stat as keyof typeof $errors]}</small>
            {/if}
          </label>
        {/each}
      </div>
      <div class="flex flex-col gap-2">
        {#each ['hp', 'mp', 'watk', 'matk', 'wdef', 'mdef'] as stat}
          <label class="label">
            <span class="label-text">{fieldText[stat as keyof typeof fieldText]}</span>
            <input
              class="input"
              type="number"
              name={stat}
              bind:value={$form[stat as keyof typeof $form]}
              placeholder="0"
            />
            {#if $errors[stat as keyof typeof $errors]}
              <small class="text-error-500">{$errors[stat as keyof typeof $errors]}</small>
            {/if}
          </label>
        {/each}
      </div>
      <div class="flex flex-col gap-2">
        {#each ['availableScrollSlots', 'acc', 'avoid', 'speed', 'jump'] as stat}
          <label class="label">
            <span class="label-text">{fieldText[stat as keyof typeof fieldText]}</span>
            <!-- TODO: check required will not be enforced when item not equipment -->
            <input
              class="input"
              type="number"
              name={stat}
              bind:value={$form[stat as keyof typeof $form]}
              placeholder="0"
            />
            {#if $errors[stat as keyof typeof $errors]}
              <small class="text-error-500">{$errors[stat as keyof typeof $errors]}</small>
            {/if}
          </label>
        {/each}
      </div>
    </div>
  {/if}
  <div class="m-2 flex justify-end">
    <button class="btn preset-filled-primary-500 btn-base" type="submit">{m.createListing()}</button
    >
  </div>
</form>
