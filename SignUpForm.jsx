import { useState } from 'react';

/* ── Icons ── */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Password strength ── */
function getStrength(password) {
  if (!password) return { score: 0, label: '', level: '' };
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak',   level: 'weak' };
  if (score <= 2) return { score: 2, label: 'Fair',   level: 'fair' };
  if (score <= 3) return { score: 3, label: 'Good',   level: 'good' };
  return            { score: 4, label: 'Strong', level: 'strong' };
}

/* ── Validation ── */
function validate(fields, showLastName) {
  const errors = {};

  if (!fields.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (showLastName && !fields.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!fields.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!fields.password) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (fields.confirmPassword !== undefined && fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

/**
 * SignUpForm component
 *
 * Props:
 *   onSignUp(values)         – called on submit with { firstName, lastName?, email, password }
 *   onSwitchToLogin()        – called when "Sign in" link is clicked
 *   onClose()                – called when the ✕ is clicked (hides btn if omitted)
 *   loading                  – controlled loading state (optional)
 *   error                    – global error string (optional)
 *   overlay                  – wrap in a dark overlay (default: true)
 *   showLastName             – show separate last name field (default: true)
 *   showConfirmPassword      – show confirm password field (default: true)
 *   showTerms                – show terms checkbox (default: true)
 *   showStrength             – show password strength bar (default: true)
 *   logoSrc                  – custom logo image URL (optional)
 *   title                    – heading text (default: "Create an account")
 *   buttonText               – submit button label (default: "Create account")
 *   position                 – header alignment: "left" | "center" | "right" (default: "left")
 */
export function SignUpForm({
  onSignUp,
  onSwitchToLogin,
  onClose,
  loading: externalLoading,
  error: externalError,
  overlay = true,
  showLastName = true,
  showConfirmPassword = true,
  showTerms = true,
  showStrength = true,
  logoSrc,
  title = 'Create an account',
  buttonText = 'Create account',
  position = 'left',
}) {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loading = externalLoading !== undefined ? externalLoading : internalLoading;
  const strength = getStrength(fields.password);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationFields = {
      ...fields,
      confirmPassword: showConfirmPassword ? fields.confirmPassword : undefined,
    };
    const validationErrors = validate(validationFields, showLastName);

    if (showTerms && !agreed) {
      validationErrors.terms = 'You must agree to the terms';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      firstName: fields.firstName,
      ...(showLastName && { lastName: fields.lastName }),
      email: fields.email,
      password: fields.password,
    };

    if (!onSignUp) {
      setSuccess(true);
      return;
    }

    try {
      setInternalLoading(true);
      const result = await onSignUp(payload);
      if (result !== false) setSuccess(true);
    } catch (err) {
      // let parent handle via error prop
    } finally {
      setInternalLoading(false);
    }
  }

  const card = (
    <div className="raf-card" role="dialog" aria-modal="true" aria-label="Sign up form">
      {onClose && (
        <button className="raf-close-btn" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      )}

      {success ? (
        <div className="raf-success">
          <div className="raf-success-icon"><CheckIcon /></div>
          <h3>Account created!</h3>
          <p>Welcome aboard{fields.firstName ? `, ${fields.firstName}` : ''}! Your account has been successfully created.</p>
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              )}
            </div>

            <h2 className="raf-title">{title}</h2>
            <p className="raf-subtitle">
              Already have an account?{' '}
              {onSwitchToLogin ? (
                <span onClick={onSwitchToLogin} role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && onSwitchToLogin()}>
                  Sign in
                </span>
              ) : (
                <span>Sign in</span>
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
            {/* Name fields */}
            <div className={showLastName ? 'raf-field-row' : ''}>
              <div className="raf-field">
                <label className="raf-label" htmlFor="raf-signup-firstname">First name</label>
                <div className="raf-input-wrap">
                  <span className="raf-input-icon"><UserIcon /></span>
                  <input
                    id="raf-signup-firstname"
                    className={`raf-input${errors.firstName ? ' raf-error' : ''}`}
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={fields.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    disabled={loading}
                  />
                </div>
                {errors.firstName && <span className="raf-field-error"><AlertIcon />{errors.firstName}</span>}
              </div>

              {showLastName && (
                <div className="raf-field">
                  <label className="raf-label" htmlFor="raf-signup-lastname">Last name</label>
                  <div className="raf-input-wrap">
                    <span className="raf-input-icon"><UserIcon /></span>
                    <input
                      id="raf-signup-lastname"
                      className={`raf-input${errors.lastName ? ' raf-error' : ''}`}
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={fields.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      disabled={loading}
                    />
                  </div>
                  {errors.lastName && <span className="raf-field-error"><AlertIcon />{errors.lastName}</span>}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="raf-field">
              <label className="raf-label" htmlFor="raf-signup-email">Email address</label>
              <div className="raf-input-wrap">
                <span className="raf-input-icon"><MailIcon /></span>
                <input
                  id="raf-signup-email"
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
              <label className="raf-label" htmlFor="raf-signup-password">Password</label>
              <div className="raf-input-wrap">
                <span className="raf-input-icon"><LockIcon /></span>
                <input
                  id="raf-signup-password"
                  className={`raf-input${errors.password ? ' raf-error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={fields.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button type="button" className="raf-eye-btn"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="raf-field-error"><AlertIcon />{errors.password}</span>}

              {/* Strength bar */}
              {showStrength && fields.password && (
                <>
                  <div className="raf-strength-bar">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`raf-strength-seg ${i <= strength.score ? strength.level : ''}`}
                      />
                    ))}
                  </div>
                  <span className={`raf-strength-label ${strength.level}`}>
                    {strength.label}
                  </span>
                </>
              )}
            </div>

            {/* Confirm password */}
            {showConfirmPassword && (
              <div className="raf-field">
                <label className="raf-label" htmlFor="raf-signup-confirm">Confirm password</label>
                <div className="raf-input-wrap">
                  <span className="raf-input-icon"><LockIcon /></span>
                  <input
                    id="raf-signup-confirm"
                    className={`raf-input${errors.confirmPassword ? ' raf-error' : ''}`}
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={fields.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button type="button" className="raf-eye-btn"
                    onClick={() => setShowConfirm(s => !s)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="raf-field-error"><AlertIcon />{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Terms */}
            {showTerms && (
              <div className="raf-field">
                <label className="raf-checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => {
                      setAgreed(e.target.checked);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                    }}
                    disabled={loading}
                  />
                  <span className="raf-checkbox-label">
                    I agree to the{' '}
                    <span>Terms of Service</span> and <span>Privacy Policy</span>
                  </span>
                </label>
                {errors.terms && (
                  <span className="raf-field-error" style={{ marginLeft: 26 }}>
                    <AlertIcon />{errors.terms}
                  </span>
                )}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="raf-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="raf-spinner" />
                  Creating account...
                </>
              ) : buttonText}
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

export default SignUpForm;
