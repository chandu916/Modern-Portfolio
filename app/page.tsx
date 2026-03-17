"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";

const featuredProjects = [
  {
    title: "Realtime Team Board",
    description:
      "Collaborative planning board with live cursors, optimistic updates, and keyboard-first workflows.",
    stack: ["Next.js", "TypeScript", "Supabase", "WebSockets"],
    link: "#",
  },
  {
    title: "AI Interview Coach",
    description:
      "Practice interviews with adaptive question paths, scoring feedback, and structured growth reports.",
    stack: ["React", "Node.js", "OpenAI", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Commerce Ops Dashboard",
    description:
      "Operations analytics platform for product, inventory, and regional demand monitoring in one view.",
    stack: ["Next.js", "Tailwind", "Prisma", "Chart.js"],
    link: "#",
  },
];

const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Your Company",
    period: "2024 - Present",
    impact:
      "Led architecture modernization, reducing release cycle time from weekly to daily deployments.",
  },
  {
    role: "Software Engineer",
    company: "Your Company",
    period: "2022 - 2024",
    impact:
      "Built internal platforms that improved engineering productivity and incident response speed.",
  },
];

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("subject", formData.subject);
      payload.append("message", formData.message);
      payload.append("_subject", `[Portfolio Contact] ${formData.subject}`);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const response = await fetch("https://formsubmit.co/ajax/cchandhan021@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message right now.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thanks! Your message has been sent successfully. Check your inbox to confirm FormSubmit activation the first time.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setSubmitStatus("error");
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,#ffd6a5_0%,rgba(255,214,165,0)_35%),radial-gradient(circle_at_85%_20%,#9ad6d0_0%,rgba(154,214,208,0)_30%),linear-gradient(120deg,#fbfbf8_0%,#f3f5ee_50%,#eef3f7_100%)]" />

      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="font-display text-base uppercase tracking-[0.12em] sm:text-lg">Chandu</p>
        <div className="scrollbar-none -mx-1 flex w-full items-center gap-2 overflow-x-auto px-1 pb-1 text-sm sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0">
          <a className="nav-link" href="#projects">
            Projects
          </a>
          <a className="nav-link" href="#experience">
            Experience
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14 lg:gap-16">
        <section className="grid gap-8 pb-2 pt-6 sm:gap-10 sm:pt-10 md:grid-cols-[1.15fr_0.85fr] md:items-end lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-5 sm:space-y-6"
          >
            <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] shadow-sm ring-1 ring-black/5 backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.18em]">
              <Sparkles size={14} />
              Open For Opportunities
            </p>
            <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
              I build polished digital products that ship fast and feel premium.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-black/70 sm:text-base sm:leading-7 lg:text-lg">
              Full-stack engineer focused on modern web architecture, product thinking, and performance-first execution.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a className="btn-primary w-full justify-center sm:w-auto" href="#projects">
                View Work
                <ArrowUpRight size={16} />
              </a>
              <a className="btn-secondary w-full justify-center sm:w-auto" href="#contact">
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="card space-y-5 md:self-stretch"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Core Stack</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Next.js",
                "TypeScript",
                "Tailwind",
                "Node.js",
                "PostgreSQL",
                "Azure",
              ].map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="border-t border-black/10 pt-5">
              <p className="text-sm text-black/60">Based in India · Available remotely worldwide</p>
            </div>
          </motion.aside>
        </section>

        <section id="projects" className="space-y-5 sm:space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Featured Projects</h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="card flex h-full flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-lg sm:text-xl">{project.title}</h3>
                  <p className="text-sm leading-6 text-black/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a href={project.link} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                  Case Study
                  <ArrowUpRight size={15} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-5 sm:space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Experience</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {experience.map((item, index) => (
              <motion.article
                key={item.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="card"
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
                  <h3 className="font-display text-lg sm:text-xl">{item.role}</h3>
                  <span className="text-xs uppercase tracking-[0.12em] text-black/60">{item.period}</span>
                </div>
                <p className="mb-3 text-sm font-semibold text-black/80">{item.company}</p>
                <p className="text-sm leading-6 text-black/70">{item.impact}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="card space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Contact Us</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                Share your requirements and we&apos;ll send the inquiry straight to cchandhan021@gmail.com.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a className="icon-btn" href="mailto:cchandhan021@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
              <a className="icon-btn" href="https://github.com/chandu916" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a className="icon-btn" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5 text-sm font-semibold text-black/80">
                Full Name *
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your full name"
                />
              </label>
              <label className="space-y-1.5 text-sm font-semibold text-black/80">
                Email Address *
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5 text-sm font-semibold text-black/80">
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Optional"
                />
              </label>
              <label className="space-y-1.5 text-sm font-semibold text-black/80">
                Subject *
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="What can we help with?"
                />
              </label>
            </div>

            <label className="space-y-1.5 text-sm font-semibold text-black/80">
              Message *
              <textarea
                name="message"
                required
                minLength={10}
                value={formData.message}
                onChange={handleInputChange}
                className="input-field min-h-32 resize-y"
                placeholder="Tell us about your requirement"
              />
            </label>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-black/60">Fields marked with * are required.</p>
              <button type="submit" className="btn-primary w-full justify-center md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowUpRight size={16} />
              </button>
            </div>

            {submitStatus !== "idle" ? (
              <p
                className={`rounded-xl px-3 py-2 text-sm ${
                  submitStatus === "success"
                    ? "border border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border border-red-300 bg-red-50 text-red-700"
                }`}
              >
                {submitMessage}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  );
}
