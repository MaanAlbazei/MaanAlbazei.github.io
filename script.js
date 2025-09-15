// ==============================
// Helpers & Globals
// ==============================
const root = document.documentElement; // Use :root for theming
const bodyEl = document.body;

// Dark mode only - no theme switching
const initTheme = () => {
  root.setAttribute('data-theme', 'dark');
  // Hide theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.display = 'none';
  }
};

// rAF throttle for scroll
let rafId = null;
const onScroll = (fn) => {
  const handler = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn();
      rafId = null;
    });
  };
  window.addEventListener('scroll', handler, { passive: true });
};

// Respect reduced motion
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==============================
// Mobile Navigation Toggle
// ==============================
(() => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach((n) =>
    n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    })
  );
})();

// ==============================
// Smooth Scrolling for hash links
// ==============================
(() => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return; // allow normal behavior if not found
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });
})();

// ==============================
// Navbar background & shadow on scroll (theme-aware)
// ==============================
(() => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    const past = window.scrollY > 50;

    if (past) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  // Initial + listen
  updateNavbar();
  onScroll(updateNavbar);

  // Recompute when theme changes (from our toggle)
  window.addEventListener('themechange', updateNavbar);
})();

// ==============================
// Scroll reveal animations
// ==============================
(() => {
  const opts = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  }, opts);

  // Observe elements
  const animateEls = document.querySelectorAll(
    '.project-card, .skill-item, .timeline-item, .about-text, .about-stats, .cert-card, .language-item'
  );
  animateEls.forEach((el) => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
})();

// ==============================
// Initialize hero title on load
// ==============================
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = 'Hi, I\'m <span class="highlight">Maan Albazei</span>';
  }
});

// ==============================
// Contact form (client-side validation + UX only)
// ==============================
(() => {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const name = fd.get('name')?.trim();
    const email = fd.get('email')?.trim();
    const subject = fd.get('subject')?.trim();
    const message = fd.get('message')?.trim();

    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // If using Formspree/EmailJS, submit here. For now, UX only:
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  });
})();

