'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell, { AuthField, AuthError, AuthSubmit } from '../components/AuthShell';
import { signUp } from '@/lib/auth-client';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const validatePasswordStrength = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass)) {
      return 'Password must contain both letters and numbers.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = formData.name.trim();
    const normalizedEmail = formData.email.trim().toLowerCase();
    const { password, confirmPassword } = formData;

    // Client-side validations
    if (!trimmedName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email: normalizedEmail,
        password: password,
        name: trimmedName,
        role: 'customer',
      });

      if (res.error) {
        setErrorMessage(res.error.message || 'Signup failed. Please try again.');
        setLoading(false);
        return;
      }

      // Success - Redirect to account page
      router.push('/account');
      router.refresh();
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setLoading(false);
    }
  };

  // live checklist mirroring validatePasswordStrength
  const rules = [
    { ok: formData.password.length >= 8, label: 'At least 8 characters' },
    { ok: /[A-Za-z]/.test(formData.password) && /[0-9]/.test(formData.password), label: 'Letters and numbers' },
  ];
  const matches = formData.confirmPassword.length > 0 && formData.confirmPassword === formData.password;

  return (
    <AuthShell
      image="/products/kulfi-mate-render.webp"
      cutout
      flavor="kulfi"
      panelTitle={
        <>
          Clean protein, made for <em>Indian bodies.</em>
        </>
      }
      panelPoints={['Track every order in one place', 'Save addresses for faster checkout', 'Manage your profile anytime']}
      kicker="Join The Proteinest"
      title={
        <>
          Create your <em>account.</em>
        </>
      }
      subtitle="Start your journey to clean, gentle and powerful nutrition."
      switchText="Already have an account?"
      switchLabel="Sign in instead"
      switchHref="/login"
    >
      <AuthError message={errorMessage} />
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <AuthField
          id="name"
          name="name"
          type="text"
          label="Full name"
          icon="user"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email address"
          icon="mail"
          autoComplete="email"
          inputMode="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />
        <AuthField
          id="password"
          name="password"
          label="Password"
          icon="lock"
          toggle
          hint
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
        >
          <ul className="auth-rules" id="password-hint">
            {rules.map((r) => (
              <li key={r.label} data-ok={r.ok}>
                <span aria-hidden />
                {r.label}
                <span className="sr-only">{r.ok ? ' (met)' : ' (not met yet)'}</span>
              </li>
            ))}
          </ul>
        </AuthField>
        <AuthField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          icon="lock"
          toggle
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
        >
          {formData.confirmPassword && (
            <p className="auth-match" data-ok={matches} aria-live="polite">
              {matches ? 'Passwords match' : 'Passwords don’t match yet'}
            </p>
          )}
        </AuthField>
        <AuthSubmit loading={loading} label="Create account" loadingLabel="Creating account…" />
      </form>
    </AuthShell>
  );
}
