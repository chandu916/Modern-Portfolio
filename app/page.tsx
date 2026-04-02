"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

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

const starTrails = [
  { left: "8%", top: "12%", delay: "0s", duration: "5.5s" },
  { left: "18%", top: "26%", delay: "1s", duration: "6.2s" },
  { left: "32%", top: "10%", delay: "1.8s", duration: "5.8s" },
  { left: "44%", top: "22%", delay: "0.8s", duration: "6.6s" },
  { left: "58%", top: "8%", delay: "2.1s", duration: "5.9s" },
  { left: "72%", top: "18%", delay: "1.4s", duration: "6.4s" },
  { left: "84%", top: "11%", delay: "2.8s", duration: "5.7s" },
  { left: "92%", top: "28%", delay: "0.3s", duration: "6.1s" },
  { left: "6%", top: "38%", delay: "1.2s", duration: "6.8s" },
  { left: "16%", top: "46%", delay: "2.9s", duration: "6.1s" },
  { left: "28%", top: "34%", delay: "0.6s", duration: "5.9s" },
  { left: "39%", top: "44%", delay: "2.2s", duration: "6.5s" },
  { left: "52%", top: "36%", delay: "1.5s", duration: "5.6s" },
  { left: "66%", top: "43%", delay: "3.1s", duration: "6.3s" },
  { left: "77%", top: "39%", delay: "1.9s", duration: "5.8s" },
  { left: "90%", top: "47%", delay: "0.4s", duration: "6.2s" },
  { left: "12%", top: "58%", delay: "2.6s", duration: "6.7s" },
  { left: "34%", top: "62%", delay: "0.9s", duration: "6s" },
  { left: "56%", top: "60%", delay: "1.7s", duration: "5.7s" },
  { left: "78%", top: "64%", delay: "2.4s", duration: "6.4s" },
];

const timelineStages = [
  { title: "Foundation", items: ["HTML/CSS", "JavaScript", "React"] },
  { title: "Scale", items: ["Next.js", "TypeScript", "Node.js"] },
  { title: "AI + Cloud", items: ["Azure", "OpenAI", "Data Ops"] },
];

const logoBurstParticles = [
  { angle: -78, delay: "0ms", length: "3.4rem" },
  { angle: -44, delay: "30ms", length: "3.9rem" },
  { angle: -12, delay: "60ms", length: "3.25rem" },
  { angle: 18, delay: "20ms", length: "3.8rem" },
  { angle: 46, delay: "70ms", length: "4rem" },
  { angle: 78, delay: "40ms", length: "3.45rem" },
  { angle: 122, delay: "55ms", length: "3.7rem" },
  { angle: 154, delay: "10ms", length: "3.15rem" },
  { angle: 196, delay: "85ms", length: "3.85rem" },
  { angle: 232, delay: "35ms", length: "3.4rem" },
  { angle: 268, delay: "65ms", length: "3.05rem" },
  { angle: 308, delay: "25ms", length: "3.75rem" },
];


