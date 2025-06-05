import { CurrencyType } from '@prisma/client';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { CreateListingRequestSchema } from './schema.js';

export const load = async () => {
  const form = await superValidate(zod4(CreateListingRequestSchema));
  return {
    currencyTypes: Object.values(CurrencyType),
    form
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod4(CreateListingRequestSchema));
    console.log(form);

    if (!form.valid) return fail(400, { form });

    return message(form, 'Form posted successfully!');
  }
} satisfies Actions;
