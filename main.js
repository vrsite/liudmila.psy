document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });

      const navLinks = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.hamburger');
      if (navLinks.classList.contains('active')) {
        closeDrawer();
      }
    });
  });

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  const getFocusableInDrawer = () => {
    return navLinks.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
  };

  const openDrawer = () => {
    navLinks.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');

    const focusables = getFocusableInDrawer();
    focusables.forEach(el => el.setAttribute('tabindex', '0'));
    if (focusables.length) focusables[0].focus();
  };

  const closeDrawer = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');

    const focusables = getFocusableInDrawer();
    focusables.forEach(el => el.setAttribute('tabindex', '-1'));
    hamburger.focus();
  };

  getFocusableInDrawer().forEach(el => el.setAttribute('tabindex', '-1'));

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const willOpen = !navLinks.classList.contains('active');
      willOpen ? openDrawer() : closeDrawer();
    });

    document.addEventListener('click', (e) => {
      const clickedInside = navLinks.contains(e.target) || hamburger.contains(e.target);
      if (!clickedInside && navLinks.classList.contains('active')) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!navLinks.classList.contains('active')) return;
      if (e.key !== 'Tab') return;

      const focusables = Array.from(getFocusableInDrawer());
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 500);
  }

  const carouselTrack = document.querySelector('.carousel-track');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');

  if (carouselTrack && carouselPrev && carouselNext) {
    let scrollPosition = 0;
    const cardWidth = 300;
    const gap = 32;
    const totalWidth = carouselTrack.scrollWidth;

    carouselNext.addEventListener('click', () => {
      if (scrollPosition < totalWidth - carouselTrack.offsetWidth) {
        scrollPosition += cardWidth + gap;
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollPosition = 0;
        carouselTrack.style.transform = `translateX(0)`;
      }
    });

    carouselPrev.addEventListener('click', () => {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth + gap;
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollPosition = Math.max(totalWidth - carouselTrack.offsetWidth, 0);
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
      }
    });
  }

  const blogButtons = document.querySelectorAll('.read-more-btn');
  const blogModal = document.getElementById('blog-modal');
  const blogModalContent = document.querySelector('#blog-modal .modal-body-blog');
  const blogCloseBtn = blogModal.querySelector('.close-btn');

  const blogData = {
      1: {
          title: "Тривога: як повернути собі контроль над життям. 3 ефективні техніки КПТ",
          text: `
              <p>У сучасному світі тривога стала настільки поширеною, що ми часто сприймаємо її як нормальну частину життя. Але коли вона починає заважати спати, спілкуватися з близькими чи просто радіти дрібницям — це сигнал, що настав час діяти. Когнітивно-поведінкова терапія (КПТ) пропонує практичні інструменти, які допомагають не боротися з тривогою, а навчитися керувати нею.</p>
              <p>Ось три ефективні техніки, які ви можете використовувати вже сьогодні.</p>
              <h3>1. Техніка «5-4-3-2-1»</h3>
              <p>Це потужний інструмент, що допомагає повернути вашу свідомість у теперішній момент, коли ви відчуваєте, що тривога захоплює вас. Він працює за рахунок заземлення і фокусу на відчуттях.</p>
              <p>Подивіться навколо та назвіть:</p>
              <ul>
                  <li>5 речей, які ви бачите. (Наприклад, стіл, книга, вікно, чашка, ручка)</li>
                  <li>4 речі, які ви відчуваєте. (Наприклад, текстуру одягу, прохолодний вітер, тверду поверхню під ногами)</li>
                  <li>3 речі, які ви чуєте. (Наприклад, спів пташок, звук автомобіля, свій подих)</li>
                  <li>2 речі, які ви відчуваєте на запах.</li>
                  <li>1 річ, яку ви можете скуштувати.</li>
              </ul>
              <p>Ця вправа перемикає фокус із внутрішніх тривожних думок на зовнішній світ, допомагаючи зменшити інтенсивність переживань.</p>
              <h3>2. «А що, якщо…» — заміна катастрофічних думок</h3>
              <p>Тривога часто живиться так званим «катастрофічним мисленням», коли ми уявляємо найгірший сценарій. Техніка полягає в тому, щоб свідомо ставити під сумнів ці думки.</p>
              <p>Коли виникає думка, наприклад, «А що, якщо я провалюся на співбесіді?», зупиніться і запитайте себе:</p>
              <ul>
                  <li>Яка ймовірність, що це станеться насправді?</li>
                  <li>Які є інші, більш реалістичні сценарії?</li>
                  <li>Навіть якщо це станеться, чи зможу я з цим впоратися? Які мої ресурси?</li>
              </ul>
              <p>Такий «допит» власних думок руйнує їхню силу і допомагає побачити ситуацію об’єктивніше.</p>
              <h3>3. Планування «часу для тривоги»</h3>
              <p>Це здається парадоксальним, але це ефективний метод. Виділіть 15-20 хвилин на день, наприклад, о 18:00, і дозвольте собі тривожитися. Запишіть усі свої переживання, побоювання та страхи.</p>
              <p>Коли протягом дня тривожна думка намагається оволодіти вами, скажіть собі: «Я подумаю про це о 18:00». Ви побачите, що до призначеного часу багато переживань втратять свою актуальність. Ця техніка вчить не тікати від тривоги, а контролювати її.</p>
              <p>Наведені техніки — це лише невелика частина інструментів КПТ, які я використовую у своїй практиці. Вони дають швидке полегшення, але для глибокої, стійкої роботи над причинами тривоги потрібен системний підхід.</p>
              <p>Якщо ви відчуваєте, що готові не просто тимчасово справлятися з тривогою, а змінити своє життя, я запрошую вас на консультацію.</p>
          `
      },
      2: {
          title: "Перфекціонізм: чому це не про ідеал, а про страх помилок",
          text: `
              <p>Часто ми чуємо, як люди з гордістю говорять: «Я перфекціоніст». Це слово асоціюється з високими стандартами, досконалістю та успіхом. Але в психологічній практиці перфекціонізм — це не прагнення до ідеалу, а, скоріше, нав’язлива потреба уникати помилок. За цим стоїть не бажання створити щось довершене, а глибокий страх бути засудженим, не прийнятим чи недостатньо хорошим.</p>
              <h3>Здобутки чи виснаження? В чому різниця?</h3>
              <p>Корисно розрізняти здорове прагнення до досконалості та руйнівний перфекціонізм. Здорове прагнення — це коли ви ставите перед собою високі, але реалістичні цілі. Ви отримуєте задоволення від процесу та пишаєтеся результатом, навіть якщо він не ідеальний. Помилки сприймаються як досвід, можливість навчитися.</p>
              <p>Руйнівний перфекціонізм — це коли ви не залишаєте собі права на помилку. Завжди є відчуття, що результат недостатньо добрий. Такий підхід призводить до постійного стресу, тривоги, прокрастинації (адже краще не починати, ніж зробити неідеально) і, врешті, до емоційного та професійного вигорання.</p>
              <h3>Шлях до свободи: як ослабити тиск перфекціонізму</h3>
              <ul>
                  <li>Визначте свої тригери. Зверніть увагу, в яких ситуаціях у вас виникає бажання все зробити «ідеально». Усвідомлення — це перший крок до змін.</li>
                  <li>Дозвольте собі бути «достатньо хорошим». Поступово знижуйте планку. Спробуйте виконати завдання не на 10 з 10, а на 8 з 10.</li>
                  <li>Змініть своє ставлення до помилок. Пам’ятайте, що помилки — це не ознака вашої некомпетентності. Це природна частина будь-якого процесу навчання та росту.</li>
                  <li>Практикуйте самоспівчуття. Замість самокритики, коли щось не виходить, запитайте себе: «Що б я сказав своєму другові в такій ситуації?».</li>
              </ul>
              <p>Перфекціонізм — це не риса характеру, а стратегія поведінки, яку можна змінити.</p>
              <p>Якщо ви відчуваєте, что перфекціонізм заважає вам дихати на повні груди, звернення до фахівця може стати тим першим і найважливішим кроком до звільнення від цього навантаження.</p>
          `
      },
      3: {
          title: "Коли тіло говорить те, що мовчить душа: як емоції впливають на наше здоров'я",
          text: `
              <p>Чи помічали ви, що після стресового дня у вас починає боліти голова? Це психосоматика — прямий зв’язок між нашим емоційним станом і фізичним самопочуттям. Наше тіло — це дзеркало наших переживань, і коли ми ігноруємо сигнали душі, вона починає «кричати» через біль у тілі.</p>
              <h3>Як це працює?</h3>
              <p>Коли ми переживаємо стрес, страх або тривогу, наш організм вмикає захисну реакцію «бий або біжи». Коли стрес стає хронічним і емоції не знаходять виходу, тіло починає працювати на знос. Невідреаговані почуття «застрягають» у тілі, спричиняючи фізичний дискомфорт:</p>
              <ul>
                  <li>Головний біль напруги</li>
                  <li>Проблеми зі шлунково-кишковим трактом</li>
                  <li>М'язові затиски та біль у спині</li>
              </ul>
              <p>Однак варто розуміти, що ці техніки є лише підтримкою. Глибока робота з психосоматикою вимагає допомоги фахівця.</p>
              <p>Якщо ви готові не просто тимчасово полегшити симптоми, а знайти справжню гармонію між тілом і душею, я запрошую вас на консультацію.</p>
          `
      },
      4: {
          title: "Пастка невирішеності: як навчитися приймати рішення без страху",
          text: `
              <p>Відчуття паралічу перед важливим вибором — це поширена проблема, яка заважає нам рухатися вперед. Наш мозок часто перевантажується нескінченними «а що, якщо...», боячись зробити помилку, про яку потім доведеться шкодувати. Це не просто лінь, а психологічний захисний механізм.</p>
              <h3>1. Визначте справжній страх.</h3>
              <p>Страх перед вибором часто приховує глибші емоції: страх критики, страх відповідальності. Запитайте себе: «Чого я насправді боюся, приймаючи це рішення?». Коли ви назвете свій страх, він втратить свою силу.</p>
              <h3>2. Метод Декарта: аналіз наслідків.</h3>
              <p>Намалюйте квадрат і запишіть в кожному з чотирьох квадрантів відповіді на питання:</p>
              <ul>
                  <li>Що станеться, якщо я це зроблю?</li>
                  <li>Що станеться, якщо я це не зроблю?</li>
                  <li>Що не станеться, якщо я це зроблю?</li>
                  <li>Що не станеться, якщо я це не зроблю?</li>
              </ul>
              <h3>3. Прийміть «достатньо хороше» рішення.</h3>
              <p>Перфекціонізм змушує нас шукати «ідеальне» рішення. Замість этого, встановіть для себе правило: коли ви маєте достатньо інформації для вибору, приймайте «достатньо хороше» рішення.</p>
              <p>Ці методи є потужними інструментами, які допоможуть вам виходити з пастки невирішеності. Однак, якщо відчуття страху та нерішучості стали постійною частиною вашого життя, це може свідчити про глибинні проблеми.</p>
              <p>Я запрошую вас на консультацію, де ми знайдемо корінь вашої нерішучості і розробимо індивідуальну стратегію.</p>
          `
      }
  };
  
  blogButtons.forEach(button => {
      button.addEventListener('click', () => {
          const blogId = button.closest('.blog-post').dataset.blog;
          const data = blogData[blogId];

          blogModalContent.innerHTML = `
              <h3>${data.title}</h3>
              ${data.text}
              <button class="cta-button-blog-modal">Записатися на консультацію</button>
          `;
          blogModal.style.display = "block";
          document.body.style.overflow = "hidden";

          const ctaBlogModal = blogModalContent.querySelector('.cta-button-blog-modal');
          if (ctaBlogModal) {
              ctaBlogModal.addEventListener('click', () => {
                  closeBlogModal();
                  document.querySelector('#appointment').scrollIntoView({ behavior: 'smooth' });
              });
          }
      });
  });

  const closeBlogModal = () => {
      blogModal.style.display = "none";
      document.body.style.overflow = "";
  };

  if (blogCloseBtn) blogCloseBtn.addEventListener('click', closeBlogModal);
  window.addEventListener('click', (event) => {
      if (event.target == blogModal) {
          closeBlogModal();
      }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal.style.display === 'block') {
      closeBlogModal();
    }
  });


  const diplomaCards = document.querySelectorAll('.diploma-card');
  const modal = document.getElementById('diploma-modal');
  const modalContent = document.querySelector('#diploma-modal .modal-body');
  const closeBtn = document.querySelector('.close-btn');
  
  const diplomasData = {
      1: {
          title: "Диплом магістра",
          text: `
              <p><b>Заклад:</b> Київський університет імені Бориса Грінченка</p>
              <p><b>Спеціальність:</b> Практична психологія</p>
              <p><b>Кваліфікація:</b> Практичний психолог</p>
          `,
          image: "images/obrazovanie1.jpg"
      },
      2: {
          title: "Сертифікат «Діагностика та образно-тілесна терапія» (1)",
          text: `
              <p><b>Навчальний курс:</b> Діагностика та образно-тілесна терапія психосоматичних розладів</p>
              <p><b>Кількість годин:</b> 54 години</p>
          `,
          image: "images/obrazovanie2.jpg"
      },
      3: {
          title: "Сертифікат «Діагностика та образно-тілесна терапія» (2)",
          text: `
              <p><b>Навчальний курс:</b> Діагностика та образно-тілесна терапія психосоматичних розладів</p>
              <p><b>Кількість годин:</b> 52 години</p>
          `,
          image: "images/obrazovanie4.jpg"
      },
      4: {
          title: "Сертифікат «КПТ+»",
          text: `
              <p><b>Навчальна програма:</b> КПТ+. Базові техніки КПТ для консультування та коучингу</p>
              <p><b>Організація:</b> Український інститут когнітивно-поведінкової терапії</p>
              <p><b>Кількість годин:</b> 170 годин</p>
          `,
          image: "images/obrazovanie3.jpg"
      },
      5: {
          title: "Сертифікат «Клуб турботи про себе 2.0»",
          text: `
              <p><b>Навчальна програма:</b> Підвищення кваліфікації</p>
              <p><b>Організація:</b> Спільнота сучасних учителів і психологів, ЮНЕСКО</p>
              <p><b>Кількість годин:</b> 12 годин</p>
          `,
          image: "images/obrazovanie5.jpg"
      }
  };
  
  diplomaCards.forEach(card => {
      card.addEventListener('click', () => {
          const diplomaId = card.dataset.diploma;
          const data = diplomasData[diplomaId];
          
          modalContent.innerHTML = `
              <div class="modal-image">
                  <img src="${data.image}" alt="${data.title}">
              </div>
              <div class="modal-text">
                  <h3>${data.title}</h3>
                  ${data.text}
              </div>
          `;
          modal.style.display = "block";
      });
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
  });

  window.addEventListener('click', (event) => {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });

});

const issuesListObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const listItems = entry.target.querySelectorAll('.animated-list-item');
      listItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('is-visible');
        }, index * 100);
      });
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
});

const issuesList = document.querySelector('.animated-issues-list');
if (issuesList) {
  issuesListObserver.observe(issuesList);
}