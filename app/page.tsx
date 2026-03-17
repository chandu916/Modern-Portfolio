"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type ThemeId = "studio-dawn" | "midnight-gold" | "deep-ocean" | "charcoal-luxe";

const themes: {
  id: ThemeId;
  name: string;
  preview: string;
}[] = [
  {
    id: "studio-dawn",
    name: "Studio Dawn",
    preview: "linear-gradient(135deg, #ffd6a5 0%, #9ad6d0 55%, #eef3f7 100%)",
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    preview: "linear-gradient(135deg, #0b0b0f 0%, #8b6f2e 45%, #e0b95b 100%)",
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean Glass",
    preview: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 48%, #60a5fa 100%)",
  },
  {
    id: "charcoal-luxe",
    name: "Charcoal Minimal Luxe",
    preview: "linear-gradient(135deg, #111111 0%, #6b6762 52%, #d4cfc7 100%)",
  },
];

const THEME_STORAGE_KEY = "modern-portfolio-theme";

type StackViewId =
  | "solar-system"
  | "timeline-evolution"
  | "radial-radar";

const stackViews: {
  id: StackViewId;
  name: string;
  note: string;
}[] = [
  {
    id: "solar-system",
    name: "Solar System 2.5D",
    note: "Categories as planets and tools as orbiting moons",
  },
  {
    id: "timeline-evolution",
    name: "Timeline Evolution",
    note: "Foundation to scale to AI/cloud stack growth",
  },
  {
    id: "radial-radar",
    name: "Radial Skill Radar",
    note: "Current versus target capabilities by domain",
  },
];

const stackViewByTheme: Record<ThemeId, StackViewId> = {
  "studio-dawn": "timeline-evolution",
  "midnight-gold": "radial-radar",
  "deep-ocean": "timeline-evolution",
  "charcoal-luxe": "solar-system",
};

