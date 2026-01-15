# Error Handling Patterns

## Core Principles

1. **Never fail silently** - Always handle errors explicitly
2. **User-friendly messages** - Clear, actionable (not technical jargon)
3. **Log for debugging** - Always log errors
4. **Graceful degradation** - App remains functional when non-critical ops fail

---

## Patterns

### 1. Async Data Hooks (useEffect)

```javascript
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
  let active = true;
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await practiceItems.load();
      if (!active) return;
      setItems(data ?? []);
    } catch (err) {
      if (!active) return;
      console.error("Failed to load items:", err);
      setError(err?.message ?? "Failed to load library data.");
    } finally {
      if (active) setLoading(false);
    }
  };
  load();
  return () => { active = false; };
}, []);
```

**Key**: Use `active` flag, clear error before retry, fallback message, always set loading false

### 2. Event Handlers (User Actions)

```javascript
const handleDelete = async (itemId) => {
  try {
    await practiceItems.delete(itemId);
    showSuccess("Item deleted successfully");
    setItems(items.filter(item => item.id !== itemId));
  } catch (error) {
    console.error("Failed to delete item:", error);
    showError("Failed to delete item. Please try again.");
  }
};
```

**Key**: Show success/error toast, log error, keep UI state consistent

### 3. Data Provider Methods

```javascript
async getAllItems() {
  try {
    const { data, error } = await restSelect("practice_items", {
      select: "*",
      order: { created_at: "desc" },
    });
    
    if (error) throw error;
    
    return data.map(row => transformItemFromDb(row));
  } catch (err) {
    console.error("[cloudProvider] Failed to load items:", err);
    throw new Error("Failed to load practice items from cloud");
  }
}
```

**Key**: Log and throw, let caller handle display

### 4. React Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Boundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

**Use**: Wrap routes or heavy components

### 5. Optional Chaining

```javascript
// Gracefully handle missing data
const userName = user?.profile?.name ?? 'Guest';
const firstItem = items?.[0]?.title ?? 'No items';
```

### 6. File Operations

```javascript
async function saveFile(blob, filename) {
  try {
    await fileStore.save(filename, blob);
    return { success: true };
  } catch (error) {
    console.error("File save failed:", error);
    
    if (error.name === 'QuotaExceededError') {
      return { success: false, reason: 'storage_full' };
    }
    
    return { success: false, reason: 'unknown' };
  }
}
```

**Key**: Return result object, categorize errors

---

## User-Friendly Messages

### ✅ Good Messages

- "Failed to save changes. Please try again."
- "No internet connection. Check your network."
- "Storage is full. Delete some files to continue."

### ❌ Bad Messages

- "Error: ECONNREFUSED at line 42"
- "Uncaught TypeError: Cannot read property 'map'"
- "500 Internal Server Error"

---

## Testing Error Scenarios

```javascript
it('handles load error', async () => {
  vi.mocked(provider.getDataProvider).mockReturnValue({
    practiceItems: {
      load: vi.fn().mockRejectedValue(new Error('Network error')),
    },
  });

  const { result } = renderHook(() => useLibraryData());

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.error).toBe('Network error');
  expect(result.current.items).toEqual([]);
});
```

---

## Anti-Patterns

❌ **Silent failure**: `try { await save(); } catch {}`  
✅ **Log and notify**: `catch (err) { console.error(err); showError("Save failed"); }`

❌ **Generic message**: `"Error occurred"`  
✅ **Specific message**: `"Failed to delete item"`

❌ **Technical jargon**: `"ECONNREFUSED"`  
✅ **User-friendly**: `"No internet connection"`

❌ **No fallback**: `const name = user.profile.name;`  
✅ **Safe access**: `const name = user?.profile?.name ?? 'Guest';`

---

See also: [TESTING_PATTERNS.md](./TESTING_PATTERNS.md), [DATA_PROVIDER_API.md](./DATA_PROVIDER_API.md)
