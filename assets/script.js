const portfolioProjects = [
  {
    title: "팀 협업 대시보드 리디자인",
    role: "Frontend Lead",
    summary:
      "복잡한 데이터 흐름을 카드 중심 인터페이스로 재구성해 탐색 시간을 줄이고, 핵심 액션의 도달률을 높인 프로젝트입니다.",
    stack: ["React", "TypeScript", "Chart UI"],
    links: [
      { label: "Case Study", href: "https://example.com/case-study-1" },
      { label: "GitHub", href: "https://github.com/your-name/project-one" },
    ],
  },
  {
    title: "이커머스 주문 플로우 개선",
    role: "UI Engineer",
    summary:
      "체크아웃 단계를 단순화하고 상태 피드백을 명확하게 설계해 이탈 구간을 줄이는 데 집중한 개선 작업입니다.",
    stack: ["JavaScript", "Accessibility", "A/B Test"],
    links: [
      { label: "Preview", href: "https://example.com/project-two" },
      { label: "GitHub", href: "https://github.com/your-name/project-two" },
    ],
  },
  {
    title: "디자인 시스템 스타터 구축",
    role: "Design System",
    summary:
      "반복되는 화면 제작 비용을 줄이기 위해 토큰, 공통 컴포넌트, 문서화 흐름을 정리한 내부 기반 작업입니다.",
    stack: ["Tokens", "Component Docs", "CSS"],
    links: [
      { label: "Docs", href: "https://example.com/design-system" },
      { label: "GitHub", href: "https://github.com/your-name/project-three" },
    ],
  },
];

const contactChannels = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    newTab: false,
  },
  {
    label: "GitHub",
    value: "github.com/your-name",
    href: "https://github.com/your-name",
    newTab: true,
  },
  {
    label: "Blog",
    value: "blog.example.com",
    href: "https://blog.example.com",
    newTab: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-name",
    href: "https://www.linkedin.com/in/your-name",
    newTab: true,
  },
];

const projectList = document.querySelector("#project-list");
const contactList = document.querySelector("#contact-list");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("main section[id]");
function renderProjects() {
  if (!projectList) return;

  projectList.innerHTML = portfolioProjects
    .map(
      (project) => `
        <article class="project-card reveal">
          <p class="project-role">${project.role}</p>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-meta">
            ${project.stack.map((item) => `<span>${item}</span>`).join("")}
          </div>
          <div class="project-links">
            ${project.links
              .map(
                (link) =>
                  `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderContacts() {
  if (!contactList) return;

  contactList.innerHTML = contactChannels
    .map(
      (channel) => `
        <a
          class="contact-link"
          href="${channel.href}"
          ${channel.newTab ? 'target="_blank" rel="noreferrer"' : ""}
        >
          <div>
            <strong>${channel.label}</strong>
            <span>${channel.value}</span>
          </div>
        </a>
      `
    )
    .join("");
}

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "메뉴 열기");
  siteNav.classList.remove("is-open");
}

function setupMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", !isExpanded ? "메뉴 닫기" : "메뉴 열기");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720) {
      closeMenu();
    }
  });
}

function setupActiveSection() {
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupReveal() {
  const targets = document.querySelectorAll(".reveal");

  if (!targets.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  targets.forEach((target) => observer.observe(target));
}

renderProjects();
renderContacts();
setupMenu();
setupActiveSection();
setupReveal();
