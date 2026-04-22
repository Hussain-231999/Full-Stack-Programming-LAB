export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-slate-500 text-lg">
          Learn who we are and what drives us forward.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-slate-800 text-white rounded-2xl p-10 mb-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          To build fast, accessible, and beautiful web experiences that make
          people's lives easier. We believe great software should be simple,
          reliable, and enjoyable to use.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          { icon: "🎯", title: "Focus", desc: "We focus on what matters most to our users." },
          { icon: "🤝", title: "Integrity", desc: "Honest, transparent, and always accountable." },
          { icon: "🌱", title: "Growth", desc: "We learn, improve, and grow every day." },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
          >
            <span className="text-4xl mb-4 block">{icon}</span>
            <h3 className="text-slate-800 font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
        Meet the Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Sara Khan", role: "CEO & Founder", emoji: "👩‍💼" },
          { name: "Ali Raza", role: "Lead Developer", emoji: "👨‍💻" },
          { name: "Zara Malik", role: "UI/UX Designer", emoji: "🎨" },
        ].map(({ name, role, emoji }) => (
          <div
            key={name}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
          >
            <span className="text-5xl mb-4 block">{emoji}</span>
            <h3 className="text-slate-800 font-bold text-lg">{name}</h3>
            <p className="text-slate-500 text-sm mt-1">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}