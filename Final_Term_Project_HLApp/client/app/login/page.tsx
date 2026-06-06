"use client";

import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import { AuthCard } from "@/components/auth-card";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      showToast("Signed in successfully", "success");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Login failed";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Sign In to Your Dashboard"
      subtitle="Use your registered email and password to access role-protected healthcare tools"
      switchLabel="New to the platform?"
      switchHref="/register"
      switchText="Create an account"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            id="login-email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />
        </label>
        <label>
          Password
          <input
            id="login-password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="form-button" type="submit" disabled={isSubmitting}>
          <LogIn aria-hidden="true" />
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}