const timelineStages = [
  { title: "Foundation", items: ["HTML/CSS", "JavaScript", "React"] },
  { title: "Scale", items: ["Next.js", "TypeScript", "Node.js"] },
  { title: "AI + Cloud", items: ["Azure", "OpenAI", "Data Ops"] },
];


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
  const [themeIndex, setThemeIndex] = useState(0);
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

  useEffect(() => {
    const storedThemeId = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    const storedIndex = themes.findIndex((theme) => theme.id === storedThemeId);

    if (storedIndex >= 0) {
      setThemeIndex(storedIndex);
    }
  }, []);

  useEffect(() => {
    const activeTheme = themes[themeIndex];
    document.documentElement.dataset.theme = activeTheme.id;
    window.localStorage.setItem(THEME_STORAGE_KEY, activeTheme.id);
  }, [themeIndex]);

  const currentTheme = themes[themeIndex];
  const currentStackId = stackViewByTheme[currentTheme.id];
  const currentStackView = stackViews.find((view) => view.id === currentStackId) ?? stackViews[0];

  const handleCycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

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
    <div className="theme-shell relative min-h-screen overflow-hidden px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-8 lg:px-10">
      <div className="theme-backdrop pointer-events-none absolute inset-0 -z-10" />

      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4 sm:gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-4">
            <button
              type="button"
              onClick={handleCycleTheme}
              className="logo-toggle"
              aria-label={`Switch theme. Current theme is ${currentTheme.name}`}
            >
              <span className="logo-wordmark">CHANDU</span>
            </button>

            <div className="theme-preview" aria-label={`Theme ${themeIndex + 1} of ${themes.length}: ${currentTheme.name}`}>
              {themes.map((theme, index) => (
                <span
                  key={theme.id}
                  className={`theme-swatch ${index === themeIndex ? "is-active" : ""}`}
                  style={{ background: theme.preview }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
        </div>

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
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="eyebrow">
                <Sparkles size={14} />
                Open For Opportunities
              </p>
              <p className="theme-pill">Theme {themeIndex + 1} of {themes.length}</p>
            </div>
            <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
              I build polished digital products that ship fast and feel premium.
            </h1>
            <p className="text-muted max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 lg:text-lg">
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
            <p className="text-soft text-sm">
              Click the CHANDU mark to rotate through all four themes, including the current studio theme.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="card stack-lab md:self-stretch"
          >
            <div className="stack-lab-head">
              <div>
                <p className="text-dim text-xs uppercase tracking-[0.16em]">Stack Lab</p>
                <h3 className="font-display text-xl sm:text-2xl">{currentStackView.name}</h3>
                <p className="text-soft mt-1 text-sm">{currentStackView.note}</p>
              </div>
            </div>

            <div className={`stack-scene model-${currentStackView.id}`}>

              {currentStackView.id === "solar-system" ? (
                <div className="solar-shell">
                  <div className="solar-orbit orbit-a" />
                  <div className="solar-orbit orbit-b" />
                  <motion.div className="solar-core" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3.2, repeat: Infinity }}>
                    Platform
                  </motion.div>
                  {[
                    { label: "Frontend", left: "28%", top: "28%", moon: "Next" },
                    { label: "Backend", left: "70%", top: "32%", moon: "Node" },
                    { label: "Data", left: "34%", top: "70%", moon: "SQL" },
                    { label: "Cloud", left: "74%", top: "68%", moon: "Azure" },
                  ].map((planet, index) => (
                    <motion.button
                      key={planet.label}
                      type="button"
                      className="solar-planet"
                      style={{ left: planet.left, top: planet.top }}
                      whileHover={{ scale: 1.08 }}
                      animate={{ y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                      transition={{ duration: 2.8 + index * 0.3, repeat: Infinity }}
                    >
                      {planet.label}
                      <span className="solar-moon">{planet.moon}</span>
                    </motion.button>
                  ))}
                </div>
              ) : null}

              {currentStackView.id === "timeline-evolution" ? (
                <div className="timeline-shell">
                  <div className="timeline-rail" />
                  <div className="timeline-grid">
                    {timelineStages.map((stage, index) => (
                      <motion.div
                        key={stage.title}
                        className="timeline-stage"
                        whileHover={{ y: -6 }}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.8 + index * 0.3, repeat: Infinity }}
                      >
                        <p className="timeline-title">{stage.title}</p>
                        <div className="timeline-items">
                          {stage.items.map((item) => (
                            <span key={item} className="timeline-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}

              {currentStackView.id === "radial-radar" ? (
                <div className="radar-shell">
                  <svg className="radar-svg" viewBox="0 0 260 220" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="130,26 212,70 212,150 130,194 48,150 48,70" className="radar-grid" />
                    <polygon points="130,52 188,82 188,138 130,170 72,138 72,82" className="radar-grid" />
                    <polygon points="130,72 172,94 172,126 130,148 88,126 88,94" className="radar-grid" />
                    <polygon points="130,44 194,78 180,140 130,164 82,132 90,88" className="radar-shape current" />
                    <polygon points="130,36 204,72 200,148 130,178 72,144 76,78" className="radar-shape target" />
                  </svg>
                  <div className="radar-labels">
                    <span>UI</span>
                    <span>API</span>
                    <span>Data</span>
                    <span>Cloud</span>
                    <span>DevOps</span>
                    <span>AI</span>
                  </div>
                </div>
              ) : null}

            </div>

            <div className="section-divider pt-5">
              <p className="text-muted text-sm">Based in India · Available remotely worldwide</p>
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
                  <p className="text-muted text-sm leading-6">{project.description}</p>
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
                  <span className="text-dim text-xs uppercase tracking-[0.12em]">{item.period}</span>
                </div>
                <p className="text-strong mb-3 text-sm font-semibold">{item.company}</p>
                <p className="text-muted text-sm leading-6">{item.impact}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="card space-y-6 sm:space-y-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Contact Us</h2>
              <p className="text-muted mt-2 max-w-2xl text-sm leading-6">
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
              <label className="text-strong space-y-1.5 text-sm font-semibold">
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
              <label className="text-strong space-y-1.5 text-sm font-semibold">
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
              <label className="text-strong space-y-1.5 text-sm font-semibold">
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
              <label className="text-strong space-y-1.5 text-sm font-semibold">
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

            <label className="text-strong space-y-1.5 text-sm font-semibold">
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
              <p className="text-dim text-xs">Fields marked with * are required.</p>
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
