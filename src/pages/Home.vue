<template>
  <section class="hero-carousel">
    <div class="hero-carousel__content">
      <div class="hero-carousel__text">
        <div class="hero-carousel__brand">
          <span>{{ slides[activeSlide].brand }}</span>
          <span
            v-if="slides[activeSlide].badge"
            class="hero-carousel__badge"
            >{{ slides[activeSlide].badge }}</span
          >
        </div>
        <h1 class="hero-carousel__title">{{ slides[activeSlide].title }}</h1>
        <p class="hero-carousel__desc">{{ slides[activeSlide].desc }}</p>
        <div
          class="hero-carousel__price"
          v-if="slides[activeSlide].price"
        >
          <span
            v-if="slides[activeSlide].oldPrice"
            class="hero-carousel__old"
            >{{ slides[activeSlide].oldPrice }}</span
          >
          <span class="hero-carousel__new">{{
            slides[activeSlide].price
          }}</span>
        </div>
        <button class="hero-carousel__cta">
          {{ slides[activeSlide].cta }}
        </button>
        <div
          v-if="slides[activeSlide].subcta"
          class="hero-carousel__subcta"
          v-html="slides[activeSlide].subcta"
        ></div>
      </div>
      <div class="hero-carousel__img-wrap">
        <img
          :src="heroImg"
          :alt="slides[activeSlide].imgAlt"
          class="hero-carousel__img"
        />
      </div>
    </div>
    <div class="hero-carousel__dots">
      <button
        v-for="(slide, idx) in slides"
        :key="'dot-' + idx"
        :class="['hero-carousel__dot', { 'is-active': idx === activeSlide }]"
        @click="goToSlide(idx)"
      ></button>
    </div>
  </section>
  <section class="stats-section">
    <div class="stats-section__list">
      <div class="stats-section__card">
        <div class="stats-section__value">+70</div>
        <div class="stats-section__label">
          Certifications in more than 4 languages
        </div>
      </div>
      <div class="stats-section__card">
        <div class="stats-section__value">+2M</div>
        <div class="stats-section__label">
          Certified professionals worldwide
        </div>
      </div>
      <div class="stats-section__card">
        <div class="stats-section__value">+1500</div>
        <div class="stats-section__label">
          Partners who have joined Certiprof
        </div>
      </div>
      <div class="stats-section__card">
        <div class="stats-section__value">+86</div>
        <div class="stats-section__label">
          Presence in more than 86 countries
        </div>
      </div>
      <div class="stats-section__card">
        <div class="stats-section__value">+500</div>
        <div class="stats-section__label">Learning paths available</div>
      </div>
    </div>
  </section>
  <section class="roles-section">
    <div class="roles-section__container">
      <main class="roles-section__main">
        <h2 class="roles-section__title">
          Search our 100+ Competence and Profession Certification
        </h2>
        <div class="roles-section__search">
          <input
            type="text"
            class="roles-section__search-input"
            placeholder="What do you want to learn?"
          />
        </div>
        <div class="roles-section__filters">
          <button class="roles-section__filter">Beginner</button>
          <button class="roles-section__filter is-active">Popular</button>
          <button class="roles-section__filter">
            Software Engineering & IT
          </button>
          <button class="roles-section__filter">Business</button>
          <button class="roles-section__filter">Sales & Marketing</button>
          <button class="roles-section__filter">
            Data Science & Analytics
          </button>
          <button class="roles-section__filter">Healthcare</button>
        </div>
        <div class="roles-section__cards">
          <div class="roles-section__card">
            <img
              class="roles-section__avatar"
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Data Analyst"
            />
            <h4 class="roles-section__card-title">Data Analyst</h4>
            <p class="roles-section__card-desc">
              A Data Analyst collects, cleans, and interprets data, using tools
              like Excel, SQL, and Tableau to analyze trends and provide
              insights for decisions.
            </p>
            <div class="roles-section__card-like">
              <b>If you like:</b> analyzing data to find insights, creating
              reports and visualizations, working with spreadsheets and
              databases
            </div>
            <div class="roles-section__card-salary">
              IDR 96,118,478 median salary<br />2,099 jobs available
            </div>
            <div class="roles-section__card-credentials">
              <span>Credentials</span>
              <a href="#">Meta Data Analyst</a>
              <a href="#">IBM Data Analyst</a>
              <span>+ 5 more</span>
            </div>
          </div>
          <div class="roles-section__card">
            <img
              class="roles-section__avatar"
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt="Data Scientist"
            />
            <h4 class="roles-section__card-title">Data Scientist</h4>
            <p class="roles-section__card-desc">
              A Data Scientist analyzes large datasets to uncover insights,
              using statistics, machine learning, and visualization to inform
              business strategies.
            </p>
            <div class="roles-section__card-like">
              <b>If you like:</b> analyzing complex datasets, developing machine
              learning models, solving statistical problems
            </div>
            <div class="roles-section__card-salary">
              IDR 63,081,816 median salary<br />912 jobs available
            </div>
            <div class="roles-section__card-credentials">
              <span>Credentials</span>
              <a href="#">IBM Data Science</a>
            </div>
          </div>
          <div class="roles-section__card">
            <img
              class="roles-section__avatar"
              src="https://randomuser.me/api/portraits/men/33.jpg"
              alt="Machine Learning Engineer"
            />
            <h4 class="roles-section__card-title">Machine Learning Engineer</h4>
            <p class="roles-section__card-desc">
              A Machine Learning Engineer builds and optimizes algorithms that
              enable computers to learn from data, using large datasets and
              neural networks.
            </p>
            <div class="roles-section__card-like">
              <b>If you like:</b> developing machine learning models, working
              with large datasets, coding in python or r
            </div>
            <div class="roles-section__card-salary">
              IDR 80,000,000 median salary<br />1,200 jobs available
            </div>
            <div class="roles-section__card-credentials">
              <span>Credentials</span>
              <a href="#">Machine Learning</a>
              <a href="#">AI Agent Developer</a>
              <span>+ 1 more</span>
            </div>
          </div>
        </div>
        <div class="roles-section__pagination">
          <button
            class="roles-section__pagination-btn"
            disabled
          >
            Prev
          </button>
          <button class="roles-section__pagination-btn is-active">1</button>
          <button class="roles-section__pagination-btn">Next</button>
        </div>
      </main>
    </div>
  </section>
  <section class="why-section">
    <h2 class="why-section__title">
      Why should you get certified with
      <span class="why-section__highlight">NeXtudies?</span>
    </h2>
    <p class="why-section__desc">
      NeXtudies offers internationally recognized certifications in technology,
      business, and leadership. Our programs have empowered thousands of
      professionals to advance their careers and stay ahead in a rapidly
      changing world. With 100+ certifications, expert instructors, and a global
      community, we help you unlock your full potential.
    </p>
    <div class="why-section__content">
      <div class="why-section__img-wrap">
        <img
          class="why-section__img"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Certification"
        />
      </div>
      <div class="why-section__features">
        <div class="why-section__feature">
          <span class="why-section__icon why-section__icon--a">
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                width="24"
                height="24"
                rx="6"
                fill="#0ff"
                opacity="0.12"
              />
              <path
                d="M12 7a2 2 0 0 1 2 2v1h-4V9a2 2 0 0 1 2-2Zm4 3v5a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"
                stroke="#0ff"
                stroke-width="2"
              />
            </svg>
          </span>
          <div>
            <div class="why-section__feature-title">Language</div>
            <div class="why-section__feature-desc">
              Certifications available in multiple languages for global reach.
            </div>
          </div>
        </div>
        <div class="why-section__feature">
          <span class="why-section__icon why-section__icon--b">
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                width="24"
                height="24"
                rx="6"
                fill="#ffe600"
                opacity="0.12"
              />
              <circle
                cx="12"
                cy="12"
                r="6"
                stroke="#ffe600"
                stroke-width="2"
              />
              <path
                d="M12 8v4l2 2"
                stroke="#ffe600"
                stroke-width="2"
              />
            </svg>
          </span>
          <div>
            <div class="why-section__feature-title">
              International Standards
            </div>
            <div class="why-section__feature-desc">
              Trusted by thousands of professionals and top companies worldwide.
            </div>
          </div>
        </div>
        <div class="why-section__feature">
          <span class="why-section__icon why-section__icon--c">
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                width="24"
                height="24"
                rx="6"
                fill="#2563eb"
                opacity="0.12"
              />
              <circle
                cx="12"
                cy="12"
                r="7"
                stroke="#2563eb"
                stroke-width="2"
              />
              <path
                d="M12 5v14M5 12h14"
                stroke="#2563eb"
                stroke-width="2"
              />
            </svg>
          </span>
          <div>
            <div class="why-section__feature-title">Leadership</div>
            <div class="why-section__feature-desc">
              Over 10 years of experience in certifying future leaders and
              innovators.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="popular-certificates">
    <div class="popular-certificates__header">
      <div>
        <h2 class="popular-certificates__title">Most Popular Certificates</h2>
        <p class="popular-certificates__desc">
          Explore our most popular programs, get job-ready for an in-demand
          career.
        </p>
      </div>
      <button class="popular-certificates__viewall">View All</button>
    </div>
    <div class="popular-certificates__list">
      <div class="popular-certificates__card">
        <div class="popular-certificates__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Google Data Analytics"
          />
          <div class="popular-certificates__badges">
            <span
              class="popular-certificates__badge popular-certificates__badge--white"
              >Free Trial</span
            >
            <span
              class="popular-certificates__badge popular-certificates__badge--yellow"
              >AI skills</span
            >
          </div>
        </div>
        <div class="popular-certificates__info">
          <div class="popular-certificates__provider">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
            />
            Google
          </div>
          <div class="popular-certificates__name">Google Data Analytics</div>
          <a
            href="#"
            class="popular-certificates__degree"
            >Build toward a degree</a
          >
          <div class="popular-certificates__type">Professional Certificate</div>
        </div>
      </div>
      <div class="popular-certificates__card">
        <div class="popular-certificates__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            alt="Google Project Management"
          />
          <div class="popular-certificates__badges">
            <span
              class="popular-certificates__badge popular-certificates__badge--white"
              >Free Trial</span
            >
            <span
              class="popular-certificates__badge popular-certificates__badge--yellow"
              >AI skills</span
            >
          </div>
        </div>
        <div class="popular-certificates__info">
          <div class="popular-certificates__provider">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
            />
            Google
          </div>
          <div class="popular-certificates__name">
            Google Project Management
          </div>
          <a
            href="#"
            class="popular-certificates__degree"
            >Build toward a degree</a
          >
          <div class="popular-certificates__type">Professional Certificate</div>
        </div>
      </div>
      <div class="popular-certificates__card">
        <div class="popular-certificates__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
            alt="Google IT Support"
          />
          <div class="popular-certificates__badges">
            <span
              class="popular-certificates__badge popular-certificates__badge--white"
              >Free Trial</span
            >
            <span
              class="popular-certificates__badge popular-certificates__badge--yellow"
              >AI skills</span
            >
          </div>
        </div>
        <div class="popular-certificates__info">
          <div class="popular-certificates__provider">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
            />
            Google
          </div>
          <div class="popular-certificates__name">Google IT Support</div>
          <a
            href="#"
            class="popular-certificates__degree"
            >Build toward a degree</a
          >
          <div class="popular-certificates__type">Professional Certificate</div>
        </div>
      </div>
      <div class="popular-certificates__card">
        <div class="popular-certificates__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
            alt="Google UX Design"
          />
          <div class="popular-certificates__badges">
            <span
              class="popular-certificates__badge popular-certificates__badge--white"
              >Free Trial</span
            >
            <span
              class="popular-certificates__badge popular-certificates__badge--yellow"
              >AI skills</span
            >
          </div>
        </div>
        <div class="popular-certificates__info">
          <div class="popular-certificates__provider">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
            />
            Google
          </div>
          <div class="popular-certificates__name">Google UX Design</div>
          <a
            href="#"
            class="popular-certificates__degree"
            >Build toward a degree</a
          >
          <div class="popular-certificates__type">Professional Certificate</div>
        </div>
      </div>
    </div>
  </section>
  <section class="testimonials-section">
    <h2 class="testimonials-section__title">
      The reviews are in:<br />
      <span class="testimonials-section__highlight"
        >What learners are saying</span
      >
    </h2>
    <p class="testimonials-section__desc">
      Hear from our learners how NeXtudies certifications have helped them grow,
      get jobs, and achieve their goals.
    </p>
    <div class="testimonials-section__list">
      <div class="testimonials-section__card">
        <div class="testimonials-section__quote">
          <span class="testimonials-section__quote-icon">❝</span>
          <span>
            <b
              >This certification gave me the confidence to pursue my dream
              job.</b
            >
            The learning experience was practical and engaging, and I landed a
            new role within months!
          </span>
          <span class="testimonials-section__quote-icon">❞</span>
        </div>
        <div class="testimonials-section__user">
          <span class="testimonials-section__avatar">👤</span>
          <span>
            <span class="testimonials-section__user-name">Alicia P.</span>
            <span class="testimonials-section__user-role"
              >NeXtudies Data Science Professional</span
            >
          </span>
        </div>
      </div>
      <div class="testimonials-section__card testimonials-section__card">
        <div class="testimonials-section__quote">
          <span class="testimonials-section__quote-icon">❝</span>
          <span>
            The instructors were <b>supportive</b> and <b>inspiring</b>. I never
            thought I could master these skills, but now I feel ready for any
            challenge in my career.
          </span>
          <span class="testimonials-section__quote-icon">❞</span>
        </div>
        <div class="testimonials-section__user">
          <span class="testimonials-section__avatar">👤</span>
          <span>
            <span class="testimonials-section__user-name">Rahul S.</span>
            <span class="testimonials-section__user-role"
              >NeXtudies Project Management</span
            >
          </span>
        </div>
      </div>
      <div class="testimonials-section__card">
        <div class="testimonials-section__quote">
          <span class="testimonials-section__quote-icon">❝</span>
          <span>
            I loved the flexibility and the <b>real-world projects</b>. The
            certification helped me stand out and get noticed by top employers.
          </span>
          <span class="testimonials-section__quote-icon">❞</span>
        </div>
        <div class="testimonials-section__user">
          <span class="testimonials-section__avatar">👤</span>
          <span>
            <span class="testimonials-section__user-name">Maria G.</span>
            <span class="testimonials-section__user-role"
              >NeXtudies UX Design Certificate</span
            >
          </span>
        </div>
      </div>
    </div>
  </section>
  <section class="topics-section">
    <h2 class="topics-section__title">Explore Topics</h2>
    <p class="topics-section__desc">
      Discover trending topics and skills to boost your learning journey.
    </p>
    <div class="topics-section__list">
      <div class="topics-section__card">
        <span class="topics-section__icon">🤖</span>
        <span class="topics-section__name">Artificial Intelligence</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">👥</span>
        <span class="topics-section__name">Leadership</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">⛓️</span>
        <span class="topics-section__name">Supply Chain</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">💻</span>
        <span class="topics-section__name">Computer Programming</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">🔢</span>
        <span class="topics-section__name">Probability</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">🐍</span>
        <span class="topics-section__name">Python</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">🧠</span>
        <span class="topics-section__name">Machine Learning</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">🖥️</span>
        <span class="topics-section__name">Computer Science</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">✍️</span>
        <span class="topics-section__name">Writing</span>
      </div>
      <div class="topics-section__card">
        <span class="topics-section__icon">📊</span>
        <span class="topics-section__name">Statistics</span>
      </div>
    </div>
  </section>
  <section class="cta-register-section">
    <h2 class="cta-register-section__title">
      Register for your
      <span class="cta-register-section__highlight"
        >free NeXtudies account</span
      >
    </h2>
    <p class="cta-register-section__desc">
      Sign up now and unlock your learning journey.
    </p>
    <button class="cta-register-section__btn">Get Started</button>
  </section>
