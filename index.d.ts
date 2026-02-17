import { FC, ReactNode } from 'react';

export interface LoginFormProps {
  /** Called with { email, password } on successful form submission */
  onLogin?: (values: { email: string; password: string }) => void | Promise<void | false>;
  /** Called when "Forgot password?" is clicked */
  onForgotPassword?: () => void;
  /** Called when "Sign up" link is clicked */
  onSwitchToSignUp?: () => void;
  /** Called when the close (✕) button is clicked. Button is hidden if omitted */
  onClose?: () => void;
  /** Controlled loading state */
  loading?: boolean;
  /** Global error message to display above the form */
  error?: string;
  /** Wrap the card in a full-screen dark overlay (default: true) */
  overlay?: boolean;
  /** Custom logo image URL */
  logoSrc?: string;
  /** Form heading (default: "Welcome back") */
  title?: string;
  /** Submit button text (default: "Sign in") */
  buttonText?: string;
}

export interface SignUpFormProps {
  /** Called with user data on submit. Return false to prevent success state */
  onSignUp?: (values: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) => void | Promise<void | false>;
  /** Called when "Sign in" link is clicked */
  onSwitchToLogin?: () => void;
  /** Called when the close (✕) button is clicked */
  onClose?: () => void;
  /** Controlled loading state */
  loading?: boolean;
  /** Global error message to display above the form */
  error?: string;
  /** Wrap the card in a full-screen dark overlay (default: true) */
  overlay?: boolean;
  /** Show separate last name field (default: true) */
  showLastName?: boolean;
  /** Show confirm password field (default: true) */
  showConfirmPassword?: boolean;
  /** Show terms & conditions checkbox (default: true) */
  showTerms?: boolean;
  /** Show password strength indicator (default: true) */
  showStrength?: boolean;
  /** Custom logo image URL */
  logoSrc?: string;
  /** Form heading (default: "Create an account") */
  title?: string;
  /** Submit button text (default: "Create account") */
  buttonText?: string;
}

export interface AuthFormsProps {
  /** Which form to show initially (default: 'login') */
  initialView?: 'login' | 'signup';
  /** Called on login submit */
  onLogin?: LoginFormProps['onLogin'];
  /** Called on signup submit */
  onSignUp?: SignUpFormProps['onSignUp'];
  /** Called when forgot password is clicked */
  onForgotPassword?: () => void;
  /** Called when the form is closed */
  onClose?: () => void;
  /** Error for the login form */
  loginError?: string;
  /** Error for the signup form */
  signUpError?: string;
  /** Loading state for the login form */
  loginLoading?: boolean;
  /** Loading state for the signup form */
  signUpLoading?: boolean;
  /** Wrap in dark overlay (default: true) */
  overlay?: boolean;
  /** Custom logo URL */
  logoSrc?: string;
  /** Show last name field (default: true) */
  showLastName?: boolean;
  /** Show confirm password (default: true) */
  showConfirmPassword?: boolean;
  /** Show terms checkbox (default: true) */
  showTerms?: boolean;
  /** Show password strength (default: true) */
  showStrength?: boolean;
}

export declare const LoginForm: FC<LoginFormProps>;
export declare const SignUpForm: FC<SignUpFormProps>;
export declare const AuthForms: FC<AuthFormsProps>;
