// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
	cursor.style.left = e.clientX + 'px';
	cursor.style.top = e.clientY + 'px';
});

// Add hover effect to links and buttons
const hoverElements = document.querySelectorAll('a, button, .service-card, .case-card, .social-link, .faq-item');
hoverElements.forEach(el => {
	el.addEventListener('mouseenter', () => {
		cursor.classList.add('hover');
	});
	el.addEventListener('mouseleave', () => {
		cursor.classList.remove('hover');
	});
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	// Play click sound effect
});

// Generate code background
const codeBg = document.getElementById('codeBackground');

// Scroll animations
gsap.registerPlugin(ScrollTrigger);

// Hero parallax
gsap.to(codeBg, {
	y: '-=100',
	scrollTrigger: {
		trigger: '.hero',
		start: 'top top',
		end: 'bottom top',
		scrub: true
	}
});

// Animate about text
document.querySelectorAll('.about-text').forEach((text, index) => {
	gsap.to(text, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		delay: index * 0.3,
		scrollTrigger: {
			trigger: text,
			start: 'top 80%'
		}
	});
});

// Animate on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => {
	gsap.to(el, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		scrollTrigger: {
			trigger: el,
			start: 'top 85%'
		}
	});
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
	nav.classList.toggle('active');
	menuToggle.classList.toggle('active');

	// Плавная анимация меню
	if (nav.classList.contains('active')) {
		gsap.to(mobileMenu, {
			height: 'auto',
			opacity: 1,
			duration: 0.3,
			ease: 'power1.inOut'
		});
	} else {
		gsap.to(mobileMenu, {
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: 'power1.inOut'
		});
	}
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('nav a').forEach(link => {
	link.addEventListener('click', () => {
		// Закрываем меню только если оно активно (мобильное открыто)
		if (nav.classList.contains('active')) {
			nav.classList.remove('active');
			menuToggle.classList.remove('active');
			gsap.to(mobileMenu, {
				height: 0,
				opacity: 0,
				duration: 0.3
			});
		}
	});
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
	contactForm.reset();
});

// Button micro-interactions
const buttons = document.querySelectorAll('button, .cta-button');
buttons.forEach(button => {
	button.addEventListener('mousedown', () => {
		gsap.to(button, {
			scale: 0.95,
			duration: 0.1
		});
	});
	button.addEventListener('mouseup', () => {
		gsap.to(button, {
			scale: 1,
			duration: 0.1
		});
	});
	button.addEventListener('mouseenter', () => {
		gsap.to(button, {
			keyframes: [
				{ rotation: -1, duration: 0.05 },
				{ rotation: 1, duration: 0.05 },
				{ rotation: 0, duration: 0.05 }
			]
		});
	});
});


// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
	const question = item.querySelector('.faq-question');
	question.addEventListener('click', () => {
		item.classList.toggle('active');

		// Play click sound effect
	});
});

// Добавляем в конец файла

// Process steps animation
const processSteps = document.querySelectorAll('.process-step');

function animateProcessSteps() {
	processSteps.forEach((step, index) => {
		gsap.to(step, {
			scrollTrigger: {
				trigger: step,
				start: 'top 90%',
				onEnter: () => {
					step.classList.add('active');

					// Анимация иконки
					const icon = step.querySelector('.step-icon');
					gsap.from(icon, {
						scale: 0.2,
						rotation: index % 2 === 0 ? -180 : 180,
						duration: 0.8,
						ease: 'elastic.out(1, 0.5)'
					});

					// Пиксельный эффект
					const pixel = step.querySelector('.step-pixel');
					gsap.from(pixel, {
						opacity: 0,
						duration: 0.6,
						delay: 0.3,
						ease: 'power2.out'
					});
				}
			}
		});
	});
}

// Инициализация после загрузки
window.addEventListener('load', () => {
	animateProcessSteps();
});

// Добавить в конец файла deep.js