</template>

<script>
import heroImg from "@/assets/icon.png";

export default {
  name: "HomePage",
  data() {
    return {
      activeSlide: 0,
      slides: [
        {
          brand: "NeXtudies PLUS",
          badge: "PLUS",
          title: "Achieve your career goals with NeXtudies Plus",
          desc: "Subscribe to build job-ready skills from world-class instructors.",
          price: "Rp 499.000/month, cancel anytime",
          oldPrice: "Rp 1.200.000",
          cta: "Start 7-day Free Trial",
          subcta:
            "or <b>Rp 4.999.000/year</b> with 14-day money-back guarantee",
          imgAlt: "Promo 1",
        },
        {
          brand: "NeXtudies PRO",
          badge: "PRO",
          title: "Master new skills with NeXtudies Pro",
          desc: "Access premium content and exclusive certifications.",
          price: "Rp 799.000/month, cancel anytime",
          oldPrice: "Rp 1.500.000",
          cta: "Upgrade Now",
          subcta:
            "or <b>Rp 7.999.000/year</b> with 14-day money-back guarantee",
          imgAlt: "Promo 2",
        },
        {
          brand: "NeXtudies BASIC",
          badge: "BASIC",
          title: "Start your journey with NeXtudies Basic",
          desc: "Learn the fundamentals for free and grow your career.",
          price: "Free",
          oldPrice: null,
          cta: "Get Started",
          subcta: "",
          imgAlt: "Promo 3",
        },
      ],
      autoSlideInterval: null,
      heroImg,
    };
  },
  methods: {
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.activeSlide =
        (this.activeSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(idx) {
      this.activeSlide = idx;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/pages/home" as *;
</style>
