// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "dark"
    this.themeToggle = document.getElementById("theme-toggle")
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.themeToggle.addEventListener("click", () => this.toggleTheme())
  }

  setTheme(theme) {
    this.theme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    // Update theme toggle icon
    this.themeToggle.textContent = theme === "dark" ? "🌙" : "☀️"
  }

  toggleTheme() {
    const newTheme = this.theme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link")
    this.sections = document.querySelectorAll("section")
    this.activeSection = "home"
    this.indicator = document.querySelector(".nav-indicator")
    this.init()
  }

  init() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const section = e.target.getAttribute("data-section")
        this.scrollToSection(section)
      })
    })

    // Hero buttons
    document.querySelectorAll(".hero-buttons .btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const section = e.target.getAttribute("data-section")
        if (section) this.scrollToSection(section)
      })
    })

    // Intersection Observer for active section
    this.observeSections()

    this.updateIndicator()
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      this.setActiveSection(sectionId)
    }
  }

  setActiveSection(sectionId) {
    this.activeSection = sectionId
    this.navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active")
      }
    })
    this.updateIndicator()
  }

  updateIndicator() {
    const activeLink = document.querySelector(".nav-link.active")
    if (activeLink && this.indicator) {
      const linkRect = activeLink.getBoundingClientRect()
      const menuRect = activeLink.parentElement.getBoundingClientRect()

      const left = linkRect.left - menuRect.left
      const width = linkRect.width

      this.indicator.style.left = `${left}px`
      this.indicator.style.width = `${width}px`
      this.indicator.style.opacity = "1"

      // Force reflow to ensure smooth animation
      this.indicator.offsetHeight
    }
  }

  observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            console.log(`Section detected: ${entry.target.id}`) // Debug logging
            this.setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-80px 0px -80px 0px", // Less restrictive margins
      },
    )

    this.sections.forEach((section) => {
      if (section.id) {
        console.log(`Observing section: ${section.id}`) // Debug logging
        observer.observe(section)
      }
    })
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.observeElements()
    this.animateSkillBars()
  }

  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const elementsToAnimate = document.querySelectorAll(
      ".about-card, .skills-card, .project-card, .experience-card, .leadership-card, .education-item, .contact-card, .fade-in",
    )

    elementsToAnimate.forEach((el) => observer.observe(el))
  }

  animateSkillBars() {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll(".skill-progress")
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                const width = bar.getAttribute("data-width")
                bar.style.width = width + "%"
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll(".skills-card").forEach((card) => {
      skillObserver.observe(card)
    })
  }
}

