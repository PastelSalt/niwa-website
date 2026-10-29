# BROKEN.md - Known Build Errors

All known compilation/typecheck errors as of the current state. This file must be updated whenever errors are introduced or fixed.

## Current Errors (as of last typecheck run)

### `frontend/src/features/items/components/item-tree.tsx`

| Line | Error | Description |
|------|-------|-------------|
| 3,33 | `import { useState, useCallback, useRef } from "react"` | `useRef` imported but never used |
| 10,3 | `import { ... ArrowRight } from "lucide-react"` | `ArrowRight` imported but never used |
| 352,17 | `this expression is not callable. Type 'boolean' has no call signatures.` | `isDragging()` called as function but `isDragging` is a boolean |
| 460,27 | `Type 'Transform | null' is not assignable to type 'Transform | undefined'.` | `transform` from `useSortable` may be `null`, not assignable to `Transform \| undefined` |

### `frontend/src/features/projects/projects-page.tsx`

| Line | Error | Description |
|------|-------|-------------|
| 95,9 | `'handleItemMove' is declared but its value is never read` | `handleItemMove` callback declared but never used |
| 137,13 | `Type '{ items: Item[]; ... onToggleExpand: any; }' is not assignable to type 'IntrinsicAttributes & TreeProps'. Property 'onToggleExpand' does not exist on type 'IntrinsicAttributes & TreeProps'.` | `onToggleExpand` prop passed but `ItemTree` component does not accept it |
| 137,29: `Cannot find name 'handleToggleExpand'` | `handleToggleExpand` referenced but never defined in this component |

### Root Cause

The `item-tree.tsx` file was rewritten incorrectly during an attempted drag-and-drop implementation. The `useSortable` hook from `@dnd-kit/sortable` returns `transform`, `transition`, and `isDragging` as values, but the code:
- References `isDragging()` as a function call (it's a boolean)
- Assigns `transform as any` which may be `null` to a type expecting `Transform \| undefined`

## Rule

**BROKEN.md**: After every session, update this file to reflect the current state of compilation errors. Before starting any coding work, check BROKEN.md to understand what is broken. After fixing errors, remove them from this file.
