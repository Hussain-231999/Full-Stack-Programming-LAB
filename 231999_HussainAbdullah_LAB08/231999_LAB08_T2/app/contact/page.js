export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <p className="text-slate-500 text-lg">
          Have a question? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Get In Touch</h2>
          <p className="text-slate-500 leading-relaxed">
            Reach out to us through any of the channels below and we'll get
            back to you within 24 hours.
          </p>

          {[
            { icon: "📧", label: "Email", value: "hello@myapp.com" },
            { icon: "📞", label: "Phone", value: "+92 300 0000000" },
            { icon: "📍", label: "Address", value: "Islamabad, Pakistan" },
            { icon: "🕒", label: "Hours", value: "Mon–Fri, 9am–6pm" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-slate-800 font-semibold text-sm">{label}</p>
                <p className="text-slate-500 text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Send a Message
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}