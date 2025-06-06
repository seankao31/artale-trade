import { CurrencyType } from '@prisma/client';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { CreateListingRequestSchema } from './schema';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod4(CreateListingRequestSchema));
  return {
    currencyTypes: Object.values(CurrencyType),
    form
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(CreateListingRequestSchema));

    if (!form.valid) return fail(400, { form });

    // TODO: query ItemMaster

    try {
      await prisma.listing.create({
        data: {
          creatorId: 'cmblcdwsn0007aofzu7kt30s4', // TODO
          itemMasterId: 1, // TODO
          itemName: form.data.itemName,
          currency: form.data.priceCurrency,
          price: form.data.priceAmount,
          // TODO: wts, wtb

          // TODO: item requirements
          itemCategory: 'EARRING', // TODO

          str: form.data.str, // TODO: this can be undefined. check if set to default value in prisma
          dex: form.data.dex,
          int: form.data.int,
          luk: form.data.luk,

          hp: form.data.hp,
          mp: form.data.mp,
          watk: form.data.watk,
          matk: form.data.matk,
          wdef: form.data.wdef,
          mdef: form.data.mdef,
          acc: form.data.acc,
          avoid: form.data.avoid,
          speed: form.data.speed,
          jump: form.data.jump,
          availableScrollSlots: form.data.availableScrollSlots,

          createdAt: new Date(),
          updatedAt: new Date(Date.now()), // TODO
          expiresAt: new Date() // TODO
        }
      });
    } catch (e) {
      console.error(e);
      throw e;
    }

    return message(form, 'Form posted successfully!');
  }
} satisfies Actions;
