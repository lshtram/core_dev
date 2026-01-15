# Performance Guidelines

## Bundle Size

**Targets**: Initial bundle < 500 KB, Largest chunk < 200 KB (gzipped)

**Check**: `npm run build && ls -lh dist/assets`

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const Compose = lazy(() => import('./pages/Compose'));
const Practice = lazy(() => import('./pages/Practice'));

<Suspense fallback={<LoadingSkeleton />}>
  <Routes>
    <Route path="/compose" element={<Compose />} />
    <Route path="/practice" element={<Practice />} />
  </Routes>
</Suspense>
```

### Tree Shaking

```javascript
// ❌ Bad: Imports entire library
import _ from 'lodash';

// ✅ Good: Import specific function
import debounce from 'lodash/debounce';
```

### Dynamic Imports

```jsx
async function handleExportPDF() {
  const { jsPDF } = await import('jspdf'); // Load only when needed
  const doc = new jsPDF();
}
```

---

## React Performance

### Memoization

```jsx
import { useMemo, useCallback, memo } from 'react';

// Expensive computation
const filtered = useMemo(
  () => items.filter(i => i.category === filter).sort((a,b) => a.createdAt - b.createdAt),
  [items, filter]
);

// Stable callback for memo'd children
const handleClick = useCallback(() => console.log('click'), []);

// Pure component
const Item = memo(function Item({ item }) {
  return <div>{item.title}</div>;
});
```

**When NOT to use**: Simple operations like `count * 2`

### Avoid Unnecessary Re-renders

```jsx
// ❌ Bad: New object every render
<Component style={{ margin: 10 }} />

// ✅ Good: Define outside
const STYLE = { margin: 10 };
<Component style={STYLE} />

// ❌ Bad: New function every render
<button onClick={() => handleClick(id)}>

// ✅ Good: Use useCallback
const handleClickWithId = useCallback(() => handleClick(id), [id]);
<button onClick={handleClickWithId}>
```

---

## List Rendering

### Virtualization (>100 items)

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={600} itemCount={items.length} itemSize={50} width="100%">
  {({ index, style }) => <div style={style}>{items[index].title}</div>}
</FixedSizeList>
```

### Keys

```jsx
// ❌ Bad: Index as key
{items.map((item, i) => <Item key={i} item={item} />)}

// ✅ Good: Unique ID
{items.map(item => <Item key={item.id} item={item} />)}
```

---

## Network Performance

### Parallel Requests

```javascript
// ❌ Bad: Sequential
const items = await practiceItems.load();
const files = await filesStore.load();

// ✅ Good: Parallel
const [items, files] = await Promise.all([
  practiceItems.load(),
  filesStore.load(),
]);
```

### Caching

Provider has built-in 60s cache. Repeated calls within 60s return cached result.

### Debouncing

```jsx
import debounce from 'lodash/debounce';

const debouncedSearch = useMemo(
  () => debounce(onSearch, 300),
  [onSearch]
);

<input onChange={(e) => debouncedSearch(e.target.value)} />
```

---

## Asset Optimization

### Images

```jsx
// Specify dimensions to prevent layout shift
<img src="/logo.png" width="200" height="100" alt="Logo" loading="lazy" />
```

**Formats**: WebP for photos, SVG for icons/logos, PNG only when transparency needed

### Fonts

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin />
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-display: swap; /* Show fallback until loaded */
}
```

---

## CSS Performance

### Use Transforms (GPU-accelerated)

```css
/* ❌ Bad: Triggers layout */
.item { position: relative; top: 10px; }

/* ✅ Good: GPU-accelerated */
.item { transform: translate(10px, 10px); }
```

### CSS Variables

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1F1B19;
}

.component {
  background: var(--bg-primary); /* No recalculation */
}
```

---

## Storage Performance

### Batch Operations

```javascript
// ❌ Bad: Multiple writes
for (const item of items) {
  await practiceItems.save([item]);
}

// ✅ Good: Single batch
await practiceItems.save(items);
```

### Supabase Optimization

```javascript
// ❌ Bad: Load everything
const { data } = await supabase.from('practice_items').select('*');

// ✅ Good: Paginate
const { data } = await supabase
  .from('practice_items')
  .select('*')
  .range(0, 49) // First 50
  .order('created_at', { ascending: false });
```

---

## Memory Management

### Clean Up Resources

```jsx
useEffect(() => {
  const url = URL.createObjectURL(blob);
  return () => URL.revokeObjectURL(url); // Cleanup
}, [blob]);
```

### Avoid Memory Leaks

```jsx
useEffect(() => {
  let active = true;
  const load = async () => {
    const data = await fetchData();
    if (active) setData(data); // Only update if mounted
  };
  load();
  return () => { active = false; }; // Cleanup
}, []);
```

### Remove Event Listeners

```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## Measurement

### Lighthouse

```bash
npm run build && npm run preview
# Then run Lighthouse in Chrome DevTools
```

**Targets**: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 80

### Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Performance API

```javascript
performance.mark('load-start');
const items = await practiceItems.load();
performance.mark('load-end');
performance.measure('load-items', 'load-start', 'load-end');

const measure = performance.getEntriesByName('load-items')[0];
console.log(`Load took ${measure.duration}ms`);
```

---

## Checklist

- [ ] Bundle size increase < 50 KB
- [ ] Lighthouse performance > 90
- [ ] No memory leaks (check DevTools Memory profiler)
- [ ] Images optimized and lazy loaded
- [ ] Large lists virtualized (>100 items)
- [ ] Expensive computations memoized
- [ ] Data fetching parallelized
- [ ] No unnecessary re-renders (check React Profiler)
