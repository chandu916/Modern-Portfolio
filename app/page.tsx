"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { ChangeEvent, CSSProperties, FormEvent, MouseEvent, useEffect, useEffectEvent, useRef, useState } from "react";
import abhishekPhoto from "@/public/team/abhishek-m.png";
import chandhanPhoto from "@/public/team/chandhan-m.jpg";
import vishnuPhoto from "@/public/team/vishnu-y.png";
import vivekPhoto from "@/public/team/vivek-m.png";

const meteorTrails = [
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

const auroraOrbs = [
  { className: "is-amber", size: "30rem", top: "-8%", left: "-6%", duration: 18 },
  { className: "is-cyan", size: "24rem", top: "8%", right: "8%", duration: 22 },
  { className: "is-rose", size: "22rem", bottom: "10%", left: "18%", duration: 20 },
  { className: "is-gold", size: "28rem", bottom: "-10%", right: "-4%", duration: 24 },
];

const orbitalNodes = [
  { left: "12%", top: "18%", delay: "0s" },
  { left: "26%", top: "54%", delay: "0.8s" },
  { left: "48%", top: "22%", delay: "1.6s" },
  { left: "64%", top: "62%", delay: "0.3s" },
  { left: "82%", top: "34%", delay: "1.1s" },
  { left: "72%", top: "14%", delay: "1.9s" },
];

const backgroundThemes = [
  {
    id: "aurora",
    name: "Aurora Mesh",
    badge: "Aurora",
    hint: "Warm editorial gradients with slow ribbon motion.",
  },
  {
    id: "grid",
    name: "Orbital Grid",
    badge: "Grid",
    hint: "Sharper product feel with a moving signal grid.",
  },
  {
    id: "meteor",
    name: "Meteor Veil",
    badge: "Meteor",
    hint: "Deeper space look with controlled meteor trails.",
  },
] as const;

type BackgroundThemeId = (typeof backgroundThemes)[number]["id"];
const INTRO_NAME = "Chandhan Madapakula";
const SECTION_IDS = ["hero", "projects", "experience", "team", "contact"] as const;

type SectionId = (typeof SECTION_IDS)[number];

const stackShowcase = {
  name: "Radial Skill Radar",
  note: "Current strengths across product engineering, API systems, cloud delivery, and AI-ready workflows.",
};

const navItems = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
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

type TeamMember = {
  name: string;
  role: string;
  tag: string;
  image: string | StaticImageData;
  imagePosition?: string;
  mobileImagePosition?: string;
  bio: string;
  linkedin: string;
  email: string;
  namePalette: [string, string, string];
};

const teamMembers: TeamMember[] = [
  {
    name: "Chandhan M",
    role: "Frontend Engineer",
    tag: "Frontend Systems",
    image: chandhanPhoto,
    imagePosition: "center 16%",
    mobileImagePosition: "center 18%",
    bio: "Architects scalable frontend systems and builds polished, accessible interfaces with a strong focus on usability.",
    linkedin: "https://linkedin.com/in/chandhan-m",
    email: "chandhan@yourcompany.com",
    namePalette: ["#ffd166", "#ff7b7b", "#ff4d6d"],
  },
  {
    name: "Vishnu Y",
    role: "Full-Stack Developer",
    tag: "API Integrations",
    image: vishnuPhoto,
    imagePosition: "50% 12%",
    mobileImagePosition: "50% 14%",
    bio: "Delivers full-stack features with reliable backend services and smooth API integrations across product workflows.",
    linkedin: "https://linkedin.com/in/vishnu-y",
    email: "vishnu@yourcompany.com",
    namePalette: ["#7dd3fc", "#60a5fa", "#c084fc"],
  },
  {
    name: "Vivek M",
    role: "Full-Stack Developer",
    tag: "System Performance",
    image: vivekPhoto,
    imagePosition: "46% 14%",
    mobileImagePosition: "44% 16%",
    bio: "Focuses on performant full-stack systems, optimizing architecture, responsiveness, and production reliability.",
    linkedin: "https://linkedin.com/in/vivek-m",
    email: "vivek@yourcompany.com",
    namePalette: ["#86efac", "#facc15", "#fb7185"],
  },
  {
    name: "Sai M",
    role: "Data Engineer",
    tag: "Data Engineering",
    image: "https://i.pravatar.cc/640?img=32",
    bio: "Builds robust data pipelines and structures that support analytics, reporting, and decision-ready information.",
    linkedin: "https://linkedin.com/in/sai-m",
    email: "sai@yourcompany.com",
    namePalette: ["#f9a8d4", "#f472b6", "#c084fc"],
  },
  {
    name: "Abhishek M",
    role: "Cyber Security Engineer",
    tag: "Cybersecurity",
    image: abhishekPhoto,
    imagePosition: "32% 14%",
    mobileImagePosition: "30% 16%",
    bio: "Strengthens application security through threat analysis, secure engineering practices, and vulnerability awareness.",
    linkedin: "https://linkedin.com/in/abhishek-m",
    email: "abhishek@yourcompany.com",
    namePalette: ["#fde68a", "#f97316", "#ef4444"],
  },
  {
    name: "Shalini",
    role: "Quality Engineer",
    tag: "Quality Assurance",
    image: "https://i.pravatar.cc/640?img=25",
    bio: "Ensures product quality with disciplined testing, validation strategies, and an eye for release confidence.",
    linkedin: "https://linkedin.com/in/shalini",
    email: "shalini@yourcompany.com",
    namePalette: ["#a5f3fc", "#22d3ee", "#f0abfc"],
  },
];

const TEAM_CLONE = 3;
const extendedTeamMembers = [
  ...teamMembers.slice(-TEAM_CLONE),
  ...teamMembers,
  ...teamMembers.slice(0, TEAM_CLONE),
];

const getTeamImageSrc = (image: TeamMember["image"]) => (typeof image === "string" ? image : image.src);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function LogoToggle({
  currentTheme,
  onToggle,
  className = "",
}: {
  currentTheme: (typeof backgroundThemes)[number];
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`site-logo site-logo-toggle ${className}`.trim()}
      aria-label={`Switch background. Current background is ${currentTheme.name}`}
      title={`Switch background · ${currentTheme.name}`}
      onClick={onToggle}
    >
      <span className="logo-aura" aria-hidden="true" />
      <span className="logo-wordmark" data-text="CHANDU">CHANDU</span>
      <span className="logo-theme-tag" aria-hidden="true">{currentTheme.badge}</span>
    </button>
  );
}

