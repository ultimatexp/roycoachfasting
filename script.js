/* ============================================
   ROYCOACHFASTING — Interactive Scripts
   ============================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // ============================================
  // 1. Navbar scroll effect
  // ============================================
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 60);
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // init

  // ============================================
  // 2. Mobile hamburger menu
  // ============================================
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // 3. Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  // ============================================
  // 4. Scroll-triggered reveal animations
  // ============================================
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
      }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============================================
  // 5. Animated number counter
  // ============================================
  const statNumbers = document.querySelectorAll('.hero-stat .number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current >= 1000
        ? current.toLocaleString() + '+'
        : current + '+';

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute('data-target') + '+';
    });
  }

  // ============================================
  // 6. Parallax-like hero background on scroll
  // ============================================
  const heroBg = document.querySelector('.hero-bg img');

  if (heroBg && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.25) + 'px) scale(1.05)';
      }
    }, { passive: true });
  }
  // ============================================
  // 7. Language Switcher (EN / TH)
  // ============================================
  var translations = {
    // Nav
    'nav-about':        { en: 'About',    th: 'เกี่ยวกับ' },
    'nav-services':     { en: 'Services', th: 'บริการ' },
    'nav-results':      { en: 'Results',  th: 'ผลลัพธ์' },
    'nav-cta':          { en: 'Get Started', th: 'เริ่มต้น' },
    // Hero
    'hero-badge':       { en: 'Certified Fasting & Nutrition Coach', th: 'โค้ชการอดอาหารและโภชนาการที่ได้รับการรับรอง' },
    'hero-h1':          { en: 'Unlock Your Body\'s<br><span class="highlight">Hidden Power</span><br>Through Fasting', th: 'ปลดล็อก<br><span class="highlight">พลังที่ซ่อนอยู่</span><br>ของร่างกายคุณผ่านการอดอาหาร' },
    'hero-desc':        { en: 'Science-backed fasting protocols, personalized coaching, and proven strategies to help you lose fat, build lean muscle, and activate deep cellular renewal through autophagy — without starving yourself.', th: 'โปรโตคอลการอดอาหารที่มีหลักวิทยาศาสตร์รองรับ การโค้ชส่วนตัว และกลยุทธ์ที่พิสูจน์แล้ว เพื่อช่วยให้คุณลดไขมัน สร้างกล้ามเนื้อ และกระตุ้นการฟื้นฟูเซลล์ผ่าน Autophagy — โดยไม่ต้องอดอยาก' },
    'hero-cta':         { en: 'Start Your Transformation', th: 'เริ่มการเปลี่ยนแปลงของคุณ' },
    'hero-explore':     { en: 'Explore Services', th: 'ดูบริการ' },
    'stat-1':           { en: 'Clients Coached', th: 'ลูกค้าที่ดูแล' },
    'stat-2':           { en: 'Certifications', th: 'ใบรับรอง' },
    'stat-3':           { en: 'Years Experience', th: 'ปีประสบการณ์' },
    // About
    'about-label':      { en: 'About the Expert', th: 'เกี่ยวกับผู้เชี่ยวชาญ' },
    'about-heading':    { en: 'Meet <span class="highlight">Roi Panupong Tonnaim</span> — Your Fasting Authority', th: 'พบกับ <span class="highlight">รอย ภาณุพงศ์ ต้นน้ำ</span> — ผู้เชี่ยวชาญด้านการอดอาหาร' },
    'about-p1':         { en: 'With over a decade of experience in health optimization, Roi has helped hundreds of clients transform their lives through the strategic science of fasting. His approach blends cutting-edge research on autophagy and metabolic health with practical, sustainable protocols tailored to each individual\'s body type, lifestyle, and goals. Roi doesn\'t believe in quick fixes — he builds lasting habits that rewire your relationship with food, energy, and performance.', th: 'ด้วยประสบการณ์กว่าสิบปีในการปรับปรุงสุขภาพ รอยได้ช่วยลูกค้าหลายร้อยคนเปลี่ยนแปลงชีวิตผ่านศาสตร์เชิงกลยุทธ์ของการอดอาหาร แนวทางของเขาผสมผสานงานวิจัยล่าสุดเกี่ยวกับ Autophagy และสุขภาพเมตาบอลิซึม กับโปรโตคอลที่ปฏิบัติได้จริงและยั่งยืน ปรับให้เหมาะกับรูปร่าง ไลฟ์สไตล์ และเป้าหมายของแต่ละคน' },
    'about-p2':         { en: 'Backed by internationally recognized certifications and real-world results, Roi combines deep expertise in nutrition coaching, high-intensity training, and natural movement to create holistic programs that go far beyond simple calorie restriction.', th: 'ได้รับการรับรองจากสถาบันระดับนานาชาติและผลลัพธ์จริง รอยผสมผสานความเชี่ยวชาญด้านโภชนาการ การฝึกความเข้มข้นสูง และการเคลื่อนไหวธรรมชาติ เพื่อสร้างโปรแกรมแบบองค์รวมที่มากกว่าการลดแคลอรี' },
    'cred-1-title':     { en: 'Precision Nutrition Level 1', th: 'Precision Nutrition ระดับ 1' },
    'cred-1-sub':       { en: 'Certificate in Nutrition & Coaching', th: 'ใบรับรองด้านโภชนาการและการโค้ช' },
    'cred-2-title':     { en: 'ACE Certified Personal Trainer', th: 'ACE เทรนเนอร์ส่วนบุคคล' },
    'cred-2-sub':       { en: 'American Council on Exercise', th: 'สภาการออกกำลังกายอเมริกัน' },
    'cred-3-title':     { en: 'PN CDS — Intermittent Fasting', th: 'PN CDS — การอดอาหารเป็นช่วง' },
    'cred-3-sub':       { en: 'Coaching Dietary Strategies', th: 'กลยุทธ์การโค้ชด้านอาหาร' },
    'cred-4-title':     { en: 'ASFA HIIT Certification', th: 'ASFA HIIT ใบรับรอง' },
    'cred-4-sub':       { en: 'American Sports & Fitness Assoc.', th: 'สมาคมกีฬาและฟิตเนสอเมริกัน' },
    'cred-5-title':     { en: 'MovNat Certified Trainer L2', th: 'MovNat เทรนเนอร์ระดับ 2' },
    'cred-5-sub':       { en: 'Natural Movement Specialist', th: 'ผู้เชี่ยวชาญการเคลื่อนไหวธรรมชาติ' },
    // Services
    'svc-label':        { en: 'What We Offer', th: 'บริการของเรา' },
    'svc-heading':      { en: 'Three Paths to Your Transformation', th: 'สามเส้นทางสู่การเปลี่ยนแปลงของคุณ' },
    'svc-subtitle':     { en: 'Choose the level of guidance that fits your journey — from deep personal mentorship to self-paced learning and reference materials.', th: 'เลือกระดับการดูแลที่เหมาะกับเส้นทางของคุณ — ตั้งแต่การดูแลส่วนตัวแบบเข้มข้น จนถึงการเรียนรู้ด้วยตนเองและหนังสือคู่มือ' },
    'svc1-title':       { en: '1-on-1 Coaching', th: 'โค้ชส่วนตัว 1-on-1' },
    'svc1-desc':        { en: 'Your personal fasting roadmap — designed around your body type, metabolism, and lifestyle. Roi works directly with you to build a protocol that delivers real, measurable results with ongoing accountability.', th: 'แผนการอดอาหารส่วนตัวของคุณ — ออกแบบตามรูปร่าง เมตาบอลิซึม และไลฟ์สไตล์ รอยทำงานร่วมกับคุณโดยตรงเพื่อสร้างโปรโตคอลที่ให้ผลลัพธ์จริงและวัดผลได้' },
    'svc1-f1':          { en: 'Personalized fasting & nutrition protocol', th: 'โปรโตคอลการอดอาหารและโภชนาการส่วนบุคคล' },
    'svc1-f2':          { en: 'Body type analysis (Ectomorph / Endomorph / Mesomorph)', th: 'วิเคราะห์รูปร่าง (Ectomorph / Endomorph / Mesomorph)' },
    'svc1-f3':          { en: 'Custom macro & portion guidance', th: 'แนะนำมาโครและสัดส่วนอาหารเฉพาะบุคคล' },
    'svc1-f4':          { en: 'Weekly check-ins & progress tracking', th: 'เช็คอินรายสัปดาห์และติดตามความก้าวหน้า' },
    'svc1-f5':          { en: '3-month follow-up support included', th: 'รวมการติดตามผล 3 เดือน' },
    'svc1-link':        { en: 'Book a Consultation', th: 'จองปรึกษา' },
    'svc2-title':       { en: 'Online Courses', th: 'คอร์สออนไลน์' },
    'svc2-desc':        { en: 'Learn at your own pace with Roi\'s in-depth audio lessons. Each episode dives deep into the science of fasting — from intermittent fasting fundamentals to advanced autophagy activation through targeted exercise.', th: 'เรียนรู้ตามจังหวะของคุณกับบทเรียนเสียงเชิงลึกของรอย แต่ละตอนเจาะลึกวิทยาศาสตร์ของการอดอาหาร — ตั้งแต่พื้นฐาน IF ไปจนถึงการกระตุ้น Autophagy ผ่านการออกกำลังกายเฉพาะทาง' },
    'svc2-f1':          { en: 'Structured lesson playlists by topic', th: 'เพลย์ลิสต์บทเรียนจัดหมวดหมู่ตามหัวข้อ' },
    'svc2-f2':          { en: 'Intermittent fasting deep-dives', th: 'เจาะลึกการอดอาหารเป็นช่วง (IF)' },
    'svc2-f3':          { en: 'Autophagy & targeted exercise science', th: 'วิทยาศาสตร์ Autophagy และการออกกำลังกายเฉพาะทาง' },
    'svc2-f4':          { en: 'Metabolic health & body composition tips', th: 'เคล็ดลับสุขภาพเมตาบอลิซึมและองค์ประกอบร่างกาย' },
    'svc2-f5':          { en: 'New episodes added regularly', th: 'เพิ่มตอนใหม่สม่ำเสมอ' },
    'svc2-link':        { en: 'Listen Now', th: 'ฟังเลย' },
    'svc3-title':       { en: 'Books & Guides', th: 'หนังสือและคู่มือ' },
    'svc3-desc':        { en: 'Roi\'s written resources distill years of coaching experience into practical, evidence-based guides. From macro and portion planning to understanding your body\'s metabolic signals — keep a reference that works when you need it.', th: 'ทรัพยากรที่รอยเขียนขึ้นรวบรวมประสบการณ์การโค้ชหลายปีเป็นคู่มือที่ปฏิบัติได้จริงและอิงหลักฐาน ตั้งแต่การวางแผนมาโครและสัดส่วนอาหาร ไปจนถึงการเข้าใจสัญญาณเมตาบอลิซึมของร่างกาย' },
    'svc3-f1':          { en: 'Macro & Portion Guide for every body type', th: 'คู่มือมาโครและสัดส่วนสำหรับทุกรูปร่าง' },
    'svc3-f2':          { en: 'Evidence-based nutrition strategies', th: 'กลยุทธ์โภชนาการอิงหลักฐาน' },
    'svc3-f3':          { en: 'Practical meal timing frameworks', th: 'กรอบเวลาอาหารที่ปฏิบัติได้จริง' },
    'svc3-f4':          { en: 'Companion to coaching & course programs', th: 'คู่มือเสริมสำหรับโปรแกรมโค้ชและคอร์ส' },
    'svc3-ebook-cta':   { en: 'Purchase Ebook', th: 'สั่งซื้ออีบุ๊ก' },
    'svc3-physical-cta':{ en: 'Buy Physical Book', th: 'สั่งซื้อหนังสือเล่ม' },
    // Testimonials
    'testi-label':      { en: 'Real Results', th: 'ผลลัพธ์จริง' },
    'testi-heading':    { en: 'Proven Methods, Real Transformations', th: 'วิธีที่พิสูจน์แล้ว การเปลี่ยนแปลงจริง' },
    'testi-subtitle':   { en: 'Real before & after results from clients following Roi\'s intermittent fasting protocols and personalized coaching programs.', th: 'ผลลัพธ์ก่อนและหลังจริงจากลูกค้าที่ทำตามโปรโตคอล IF และโปรแกรมโค้ชส่วนตัวของรอย' },
    't1-quote':         { en: '"2 months of IF and the results are amazing. Thank you for the knowledge and support!"', th: '"ทำ IF ได้ 2 เดือนครับพี่ หลุดบ้าง แต่ผลลัพธ์สุดยอดมากครับ ขอบคุณสำหรับข้อมูลและความรู้ดีๆครับ"' },
    't1-name':          { en: 'Coaching Client', th: 'ลูกค้าโค้ชส่วนตัว' },
    't1-prog':          { en: '2-Month IF Program', th: 'โปรแกรม IF 2 เดือน' },
    't2-quote':         { en: '"6 months of IF combined with resistance training — a life-changing transformation."', th: '"6 เดือนของ IF กับ resistance training — การเปลี่ยนแปลงชีวิต"' },
    't2-name':          { en: 'IF & Resistance Training', th: 'IF และ Resistance Training' },
    't2-prog':          { en: '6-Month Program', th: 'โปรแกรม 6 เดือน' },
    't3-quote':         { en: '"About 2 months in and the body composition change is incredible. Thank you so much!"', th: '"ผมทำมาได้ประมาณ 2 เดือนกว่าๆแล้วครับ ขอบคุณพี่มากครับที่คอยให้ความรู้"' },
    't3-name':          { en: 'Coaching Client', th: 'ลูกค้าโค้ชส่วนตัว' },
    't3-prog':          { en: 'Body Recomposition', th: 'ปรับองค์ประกอบร่างกาย' },
    't4-quote':         { en: '"Completely changed my eating habits and lifestyle. Leaner, more energy, and finally in control."', th: '"เปลี่ยนพฤติกรรมการกินและไลฟ์สไตล์อย่างสิ้นเชิง ผอมลง มีพลังงานมากขึ้น และควบคุมได้ในที่สุด"' },
    't4-name':          { en: 'Lifestyle Transformation', th: 'เปลี่ยนไลฟ์สไตล์' },
    't4-prog':          { en: 'IF & Nutrition Coaching', th: 'โค้ช IF และโภชนาการ' },
    't5-quote':         { en: '"From overweight to muscular — Roi\'s program gave me a completely new body and a new life."', th: '"จากน้ำหนักเกินสู่กล้ามเนื้อ — โปรแกรมของรอยให้ร่างกายใหม่และชีวิตใหม่"' },
    't5-name':          { en: 'Complete Transformation', th: 'เปลี่ยนแปลงทั้งหมด' },
    't5-prog':          { en: 'Fat Loss & Muscle Gain', th: 'ลดไขมัน & เพิ่มกล้ามเนื้อ' },
    't6-quote':         { en: '"Not just physical — it changed how I dress, carry myself, and feel every day. Best investment."', th: '"ไม่ใช่แค่ร่างกาย — มันเปลี่ยนวิธีแต่งตัว บุคลิก และความรู้สึกทุกวัน ลงทุนที่ดีที่สุด"' },
    't6-name':          { en: 'Total Life Change', th: 'เปลี่ยนชีวิตทั้งหมด' },
    't6-prog':          { en: 'Long-Term Coaching', th: 'โค้ชระยะยาว' },
    // CTA Banner
    'cta-label':        { en: 'Ready to Transform?', th: 'พร้อมที่จะเปลี่ยนแปลงหรือยัง?' },
    'cta-heading':      { en: 'Your Best Body Is<br><span class="highlight">One Message Away</span>', th: 'ร่างกายที่ดีที่สุดของคุณ<br><span class="highlight">อยู่ห่างแค่ข้อความเดียว</span>' },
    'cta-desc':         { en: 'Whether you want to lose stubborn fat, build lean muscle, or understand the science of autophagy — Roi is ready to guide you. Send a message today and take the first step toward the healthiest version of yourself.', th: 'ไม่ว่าคุณจะต้องการลดไขมันดื้อ สร้างกล้ามเนื้อ หรือเข้าใจวิทยาศาสตร์ของ Autophagy — รอยพร้อมนำทางคุณ ส่งข้อความวันนี้และก้าวแรกสู่เวอร์ชันที่สุขภาพดีที่สุดของคุณ' },
    'cta-btn':          { en: 'Send a Message on Messenger', th: 'ส่งข้อความทาง Messenger' },
    // Footer
    'footer-desc':      { en: 'Science-backed fasting coaching by Roi Panupong Tonnaim. Helping you unlock your body\'s hidden potential through personalized protocols, education, and evidence-based nutrition strategies.', th: 'การโค้ชอดอาหารอิงวิทยาศาสตร์โดยรอย ภาณุพงศ์ ต้นน้ำ ช่วยคุณปลดล็อกศักยภาพที่ซ่อนอยู่ของร่างกายผ่านโปรโตคอลส่วนบุคคล การศึกษา และกลยุทธ์โภชนาการอิงหลักฐาน' },
    'footer-quick':     { en: 'Quick Links', th: 'ลิงก์ด่วน' },
    'footer-home':      { en: 'Home', th: 'หน้าแรก' },
    'footer-about-roi': { en: 'About Roi', th: 'เกี่ยวกับรอย' },
    'footer-svc':       { en: 'Services', th: 'บริการ' },
    'footer-contact':   { en: 'Contact', th: 'ติดต่อ' },
    'footer-svc-head':  { en: 'Services', th: 'บริการ' },
    'footer-s1':        { en: '1-on-1 Coaching', th: 'โค้ชส่วนตัว 1-on-1' },
    'footer-s2':        { en: 'Online Courses', th: 'คอร์สออนไลน์' },
    'footer-s3':        { en: 'Books & Guides', th: 'หนังสือและคู่มือ' }
  };

  // Map of data-i18n keys → CSS selectors (applied once)
  var selectorMap = {
    'nav-about':      '.nav-links a[href="#about"]',
    'nav-services':   '.nav-links a[href="#services"]',
    'nav-results':    '.nav-links a[href="#testimonials"]',
    'nav-cta':        '.nav-cta',
    'hero-badge':     '.hero-badge',
    'hero-h1':        '.hero h1',
    'hero-desc':      '.hero-description',
    'hero-cta':       '#hero-cta',
    'hero-explore':   '.btn-secondary',
    'stat-1':         '.hero-stat:nth-child(1) .label',
    'stat-2':         '.hero-stat:nth-child(2) .label',
    'stat-3':         '.hero-stat:nth-child(3) .label',
    'about-label':    '.about .section-label',
    'about-heading':  '#about-heading',
    'about-p1':       '.about-description:nth-of-type(1)',
    'about-p2':       '.about-description:nth-of-type(2)',
    'svc-label':      '.services .section-label',
    'svc-heading':    '#services-heading',
    'svc-subtitle':   '.services .section-subtitle',
    'svc1-title':     '#service-coaching h3',
    'svc1-desc':      '#service-coaching p',
    'svc1-link':      '#service-coaching .service-link',
    'svc2-title':     '#service-courses h3',
    'svc2-desc':      '#service-courses p',
    'svc2-link':      '#service-courses .service-link',
    'svc3-title':     '#service-books h3',
    'svc3-desc':      '#service-books p',
    'svc3-ebook-cta':    '#books-ebook-cta',
    'svc3-physical-cta': '#books-physical-cta',
    'testi-label':    '.testimonials .section-label',
    'testi-heading':  '#testimonials-heading',
    'testi-subtitle': '.testimonials .section-subtitle',
    't1-quote':       '#testimonial-1 blockquote',
    't1-name':        '#testimonial-1 .testimonial-author strong',
    't1-prog':        '#testimonial-1 .testimonial-author span',
    't2-quote':       '#testimonial-2 blockquote',
    't2-name':        '#testimonial-2 .testimonial-author strong',
    't2-prog':        '#testimonial-2 .testimonial-author span',
    't3-quote':       '#testimonial-3 blockquote',
    't3-name':        '#testimonial-3 .testimonial-author strong',
    't3-prog':        '#testimonial-3 .testimonial-author span',
    't4-quote':       '#testimonial-4 blockquote',
    't4-name':        '#testimonial-4 .testimonial-author strong',
    't4-prog':        '#testimonial-4 .testimonial-author span',
    't5-quote':       '#testimonial-5 blockquote',
    't5-name':        '#testimonial-5 .testimonial-author strong',
    't5-prog':        '#testimonial-5 .testimonial-author span',
    't6-quote':       '#testimonial-6 blockquote',
    't6-name':        '#testimonial-6 .testimonial-author strong',
    't6-prog':        '#testimonial-6 .testimonial-author span',
    'cta-label':      '.cta-banner .section-label',
    'cta-heading':    '#cta-heading',
    'cta-desc':       '.cta-banner p',
    'cta-btn':        '#cta-bottom',
    'footer-desc':    '.footer-brand p',
    'footer-quick':   '.footer-column:nth-child(2) h4',
    'footer-home':    '.footer-column:nth-child(2) li:nth-child(1) a',
    'footer-about-roi':'.footer-column:nth-child(2) li:nth-child(2) a',
    'footer-svc':     '.footer-column:nth-child(2) li:nth-child(3) a',
    'footer-contact': '.footer-column:nth-child(2) li:nth-child(4) a',
    'footer-svc-head':'.footer-column:nth-child(3) h4',
    'footer-s1':      '.footer-column:nth-child(3) li:nth-child(1) a',
    'footer-s2':      '.footer-column:nth-child(3) li:nth-child(2) a',
    'footer-s3':      '.footer-column:nth-child(3) li:nth-child(3) a'
  };

  // Elements with innerHTML (contain tags like <span>, <br>)
  var htmlKeys = ['hero-h1', 'about-heading', 'cta-heading'];

  // Elements that have child SVGs we should preserve
  var svgParentKeys = ['hero-badge', 'hero-cta', 'hero-explore', 'cta-btn',
    'svc1-link', 'svc2-link', 'svc3-ebook-cta', 'svc3-physical-cta'];

  // Service feature items (special handling: list items with SVG + text)
  var featureMap = {
    '#service-coaching .service-features li': ['svc1-f1','svc1-f2','svc1-f3','svc1-f4','svc1-f5'],
    '#service-courses .service-features li':  ['svc2-f1','svc2-f2','svc2-f3','svc2-f4','svc2-f5'],
    '#service-books .service-features li':    ['svc3-f1','svc3-f2','svc3-f3','svc3-f4']
  };

  // Credential items (About section)
  var credKeys = [
    { title: 'cred-1-title', sub: 'cred-1-sub' },
    { title: 'cred-2-title', sub: 'cred-2-sub' },
    { title: 'cred-3-title', sub: 'cred-3-sub' },
    { title: 'cred-4-title', sub: 'cred-4-sub' },
    { title: 'cred-5-title', sub: 'cred-5-sub' }
  ];

  var currentLang = localStorage.getItem('rcf_lang') || 'en';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('rcf_lang', lang);

    // Toggle body class
    document.body.classList.toggle('lang-th', lang === 'th');
    document.documentElement.lang = lang === 'th' ? 'th' : 'en';

    // Update toggle buttons
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    document.getElementById('langTh').classList.toggle('active', lang === 'th');
    document.getElementById('langEn').setAttribute('aria-pressed', lang === 'en');
    document.getElementById('langTh').setAttribute('aria-pressed', lang === 'th');

    // Apply translations
    Object.keys(selectorMap).forEach(function (key) {
      var el = document.querySelector(selectorMap[key]);
      if (!el || !translations[key]) return;
      var text = translations[key][lang];

      if (htmlKeys.indexOf(key) !== -1) {
        el.innerHTML = text;
      } else if (svgParentKeys.indexOf(key) !== -1) {
        // Preserve child SVG
        var svg = el.querySelector('svg');
        var svgClone = svg ? svg.cloneNode(true) : null;
        el.textContent = text;
        if (svgClone) {
          if (key === 'hero-explore') {
            el.prepend(svgClone);
          } else {
            el.appendChild(svgClone);
          }
        }
      } else {
        el.textContent = text;
      }
    });

    // Service feature lists
    Object.keys(featureMap).forEach(function (selector) {
      var items = document.querySelectorAll(selector);
      var keys = featureMap[selector];
      items.forEach(function (li, idx) {
        if (keys[idx] && translations[keys[idx]]) {
          var svg = li.querySelector('svg');
          var svgClone = svg ? svg.cloneNode(true) : null;
          li.textContent = translations[keys[idx]][lang];
          if (svgClone) li.prepend(svgClone);
        }
      });
    });

    // Credential items
    var credItems = document.querySelectorAll('.credential-item');
    credItems.forEach(function (item, idx) {
      if (!credKeys[idx]) return;
      var strong = item.querySelector('.credential-text strong');
      var textNode = item.querySelector('.credential-text');
      if (strong && translations[credKeys[idx].title]) {
        strong.textContent = translations[credKeys[idx].title][lang];
      }
      if (textNode && translations[credKeys[idx].sub]) {
        // The subtitle is a text node after the strong
        var nodes = textNode.childNodes;
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].nodeType === 3 && nodes[i].textContent.trim()) {
            nodes[i].textContent = '\n                ' + translations[credKeys[idx].sub][lang] + '\n              ';
            break;
          }
        }
      }
    });
  }

  // Event listeners
  document.getElementById('langEn').addEventListener('click', function () { setLang('en'); });
  document.getElementById('langTh').addEventListener('click', function () { setLang('th'); });

  // Init: apply saved language
  if (currentLang === 'th') {
    setLang('th');
  }

})();
