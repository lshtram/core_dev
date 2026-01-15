# Testing Patterns

## Test Pyramid
```
 /E2E\      7 E2E (critical flows)
/Integ\     9 integration (data layer)
/Unit  \    241 unit (components/hooks/logic)
```

**Commands**:
```bash
npm test               # watch mode
npm test -- --run      # single run  
npm test -- --coverage # with coverage
npm run test:e2e       # E2E tests
```

---

## Component Testing

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**With Context**:
```javascript
function TestComponent() {
  const { showSuccess } = useToast();
  return <button onClick={() => showSuccess('Done!')}>Show</button>;
}

it('shows toast', async () => {
  render(<ToastProvider><TestComponent /></ToastProvider>);
  await userEvent.click(screen.getByText('Show'));
  expect(screen.getByText('Done!')).toBeInTheDocument();
});
```

**Timers**:
```javascript
vi.useFakeTimers();
await userEvent.click(screen.getByText('Show'));
vi.advanceTimersByTime(3000); // Fast-forward
expect(screen.queryByText('Done!')).not.toBeInTheDocument();
vi.useRealTimers();
```

---

## Hook Testing

```javascript
import { renderHook, waitFor } from '@testing-library/react';

it('loads items successfully', async () => {
  const mockItems = [{ id: '1', title: 'Item 1' }];
  vi.mocked(provider.getDataProvider).mockReturnValue({
    practiceItems: { load: vi.fn().mockResolvedValue(mockItems) }
  });

  const { result } = renderHook(() => useLibraryData());
  
  expect(result.current.loading).toBe(true);
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.items).toEqual(mockItems);
});
```

---

## Mocking

**Modules**:
```javascript
vi.mock('../data/provider.js', () => ({
  getDataProvider: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(provider.getDataProvider).mockReturnValue({
    practiceItems: {
      load: vi.fn().mockResolvedValue([]),
      save: vi.fn().mockResolvedValue(),
    },
  });
});
```

**Browser APIs**:
```javascript
global.crypto.randomUUID = vi.fn(() => 'test-uuid-123');
global.URL.createObjectURL = vi.fn(() => 'blob:test-url');
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
```

---

## Domain Logic Testing

```javascript
describe('models', () => {
  it('creates practice item with defaults', () => {
    const item = createPracticeItem();
    expect(item.id).toBeDefined();
    expect(item.title).toBe('Untitled item');
    expect(item.tempo.targetBpm).toBe(96);
  });

  it('creates item with overrides', () => {
    const item = createPracticeItem({ title: 'Scale', tempo: { targetBpm: 120 } });
    expect(item.title).toBe('Scale');
    expect(item.tempo.targetBpm).toBe(120);
  });
});
```

---

## Integration Tests

```javascript
describe('storage integration', () => {
  let db;

  beforeAll(async () => {
    db = await openDB('FermataTestDB', 1, {
      upgrade(db) { db.createObjectStore('practiceItems'); },
    });
  });

  afterAll(async () => {
    await db.close();
    await indexedDB.deleteDatabase('FermataTestDB');
  });

  it('saves and loads items', async () => {
    const items = [{ id: '1', title: 'Item 1' }];
    await savePracticeItems(items, db);
    const loaded = await loadPracticeItems(db);
    expect(loaded).toEqual(items);
  });
});
```

---

## E2E Tests (Playwright)

```javascript
import { test, expect } from '@playwright/test';

test.describe('Library', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library');
  });

  test('displays practice items', async ({ page }) => {
    await page.waitForSelector('[data-testid="practice-item"]');
    const items = page.locator('[data-testid="practice-item"]');
    await expect(items).toHaveCount(5);
  });

  test('creates new item', async ({ page }) => {
    await page.click('button:has-text("New Item")');
    await page.fill('input[name="title"]', 'My Scale');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Item created')).toBeVisible();
  });

  test('deletes item', async ({ page }) => {
    const firstItem = page.locator('[data-testid="practice-item"]').first();
    await firstItem.locator('button[aria-label="Delete"]').click();
    await page.click('button:has-text("Confirm")');
    await expect(page.locator('text=Item deleted')).toBeVisible();
  });
});
```

**File Upload**:
```javascript
await page.locator('input[type="file"]').setInputFiles('test-files/scale.pdf');
```

**Wait for API**:
```javascript
const response = page.waitForResponse('/api/items');
await page.click('button:has-text("Save")');
await response;
```

---

## Best Practices

✅ **DO**: Test behavior, use semantic queries (`getByRole`, `getByLabelText`), mock dependencies, cleanup

❌ **DON'T**: Test implementation, use `querySelector`, write giant tests, leave test data

**Coverage Targets**: Statements/Functions/Lines > 80%, Branches > 75%

**Debug**: `screen.debug()`, `npm test -- -t "test name"`, `console.log()`

---

See also: [COMPONENT_PATTERNS.md](./COMPONENT_PATTERNS.md), [ERROR_HANDLING.md](./ERROR_HANDLING.md)
