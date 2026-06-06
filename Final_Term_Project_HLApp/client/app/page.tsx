import { CalendarCheck, ClipboardPlus, ShieldCheck, Stethoscope } from "lucide-react";

const modules = [
  {
    title: "Appointments",
    description: "Patients can request visits while admins confirm slots and assign doctors.",
    icon: CalendarCheck
  },
  {
    title: "Treatment Cycle",
    description: "Doctors manage checkups, treatment notes, prescriptions, and follow-ups.",
    icon: Stethoscope
  },
  {
    title: "Patient Records",
    description: "Structured history keeps appointment, medication, and progress data connected.",
    icon: ClipboardPlus
  },
  {
    title: "Secure Access",
    description: "JWT authentication and role-based access protect sensitive healthcare workflows.",
    icon: ShieldCheck
  }
];

export default function Home() {
  return (
    <main className="app-shell">
      <section className="intro">
        <div>
          <p className="eyebrow">Healthcare System</p>
          <h1>Online Doctor Appointments with Continuous Treatment Tracking</h1>
          <p className="summary">
            A structured platform for patients, doctors, and administrators to manage appointments,
            medical supervision, prescriptions, medication schedules, and follow-up visits.
          </p>
          <div className="actions">
            <a href="/register" className="primary-action">Create Account</a>
            <a href="/login" className="secondary-action">Sign In</a>
          </div>
        </div>
        <div className="status-panel" aria-label="System snapshot">
          <div>
            <span>Today</span>
            <strong>24 appointments</strong>
          </div>
          <div>
            <span>Follow-ups</span>
            <strong>8 Scheduled</strong>
          </div>
          <div>
            <span>Alerts</span>
            <strong>Email & Mobile</strong>
          </div>
        </div>
      </section>

      <section id="modules" className="module-grid">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <article key={module.title} className="module-card">
              <Icon aria-hidden="true" />
              <h2>{module.title}</h2>
              <p>{module.description}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
