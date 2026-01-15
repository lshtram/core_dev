# Troubleshooting Guide

## Development Environment

### Build Errors

**Module not found**: Check file path/extension, verify case-sensitive filename, ensure `npm install` ran
```bash
npm install && npm run dev
```

**Unexpected token**: JSX syntax in `.js` file - rename to `.jsx`
```bash
mv src/Component.js src/Component.jsx
```

### Vite Dev Server

**Port in use**:
```bash
lsof -ti:5173 | xargs kill -9
# Or use different port
npm run dev -- --port 5174
```

**Hot reload not working**: Hard refresh `Cmd+Shift+R` or restart server

### Node/npm Issues

**Wrong Node version** (need v18+):
```bash
node --version
nvm install 18 && nvm use 18
```

**Stale dependencies**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Apple Silicon native modules**: Modules must be installed with an arm64 Node runtime.
```bash
node -p "process.arch" # should be arm64
# If it's x64 on Apple Silicon, switch to a native arm64 terminal and reinstall Node.
```

**Apple Silicon Rollup native module missing** (`@rollup/rollup-darwin-arm64`):
```bash
# Ensure arm64 Node (avoid Rosetta x64)
node -p "process.arch" # should be arm64
# If it's x64 on Apple Silicon, switch to a native arm64 terminal and reinstall Node.

# Reinstall optional deps inside app/
rm -rf app/node_modules app/package-lock.json
cd app
npm install --include=optional
```

---

## Browser Issues

### Recording Not Working

1. Check browser permissions: Settings > Privacy > Microphone
2. Verify HTTPS or localhost (getUserMedia requires secure context)
3. Test with: `navigator.mediaDevices.getUserMedia({ audio: true })`

### IndexedDB Issues

**Quota exceeded**:
```javascript
// Check usage
const estimate = await navigator.storage.estimate();
console.log(`Using ${(estimate.usage / estimate.quota * 100).toFixed(2)}%`);
```

Clear storage: DevTools > Application > Storage > Clear site data

**Corrupted database**:
```javascript
// Delete and recreate
await indexedDB.deleteDatabase('Fermata');
// Refresh page to recreate
```

---

## Supabase/Cloud Issues

### Authentication Errors

**"Invalid JWT"**: Token expired, user needs to re-login

**"User not found"**: Check RLS policies allow user access

### Storage Upload Failures

**"Policy violation"**: Check storage bucket policy in Supabase dashboard

**Quota exceeded**: Check quota: `cloudProvider.getQuotaForUser(userId)`

**File too large**: Max 50MB per file (Supabase free tier)

### Database Query Errors

**"Permission denied"**: RLS policy blocking access. Check:
1. User is authenticated
2. RLS policy exists for operation
3. Policy condition matches (e.g., `user_id = auth.uid()`)

**Slow queries**: Add indexes, use `explain analyze` in SQL editor

---

## Testing Issues

### Vitest

**Tests hanging**: Likely async operation not completing. Add timeout:
```javascript
it('test', async () => {
  // ...
}, 10000); // 10s timeout
```

**Module mock not working**: Ensure mock before import:
```javascript
vi.mock('../module.js'); // Must be top-level, before imports
import { useHook } from '../module.js';
```

### Playwright E2E

**Test timeout**: Increase timeout or fix slow operation:
```javascript
test.setTimeout(60000); // 60s

// Or wait for specific condition
await page.waitForSelector('[data-testid="item"]', { timeout: 10000 });
```

**Element not found**: Use `data-testid` attributes for stability:
```jsx
<div data-testid="practice-item">{title}</div>
```

---

## Performance Issues

### Slow Page Load

1. Check bundle size: `npm run build && ls -lh dist/assets`
2. Check Network tab: Look for slow API calls
3. Check React Profiler: Look for expensive renders

### High Memory Usage

1. Check for memory leaks: DevTools > Memory > Take heap snapshot
2. Look for: Large arrays not cleaned up, event listeners not removed, blob URLs not revoked
3. Fix: Add cleanup in `useEffect` return

---

## Deployment Issues

### Vercel Build Failing

**"Command failed"**: Check build logs, common causes:
- Type errors (enable `skipLibCheck: false` in tsconfig temporarily)
- Missing environment variables
- Build timeout (upgrade plan or optimize)

### Supabase Edge Functions

**Function not responding**: Check logs in Supabase dashboard under Functions

**CORS errors**: Add to function:
```typescript
return new Response(JSON.stringify(data), {
  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
});
```

---

## Quick Diagnostics

```bash
# Check everything is running
npm run dev                    # Frontend (port 5173)
supabase status                # Backend (if using local)

# Check for errors
npm test -- --run              # Unit tests
npm run test:e2e               # E2E tests

# Check build
npm run build                  # Production build
npm run preview                # Test production build
```

---

See also: [ERROR_HANDLING.md](./ERROR_HANDLING.md), [TESTING_PATTERNS.md](./TESTING_PATTERNS.md)