const featuredProjects = [
  {
    title: "Planty",
    type: "Live Website",
    description:
      "An online plant store to browse, buy, and manage plants across curated categories — from bonsai to herbs — with cart and delivery registration.",
    stack: ["Next.js", "Tailwind", "MongoDB"],
    link: "https://planty-virid.vercel.app/",
    previewBg: "linear-gradient(135deg, #1a3d2b 0%, #2d6a4f 45%, #74c69d 100%)",
    previewLabel: "Bring Nature Home 🌿",
    linkLabel: "Visit Website",
    highlight: "Shopping Experience",
  },
  {
    title: "Stack Overflow Clone",
    type: "Live Website",
    description:
      "A full-stack Q&A community platform with question posting, answering, voting, and tagging — modelled after Stack Overflow's core workflows.",
    stack: ["React.js", "MongoDB", "CSS"],
    link: "https://stackoverflow-frontend-85zb.onrender.com/",
    previewBg: "linear-gradient(135deg, #232629 0%, #3d3d3d 50%, #f48024 100%)",
    previewLabel: "Stack Overflow Clone",
    linkLabel: "Visit Website",
    highlight: "Community Platform",
  },
  {
    title: "Cyber Ranges on AWS",
    type: "Case Study",
    description:
      "A controlled, interactive cybersecurity environment on AWS where university students practice detecting and mitigating real-world cyber-attacks using industry-grade tooling.",
    stack: ["AWS", "Cybersecurity", "Web Interface"],
    link: "",
    previewBg: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 50%, #00c2ff 100%)",
    previewLabel: "Cybersecurity · AWS Range",
    linkLabel: "Coming Soon",
    highlight: "Security Lab",
  },
  {
    title: "Basic Banking System",
    type: "GitHub Project",
    description:
      "Dynamic web banking app with secure login, user profiles showing balance and account info, and peer-to-peer money transfer with a full transaction history.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
    link: "https://github.com/chandu916/Banking_system",
    previewBg: "linear-gradient(135deg, #003366 0%, #0055a5 50%, #4a9ede 100%)",
    previewLabel: "Banking System",
    linkLabel: "View on GitHub",
    highlight: "Fintech Workflow",
  },
  {
    title: "Network Intrusion Detection",
    type: "Case Study",
    description:
      "ML-based IDS that uses a Decision Tree classifier to analyse incoming network packets in real time and flag potential attacks across an entire monitored network.",
    stack: ["Python", "Machine Learning", "Decision Tree"],
    link: "",
    previewBg: "linear-gradient(135deg, #1a0000 0%, #6b0000 50%, #ff4444 100%)",
    previewLabel: "Intrusion Detection System",
    linkLabel: "Coming Soon",
    highlight: "ML Security",
  },
  {
    title: "Crowd-Sourced Question Banks",
    type: "Case Study",
    description:
      "Web platform where anonymous contributors upload exam questions and institutions generate standardised question papers from the growing crowd-sourced bank.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
    link: "",
    previewBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #e94560 100%)",
    previewLabel: "Question Bank Platform",
    linkLabel: "Coming Soon",
    highlight: "Education Platform",
  },
];