class ProjectFilterManager {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn")
    this.projectCards = document.querySelectorAll(".project-card")
    this.activeFilter = "all"
    this.init()
  }

  init() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filter = e.target.textContent.toLowerCase().replace(/[^a-z]/g, "")
        this.setFilter(filter, e.target)
      })
    })
  }

  setFilter(filter, buttonElement) {
    this.activeFilter = filter

    // Update active button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"))
    buttonElement.classList.add("active")

    // Filter projects with animation
    this.projectCards.forEach((card, index) => {
      const category = card.getAttribute("data-category")
      const shouldShow =
        filter === "all" ||
        category === filter ||
        (filter === "aiml" && category === "ai-ml") ||
        (filter === "webdevelopment" && category === "web-dev") ||
        (filter === "socialimpact" && category === "social")

      if (shouldShow) {
        card.style.display = "block"
        setTimeout(() => {
          card.classList.add("animate")
        }, index * 100)
      } else {
        card.classList.remove("animate")
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    console.log("[v1] Starting contact form setup...")

    if (!window.emailjs) {
      console.error("[v1] EmailJS library not loaded!")
      return
    }

    try {
      window.emailjs.init("n_73_aFC6XgE66wLx")
      console.log("[v1] EmailJS initialized successfully")
    } catch (err) {
      console.error("[v1] EmailJS init failed:", err)
      return
    }

    this.form =
      document.getElementById("contactForm") ||
      document.querySelector(".contact-form")

    console.log("[v1] Form found:", !!this.form)

    if (this.form) {
      this.setupForm()
    } else {
      console.error("[v1] No contact form found!")
    }
  }

  setupForm() {
    console.log("[v1] Setting up form with real EmailJS...")

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(this.form)
      const templateParams = {
        from_name: formData.get("name") || "",
        from_email: formData.get("email") || "",
        subject: formData.get("subject") || "",
        message: formData.get("message") || "",
      }

      // Basic validation
      if (
        !templateParams.from_name ||
        !templateParams.from_email ||
        !templateParams.subject ||
        !templateParams.message
      ) {
        this.showErrorMessage("Please fill in all fields.")
        return
      }

      console.log("[v1] Sending email with params:", templateParams)

      // Show loading state
      const submitBtn = this.form.querySelector('button[type="submit"]')
      let originalText = "Send"
      if (submitBtn) {
        originalText = submitBtn.textContent
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true
      }

      try {
        const response = await window.emailjs.send(
          "service_36n9mfm",
          "template_viukehs",
          templateParams
        )
        console.log("[v1] Email sent successfully:", response)
        this.showSuccessMessage("Message sent successfully to Amina's email!")
        this.form.reset()
      } catch (error) {
        console.error("[v1] EmailJS Error:", error)
        this.showErrorMessage(
          `Failed to send message: ${error.text || error.message || error}`
        )
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }
      }
    })
  }

  showSuccessMessage(message) {
    const successDiv = document.createElement("div")
    successDiv.innerHTML = `✅ ${message}`
    successDiv.style.cssText = `
      background: #22c55e;
      color: white;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      text-align: center;
    `

    const existing = this.form.parentNode.querySelector(".form-message")
    if (existing) existing.remove()

    successDiv.className = "form-message"
    this.form.parentNode.insertBefore(successDiv, this.form.nextSibling)

    setTimeout(() => successDiv.remove(), 5000)
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement("div")
    errorDiv.innerHTML = `❌ ${message}`
    errorDiv.style.cssText = `
      background: #ef4444;
      color: white;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      text-align: center;
    `

    const existing = this.form.parentNode.querySelector(".form-message")
    if (existing) existing.remove()

    errorDiv.className = "form-message"
    this.form.parentNode.insertBefore(errorDiv, this.form.nextSibling)

    setTimeout(() => errorDiv.remove(), 5000)
  }
}
// ...existing code...

// Smooth Scroll Enhancement
class SmoothScrollManager {
  constructor() {
    this.init()
  }

  init() {
    // Enhanced smooth scrolling for all internal links
    document.addEventListener("click", (e) => {
      const target = e.target.closest('a[href^="#"], button[data-section]')
      if (target) {
        e.preventDefault()
        const sectionId = target.getAttribute("href")?.substring(1) || target.getAttribute("data-section")
        if (sectionId) {
          this.smoothScrollTo(sectionId)
        }
      }
    })
  }

  smoothScrollTo(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      const startPosition = window.pageYOffset
      const distance = offsetTop - startPosition
      const duration = Math.min(Math.abs(distance) / 2, 1000) // Max 1 second

      this.animateScroll(startPosition, distance, duration)
    }
  }

  animateScroll(startPosition, distance, duration) {
    let startTime = null

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function for smooth animation
      const ease = this.easeInOutCubic(progress)

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
}

// Parallax Effect Manager
class ParallaxManager {
  constructor() {
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-background")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }
}

class ScrollProgressManager {
  constructor() {
    this.init()
  }

  init() {
    // Create scroll progress bar
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>'
    document.body.appendChild(progressBar)

    this.progressBar = progressBar.querySelector(".scroll-progress-bar")

    window.addEventListener("scroll", () => this.updateProgress())
  }

  updateProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    this.progressBar.style.width = scrollPercent + "%"
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  const navManager = new NavigationManager()
  new AnimationManager()
  new ProjectFilterManager()
  new ContactFormManager()
  new SmoothScrollManager()
  new ParallaxManager()
  new ScrollProgressManager()

  window.addEventListener("resize", () => {
    navManager.updateIndicator()
  })

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add smooth reveal animations on scroll
window.addEventListener(
  "scroll",
  throttle(() => {
    const reveals = document.querySelectorAll(".fade-in:not(.animate)")

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("animate")
      }
    })
  }, 100),
)
