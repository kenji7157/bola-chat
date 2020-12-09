import { isPositiveNumber } from './practice';

describe('isPositiveNumberのテスト', () => {
  test('正の場合にtrueとなること', () => {
    const result = isPositiveNumber(-10);
    expect(result).toBeTruthy();
  });
});
