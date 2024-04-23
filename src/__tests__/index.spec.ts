import { describe, expect, test } from 'vitest';
import { createApp } from 'vue';

import Components, { components } from '..';

describe('test components lib', () => {
  test('test dynamic-list item resize', async () => {
    const app = createApp(() => '');
    app.use(Components);
    expect(Object.keys(app._context.components).length).toBe(components.length * 2);
  });
});
