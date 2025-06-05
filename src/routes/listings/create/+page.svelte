<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';

  let itemType = $state('equipment');
  let { data, form } = $props();
  let equipmentStatsText = {
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

<!-- TODO: better layout and styling -->
<!-- TODO: customize validation message -->
<!-- TODO: mark all required fields -->
<!-- TODO: verify login -->
{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
<form class="m-3 flex flex-col gap-3">
  <div class="grid grid-cols-1 md:grid-cols-2">
    <label class="label">
      <span class="label-text">{m.tradeType()}</span>
      <div class="flex gap-3">
        <label class="flex cursor-pointer items-center gap-1">
          <input class="radio" type="radio" checked name="radio-trade-type" value="wts" />
          <span class="label-text">{m.wantToSell()}</span>
        </label>
        <!-- TODO: floating tooltip: unavailable -->
        <label class="flex cursor-pointer items-center gap-1">
          <input class="radio" disabled type="radio" name="radio-trade-type" value="wtb" />
          <span class="label-text">{m.wantToBuy()}</span>
        </label>
      </div>
    </label>
    <label class="label">
      <span class="label-text">{m.itemType()}</span>
      <div class="flex gap-3">
        <label class="flex cursor-pointer items-center gap-1">
          <input
            class="radio"
            type="radio"
            name="radio-item-type"
            value="equipment"
            bind:group={itemType}
          />
          <span class="label-text">{m.equipment()}</span>
        </label>
        <!-- TODO: floating tooltip: unavailable -->
        <label class="flex cursor-pointer items-center gap-1">
          <input
            class="radio"
            disabled
            type="radio"
            name="radio-item-type"
            value="notEquipment"
            bind:group={itemType}
          />
          <span class="label-text">{m.notEquipment()}</span>
        </label>
      </div>
    </label>
  </div>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
    <label class="label">
      <span class="label-text">{m.itemName()}</span>
      <input class="input" type="text" name="item-name" required />
    </label>
    <label class="label">
      <span class="label-text">{m.itemQuantity()}</span>
      <input class="input" type="number" name="item-quantity" required value="1" />
    </label>
    <label class="label">
      <span class="label-text">{m.price()}</span>
      <div class="input-group grid-cols-[1fr_auto]">
        <input class="ig-input" type="number" name="price-amount" required />
        <select class="ig-select" name="price-currency">
          {#each data.currencyTypes as currencyType}
            <option value={currencyType}>{m[currencyType]()}</option>
          {/each}
        </select>
      </div>
    </label>
  </div>
  <!-- TODO: animation on appear and disappear -->
  {#if itemType === 'equipment'}
    <h4>{m.equipmentStats()}</h4>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div class="flex flex-col gap-2">
        {#each ['str', 'dex', 'int', 'luk'] as stat}
          <label class="label">
            <span class="label-text"
              >{equipmentStatsText[stat as keyof typeof equipmentStatsText]}</span
            >
            <input class="input" type="number" name={stat} placeholder="0" />
          </label>
        {/each}
      </div>
      <div class="flex flex-col gap-2">
        {#each ['hp', 'mp', 'watk', 'matk', 'wdef', 'mdef'] as stat}
          <label class="label">
            <span class="label-text"
              >{equipmentStatsText[stat as keyof typeof equipmentStatsText]}</span
            >
            <input class="input" type="number" name={stat} placeholder="0" />
          </label>
        {/each}
      </div>
      <div class="flex flex-col gap-2">
        <label class="label">
          <span class="label-text">{m.availableScrollSlots()}</span>
          <!-- TODO: check required will not be enforced when item not equipment -->
          <input class="input" type="number" required placeholder="0" />
        </label>
        {#each ['acc', 'avoid', 'speed', 'jump'] as stat}
          <label class="label">
            <span class="label-text"
              >{equipmentStatsText[stat as keyof typeof equipmentStatsText]}</span
            >
            <input class="input" type="number" name={stat} placeholder="0" />
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