const getProjectUrlLabel = (link: string) => {
  if (!link) return "coming-soon.local";

  try {
    const parsed = new URL(link);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return link.replace(/^https?:\/\//, "");
  }
};

const experience = [
  {
    role: "Quality Engineer",
    company: "LTIMindtree",
    companyShort: "LTM",
    type: "Full-time",
    period: "Nov 2024 – Present · 1 yr 6 mos",
    location: "Bengaluru, Karnataka, India · Hybrid",
    impact:
      "Driving quality assurance and automation across enterprise projects, owning end-to-end test coverage with Playwright and validating cloud data pipelines on AWS Glue.",
    skills: ["Playwright", "AWS Glue", "Test Automation", "CI/CD", "Agile", "JIRA"],
    companyBg: "#ffffff",
    companyColor: "#FF5346",
    typeBadgeBg: "rgba(255,83,70,0.12)",
    typeBadgeColor: "#FF5346",
  },
  {
    role: "SDET",
    company: "LTIMindtree",
    companyShort: "LTM",
    type: "Apprenticeship",
    period: "Aug 2024 – Oct 2024 · 3 mos",
    location: "Bhubaneswar, Odisha, India · On-site",
    impact:
      "Completed an intensive SDET apprenticeship focused on Core Java, web development fundamentals, and software testing practices under senior engineering mentorship.",
    skills: ["Core Java", "Web Development", "Manual Testing", "OOP"],
    companyBg: "#ffffff",
    companyColor: "#FF5346",
    typeBadgeBg: "rgba(255,83,70,0.12)",
    typeBadgeColor: "#FF5346",
  },
  {
    role: "Full-Stack Web Developer",
    company: "NullClass",
    type: "Internship",
    period: "Jan 2024 – Mar 2024 · 3 mos",
    location: "Remote",
    impact:
      "Built and shipped full-stack features using the MERN stack — from REST APIs to responsive React UIs — contributing to real product deliverables in an agile team environment.",
    skills: ["MongoDB", "React.js", "Node.js", "Express.js", "REST APIs", "Tailwind", "Git", "JavaScript"],
    companyBg: "linear-gradient(135deg, #1a0800 0%, #7a2d00 55%, #ff6b35 100%)",
  },
];

type CountryOption = {
  flag: string;
  code: string;
  iso: string;
  name: string;
  min: number;
  max: number;
  hint: string;
  placeholder: string;
  regex: RegExp;
};

const COUNTRIES: CountryOption[] = [
  { flag: "🇮🇳", code: "+91",  iso: "IN", name: "India",       min: 10, max: 10, hint: "10 digits, starts with 6–9",  placeholder: "98765 43210",   regex: /^[6-9]\d{9}$/ },
  { flag: "🇺🇸", code: "+1",   iso: "US", name: "USA",         min: 10, max: 10, hint: "10 digits",                   placeholder: "202 555 0101",  regex: /^\d{10}$/ },
  { flag: "🇬🇧", code: "+44",  iso: "GB", name: "UK",          min: 10, max: 10, hint: "10 digits, starts with 7",    placeholder: "7911 123456",   regex: /^7\d{9}$/ },
  { flag: "🇦🇺", code: "+61",  iso: "AU", name: "Australia",   min: 9,  max: 9,  hint: "9 digits, starts with 4",     placeholder: "412 345 678",   regex: /^4\d{8}$/ },
  { flag: "🇨🇦", code: "+1",   iso: "CA", name: "Canada",      min: 10, max: 10, hint: "10 digits",                   placeholder: "613 555 0101",  regex: /^\d{10}$/ },
  { flag: "🇩🇪", code: "+49",  iso: "DE", name: "Germany",     min: 10, max: 11, hint: "10–11 digits",                placeholder: "1512 3456789",  regex: /^\d{10,11}$/ },
  { flag: "🇫🇷", code: "+33",  iso: "FR", name: "France",      min: 9,  max: 9,  hint: "9 digits, starts with 6/7",   placeholder: "6 12 34 56 78", regex: /^[67]\d{8}$/ },
  { flag: "🇸🇬", code: "+65",  iso: "SG", name: "Singapore",   min: 8,  max: 8,  hint: "8 digits, starts with 8/9",   placeholder: "9123 4567",     regex: /^[89]\d{7}$/ },
  { flag: "🇦🇪", code: "+971", iso: "AE", name: "UAE",         min: 9,  max: 9,  hint: "9 digits, starts with 5",     placeholder: "50 123 4567",   regex: /^5\d{8}$/ },
  { flag: "🇯🇵", code: "+81",  iso: "JP", name: "Japan",       min: 10, max: 11, hint: "10–11 digits",                placeholder: "90 1234 5678",  regex: /^\d{10,11}$/ },
  { flag: "🇨🇳", code: "+86",  iso: "CN", name: "China",       min: 11, max: 11, hint: "11 digits, starts with 1",    placeholder: "139 1234 5678", regex: /^1[3-9]\d{9}$/ },
  { flag: "🇧🇷", code: "+55",  iso: "BR", name: "Brazil",      min: 10, max: 11, hint: "10–11 digits",                placeholder: "11 91234 5678", regex: /^\d{10,11}$/ },
  { flag: "🇲🇾", code: "+60",  iso: "MY", name: "Malaysia",    min: 9,  max: 10, hint: "9–10 digits, starts with 1",  placeholder: "12 345 6789",   regex: /^1\d{8,9}$/ },
  { flag: "🇵🇭", code: "+63",  iso: "PH", name: "Philippines", min: 10, max: 10, hint: "10 digits, starts with 9",    placeholder: "917 123 4567",  regex: /^9\d{9}$/ },
  { flag: "🇿🇦", code: "+27",  iso: "ZA", name: "S. Africa",   min: 9,  max: 9,  hint: "9 digits",                    placeholder: "71 234 5678",   regex: /^\d{9}$/ },
  { flag: "🇳🇬", code: "+234", iso: "NG", name: "Nigeria",     min: 10, max: 10, hint: "10 digits, starts with 7–9",  placeholder: "803 123 4567",  regex: /^[789]\d{9}$/ },
];

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Product Engineer",
    tag: "Frontend Systems",
    image: "https://i.pravatar.cc/640?img=12",
    bio: "Builds polished, accessible UI systems and keeps product quality high from concept to release.",
    linkedin: "https://linkedin.com/in/aarav-sharma",
    email: "aarav@yourcompany.com",
  },
  {
    name: "Meera Nair",
    role: "Full-Stack Developer",
    tag: "API + Integrations",
    image: "https://i.pravatar.cc/640?img=45",
    bio: "Owns backend services, integrations, and reliability patterns for high-traffic user workflows.",
    linkedin: "https://linkedin.com/in/meera-nair",
    email: "meera@yourcompany.com",
  },
  {
    name: "Rahul Verma",
    role: "Cloud Engineer",
    tag: "Azure + DevOps",
    image: "https://i.pravatar.cc/640?img=16",
    bio: "Designs scalable cloud infrastructure, observability, and deployment pipelines for fast delivery.",
    linkedin: "https://linkedin.com/in/rahul-verma",
    email: "rahul@yourcompany.com",
  },
  {
    name: "Isha Kapoor",
    role: "UX Engineer",
    tag: "Interaction Design",
    image: "https://i.pravatar.cc/640?img=32",
    bio: "Transforms user research into clear interfaces, micro-interactions, and friction-free journeys.",
    linkedin: "https://linkedin.com/in/isha-kapoor",
    email: "isha@yourcompany.com",
  },
  {
    name: "Karan Patel",
    role: "Data Engineer",
    tag: "Analytics Platform",
    image: "https://i.pravatar.cc/640?img=53",
    bio: "Creates event pipelines and data models that power decision-making, reporting, and product insights.",
    linkedin: "https://linkedin.com/in/karan-patel",
    email: "karan@yourcompany.com",
  },
  {
    name: "Nisha Reddy",
    role: "AI Engineer",
    tag: "LLM Experiences",
    image: "https://i.pravatar.cc/640?img=25",
    bio: "Builds AI-assisted experiences with careful prompt design, evaluation loops, and safe rollout plans.",
    linkedin: "https://linkedin.com/in/nisha-reddy",
    email: "nisha@yourcompany.com",
  },
];

