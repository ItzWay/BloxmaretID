document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey &&
      e.shiftKey &&
      ["I", "J", "C", "E"].includes(String.fromCharCode(e.keyCode))) ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) ||
    (e.ctrlKey && e.keyCode === "S".charCodeAt(0))
  ) {
    e.preventDefault();
    return false;
  }
};
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

function updateCopyright() {
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const element = document.getElementById('copyright');
  if (element) {
    element.textContent = `© 2025 Bloxmaret ID. All rights reserved. Itzway | ${formattedTime}`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  updateCopyright();
  setInterval(updateCopyright, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    } else {
      mobileMenu.classList.add('open');
      mobileMenu.style.height = `${mobileMenu.scrollHeight}px`;
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuButton.classList.remove('active');
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
  
    highlightCurrentSection();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        targetSection.classList.add('section-highlight');
        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 1000);
      }
    });
  });

  function highlightCurrentSection() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
  });

  highlightCurrentSection();
  
  setTimeout(() => {
    const headerText = document.querySelector('.text-6xl');
    if (headerText) {
      headerText.style.opacity = 1;
      headerText.style.transform = 'translateY(0)';
    }
  }, 300);

});
