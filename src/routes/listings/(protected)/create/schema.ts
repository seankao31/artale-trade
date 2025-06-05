import { CurrencyType } from '@prisma/client';
import { z } from 'zod/v4';

export const CreateListingRequestSchema = z.object({
  // TODO: enum from prisma
  tradeType: z.enum(['wts', 'wtb']).default('wts'),
  itemListingType: z.enum(['equipment', 'notEquipment']).default('equipment'),
  // TODO: provide itemMasterId instead
  itemName: z.string().trim().min(1).max(30),
  itemQuantity: z.int().positive().max(100).default(1),
  // TODO: https://github.com/ciscoheat/sveltekit-superforms/issues/598
  // TODO: don't populate 0 by default
  priceAmount: z.int().positive(),
  priceCurrency: z.enum(CurrencyType).default(CurrencyType.MESO),
  // TODO: don't populate 0 by default
  availableScrollSlots: z.int().nonnegative().max(10),

  // TODO: smallint for both prisma and zod
  str: z.optional(z.int().nonnegative().max(1000)),
  dex: z.optional(z.int().nonnegative().max(1000)),
  int: z.optional(z.int().nonnegative().max(1000)),
  luk: z.optional(z.int().nonnegative().max(1000)),
  hp: z.optional(z.int().nonnegative().max(1000)),
  mp: z.optional(z.int().nonnegative().max(1000)),
  watk: z.optional(z.int().nonnegative().max(1000)),
  matk: z.optional(z.int().nonnegative().max(1000)),
  wdef: z.optional(z.int().nonnegative().max(1000)),
  mdef: z.optional(z.int().nonnegative().max(1000)),
  acc: z.optional(z.int().nonnegative().max(1000)),
  avoid: z.optional(z.int().nonnegative().max(1000)),
  speed: z.optional(z.int().nonnegative().max(1000)),
  jump: z.optional(z.int().nonnegative().max(1000))
});
