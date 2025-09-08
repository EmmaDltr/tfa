import './app.scss';


import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

const btn = document.querySelector('.header__menu-btn');
const menu = document.querySelector('.header__menu');

//on load visiblity menu after 1 second
window.addEventListener('load', () => {
  setTimeout(() => {
    if (menu) {
      menu.style.visibility = 'visible';
    }
  }, 500);

  const pre = document.getElementById('preloader');
  pre.classList.add('hidden');
  // optionnel : supprimer du DOM après la transition
  setTimeout(() => pre.remove(), 600);


  btn.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      btn.classList.remove('active');
      menu.classList.remove('active');
    } else {
      btn.classList.add('active');
      menu.classList.add('active');
    }
  });

  const links = document.querySelectorAll('.menu__links');

  links.forEach(link => {
    link.addEventListener('click', (event) => {

      event.preventDefault();

      btn.classList.remove('active');
      menu.classList.remove('active');

      //scroll to the section
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetId,
            offsetY: 0
          },
          ease: "power2.inOut"
        });
      }
      // Close the menu on mobile

    });
  }
  );

  const hour = document.getElementById("hour");
  const time = document.getElementById("time");

  function updateClock() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours >= 4 && hours < 12) {
      time.innerHTML = 'Morning';
    } else if (hours >= 12 && hours < 17) {
      time.innerHTML = 'Afternoon';
    } else {
      time.innerHTML = 'Evening';
    }
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    hour.innerHTML = `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  function startClockOnExactMinute() {
    updateClock();

    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Lancer exactement au début de la prochaine minute
    setTimeout(() => {
      updateClock();
      setInterval(updateClock, 60 * 1000); // toutes les minutes pile
    }, msToNextMinute);
  }

  startClockOnExactMinute();

  const wrapper = document.querySelector(".scroll-wrapper");
  const snap = 1 + document.querySelectorAll(".panel").length;
  if (window.innerWidth >= 1024 && wrapper) {
    gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: "#horizontal-scroll",
        start: "top top",
        end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / (snap - 1),
          duration: 0.5,
          delay: 0.001,
          ease: "power1.inOut"
        }
      }
    });
  }

  let splitAbout = SplitText.create(".about__text", { type: "chars" });
  if (splitAbout) {
    gsap.from(splitAbout.chars, {
      opacity: 0,
      y: 20,
      stagger: {
        amount: 1.5
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about",
        start: "top 80%"
      }
    });
  }

  let splitProjects = SplitText.create(".projects__title", { type: "words" });
  if (splitProjects) {
    gsap.from(splitProjects.words, {
      opacity: 0,
      y: 20,
      stagger: {
        amount: 0.5
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects",
        start: "top 80%"
      }
    });
  }

  let splitPixel = SplitText.create(".pixel__title", { type: "words" });

  if (splitPixel) {
    gsap.from(splitPixel.words, {
      opacity: 0,
      y: 20,
      stagger: {
        amount: 0.5
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".pixel",
        start: "top 80%"
      }
    });
  }

  let pixelContent = document.querySelectorAll(".pixel__item");

  pixelContent.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: `${index % 2 === 0 ? -50 : 50}px`,
      stagger: {
        amount: 0.5
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%"
      }
    });

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  gsap.fromTo(".hero__content", {
    opacity: 0,
    scale: 0.1,
  }, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%"
    }
  })

  let hourSplit = SplitText.create(".hero__hour", { type: "chars" });

  if (hourSplit) {
    gsap.from(hourSplit.chars, {
      opacity: 0,
      y: 20,
      stagger: {
        amount: 1
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%"
      }
    });
  }
});

