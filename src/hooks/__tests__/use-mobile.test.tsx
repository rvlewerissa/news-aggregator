import { renderHook } from '@/tests/test-utils';
import { useIsMobile } from '../use-mobile';

const MOBILE_BREAKPOINT = 768;

describe('useIsMobile', () => {
  let matchMediaMock: jest.MockedFunction<typeof window.matchMedia>;

  beforeEach(() => {
    matchMediaMock = jest.fn().mockImplementation((query) => {
      return {
        matches:
          parseInt(query.match(/\d+/)?.[0] || '0', 10) < MOBILE_BREAKPOINT,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  test('returns correct value on initial render', () => {
    window.innerWidth = 500; // Mobile size
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });
});
