import { CurrencyType } from '@prisma/client';

export async function load() {
  return {
    currencyTypes: Object.values(CurrencyType)
  };
}