// Stats counter animation
function animateStats() {
	const statNumbers = document.querySelectorAll('.stat-number');
	statNumbers.forEach(number => {
		const target = +number.getAttribute('data-count');
		const duration = 2000; // ms
		const startTime = performance.now();
		const startValue = 0;

		const updateCounter = (currentTime) => {
			const elapsedTime = currentTime - startTime;
			if (elapsedTime < duration) {
				const progress = elapsedTime / duration;
				const currentValue = Math.floor(progress * target);
				number.textContent = currentValue + (target > 50 ? '+' : '');
				requestAnimationFrame(updateCounter);
			} else {
				number.textContent = target + (target > 50 ? '+' : '');
			}
		};

		requestAnimationFrame(updateCounter);
	});
}

// Инициализация после загрузки
window.addEventListener('load', () => {
	// Запускаем счетчики при появлении в области видимости
	gsap.to('.stats', {
		scrollTrigger: {
			trigger: '.stats',
			start: 'top 80%',
			onEnter: animateStats,
			once: true
		}
	});
});

// // Testimonials slider
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = testimonialCards.length;

function updateSlider() {
	testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

	testimonialCards.forEach((card, index) => {
		if (index === currentIndex) {
			card.classList.add('active');
		} else {
			card.classList.remove('active');
		}
	});

	dots.forEach((dot, index) => {
		if (index === currentIndex) {
			dot.classList.add('active');
		} else {
			dot.classList.remove('active');
		}
	});
}

prevBtn.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
	updateSlider();
});

nextBtn.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % totalSlides;
	updateSlider();
});

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		currentIndex = index;
		updateSlider();
	});
});

// Auto slide every 5 seconds
setInterval(() => {
	currentIndex = (currentIndex + 1) % totalSlides;
	updateSlider();
}, 5000);

// Initialize slider
updateSlider();
// Добавить в конец deep.js

function initTrustedAnimation() {
	const track = document.querySelector('.trusted-track');
	if (!track) return;

	// Рассчитываем ширину одного элемента + отступ
	const itemWidth = 180; // соответствует CSS ширине trusted-item
	const gap = 32; // соответствует gap в CSS

	// Клонируем все элементы для бесконечной анимации
	const items = track.querySelectorAll('.trusted-item');
	items.forEach(item => {
		const clone = item.cloneNode(true);
		track.appendChild(clone);
	});

	// Общая ширина оригинальных элементов (без клонов)
	const totalWidth = (itemWidth + gap) * items.length;

	// Создаем анимацию GSAP
	const animation = gsap.to(track, {
		x: -totalWidth,
		duration: 20,
		ease: "none",
		repeat: -1,
		modifiers: {
			x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
		}
	});

	// Останавливаем анимацию по умолчанию
	animation.pause();

	// Переменная для хранения последнего направления скролла
	let lastScrollDirection = 0;
	let lastScrollY = window.scrollY;

	// Обработчик скролла
	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;
		const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;

		// Обновляем направление только если оно изменилось
		if (scrollDirection !== lastScrollDirection) {
			lastScrollDirection = scrollDirection;

			// Изменяем направление анимации
			gsap.to(track, {
				timeScale: scrollDirection,
				duration: 0.5,
				ease: "power2.out"
			});

			// Запускаем анимацию, если она была остановлена
			if (animation.paused()) {
				animation.play();
			}
		}

		lastScrollY = currentScrollY;
	});

	// Запускаем анимацию при загрузке
	animation.play();
}

// Инициализация после загрузки
window.addEventListener('load', initTrustedAnimation);

// Emoji floating animation
gsap.to(".emoji-wrapper", {
  y: 30,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

function highlight(code) {
  // Keywords
  code = code.replace(/\b(function|return)\b/g, 
    '<span class="token keyword">$1</span>');
  
  // Strings
  code = code.replace(/(".*?"|'.*?')/g, 
    '<span class="token string">$1</span>');
  
  // Array brackets
  code = code.replace(/\[|\]/g,
    '<span class="token punctuation">$&</span>');
  
  // Method calls
  code = code.replace(/\.([a-zA-Z_]+)/g,
    '.<span class="token function">$1</span>');
  
  return code;
}