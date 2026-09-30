'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell, { AuthField, AuthError, AuthSubmit } from '../components/AuthShell';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = formData.email.trim().toLowerCase();
    const { password } = formData;

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: normalizedEmail,
        password: password,
      });

      if (res.error) {
        setErrorMessage('Invalid email or password. Please check your credentials.');
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

  return (
    <AuthShell
      image="/products/choco-buddy-render.webp"
      cutout
      flavor="choco"
      panelTitle={
        <>
          Welcome back to the <em>finest you.</em>
        </>
      }
      panelPoints={['Track every order in one place', 'Saved delivery addresses', 'Your profile and preferences']}
      kicker="Welcome back"
      title={
        <>
          Sign in to your <em>account.</em>
        </>
      }
      subtitle="Access your orders, saved addresses and profile."
      switchText="New to The Proteinest?"
      switchLabel="Create an account"
      switchHref="/signup"
    >
      <AuthError message={errorMessage} />
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
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
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <AuthSubmit loading={loading} label="Sign in" loadingLabel="Signing in…" />
      </form>
    </AuthShell>
  );
}