function BackgroundStage({ activeThemeId }: { activeThemeId: BackgroundThemeId }) {
  return (
    <div className="background-stage pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="background-foundation" />
      <AnimatePresence mode="wait">
        {activeThemeId === "aurora" ? (
          <motion.div
            key="aurora"
            className="background-scene aurora-scene"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aurora-gradient" />
            <div className="aurora-ribbons" />
            {auroraOrbs.map((orb, index) => (
              <motion.span
                key={`aurora-orb-${index}`}
                className={`aurora-orb ${orb.className}`}
                style={{
                  width: orb.size,
                  height: orb.size,
                  top: orb.top,
                  right: orb.right,
                  bottom: orb.bottom,
                  left: orb.left,
                }}
                animate={{
                  x: [0, index % 2 === 0 ? 28 : -22, 0],
                  y: [0, index % 2 === 0 ? -18 : 20, 0],
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
            <div className="aurora-noise" />
          </motion.div>
        ) : null}

        {activeThemeId === "grid" ? (
          <motion.div
            key="grid"
            className="background-scene orbital-scene"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="orbital-glow orbital-glow-left" />
            <div className="orbital-glow orbital-glow-right" />
            <div className="orbital-grid-plane" />
            <div className="orbital-ring orbital-ring-one" />
            <div className="orbital-ring orbital-ring-two" />
            <div className="orbital-beam" />
            {orbitalNodes.map((node, index) => (
              <span
                key={`orbital-node-${index}`}
                className="orbital-node"
                style={{ ...node, "--node-delay": node.delay } as CSSProperties}
              />
            ))}
          </motion.div>
        ) : null}

        {activeThemeId === "meteor" ? (
          <motion.div
            key="meteor"
            className="background-scene meteor-scene"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="meteor-gradient" />
            <div className="meteor-nebula meteor-nebula-one" />
            <div className="meteor-nebula meteor-nebula-two" />
            <div className="meteor-starfield" />
            <div className="meteor-starfield meteor-starfield-secondary" />
            <div className="meteor-trails" aria-hidden="true">
              {meteorTrails.map((star, index) => (
                <span
                  key={`meteor-${index}`}
                  className="theme-star"
                  style={{
                    "--star-left": star.left,
                    "--star-top": star.top,
                    "--star-delay": star.delay,
                    "--star-duration": star.duration,
                  } as CSSProperties}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="background-vignette" />
    </div>
  );
}

export default function Home() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const audioAssetsRef = useRef<{
    sectionReveal: HTMLAudioElement;
  } | null>(null);
  const introTickPoolRef = useRef<HTMLAudioElement[]>([]);
  const introTickCursorRef = useRef(0);
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    hero: null,
    projects: null,
    experience: null,
    team: null,
    contact: null,
  });
  const revealedSectionsRef = useRef<Set<string>>(new Set());
  const soundEnabledRef = useRef(false);
  const scrollLockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [hasIntroStarted, setHasIntroStarted] = useState(false);
  const [introText, setIntroText] = useState("");
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [engagedSections, setEngagedSections] = useState<Record<SectionId, boolean>>({
    hero: true,
    projects: false,
    experience: false,
    team: false,
    contact: false,
  });
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
  const lastScrollYRef = useRef(0);
  const teamCarouselRef = useRef<HTMLDivElement | null>(null);
  const teamExtRef = useRef(TEAM_CLONE);
  const teamScrollTimerRef = useRef<number | null>(null);

  const activeBackground = backgroundThemes[activeBackgroundIndex];
  const activeSectionId = SECTION_IDS[activeSectionIndex];
  const isPageReady = !isIntroVisible;

  const cycleBackground = () => {
    setActiveBackgroundIndex((prev) => (prev + 1) % backgroundThemes.length);
  };

  const setSectionRef = (sectionId: SectionId) => (node: HTMLElement | null) => {
    sectionRefs.current[sectionId] = node;
  };

  const lockSectionScroll = (duration: number) => {
    scrollLockRef.current = true;
    window.setTimeout(() => {
      scrollLockRef.current = false;
    }, duration);
  };

  const navigateToSection = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= SECTION_IDS.length || nextIndex === activeSectionIndex) {
      return;
    }

    const nextSectionId = SECTION_IDS[nextIndex];
    sectionRefs.current[nextSectionId]?.scrollTo({ top: 0, behavior: "auto" });
    setActiveSectionIndex(nextIndex);
    window.history.replaceState(null, "", nextSectionId === "hero" ? window.location.pathname : `#${nextSectionId}`);
    lockSectionScroll(980);
  };

  const stepSectionEvent = useEffectEvent((direction: 1 | -1) => {
    if (!isPageReady || isMobileNavOpen || scrollLockRef.current) {
      return;
    }

    const currentSectionId = SECTION_IDS[activeSectionIndex];
    const currentSection = sectionRefs.current[currentSectionId];

    if (!engagedSections[currentSectionId]) {
      setEngagedSections((prev) => ({ ...prev, [currentSectionId]: true }));
      lockSectionScroll(760);
      return;
    }

    if (currentSection) {
      const maxScroll = currentSection.scrollHeight - currentSection.clientHeight;
      const stepAmount = Math.max(currentSection.clientHeight * 0.72, 220);

      if (direction > 0 && currentSection.scrollTop < maxScroll - 6) {
        currentSection.scrollTo({ top: Math.min(maxScroll, currentSection.scrollTop + stepAmount), behavior: "smooth" });
        lockSectionScroll(720);
        return;
      }

      if (direction < 0 && currentSection.scrollTop > 6) {
        currentSection.scrollTo({ top: Math.max(0, currentSection.scrollTop - stepAmount), behavior: "smooth" });
        lockSectionScroll(720);
        return;
      }
    }

    navigateToSection(activeSectionIndex + direction);
  });

  const triggerVibration = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const replayAudio = (audio: HTMLAudioElement | undefined | null) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  };

  const playTypingTick = () => {
    if (!soundEnabledRef.current) return;
    const pool = introTickPoolRef.current;
    if (pool.length === 0) return;
    const audio = pool[introTickCursorRef.current % pool.length];
    introTickCursorRef.current += 1;
    replayAudio(audio);
    triggerVibration(8);
  };

  const playSectionRevealSound = () => {
    if (!soundEnabledRef.current) return;
    replayAudio(audioAssetsRef.current?.sectionReveal);
    triggerVibration(12);
  };

  const handleEnableSound = async () => {
    soundEnabledRef.current = true;
    setIsSoundEnabled(true);
    setHasIntroStarted(true);
  };

  const handleStartWithoutSound = () => {
    soundEnabledRef.current = false;
    setIsSoundEnabled(false);
    setHasIntroStarted(true);
  };

  const playTypingTickEvent = useEffectEvent(() => {
    playTypingTick();
  });

  const playSectionRevealSoundEvent = useEffectEvent(() => {
    playSectionRevealSound();
  });

  useEffect(() => {
    soundEnabledRef.current = isSoundEnabled;
  }, [isSoundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sectionReveal = new Audio("/sounds/section-reveal.wav");
    sectionReveal.preload = "auto";
    sectionReveal.volume = 0.28;

    const tickPool = Array.from({ length: 4 }, () => {
      const audio = new Audio("/sounds/intro-tick.wav");
      audio.preload = "auto";
      audio.volume = 0.16;
      return audio;
    });

    audioAssetsRef.current = { sectionReveal };
    introTickPoolRef.current = tickPool;

    return () => {
      sectionReveal.pause();
      tickPool.forEach((audio) => audio.pause());
      audioAssetsRef.current = null;
      introTickPoolRef.current = [];
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (shellRef.current) {
        const cappedScroll = Math.min(currentScrollY, 1800);
        shellRef.current.style.setProperty("--scroll-shift", `${cappedScroll * -0.06}px`);
        shellRef.current.style.setProperty("--scroll-drift", `${cappedScroll * 0.045}px`);
        shellRef.current.style.setProperty("--scroll-tilt", `${cappedScroll * 0.012}deg`);
        shellRef.current.style.setProperty("--scroll-fade", `${Math.max(0.34, 1 - cappedScroll / 2000)}`);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSectionIndex]);

  useEffect(() => {
    if (!isPageReady) {
      return;
    }

    const shellNode = shellRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return;
      event.preventDefault();
      stepSectionEvent(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        stepSectionEvent(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        stepSectionEvent(-1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - endY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < 42) return;
      stepSectionEvent(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    shellNode?.addEventListener("touchstart", handleTouchStart, { passive: true });
    shellNode?.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      shellNode?.removeEventListener("touchstart", handleTouchStart);
      shellNode?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPageReady, isMobileNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileNavOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!hasIntroStarted) {
      return;
    }

    let typingTimer: number | null = null;
    let finishTimer: number | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktopViewport = window.matchMedia("(min-width: 1024px)").matches;
    const typingInterval = isDesktopViewport ? 106 : 74;
    const completionPause = isDesktopViewport ? 2200 : 1100;
    const reducedMotionPause = isDesktopViewport ? 1100 : 700;

    if (reducedMotion) {
      setIntroText(INTRO_NAME);
      finishTimer = window.setTimeout(() => setIsIntroVisible(false), reducedMotionPause);
      return () => {
        if (finishTimer !== null) window.clearTimeout(finishTimer);
      };
    }

    let characterIndex = 0;
    typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setIntroText(INTRO_NAME.slice(0, characterIndex));
      playTypingTickEvent();

      if (characterIndex >= INTRO_NAME.length && typingTimer !== null) {
        window.clearInterval(typingTimer);
        typingTimer = null;
        finishTimer = window.setTimeout(() => setIsIntroVisible(false), completionPause);
      }
    }, typingInterval);

    return () => {
      if (typingTimer !== null) window.clearInterval(typingTimer);
      if (finishTimer !== null) window.clearTimeout(finishTimer);
    };
  }, [hasIntroStarted]);

  useEffect(() => {
    if (!isPageReady) {
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"));
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          const sectionKey = target.id || target.dataset.section || target.className;
          if (revealedSectionsRef.current.has(sectionKey)) {
            return;
          }

          revealedSectionsRef.current.add(sectionKey);
          playSectionRevealSoundEvent();
        });
      },
      {
        threshold: 0.55,
      },
    );

    sections.forEach((section, index) => {
      section.dataset.section = `section-${index}`;
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [isPageReady, isSoundEnabled]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isIntroVisible, isMobileNavOpen]);

  useEffect(() => {
    if (isIntroVisible) {
      return;
    }

    if (!isMobileNavOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileNavOpen, isIntroVisible]);

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

  const selectedCountry = COUNTRIES.find((country) => country.code === phoneCountryCode) ?? null;

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

  const handleSmoothNav = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();

    const nextIndex = SECTION_IDS.indexOf(targetId as SectionId);
    if (nextIndex !== -1) {
      navigateToSection(nextIndex);
    }

    setIsMobileNavOpen(false);
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

  const getSectionClassName = (sectionId: SectionId, extraClassName = "") => (
    `page-section ${activeSectionId === sectionId ? "is-active" : ""} ${engagedSections[sectionId] ? "is-engaged" : ""} ${extraClassName}`.trim()
  );

  return (
    <div
      ref={shellRef}
      className="theme-shell relative isolate min-h-screen overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10"
      data-bg-theme={activeBackground.id}
    >
      <BackgroundStage activeThemeId={activeBackground.id} />

      <AnimatePresence>
        {isIntroVisible ? (
          <motion.div
            key="intro-overlay"
            className="intro-overlay fixed inset-0 z-[120] flex items-center justify-center px-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="intro-panel w-full max-w-6xl text-center"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.015, y: -12, filter: "blur(12px)" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              {!hasIntroStarted ? (
                <div className="intro-sound-row">
                  <p className="intro-kicker">Premium Intro</p>
                  <p className="intro-sound-note">Enable sound to hear the typing haptics and premium section reveal cues before the name animation begins.</p>
                  <div className="intro-actions">
                    <button type="button" className="sound-toggle-btn" onClick={() => void handleEnableSound()}>
                      Enable Premium Sound
                    </button>
                    <button type="button" className="sound-toggle-btn is-secondary" onClick={handleStartWithoutSound}>
                      Continue Silently
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="intro-kicker">Portfolio Opening</p>
                  <motion.h1
                    className="intro-name"
                    exit={{ clipPath: "inset(0 100% 0 0)", filter: "blur(12px)", opacity: 0.12 }}
                    transition={{ duration: 0.86, ease: [0.4, 0, 1, 1] }}
                  >
                    {introText}
                    <span className="intro-caret" aria-hidden="true" />
                  </motion.h1>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={`transition-[opacity,filter,transform] duration-[950ms] ${isPageReady ? "opacity-100 blur-0 translate-y-0" : "pointer-events-none opacity-0 blur-sm translate-y-4"}`}>

      <button
        type="button"
        className={`mobile-nav-toggle ${isMobileNavOpen ? "is-open" : ""} is-visible`}
        aria-label={isMobileNavOpen ? "Hide navigation" : "Show navigation"}
        aria-expanded={isMobileNavOpen}
        aria-controls="mobile-site-nav"
        onClick={() => setIsMobileNavOpen((prev) => !prev)}
      >
        <span className="mobile-nav-toggle-label">C</span>
      </button>

      <div
        className={`mobile-nav-backdrop ${isMobileNavOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileNavOpen}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <div
        id="mobile-site-nav"
        className={`mobile-nav-panel ${isMobileNavOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileNavOpen}
      >
        <div className="mobile-nav-panel-inner">
          <div className="mobile-nav-header">
            <LogoToggle currentTheme={activeBackground} onToggle={cycleBackground} className="mobile-site-logo" />
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className="nav-link mobile-nav-link"
                href={`#${item.id}`}
                onClick={(event) => handleSmoothNav(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <header className="site-header is-scrolled">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4 sm:gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <LogoToggle currentTheme={activeBackground} onToggle={cycleBackground} />

          <div className="scrollbar-none -mx-1 flex w-full items-center gap-2 overflow-x-auto px-1 pb-1 text-sm sm:mx-0 sm:w-auto sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0 lg:pb-0">
          {navItems.map((item) => (
            <a key={item.id} className="nav-link" href={`#${item.id}`} onClick={(event) => handleSmoothNav(event, item.id)}>
              {item.label}
            </a>
          ))}
        </div>
        </div>
        </div>
      </header>

      <div className="site-viewport">
      <main
        className="site-main relative z-30 mx-auto flex w-full max-w-6xl flex-col gap-0"
        style={{ transform: `translate3d(0, calc(-${activeSectionIndex} * var(--page-step-height)), 0)` }}
      >
        <section
          id="hero"
          ref={setSectionRef("hero")}
          className={getSectionClassName("hero", "hero-section grid gap-8 pb-2 pt-6 sm:gap-10 sm:pt-10 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:gap-12")}
        >
          <div className="section-stage section-stage-primary">
          <motion.div
            initial={{ opacity: 0, x: -48, y: 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <p className="eyebrow">
                <Sparkles size={14} />
                Open For Opportunities
              </p>
              <p className="theme-pill">
                {activeBackground.name}
                <span className="theme-pill-divider" aria-hidden="true" />
                Tap the logo to switch
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -72 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-balance font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              I build polished digital products that ship fast and feel premium.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 56 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.62, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 lg:text-lg"
            >
              Full-stack engineer focused on modern web architecture, product thinking, and performance-first execution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a className="btn-primary w-full justify-center sm:w-auto" href="#projects">
                View Work
                <ArrowUpRight size={16} />
              </a>
              <a className="btn-secondary w-full justify-center sm:w-auto" href="#contact">
                Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>
          </div>

          <div className="section-stage section-stage-secondary">
          <motion.aside
            initial={{ opacity: 0, x: 64, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="card stack-lab md:self-stretch"
          >
            <div className="stack-lab-head">
              <div>
                <p className="text-dim text-xs uppercase tracking-[0.16em]">Stack Lab</p>
                <h3 className="font-display text-xl sm:text-2xl">{stackShowcase.name}</h3>
                <p className="text-soft mt-1 text-sm">{stackShowcase.note}</p>
              </div>
            </div>

            <div className="stack-scene model-radial-radar">
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
            </div>

            <div className="section-divider pt-5">
              <p className="text-muted text-sm">Based in India · Available remotely worldwide</p>
            </div>
          </motion.aside>
          </div>
        </section>

        <section id="projects" ref={setSectionRef("projects")} className={getSectionClassName("projects", "space-y-4 sm:space-y-6")}>
          <div className="section-stage section-stage-primary space-y-2">
            <p className="text-dim text-xs font-semibold uppercase tracking-[0.18em]">Some Of My Work</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Featured Websites & Products</h2>
            <p className="text-muted max-w-3xl text-[0.92rem] leading-6 sm:text-base">
              Explore projects the way users experience them: as products you can click, browse, and evaluate in a visual grid.
            </p>
          </div>

          <div className="section-stage section-stage-secondary grid gap-3.5 sm:gap-5 md:grid-cols-2 xl:grid-cols-6">
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

        <section id="experience" ref={setSectionRef("experience")} className={getSectionClassName("experience", "space-y-5 sm:space-y-6")}>
          <h2 className="section-stage section-stage-primary font-display text-2xl sm:text-3xl lg:text-4xl">Experience</h2>
          <div className="section-stage section-stage-secondary experience-timeline">
            <div className="experience-line" aria-hidden="true" />
            {experience.map((item, index) => (
              <motion.article
                key={item.role + item.period}
                initial={{ opacity: 0, x: index % 2 === 0 ? -72 : 72, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className={`experience-row ${index % 2 === 0 ? "is-left" : "is-right"}`}
              >
                <div className="experience-col">
                  <div className="card experience-card overflow-hidden">
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
                    <p className="text-muted mb-1 text-sm font-semibold">{item.company}</p>
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
                  </div>
                </div>

                <div className="experience-marker" aria-hidden="true">
                  <span>{(item as { companyShort?: string }).companyShort ?? item.company.slice(0, 3).toUpperCase()}</span>
                </div>

                <div className="experience-col experience-date-col">
                  <p className="text-dim text-xs uppercase tracking-[0.12em]">{item.period}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="team" ref={setSectionRef("team")} className={getSectionClassName("team", "space-y-5 sm:space-y-6")}>
          <div className="section-stage section-stage-primary space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">Our Team</h2>
            <p className="text-muted max-w-3xl text-sm leading-6 sm:text-base">
              Meet the people behind our product delivery. Hover on each profile card to view details and contact options.
            </p>
          </div>

          <div className="section-stage section-stage-secondary team-controls" aria-label="Team carousel controls">
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

          <div ref={teamCarouselRef} className="section-stage section-stage-tertiary team-carousel scrollbar-none" aria-label="Team profiles carousel">
            {extendedTeamMembers.map((member, i) => (
              <article
                key={`team-ext-${i}`}
                className="team-card"
                style={{
                  "--team-name-start": member.namePalette[0],
                  "--team-name-mid": member.namePalette[1],
                  "--team-name-end": member.namePalette[2],
                  "--team-photo-position": member.imagePosition ?? "center 20%",
                  "--team-photo-position-mobile": member.mobileImagePosition ?? member.imagePosition ?? "left center",
                } as React.CSSProperties}
              >
                <div className="team-card-media">
                  <Image
                    src={getTeamImageSrc(member.image)}
                    alt={`${member.name} profile photo`}
                    fill
                    sizes="(max-width: 767px) 36vw, 240px"
                    className="team-photo"
                    priority={i < TEAM_CLONE + 2}
                  />
                </div>

                <div className="team-card-content">
                  <div className="space-y-3 text-left">
                    <h3 className="team-name text-lg sm:text-xl">{member.name}</h3>
                    <p className="text-muted text-sm">{member.role}</p>
                    <span className="team-tag">{member.tag}</span>
                    <p className="team-bio text-soft text-sm leading-6">{member.bio}</p>
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
              </article>
            ))}
          </div>
        </section>

        <section id="contact" ref={setSectionRef("contact")} className={getSectionClassName("contact", "card space-y-6 sm:space-y-8")}>
          <div className="section-stage section-stage-primary flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
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

          <form onSubmit={handleSubmit} className="section-stage section-stage-secondary grid gap-4 sm:gap-5">
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
      </div>
    </div>
  );
}
