# Component Patterns Reference

Quick reference for React component patterns in Fermata.

## Component Types

### 1. Presentational (UI Only)
No state or side effects. TypeScript props typing required. CSS Modules for styling.
```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button className={styles.button} onClick={onClick}>{label}</button>;
}
```

### 2. Stateful Container
Local UI state with `useState`. Use functional updates. Add ARIA attributes.
```jsx
export default function Accordion({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button onClick={() => setIsExpanded(prev => !prev)} aria-expanded={isExpanded}>{title}</button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}
```

### 3. Data-Connected
Extract data logic to custom hook. Use `active` flag to prevent updates after unmount.
```jsx
export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await practiceItems.load();
        if (!active) return;
        setItems(data);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);
  
  if (loading) return <LoadingSkeleton />;
  return items.map(item => <Item key={item.id} item={item} />);
}
```

### 4. Forms
Use React Hook Form for 5+ fields. Inline validation.
```jsx
export default function ItemForm({ onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSave)}>
      <input {...register('title', { required: 'Title required' })} />
      {errors.title && <span>{errors.title.message}</span>}
    </form>
  );
}
```

## Custom Hooks

### Data Hook Pattern
```javascript
export function useLibraryData() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await practiceItems.load();
        if (active) setItems(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return { items, loading, error };
}
```

### View Model Hook Pattern
```javascript
export function useLibraryViewModel() {
  const { items, loading, error } = useLibraryData();
  const { showSuccess, showError } = useToast();

  const handleDelete = async (itemId) => {
    try {
      await practiceItems.save(items.filter(i => i.id !== itemId));
      showSuccess("Item deleted");
    } catch (error) {
      showError("Failed to delete item");
    }
  };

  return { items, loading, error, handleDelete };
}
```


### Controller Hoisting
When a leaf component needs to be controlled by a parent (e.g., global shortcuts), lift its controller hook to the parent/ViewModel.
```javascript
// Parent/ViewModel
const controller = useMetronomeController(settings);
return <MetronomePanel controller={controller} />;

// Child
function MetronomePanel({ controller: providedController }) {
  const localController = useMetronomeController(defaults); // Fallback
  const controller = providedController ?? localController;
}
```

### Controlled Inputs with External Sync
When an input field has local "draft" state but can also be updated via props (e.g., shortcuts), use `useEffect` to sync the draft state.
```javascript
function BpmInput({ value }) {
  const [draft, setDraft] = useState(value);
  // Sync draft when external value changes
  useEffect(() => setDraft(String(value)), [value]);
  return <input value={draft} onChange={e => setDraft(e.target.value)} />;
}
```

## Context Providers

```jsx
const Context = createContext(null);

export function Provider({ children }) {
  const [state, setState] = useState();
  const value = { state, setState };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContext() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('Must be used within Provider');
  return ctx;
}
```

## TypeScript Props

```tsx
type ComponentProps = {
  name: string;
  age?: number;
  items?: Array<{ id: string }>;
  onClick?: () => void;
  status?: "pending" | "active";
  children?: React.ReactNode;
};
```

## CSS Modules

**Naming**: BEM → camelCase. `.item-header` → `styles.itemHeader`

```css
/* Component.module.css */
.component { /* container */ }
.itemHeader { /* element */ }
.component--active { /* modifier */ }
```

```jsx
<div className={`${styles.component} ${active ? styles['component--active'] : ''}`}>
  <div className={styles.itemHeader}>{title}</div>
</div>
```

## Organization

- **<100 lines**: Single file `Component.jsx`
- **100-300 lines**: Directory with `Component.jsx + .module.css + .test.jsx`
- **>300 lines**: Extract sections. Page orchestrates, sections handle logic.

## Performance

```jsx
// Memoize expensive computations
const filtered = useMemo(() => items.filter(i => i.cat === filter), [items, filter]);

// Memoize callbacks for memo'd children
const handleClick = useCallback(() => console.log('click'), []);

// Memo pure components
const Item = memo(function Item({ item }) { return <div>{item.title}</div>; });

// Lazy load heavy pages
const Compose = lazy(() => import('./Compose'));
<Suspense fallback={<Loading />}><Compose /></Suspense>
```

## Accessibility

```jsx
// Keyboard nav
<button onClick={fn} onKeyDown={e => e.key === 'Enter' && fn()} tabIndex={0}>

// ARIA
<button aria-label="Delete item" aria-describedby="help">
<span id="help" className="sr-only">Cannot be undone</span>

// Focus management
const ref = useRef();
useEffect(() => { if (isOpen) ref.current?.focus(); }, [isOpen]);
```

## Anti-Patterns

❌ Inline styles: `<div style={{color: 'red'}}>`  
✅ CSS Modules: `<div className={styles.error}>`

❌ Direct Supabase: `supabase.from('items').select()`  
✅ Provider: `practiceItems.load()`


❌ Missing keys: `items.map(i => <Item item={i} />)`  
✅ With keys: `items.map(i => <Item key={i.id} item={i} />)`

---

See also: [TESTING_PATTERNS.md](./TESTING_PATTERNS.md), [ERROR_HANDLING.md](./ERROR_HANDLING.md), [GUIDELINES.md](./GUIDELINES.md)
