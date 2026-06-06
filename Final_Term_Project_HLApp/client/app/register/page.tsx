"use client";

import { FormEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import { AuthCard } from "@/components/auth-card";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { Role } from "@/lib/api";

const roles: Array<{ value: Role; label: string }> = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" }
];

export default function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("patient");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ name, email, password, role });
      showToast("Account created successfully", "success");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Registration failed";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Register today as a doctor or patient."
      switchLabel="Already registered?"
      switchHref="/login"
      switchText="Sign in"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            id="register-name"
            name="name"
            value={name}
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
          />
        </label>
        <label>
          Email
          <input
            id="register-email"
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
            id="register-password"
            name="password"
            value={password}
            autoComplete="new-password"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </label>
        <label>
          Role
          <select
            id="register-role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            {roles.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="form-button" type="submit" disabled={isSubmitting}>
          <UserPlus aria-hidden="true" />
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthCard>
  );
}
