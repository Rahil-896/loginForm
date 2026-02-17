# react-signup-form

> Beautiful, accessible, zero-dependency Login and Sign-Up form components for React.

---

## Features

- **LoginForm** — email + password with show/hide toggle and "Forgot password?" support  
- **SignUpForm** — first/last name, email, password with strength meter, confirm password, and terms checkbox  
- **AuthForms** — combined component that handles switching between the two forms  
- Animated overlay and card entrance  
- Built-in validation with inline error messages  
- Success state after submit  
- Fully customisable via props  
- TypeScript types included  
- No external dependencies (only peer: `react`)

---

## Installation

```bash
npm install react-signup-form
```

or with Yarn:

```bash
yarn add react-signup-form
```

---

## Quick Start

### Combined Login + Sign-Up (recommended)

```jsx
import { useState } from 'react';
import { AuthForms } from 'react-signup-form';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <button onClick={() => setShowAuth(true)}>Open Login</button>

      {showAuth && (
        <AuthForms
          onLogin={async ({ email, password }) => {
            console.log('Login:', email, password);
            // call your API here
          }}
          onSignUp={async ({ firstName, lastName, email, password }) => {
            console.log('Sign up:', firstName, lastName, email, password);
            // call your API here
          }}
          onForgotPassword={() => console.log('Forgot password clicked')}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
```

---

### Login Form only

```jsx
import { LoginForm } from 'react-signup-form';

<LoginForm
  onLogin={async ({ email, password }) => {
    const ok = await myApi.login(email, password);
    if (!ok) return false; // prevents success state
  }}
  onForgotPassword={() => navigate('/forgot-password')}
  onSwitchToSignUp={() => setView('signup')}
  onClose={() => setOpen(false)}
/>
```

### Sign-Up Form only

```jsx
import { SignUpForm } from 'react-signup-form';

<SignUpForm
  onSignUp={async ({ firstName, lastName, email, password }) => {
    await myApi.register({ firstName, lastName, email, password });
  }}
  onSwitchToLogin={() => setView('login')}
  onClose={() => setOpen(false)}
/>
```

---

## Props

### `<LoginForm />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `onLogin` | `(values) => void \| Promise` | — | Called on submit with `{ email, password }`. Return `false` to block the success screen |
| `onForgotPassword` | `() => void` | — | Shows "Forgot password?" link when provided |
| `onSwitchToSignUp` | `() => void` | — | Shows "Sign up" link when provided |
| `onClose` | `() => void` | — | Shows ✕ close button when provided |
| `loading` | `boolean` | — | Controlled loading state |
| `error` | `string` | — | Global error banner above the form |
| `overlay` | `boolean` | `true` | Wraps the card in a dark blurred overlay |
| `logoSrc` | `string` | — | Custom logo image URL |
| `title` | `string` | `"Welcome back"` | Form heading |
| `buttonText` | `string` | `"Sign in"` | Submit button label |

### `<SignUpForm />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `onSignUp` | `(values) => void \| Promise` | — | Called with `{ firstName, lastName?, email, password }` |
| `onSwitchToLogin` | `() => void` | — | Shows "Sign in" link when provided |
| `onClose` | `() => void` | — | Shows ✕ close button |
| `loading` | `boolean` | — | Controlled loading state |
| `error` | `string` | — | Global error banner |
| `overlay` | `boolean` | `true` | Dark blurred overlay |
| `showLastName` | `boolean` | `true` | Toggle last name field |
| `showConfirmPassword` | `boolean` | `true` | Toggle confirm password field |
| `showTerms` | `boolean` | `true` | Toggle terms checkbox |
| `showStrength` | `boolean` | `true` | Toggle password strength bar |
| `logoSrc` | `string` | — | Custom logo image URL |
| `title` | `string` | `"Create an account"` | Form heading |
| `buttonText` | `string` | `"Create account"` | Submit button label |

### `<AuthForms />`

Accepts all props from both forms above, plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialView` | `'login' \| 'signup'` | `'login'` | Which form to show first |
| `loginError` | `string` | — | Error for login form |
| `signUpError` | `string` | — | Error for signup form |
| `loginLoading` | `boolean` | — | Loading for login |
| `signUpLoading` | `boolean` | — | Loading for signup |

---

## Handling API Errors

Pass an error string via the `error` (or `loginError` / `signUpError`) prop:

```jsx
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

<LoginForm
  loading={loading}
  error={error}
  onLogin={async ({ email, password }) => {
    setLoading(true);
    setError('');
    try {
      await myApi.login(email, password);
    } catch (e) {
      setError('Invalid email or password. Please try again.');
      return false; // prevents success screen
    } finally {
      setLoading(false);
    }
  }}
/>
```

---

## Inline (no overlay) Usage

Set `overlay={false}` to render just the card without the dark background:

```jsx
<div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
  <LoginForm overlay={false} onLogin={handleLogin} />
</div>
```

---
git clone https://github.com/Rahil-896/loginForm.git
