import { assertIsExpectedTransformerContext, makeTransformer } from 'universe/assets';

import type { EmptyObject } from 'type-fest';

export type Context = EmptyObject;

export const { transformer } = makeTransformer<Context>({
  transform(context) {
    const { name } = assertIsExpectedTransformerContext(context);

    return {
      [name]: `
coverage:
range: '75...100'
`.trimStart()
    };
  }
});