// ==============================
// Notification system (CSS vars aware)
// ==============================
function showNotification(message, type = 'info') {
  // Remove existing
  document.querySelectorAll('.notification').forEach((n) => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close">&times;</button>
    </div>
  `;

  // Use CSS variables where possible
  const color =
    type === 'success'
      ? '#10b981'
      : type === 'error'
      ? '#ef4444'
      : getComputedStyle(root).getPropertyValue('--brand-primary') || '#6366f1';

  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: color.trim(),
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    zIndex: 10000,
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease',
  });

  document.body.appendChild(notification);

  const remove = () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 280);
  };

  setTimeout(remove, 5000);

  notification.querySelector('.notification-close')?.addEventListener('click', remove);
}

// Inject one-time keyframes (idempotent)
(() => {
  if (document.getElementById('notif-anim')) return;
  const style = document.createElement('style');
  style.id = 'notif-anim';
  style.textContent = `
    @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    .nav-link.active { color: var(--brand-primary) !important; }
    .nav-link.active::after { width: 100% !important; }
    body { opacity: 0; transition: opacity 0.5s ease; }
    body.loaded { opacity: 1; }
  `;
  document.head.appendChild(style);
})();

// ==============================
// Parallax effect for hero (rAF + reduced-motion)
// ==============================
(() => {
  const hero = document.querySelector('.hero');
  if (!hero || reduceMotion) return;

  hero.style.willChange = 'transform';
  const update = () => {
    const rate = window.pageYOffset * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  };
  onScroll(update);
  update();
})();

// ==============================
// Skills animation on scroll (stagger)
// ==============================
(() => {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;

  const skillItems = skillsSection.querySelectorAll('.skill-item');
  skillItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = reduceMotion ? 'none' : 'all 0.6s ease';
  });

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        skillItems.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, reduceMotion ? 0 : i * 100);
        });
      });
    },
    { threshold: 0.1 }
  );

  skillsObserver.observe(skillsSection);
})();

// ==============================
// Project cards hover effect (CSS class for GPU accel)
// ==============================
(() => {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.style.willChange = 'transform';
    card.addEventListener('mouseenter', () => card.classList.add('card-hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('card-hover'));
  });

  // style once
  if (!document.getElementById('card-hover-style')) {
    const st = document.createElement('style');
    st.id = 'card-hover-style';
    st.textContent = `
      .project-card { transition: transform 200ms cubic-bezier(.2,.8,.2,1); }
      .project-card.card-hover { transform: translateY(-10px) scale(1.02); }
    `;
    document.head.appendChild(st);
  }
})();

// ==============================
// Active navigation link highlighting
// ==============================
(() => {
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  if (!sections.length || !navLinks.length) return;

  const updateActive = () => {
    const scrollPos = window.scrollY + 210; // account for fixed navbar + padding
    let current = '';
    for (const sec of sections) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.id;
        break;
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  updateActive();
  onScroll(updateActive);
})();

// ==============================
// Loading fade-in
// ==============================
window.addEventListener('load', () => {
  bodyEl.classList.add('loaded');
  initTheme(); // Initialize theme on load
});


// ==============================
// Photo Modal (with null checks)
// ==============================
(() => {
  const profileImage = document.querySelector('.profile-image');
  const photoModal = document.getElementById('photoModal');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalClose = document.querySelector('.photo-modal-close');

  if (!photoModal) return;

  if (profileImage) {
    profileImage.addEventListener('click', () => {
      photoModal.classList.add('show');
      bodyEl.style.overflow = 'hidden';
      // If you want to set modal image src dynamically, do it here:
      // if (modalPhoto) modalPhoto.src = profileImage.src;
    });
  }

  const closeModal = () => {
    photoModal.classList.remove('show');
    bodyEl.style.overflow = 'auto';
  };

  modalClose?.addEventListener('click', closeModal);
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal.classList.contains('show')) closeModal();
  });
})();

// ==============================
// Theme Toggle Event Listener (Disabled - Dark Mode Only)
// ==============================
// Theme toggle is disabled - portfolio is dark mode only

// ==============================
// Chatbot Functionality
// ==============================
(() => {
  const chatbotModal = document.getElementById('chatbotModal');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotToggleMobile = document.getElementById('chatbotToggleMobile');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotMessages = document.getElementById('chatbotMessages');

  if (!chatbotModal || (!chatbotToggle && !chatbotToggleMobile)) return;

  // Maan's information for the chatbot
  const maanInfo = {
    name: "Maan Albazei",
    title: "Senior Computer Science Student",
    university: "Prince Sultan University",
    graduation: "July 2026",
    email: "MaanAlbazei@gmail.com",
    phone: "+966 55 522 3910",
    location: "Riyadh, Saudi Arabia",
    languages: ["Arabic (Native)", "English (Fluent)"],
    skills: {
      programming: ["Python", "Java", "JavaScript", "SQL"],
      frameworks: ["Hadoop", "TensorFlow", "PyTorch", "Scikit-learn"],
      tools: ["Jira", "Linux", "UML Diagrams", "Project Management"],
      technologies: ["AI & Machine Learning", "Cloud Computing", "Security Governance", "Digital Transformation"]
    },
    experience: [
      {
        title: "Trainee | Operation Supervisor",
        company: "Sela, Boulevard Operations",
        period: "October 2022 - February 2023",
        description: "Operated fountain system achieving synchronized shows with technical teams. Supervised site operations and ensured smooth coordination across multiple service providers."
      }
    ],
    certifications: [
      "Foundations of AI and Machine Learning (Microsoft)",
      "JavaScript 103 Advanced (Tuwaiq Academy)",
      "Fundamentals of Project Management (Coursera)",
      "Parallel Programming in Java (Coursera)",
      "Security Governance & Compliance (Coursera)",
      "Ethics, Technology and Engineering (Coursera)",
      "Introducing Security: Aligning Asset and Risk Management (Coursera)",
      "EC English Certificate (Los Angeles, USA)"
    ],
    social: {
      github: "https://github.com/MaanAlbazei",
      linkedin: "https://www.linkedin.com/in/maanalbazei",
      whatsapp: "https://wa.me/966555223910"
    }
  };

  // Chatbot responses
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm Maan's AI assistant. I can tell you about his skills, experience, education, and projects. What would you like to know?`;
    }
    
    // About Maan
    if (message.includes('about') || message.includes('who is') || message.includes('tell me about')) {
      return `Maan Albazei is a Senior Computer Science Student at Prince Sultan University, expected to graduate in July 2026. He's passionate about AI, Machine Learning, and Cloud Computing. He has completed 8+ professional courses and has experience in both technical and operational roles.`;
    }
    
    // Skills
    if (message.includes('skill') || message.includes('programming') || message.includes('technology')) {
      return `Maan's technical skills include:
      • Programming: ${maanInfo.skills.programming.join(', ')}
      • Frameworks: ${maanInfo.skills.frameworks.join(', ')}
      • Tools: ${maanInfo.skills.tools.join(', ')}
      • Technologies: ${maanInfo.skills.technologies.join(', ')}`;
    }
    
    // Education
    if (message.includes('education') || message.includes('university') || message.includes('degree')) {
      return `Maan is pursuing a Bachelor of Science in Computer Science at Prince Sultan University (January 2020 - July 2026). His coursework includes Data Structures & Algorithms, Database Systems, Software Engineering, Machine Learning, Computer Networks, Security Governance, and Project Management.`;
    }
    
    // Experience
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return `Maan's work experience includes:
      • ${maanInfo.experience[0].title} at ${maanInfo.experience[0].company} (${maanInfo.experience[0].period})
      • ${maanInfo.experience[0].description}`;
    }
    
    // Certifications
    if (message.includes('certification') || message.includes('course') || message.includes('certificate')) {
      return `Maan has completed these professional certifications:
      • ${maanInfo.certifications.slice(0, 4).join('\n• ')}
      • And ${maanInfo.certifications.length - 4} more courses!`;
    }
    
    // Contact
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
      return `You can contact Maan through:
      • Email: ${maanInfo.email}
      • Phone: ${maanInfo.phone}
      • Location: ${maanInfo.location}
      • GitHub: ${maanInfo.social.github}
      • LinkedIn: ${maanInfo.social.linkedin}
      • WhatsApp: ${maanInfo.social.whatsapp}`;
    }
    
    // Languages
    if (message.includes('language') || message.includes('speak')) {
      return `Maan speaks:
      • ${maanInfo.languages[0]}
      • ${maanInfo.languages[1]}`;
    }
    
    // Projects (placeholder)
    if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return `Maan is currently working on various projects as part of his Computer Science studies. His focus areas include AI/ML applications, cloud computing solutions, and software development projects. You can check out his GitHub profile for more details: ${maanInfo.social.github}`;
    }
    
    // Default response
    return `I'm not sure I understand that question. I can help you learn about Maan's skills, education, experience, certifications, or contact information. What would you like to know?`;
  };

  // Add message to chat
  const addMessage = (message, isUser = false) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  // Send message
  const sendMessage = () => {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Disable input while processing
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;
    
    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response);
      
      // Re-enable input
      chatbotInput.disabled = false;
      chatbotSend.disabled = false;
      chatbotInput.focus();
    }, 1000);
  };

  // Event listeners
  // Desktop chatbot toggle
  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      chatbotModal.classList.add('show');
      bodyEl.style.overflow = 'hidden';
      chatbotInput.focus();
    });
  }

  // Mobile chatbot toggle
  if (chatbotToggleMobile) {
    chatbotToggleMobile.addEventListener('click', () => {
      chatbotModal.classList.add('show');
      bodyEl.style.overflow = 'hidden';
      chatbotInput.focus();
      // Close mobile menu when opening chatbot
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  chatbotClose.addEventListener('click', () => {
    chatbotModal.classList.remove('show');
    bodyEl.style.overflow = 'auto';
  });

  chatbotSend.addEventListener('click', sendMessage);

  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Close on outside click
  chatbotModal.addEventListener('click', (e) => {
    if (e.target === chatbotModal) {
      chatbotModal.classList.remove('show');
      bodyEl.style.overflow = 'auto';
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatbotModal.classList.contains('show')) {
      chatbotModal.classList.remove('show');
      bodyEl.style.overflow = 'auto';
    }
  });
})();

// ==============================
// Console welcome
// ==============================
console.log(`
 Welcome to Maan Albazei's Portfolio!
 Contact: MaanAlbazei@gmail.com
 GitHub: https://github.com/MaanAlbazei
 LinkedIn: https://www.linkedin.com/in/maanalbazei
 WhatsApp: +966 555 223 910
`);

// ==============================
// Easter egg — Konami Code
// ==============================
(() => {
  let buf = [];
  const seq = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
  document.addEventListener('keydown', (e) => {
    buf.push(e.keyCode);
    if (buf.length > seq.length) buf.shift();
    if (buf.join(',') === seq.join(',')) {
      showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow { from { filter:hue-rotate(0);} to { filter:hue-rotate(360deg);} }
      `;
      document.head.appendChild(style);
      document.body.style.animation = reduceMotion ? '' : 'rainbow 2s linear infinite';
      setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
      }, 5000);
      buf = [];
    }
  });
})();
