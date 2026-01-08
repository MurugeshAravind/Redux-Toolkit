# Redux Toolkit Demo (TypeScript + Vite)

A compact, opinionated demo showing how to build a React app with Redux Toolkit using TypeScript and Vite.  
This repo demonstrates common RTK patterns (slices, async thunks, selectors), typed store/hooks, and a small example of async data fetching — a great starting point for learning or bootstrapping new projects.

Repository: https://github.com/MurugeshAravind/Redux-Toolkit

## Highlights
- React + Vite (fast dev server + modern build)
- TypeScript-first: typed store, slices, thunks, and hooks
- Redux Toolkit: `configureStore`, `createSlice`, `createAsyncThunk`
- Example of async data fetching and error handling
- Typed hooks: `useAppDispatch` and `useAppSelector`
- Ready for integration with RTK Query, middleware, DevTools

## Tech stack
- React
- Vite
- TypeScript
- Redux Toolkit
- (Optional) React Router, RTK Query, testing with Vitest / React Testing Library

## Quick start

Prerequisites
- Node.js (LTS recommended)
- npm, Yarn, or pnpm

Install dependencies
```bash
# npm
npm install

# or yarn
yarn

# or pnpm
pnpm install
```

Run dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Build for production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview production build locally
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

Run tests / lint / format (if configured)
```bash
npm test
npm run lint
npm run format
```

Note: Vite projects commonly have scripts in package.json like:
- `dev`: `vite`
- `build`: `vite build`
- `preview`: `vite preview`

## Environment variables (Vite + TypeScript)
Vite exposes env variables starting with `VITE_`. Example:
- VITE_API_BASE_URL — base URL for API requests

Place env files at the project root: `.env`, `.env.local`, `.env.development`, `.env.production`.

Usage in code:
```ts
const baseUrl = import.meta.env.VITE_API_BASE_URL;
```

## Project structure (actual)
- src/
  - store/
    - store.ts          — typed store configuration
    - habitSlice.ts     — habit slice logic
  - components/
    - AddHabitForm.tsx
    - HabitList.tsx
    - HabitStats.tsx
  - App.tsx
  - main.tsx
  - App.css
  - index.css
- public/
  - vite.svg
- index.html
- vite.config.ts
- tsconfig.json
- package.json

## Example TypeScript code

Store and slice (src/store/store.ts / src/store/habitSlice.ts)
```ts
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';

export const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```ts
// src/store/habitSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface HabitsState {
  items: Habit[];
}

const initialState: HabitsState = {
  items: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<Habit>) {
      state.items.push(action.payload);
    },
    removeHabit(state, action: PayloadAction<string>) {
      state.items = state.items.filter(h => h.id !== action.payload);
    },
    toggleHabit(state, action: PayloadAction<string>) {
      const habit = state.items.find(h => h.id === action.payload);
      if (habit) habit.completed = !habit.completed;
    },
  },
});

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;
```

## Testing & debugging
- For unit tests consider Vitest + React Testing Library for Vite compatibility.
- Use Redux DevTools for runtime state inspection.
- Test slices and selectors in isolation and components with mocked store or Redux providers.

## Deployment
- Build with `npm run build`.
- Deploy the `dist/` folder output to Vercel, Netlify, or other hosting.
- For GitHub Pages, you can use adapters or the `vite-plugin-static-copy` + gh-pages workflows.

## Contributing
Contributions welcome. Suggested flow:
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-change`
3. Add tests where appropriate
4. Open a PR describing your changes

## License
MIT — see LICENSE file (or replace with your chosen license).

## Contact
Author: MurugeshAravind — https://github.com/MurugeshAravind
