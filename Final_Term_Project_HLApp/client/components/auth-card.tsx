import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  switchLabel: string;
  switchHref: string;
  switchText: string;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  subtitle,
  switchLabel,
  switchHref,
  switchText,
  children
}: AuthCardProps) {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-copy">
          <p className="eyebrow">Secure healthcare access</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="auth-card">
          {children}
          <p className="auth-switch">
            {switchLabel} <Link href={switchHref}>{switchText}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

