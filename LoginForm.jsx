import { useState } from 'react';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function validate(fields) {
  const errors = {};
  if (!fields.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!fields.password) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
}

/**
 * LoginForm component
 *
 * Props:
 *   onLogin(values)       – called on successful submit with { email, password }
 *   onForgotPassword()    – called when "Forgot password?" is clicked
 *   onSwitchToSignUp()    – called when "Sign up" link is clicked
 *   onClose()             – called when the ✕ button is clicked (hides the close btn if omitted)
 *   loading               – controlled loading state (optional)
 *   error                 – global error string (optional)
 *   overlay               – wrap in a dark overlay (default: true)
 *   logoSrc               – custom logo image URL (optional, uses default icon if omitted)
 *   title                 – heading text (default: "Welcome back")
 *   buttonText            – submit button label (default: "Sign in")
 *   position              – header alignment: "left" | "center" | "right" (default: "left")
 */
export function LoginForm({
  onLogin,
  onForgotPassword,
  onSwitchToSignUp,
  onClose,
  loading: externalLoading,
  error: externalError,
  overlay = true,
  logoSrc,
  title = 'Welcome back',
  buttonText = 'Sign in',
  position = 'left',
}) {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loading = externalLoading !== undefined ? externalLoading : internalLoading;

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!onLogin) {
      setSuccess(true);
      return;
    }
    try {
      setInternalLoading(true);
      const result = await onLogin({ email: fields.email, password: fields.password });
      if (result !== false) setSuccess(true);
    } catch (err) {
      // let parent handle via error prop
    } finally {
      setInternalLoading(false);
    }
  }

  const card = (
    <div className="raf-card" role="dialog" aria-modal="true" aria-label="Login form">
      {onClose && (
        <button className="raf-close-btn" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      )}

      {success ? (
        <div className="raf-success">
          <div className="raf-success-icon"><CheckIcon /></div>
          <h3>Signed in!</h3>
          <p>You have been successfully signed in.</p>
        </div>
      ) : (
        <>
          <div className={`raf-header ${position === 'center'
            ? 'raf-header-center'
            : position === 'right'
              ? 'raf-header-right'
              : 'raf-header-left'}`}>
            <div className="raf-logo">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              )}
            </div>

            <h2 className="raf-title">{title}</h2>
            <p className="raf-subtitle">
              Don't have an account?{' '}
              {onSwitchToSignUp ? (
                <span onClick={onSwitchToSignUp} role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && onSwitchToSignUp()}>
                  Sign up
                </span>
              ) : (
                <span>Sign up</span>
              )}
            </p>
          </div>

          {externalError && (
            <div className="raf-global-error" style={{ marginBottom: 16 }}>
              <AlertIcon />
              <span>{externalError}</span>
            </div>
          )}

          <form className="raf-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="raf-field">
              <label className="raf-label" htmlFor="raf-login-email">Email address</label>
              <div className="raf-input-wrap">
                <span className="raf-input-icon"><MailIcon /></span>
                <input
                  id="raf-login-email"
                  className={`raf-input${errors.email ? ' raf-error' : ''}`}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              {errors.email && <span className="raf-field-error"><AlertIcon />{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="raf-field">
              <label className="raf-label" htmlFor="raf-login-password">Password</label>
              <div className="raf-input-wrap">
                <span className="raf-input-icon"><LockIcon /></span>
                <input
                  id="raf-login-password"
                  className={`raf-input${errors.password ? ' raf-error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={fields.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="raf-eye-btn"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="raf-field-error"><AlertIcon />{errors.password}</span>}
            </div>

            {/* Forgot password */}
            {onForgotPassword && (
              <div className="raf-forgot">
                <button type="button" className="raf-forgot-link" onClick={onForgotPassword}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="raf-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="raf-spinner" />
                  Signing in...
                </>
              ) : (
                buttonText
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );

  if (!overlay) return card;

  return (
    <div className="raf-overlay" onClick={e => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      {card}
    </div>
  );
}

export default LoginForm;
