# Technical Coding Standards (High-ROI)

These standards are "Labor-Intensive but High-ROI." They prioritize portability, testability, and AI-interpretability.

## 1. Interface-First Design (The "Contract")
**Rule**: You must define the Interface (`.d.ts` or `type`) *before* writing the implementation.
- **Why**: Forces clear thinking about inputs/outputs without getting lost in logic.
- **Process**: 
  1. Write `feature.types.ts` (Derived from `TECH_SPEC_current.md`).
  2. Ask User/Audit to approve the shape.
  3. Implement `feature.ts`.

## 2. strict View-Model Separation
**Rule**: UI Components must be PURE. No `useEffect`, no `fetch`, no complex logic.
- **Pattern**:
    ```tsx
    // ❌ Bad: Logic in component
    function UserList() {
      const [users, setUsers] = useState([]); // Violation
      useEffect(() => { ... }, []); // Violation
      return <ul>...</ul>;
    }
    
    // ✅ Good: Logic extracted
    function UserList() {
      const { users, isLoading } = useUserListViewModel();
      if (isLoading) return <Spinner />;
      return <ul>...</ul>;
    }
    ```

## 3. "AI-Native" Context Headers
**Rule**: Every file must start with a context block for future Agents.
- **Format**:
    ```typescript
    /**
     * @file userController.ts
     * @context Core Domain Logic / User Management
     * @desc Handles strict validation for user profile updates.
     * @dependencies [ResultType, UserSchema]
     * @invariants User email must be unique; Role cannot be downgraded by self.
     */
    ```

## 4. Design by Contract (Defensive Programming)
**Rule**: Every public function must begin with assertions.
- **Why**: Fails fast (Fail-Stop) rather than propagating silent errors.
- **Pattern**:
    ```typescript
    function calculateDiscount(price: number, percent: number): number {
      assert(price >= 0, "Price cannot be negative"); // Pre-condition
      assert(percent >= 0 && percent <= 100, "Percent must be 0-100");
      
      const result = price * (percent / 100);
      return result;
    }
    ```

## 5. CSS Modules & Tokens
- **Naming**: camelCase (e.g., `.primaryButton`).
- **Values**: STRICT usage of `styles/tokens.css`. No hex codes in CSS files.
