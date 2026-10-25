import { describe, expect, it } from 'vitest';
import { formatINR, formatIndianNumber } from '../currency';

describe('currency formatting', () => {
  it('formats Indian digit grouping and INR consistently', () => {
    expect(formatIndianNumber(750000)).toBe('7,50,000');
    expect(formatINR(1450000)).toBe('₹14,50,000');
    expect(formatINR(2200000)).toBe('₹22,00,000');
    expect(formatINR(4200000)).toBe('₹42,00,000');
  });
});
