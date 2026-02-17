import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

/**
 * AuthForms – A combined component that manages switching between Login and SignUp.
 *
 * Props:
 *   initialView           – 'login' | 'signup' (default: 'login')
 *   onLogin(values)       – called when login form is submitted
 *   onSignUp(values)      – called when signup form is submitted
 *   onForgotPassword()    – called when forgot password is clicked
 *   onClose()             – called when the form is closed
 *   loginError            – error string for login form
 *   signUpError           – error string for signup form
 *   loginLoading          – loading state for login
 *   signUpLoading         – loading state for signup
 *   overlay               – show dark overlay (default: true)
 *   logoSrc               – custom logo URL
 *   showLastName          – show last name field in signup (default: true)
 *   showConfirmPassword   – show confirm password in signup (default: true)
 *   showTerms             – show terms checkbox (default: true)
 *   showStrength          – show password strength (default: true)
 *   position              – header alignment for both forms: "left" | "center" | "right" (default: "left")
 */
export function AuthForms({
  initialView = 'login',
  onLogin,
  onSignUp,
  onForgotPassword,
  onClose,
  loginError,
  signUpError,
  loginLoading,
  signUpLoading,
  overlay = true,
  logoSrc,
  showLastName = true,
  showConfirmPassword = true,
  showTerms = true,
  showStrength = true,
  position = 'left',
}) {
  const [view, setView] = useState(initialView);

  if (view === 'login') {
    return (
      <LoginForm
        onLogin={onLogin}
        onForgotPassword={onForgotPassword}
        onSwitchToSignUp={() => setView('signup')}
        onClose={onClose}
        loading={loginLoading}
        error={loginError}
        overlay={overlay}
        logoSrc={logoSrc}
        position={position}
      />
    );
  }

  return (
    <SignUpForm
      onSignUp={onSignUp}
      onSwitchToLogin={() => setView('login')}
      onClose={onClose}
      loading={signUpLoading}
      error={signUpError}
      overlay={overlay}
      logoSrc={logoSrc}
      showLastName={showLastName}
      showConfirmPassword={showConfirmPassword}
      showTerms={showTerms}
      showStrength={showStrength}
      position={position}
    />
  );
}

export default AuthForms;