const TEAM_CLONE = 3;
const extendedTeamMembers = [
  ...teamMembers.slice(-TEAM_CLONE),
  ...teamMembers,
  ...teamMembers.slice(0, TEAM_CLONE),
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
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [logoSpark, setLogoSpark] = useState({ x: 50, y: 50, active: false, burstKey: 0 });
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
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [phoneError, setPhoneError] = useState("");
  const sparkResetTimer = useRef<number | null>(null);
  const teamCarouselRef = useRef<HTMLDivElement | null>(null);
  const teamExtRef = useRef(TEAM_CLONE);
  const teamScrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (sparkResetTimer.current !== null) {
        window.clearTimeout(sparkResetTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    const carousel = teamCarouselRef.current;
    if (!carousel) return;

    const getStride = () => {
      const firstCard = carousel.querySelector<HTMLElement>(".team-card");
      if (!firstCard) return 0;
      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || "0") || 0;
      return firstCard.offsetWidth + gap;
    };

    let isTeleporting = false;

    const initRaf = window.requestAnimationFrame(() => {
      const stride = getStride();
      if (stride > 0) {
        isTeleporting = true;
        carousel.scrollLeft = TEAM_CLONE * stride;
        teamExtRef.current = TEAM_CLONE;
        window.setTimeout(() => { isTeleporting = false; }, 80);
      }
    });

    const handleScroll = () => {
      if (isTeleporting) return;
      if (teamScrollTimerRef.current !== null) window.clearTimeout(teamScrollTimerRef.current);
      teamScrollTimerRef.current = window.setTimeout(() => {
        teamScrollTimerRef.current = null;
        const stride = getStride();
        if (stride <= 0) return;
        const extIndex = Math.round(carousel.scrollLeft / stride);
        const total = teamMembers.length;
        let targetExt = extIndex;
        if (extIndex < TEAM_CLONE) {
          targetExt = extIndex + total;
        } else if (extIndex >= TEAM_CLONE + total) {
          targetExt = extIndex - total;
        }
        if (targetExt !== extIndex) {
          isTeleporting = true;
          carousel.scrollLeft = targetExt * stride;
          teamExtRef.current = targetExt;
          window.setTimeout(() => { isTeleporting = false; }, 80);
        } else {
          teamExtRef.current = extIndex;
        }
        const realIndex = ((targetExt - TEAM_CLONE) % total + total) % total;
        setActiveTeamIndex(realIndex);
      }, 120);
    };

    const handleResize = () => {
      const stride = getStride();
      if (stride > 0) {
        isTeleporting = true;
        carousel.scrollLeft = teamExtRef.current * stride;
        window.setTimeout(() => { isTeleporting = false; }, 80);
      }
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(initRaf);
      if (teamScrollTimerRef.current !== null) window.clearTimeout(teamScrollTimerRef.current);
      carousel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentTheme = themes[themeIndex];
  const currentStackId = stackViewByTheme[currentTheme.id];
  const currentStackView = stackViews.find((view) => view.id === currentStackId) ?? stackViews[0];
  const selectedCountry = COUNTRIES.find((country) => country.code === phoneCountryCode) ?? null;

  const handleCycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const scrollToTeamIndex = (realIndex: number) => {
    const carousel = teamCarouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector<HTMLElement>(".team-card");
    if (!firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || "0") || 0;
    const stride = firstCard.offsetWidth + gap;
    if (stride <= 0) return;
    const extIndex = TEAM_CLONE + realIndex;
    carousel.scrollTo({ left: extIndex * stride, behavior: "smooth" });
    teamExtRef.current = extIndex;
    setActiveTeamIndex(realIndex);
  };

  const handleNextTeam = () => {
    const carousel = teamCarouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector<HTMLElement>(".team-card");
    if (!firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || "0") || 0;
    const stride = firstCard.offsetWidth + gap;
    if (stride <= 0) return;
    const nextExt = teamExtRef.current + 1;
    carousel.scrollTo({ left: nextExt * stride, behavior: "smooth" });
    teamExtRef.current = nextExt;
    setActiveTeamIndex(((nextExt - TEAM_CLONE) % teamMembers.length + teamMembers.length) % teamMembers.length);
  };

  const handlePrevTeam = () => {
    const carousel = teamCarouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector<HTMLElement>(".team-card");
    if (!firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || "0") || 0;
    const stride = firstCard.offsetWidth + gap;
    if (stride <= 0) return;
    const prevExt = teamExtRef.current - 1;
    carousel.scrollTo({ left: prevExt * stride, behavior: "smooth" });
    teamExtRef.current = prevExt;
    setActiveTeamIndex(((prevExt - TEAM_CLONE) % teamMembers.length + teamMembers.length) % teamMembers.length);
  };

  const handleSmoothNav = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${targetId}`);
  };

  const getSparkPosition = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  const triggerLogoSpark = (x: number, y: number) => {
    if (sparkResetTimer.current !== null) {
      window.clearTimeout(sparkResetTimer.current);
    }

    setLogoSpark({
      x,
      y,
      active: true,
      burstKey: Date.now(),
    });

    sparkResetTimer.current = window.setTimeout(() => {
      setLogoSpark((current) => ({ ...current, active: false }));
      sparkResetTimer.current = null;
    }, 520);
  };

  const updateLogoSpark = (event: PointerEvent<HTMLButtonElement>) => {
    const { x, y } = getSparkPosition(event);
    setLogoSpark((current) => ({ ...current, x, y }));
  };

  const burstLogoSpark = (event: PointerEvent<HTMLButtonElement>) => {
    const { x, y } = getSparkPosition(event);
    triggerLogoSpark(x, y);
  };

  const resetLogoSpark = () => {
    if (sparkResetTimer.current !== null) {
      window.clearTimeout(sparkResetTimer.current);
      sparkResetTimer.current = null;
    }

    setLogoSpark((current) => ({ ...current, active: false }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const validatePhone = (digits: string, country: CountryOption | null, code: string) => {
    if (!digits) return "";
    if (!/^\+\d{1,3}$/.test(code)) {
      return "Enter country code like +91 or +1.";
    }
    if (!country) {
      return "Country code not supported yet. Try +91 or +1.";
    }
    if (!country.regex.test(digits)) {
      return `Enter a valid ${country.name} number (${country.hint}).`;
    }
    return "";
  };

  const handleCountryCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 3);
    const nextCode = digits ? `+${digits}` : "+";
    const matchedCountry = COUNTRIES.find((country) => country.code === nextCode) ?? null;
    const maxDigits = matchedCountry?.max ?? 15;
    const normalizedPhone = formData.phone.slice(0, maxDigits);

    setPhoneCountryCode(nextCode);
    if (normalizedPhone !== formData.phone) {
      setFormData((prev) => ({ ...prev, phone: normalizedPhone }));
    }
    setPhoneError(validatePhone(normalizedPhone, matchedCountry, nextCode));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, selectedCountry?.max ?? 15);
    setFormData((prev) => ({ ...prev, phone: digits }));
    setPhoneError(validatePhone(digits, selectedCountry, phoneCountryCode));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const phoneValidationError = validatePhone(formData.phone, selectedCountry, phoneCountryCode);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      setSubmitStatus("error");
      setSubmitMessage("Please enter a valid phone number for the selected country code.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone ? `${phoneCountryCode} ${formData.phone}` : "");
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
      setPhoneError("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setSubmitStatus("error");
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`theme-shell relative isolate min-h-screen overflow-hidden px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-8 lg:px-10 ${currentTheme.id === "midnight-gold" ? "is-gold-galaxy" : ""}`}>
      <div className="theme-backdrop pointer-events-none absolute inset-0 z-0" />
      {currentTheme.id === "midnight-gold" ? (
        <>
          <div className="gold-galaxy-nebula pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
          <div className="theme-stars pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {starTrails.map((star, index) => (
              <span
                key={`star-${index}`}
                className="theme-star"
                style={{
                  "--star-left": star.left,
                  "--star-top": star.top,
                  "--star-delay": star.delay,
                  "--star-duration": star.duration,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </>
      ) : null}

      <header className={`site-header ${isHeaderScrolled ? "is-scrolled" : ""}`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4 sm:gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={handleCycleTheme}
            className="logo-toggle"
            aria-label={`Switch theme. Current theme is ${currentTheme.name}`}
            onPointerEnter={burstLogoSpark}
            onPointerMove={updateLogoSpark}
            onPointerDown={burstLogoSpark}
            onPointerLeave={resetLogoSpark}
            onBlur={resetLogoSpark}
            onFocus={() => triggerLogoSpark(50, 50)}
            style={{
              "--spark-x": `${logoSpark.x}%`,
              "--spark-y": `${logoSpark.y}%`,
              "--spark-alpha": logoSpark.active ? "1" : "0",
            } as React.CSSProperties}
            data-active={logoSpark.active ? "true" : "false"}
          >
            <span className="logo-aura" aria-hidden="true" />
            {logoSpark.active ? (
              <span className="logo-spark-cluster" aria-hidden="true">
                <span key={`core-${logoSpark.burstKey}`} className="logo-spark-core" />
                {logoBurstParticles.map((particle, index) => (
                  <span
                    key={`${logoSpark.burstKey}-${index}`}
                    className="logo-spark-burst"
                    style={{
                      "--burst-angle": `${particle.angle}deg`,
                      "--burst-delay": particle.delay,
                      "--burst-length": particle.length,
                    } as React.CSSProperties}
                  />
                ))}
              </span>
            ) : null}
            <span className="logo-wordmark" data-text="CHANDU">CHANDU</span>
            <span className="theme-preview" aria-label={`Theme ${themeIndex + 1} of ${themes.length}: ${currentTheme.name}`}>
              {themes.map((theme, index) => (
                <span
                  key={theme.id}
                  className={`theme-swatch ${index === themeIndex ? "is-active" : ""}`}
                  style={{ background: theme.preview }}
                  title={theme.name}
                />
              ))}
            </span>
          </button>

          <div className="scrollbar-none -mx-1 flex w-full items-center gap-2 overflow-x-auto px-1 pb-1 text-sm sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0 lg:pb-0">
          <a className="nav-link" href="#projects" onClick={(event) => handleSmoothNav(event, "projects")}>
            Projects
          </a>
          <a className="nav-link" href="#experience" onClick={(event) => handleSmoothNav(event, "experience")}>
            Experience
          </a>
          <a className="nav-link" href="#team" onClick={(event) => handleSmoothNav(event, "team")}>
            Team
          </a>
          <a className="nav-link" href="#contact" onClick={(event) => handleSmoothNav(event, "contact")}>
            Contact
          </a>
        </div>
        </div>
        </div>
      </header>

      <main className="site-main relative z-30 mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14 lg:gap-16">
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
                    <motion.polygon
                      className="radar-shape current"
                      points="130,44 194,78 180,140 130,164 82,132 90,88"
                      animate={{
                        points: [
                          "130,44 194,78 180,140 130,164 82,132 90,88",
                          "130,36 204,72 200,148 130,178 72,144 76,78",
                          "130,38 204,74 200,150 130,180 72,146 76,80",
                          "130,44 194,78 180,140 130,164 82,132 90,88",
                        ],
                      }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.polygon
                      className="radar-shape target"
                      points="130,36 204,72 200,148 130,178 72,144 76,78"
                      animate={{
                        points: [
                          "130,36 204,72 200,148 130,178 72,144 76,78",
                          "130,38 204,74 200,150 130,180 72,146 76,80",
                          "130,36 204,72 200,148 130,178 72,144 76,78",
                        ],
                      }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {[
                      { current: { x: 130, y: 44 }, target: { x: 130, y: 36 } },
                      { current: { x: 194, y: 78 }, target: { x: 204, y: 72 } },
                      { current: { x: 180, y: 140 }, target: { x: 200, y: 148 } },
                      { current: { x: 130, y: 164 }, target: { x: 130, y: 178 } },
                      { current: { x: 82, y: 132 }, target: { x: 72, y: 144 } },
                      { current: { x: 90, y: 88 }, target: { x: 76, y: 78 } },
                    ].map((pointPair, index) => (
                      <motion.g key={`radar-travel-${index}`}>
                        <motion.circle
                          className="radar-point-glow"
                          cx={pointPair.current.x}
                          cy={pointPair.current.y}
                          r="7"
                          animate={{
                            cx: [pointPair.current.x, pointPair.target.x, pointPair.target.x, pointPair.current.x],
                            cy: [pointPair.current.y, pointPair.target.y, pointPair.target.y + 2, pointPair.current.y],
                            opacity: [0.4, 0.9, 0.7, 0.4],
                          }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                          className="radar-point"
                          cx={pointPair.current.x}
                          cy={pointPair.current.y}
                          r="3.1"
                          animate={{
                            cx: [pointPair.current.x, pointPair.target.x, pointPair.target.x, pointPair.current.x],
                            cy: [pointPair.current.y, pointPair.target.y, pointPair.target.y + 2, pointPair.current.y],
                            opacity: [0.75, 1, 0.85, 0.75],
                          }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                          className="radar-point-secondary"
                          cx={pointPair.target.x}
                          cy={pointPair.target.y}
                          r="2"
                          animate={{ opacity: [0.15, 0.5, 0.15] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.g>
                    ))}
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

        <section id="projects" className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <p className="text-dim text-xs font-semibold uppercase tracking-[0.18em]">Some Of My Work</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Featured Websites & Products</h2>
            <p className="text-muted max-w-3xl text-[0.92rem] leading-6 sm:text-base">
              Explore projects the way users experience them: as products you can click, browse, and evaluate in a visual grid.
            </p>
          </div>

          <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2 xl:grid-cols-6">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`card group flex h-full flex-col justify-between gap-5 overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                  index === 0 || index === 1 ? "xl:col-span-3" : "xl:col-span-2"
                }`}
              >
                {"previewBg" in project && project.previewBg && (
                  <div
                    className="-mx-5 -mt-5 overflow-hidden border-b border-white/20"
                    style={{ background: project.previewBg }}
                  >
                    <div className="flex items-center gap-2 bg-black/28 px-3 py-2 sm:px-4 sm:py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/95" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300/95" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/95" />
                      <div className="ml-2 flex-1 truncate rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-medium text-white/80 sm:px-3">
                        {getProjectUrlLabel(project.link)}
                      </div>
                    </div>

                    <div className="space-y-2.5 px-3 pb-3 pt-2.5 sm:space-y-3 sm:px-4 sm:pb-4 sm:pt-3">
                      <div className="rounded-xl border border-white/25 bg-black/20 p-2.5 backdrop-blur-[1px] sm:p-3">
                        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                          <span>{project.type}</span>
                          <span className="rounded-full border border-white/30 px-2 py-0.5 text-white/85">{project.highlight}</span>
                        </div>

                        {project.type === "Live Website" && project.link ? (
                          <div className="overflow-hidden rounded-lg border border-white/25 bg-white">
                            <iframe
                              src={project.link}
                              title={`${project.title} live preview`}
                              loading="lazy"
                              className="h-[188px] w-full bg-white sm:h-[235px] lg:h-[260px]"
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-xs font-semibold text-white/95">{(project as { previewLabel?: string }).previewLabel}</p>
                            <div className="mt-3 space-y-2">
                              <div className="h-2.5 w-11/12 rounded-full bg-white/70" />
                              <div className="h-2.5 w-8/12 rounded-full bg-white/55" />
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              <div className="h-8 rounded-md border border-white/20 bg-white/18" />
                              <div className="h-8 rounded-md border border-white/20 bg-white/14" />
                              <div className="h-8 rounded-md border border-white/20 bg-white/12" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    {("linkLabel" in project && project.linkLabel) ? project.linkLabel : "Open"}
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="text-dim inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                    {("linkLabel" in project && project.linkLabel) ? project.linkLabel : "Coming Soon"}
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-5 sm:space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Experience</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {experience.map((item, index) => (
              <motion.article
                key={item.role + item.period}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="card overflow-hidden"
              >
                {"companyBg" in item && item.companyBg && (
                  <div
                    className="-mx-5 -mt-5 mb-4 flex items-center justify-between px-5 py-3"
                    style={{ background: item.companyBg, borderBottom: item.companyBg === "#ffffff" ? "1px solid rgba(0,0,0,0.07)" : undefined }}
                  >
                    <span
                      style={{
                        color: (item as { companyColor?: string }).companyColor ?? "rgba(255,255,255,0.92)",
                        fontWeight: 900,
                        fontSize: "1.05rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontFamily: "Arial Black, Arial, sans-serif",
                      }}
                    >
                      {(item as { companyShort?: string }).companyShort ?? item.company}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: (item as { typeBadgeBg?: string }).typeBadgeBg ?? "rgba(255,255,255,0.18)",
                        color: (item as { typeBadgeColor?: string }).typeBadgeColor ?? "rgba(255,255,255,0.88)",
                      }}
                    >
                      {(item as { type?: string }).type}
                    </span>
                  </div>
                )}
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
                  <h3 className="font-display text-lg sm:text-xl">{item.role}</h3>
                  <span className="text-dim text-xs uppercase tracking-[0.12em]">{item.period}</span>
                </div>
                {"location" in item && (
                  <p className="text-dim mb-2 text-xs">{(item as { location?: string }).location}</p>
                )}
                <p className="text-muted mb-4 text-sm leading-6">{item.impact}</p>
                {"skills" in item && Array.isArray((item as { skills?: string[] }).skills) && (
                  <div className="flex flex-wrap gap-2">
                    {((item as { skills?: string[] }).skills ?? []).map((skill) => (
                      <span key={skill} className="chip text-xs">{skill}</span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="team" className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Our Team</h2>
            <p className="text-muted max-w-3xl text-sm leading-6 sm:text-base">
              Meet the people behind our product delivery. Hover on each profile card to view details and contact options.
            </p>
          </div>

          <div className="team-controls" aria-label="Team carousel controls">
            <button type="button" className="team-nav-btn" onClick={handlePrevTeam} aria-label="Show previous profile">
              <ChevronLeft size={18} />
            </button>

            <div className="team-dots" role="tablist" aria-label="Team profile positions">
              {teamMembers.map((member, index) => (
                <button
                  key={`team-dot-${member.email}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTeamIndex === index}
                  aria-label={`Go to profile ${index + 1}: ${member.name}`}
                  className={`team-dot ${activeTeamIndex === index ? "is-active" : ""}`}
                  onClick={() => scrollToTeamIndex(index)}
                />
              ))}
            </div>

            <button type="button" className="team-nav-btn" onClick={handleNextTeam} aria-label="Show next profile">
              <ChevronRight size={18} />
            </button>
          </div>

          <div ref={teamCarouselRef} className="team-carousel scrollbar-none" aria-label="Team profiles carousel">
            {extendedTeamMembers.map((member, i) => (
              <article key={`team-ext-${i}`} className="team-card" tabIndex={0}>
                <div className="team-card-inner">
                  <div className="team-card-face team-card-front">
                    <img src={member.image} alt={`${member.name} profile photo`} className="team-photo" loading="lazy" />
                    <div className="team-meta">
                      <h3 className="font-display text-lg sm:text-xl">{member.name}</h3>
                      <p className="text-muted text-sm">{member.role}</p>
                      <span className="team-tag">{member.tag}</span>
                    </div>
                  </div>

                  <div className="team-card-face team-card-back">
                    <div className="space-y-2">
                      <h3 className="font-display text-xl">{member.name}</h3>
                      <p className="text-soft text-sm leading-6">{member.bio}</p>
                    </div>
                    <div className="team-contact-row">
                      <a
                        className="team-contact-btn"
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${member.name} LinkedIn profile`}
                      >
                        <Linkedin size={15} />
                        LinkedIn
                      </a>
                      <a className="team-contact-btn" href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                        <Mail size={15} />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </article>
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
              <a className="icon-btn" href="https://www.linkedin.com/in/chandhan-profile/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
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
              <div className="space-y-1.5">
                <label className="text-strong block text-sm font-semibold" htmlFor="phone-country-code">
                  Phone Number
                </label>
                <div className="phone-field-row">
                  <input
                    id="phone-country-code"
                    type="text"
                    inputMode="numeric"
                    value={phoneCountryCode}
                    onChange={handleCountryCodeChange}
                    className="input-field phone-code-input"
                    placeholder="+91"
                    maxLength={4}
                    aria-label="Country code"
                  />
                  <div className="phone-number-wrap">
                    <input
                      id="phone-digits"
                      type="tel"
                      inputMode="numeric"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="input-field phone-number-input"
                      placeholder={selectedCountry?.placeholder ?? "91002 37653"}
                      maxLength={selectedCountry?.max ?? 15}
                      aria-describedby={phoneError ? "phone-error" : undefined}
                      autoComplete="tel-national"
                    />
                    <span className="phone-flag-indicator" aria-hidden="true">
                      {selectedCountry?.flag ?? "🌐"}
                    </span>
                  </div>
                </div>
                <p className="text-dim text-xs">Use country code like +91, +1, +44.</p>
                {phoneError ? (
                  <p id="phone-error" role="alert" className="phone-error-msg">{phoneError}</p>
                ) : null}
              </div>
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
