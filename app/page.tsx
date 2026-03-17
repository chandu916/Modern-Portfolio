"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-8 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,#ffd6a5_0%,rgba(255,214,165,0)_35%),radial-gradient(circle_at_85%_20%,#9ad6d0_0%,rgba(154,214,208,0)_30%),linear-gradient(120deg,#fbfbf8_0%,#f3f5ee_50%,#eef3f7_100%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
        <p className="font-display text-lg uppercase tracking-[0.12em]">Chandu</p>
        <div className="flex items-center gap-4 text-sm">
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <section className="grid gap-10 pb-4 pt-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs uppercase tracking-[0.18em] shadow-sm ring-1 ring-black/5 backdrop-blur">
              <Sparkles size={14} />
              Open For Opportunities
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              I build polished digital products that ship fast and feel premium.
            </h1>
            <p className="max-w-xl text-base text-black/70 sm:text-lg">
              Full-stack engineer focused on modern web architecture, product thinking, and performance-first execution.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a className="btn-primary" href="#projects">
                View Work
                <ArrowUpRight size={16} />
              </a>
              <a className="btn-secondary" href="#contact">
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="card space-y-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-black/60">Core Stack</p>
            <div className="flex flex-wrap gap-2">
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

        <section id="projects" className="space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl">Featured Projects</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="card flex h-full flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <h3 className="font-display text-xl">{project.title}</h3>
                  <p className="text-sm text-black/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold">
                  Case Study
                  <ArrowUpRight size={15} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl">Experience</h2>
          <div className="grid gap-4">
            {experience.map((item, index) => (
              <motion.article
                key={item.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="card"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl">{item.role}</h3>
                  <span className="text-xs uppercase tracking-[0.12em] text-black/60">{item.period}</span>
                </div>
                <p className="mb-3 text-sm font-semibold text-black/80">{item.company}</p>
                <p className="text-sm text-black/70">{item.impact}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="card flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl">Let&apos;s build something excellent.</h2>
            <p className="mt-2 text-sm text-black/70">Available for freelance, full-time, and high-impact product roles.</p>
          </div>
          <div className="flex items-center gap-3">
            <a className="icon-btn" href="mailto:hello@yourdomain.com" aria-label="Email">
              <Mail size={18} />
            </a>
            <a className="icon-btn" href="https://github.com/chandu916" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a className="icon-btn" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
