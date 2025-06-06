import { CurrencyType } from '@prisma/client';
import { z } from 'zod/v4';

export const CreateListingRequestSchema = z.object({
  // TODO: enum from prisma
  tradeType: z.enum(['wts', 'wtb']).default('wts'),
  itemListingType: z.enum(['equipment', 'notEquipment']).default('equipment'),
  // TODO: provide itemMasterId instead
  itemName: z.string().trim().min(1).max(30),
  itemQuantity: z.int().positive().max(100).default(1),
  // TODO: bigint with zod v4 issue: https://github.com/ciscoheat/sveltekit-superforms/issues/598
  priceAmount: z
    .int()
    .positive()
    .default(null as unknown as number),
  priceCurrency: z.enum(CurrencyType).default(CurrencyType.MESO),
  availableScrollSlots: z
    .int()
    .nonnegative()
    .max(10)
    .default(null as unknown as number),

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
