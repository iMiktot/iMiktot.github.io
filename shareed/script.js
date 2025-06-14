document.addEventListener("DOMContentLoaded", () => {
  // Навигация по странице
  const sections = document.querySelectorAll(".section, .hero");
  const dotsContainer = document.querySelector(".dots");
  const upBtn = document.querySelector(".arrow.up");
  const downBtn = document.querySelector(".arrow.down");
  const navLinks = document.querySelectorAll(".top-nav a");
  let current = 0;

  // Создание навигационных точек
  sections.forEach((_, i) => {
    const li = document.createElement("li");
    if (i === 0) li.classList.add("active");
    li.addEventListener("click", () => scrollToSection(i));
    dotsContainer.appendChild(li);
  });

  const dots = document.querySelectorAll(".dots li");

  // Прокрутка к секции
  function scrollToSection(i) {
    sections[i].scrollIntoView({ behavior: "smooth" });
    updateActive(i);
  }

  // Обновление активной точки
  function updateActive(i) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
    current = i;
    
    if (navLinks.length) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[i].classList.add("active");
    }
  }

  // Обработчики кнопок навигации
  upBtn.addEventListener("click", () => current > 0 && scrollToSection(current - 1));
  downBtn.addEventListener("click", () => current < sections.length - 1 && scrollToSection(current + 1));

  // Обработчики ссылок навигации
  if (navLinks.length) {
    navLinks.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(i);
      });
    });
  }

  // Определение активной секции при скролле
  window.addEventListener("scroll", () => {
    let index = current;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        index = i;
      }
    });
    if (index !== current) updateActive(index);
  });

  // Анимация элементов при появлении
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
  }, { threshold: 0.1 });

  document.querySelectorAll(".section h2, .section p, .contact-form, .btn-group, .review").forEach(el => {
    observer.observe(el);
  });

  // Анимация фруктов
  function shuffleFruits() {
    document.querySelectorAll(".fruits").forEach(container => {
      const fruits = Array.from(container.children);
      for (let i = fruits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(fruits[j]);
      }
    });
  }
  setInterval(shuffleFruits, 5000);
  shuffleFruits();
  
  // Галерея с эффектом переноса миниатюр
  const gallery = document.querySelector('.circle-gallery-figma');
  if (gallery) {
    const thumbs = gallery.querySelectorAll('.thumb');
    const overlay = document.getElementById('thumb-overlay-container');
    
    if (thumbs && overlay) {
      thumbs.forEach(thumb => {
        thumb.addEventListener('mouseenter', () => {
          const rect = thumb.getBoundingClientRect();
          const clone = thumb.cloneNode(true);
          
          Object.assign(clone.style, {
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            zIndex: 1000,
            transition: 'all 0.4s ease',
            pointerEvents: 'none'
          });
          
          requestAnimationFrame(() => {
            const galleryRect = gallery.getBoundingClientRect();
            Object.assign(clone.style, {
              top: `${galleryRect.top}px`,
              left: `${galleryRect.left}px`,
              width: `${gallery.offsetWidth}px`,
              height: `${gallery.offsetHeight}px`,
              borderRadius: '0'
            });
          });
          
          overlay.innerHTML = '';
          overlay.appendChild(clone);
        });
        
        thumb.addEventListener('mouseleave', () => overlay.innerHTML = '');
      });
    }
  }

  // Анимация таблицы в разделе "О нас"
  const aboutGrid = document.getElementById('about-grid');
  const aboutLines = document.getElementById('about-lines');
  const tableDividers = document.querySelectorAll('.table-divider');
  
  if (aboutGrid && aboutLines && tableDividers.length) {
    const colors = ['#A5D95A', '#C2512F', '#2C593D'];
    
    // Создание ячеек таблицы 2x3
    for (let i = 0; i < 6; i++) {
      const cell = document.createElement('div');
      cell.className = 'about-animation-cell';
      
      const square = document.createElement('div');
      square.className = 'about-animation-square';
      cell.appendChild(square);
      
      aboutGrid.appendChild(cell);
    }
    
    const squares = document.querySelectorAll('.about-animation-square');
    
    // Обновление цветных квадратов
    function updateSquares() {
      squares.forEach(sq => sq.classList.remove('active'));
      
      const selectedIndices = [];
      while (selectedIndices.length < 3) {
        const idx = Math.floor(Math.random() * 6);
        if (!selectedIndices.includes(idx)) {
          selectedIndices.push(idx);
        }
      }
      
      selectedIndices.forEach(idx => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        squares[idx].style.backgroundColor = color;
        squares[idx].classList.add('active');
      });
    }
    
    // Создание линий для таблицы
    function createLines() {
      // Удаляем старые линии
      document.querySelectorAll('.animation-line').forEach(el => el.remove());
      
      // Создаем новые линии на основе разделителей
      tableDividers.forEach(divider => {
        const isHorizontal = divider.classList.contains('horizontal-divider');
        const rect = divider.getBoundingClientRect();
        const containerRect = aboutLines.getBoundingClientRect();
        
        const line = document.createElement('div');
        line.className = `animation-line ${isHorizontal ? 'horizontal-line' : 'vertical-line'}`;
        
        // Позиционируем линию точно на разделителе
        if (isHorizontal) {
          // Горизонтальные линии - выходят вверх
          line.style.left = `${rect.left - containerRect.left + window.scrollX}px`;
          line.style.top = `${rect.top - containerRect.top}px`;
          line.style.width = '1px';
          line.style.height = '0';
        } else {
          // Вертикальные линии - выходят вправо
          line.style.left = `${rect.left - containerRect.left}px`;
          line.style.top = `${rect.top - containerRect.top}px`;
          line.style.width = '0';
          line.style.height = '1px';
        }
        
        aboutLines.appendChild(line);
        
        // Запускаем анимацию после добавления в DOM
        requestAnimationFrame(() => {
          if (isHorizontal) {
            line.style.height = '100vh';
            line.style.transform = 'translateY(-100%)';
          } else {
            line.style.width = '100vw';
            line.style.transform = 'translateX(100%)';
          }
          line.style.opacity = '0';
        });
        
        // Удаляем линию после завершения анимации
        setTimeout(() => {
          if (line.parentNode) line.parentNode.removeChild(line);
        }, 2000);
      });
    }
	
		// В функции createLines() добавить адаптивность:
	function createLines() {
	  // ... существующий код ...
	  
	  tableDividers.forEach(divider => {
		const isHorizontal = divider.classList.contains('horizontal-divider');
		const rect = divider.getBoundingClientRect();
		const containerRect = aboutLines.getBoundingClientRect();
		
		// Адаптивное позиционирование для мобильных
		const leftOffset = window.innerWidth < 834 ? 
		  rect.left - containerRect.left + window.scrollX - 50 :
		  rect.left - containerRect.left + window.scrollX;
		
		// ... остальной код ...
		
		if (isHorizontal) {
		  line.style.left = `${leftOffset}px`;
		  // ... 
		} else {
		  line.style.left = `${leftOffset}px`;
		  // ...
		}
	  });
	}
    
    // Инициализация
    updateSquares();
    
    // Запускаем создание линий
    const createLineInterval = setInterval(createLines, 500);
    setInterval(updateSquares, 3000);
    
    // Остановка анимации при скрытии раздела
    const section3 = document.getElementById('section-3');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createLines();
          if (!createLineInterval) {
            createLineInterval = setInterval(createLines, 500);
          }
        } else {
          clearInterval(createLineInterval);
          createLineInterval = null;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section3);
  }
  
    // Анимация линий в разделе отзывов
  const reviewSection = document.getElementById('section-6');
  const bottomLeftAnim = document.querySelector('.review-animation.bottom-left');
  const topRightAnim = document.querySelector('.review-animation.top-right');
  
  if (reviewSection && bottomLeftAnim && topRightAnim) {
    // Создание линий
    function createReviewLines() {
      // Линии в нижнем левом углу (движутся вверх)
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'review-line';
          
          // Случайная позиция в пределах контейнера
          const leftPos = Math.random() * 100;
          line.style.left = `${leftPos}%`;
          
          bottomLeftAnim.appendChild(line);
          
          // Удаление после завершения анимации
          setTimeout(() => {
            if (line.parentNode) line.parentNode.removeChild(line);
          }, 3000);
        }, i * 800);
      }
      
      // Линии в верхнем правом углу (движутся вниз)
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'review-line';
          
          // Случайная позиция в пределах контейнера
          const rightPos = Math.random() * 100;
          line.style.left = `${rightPos}%`;
          
          topRightAnim.appendChild(line);
          
          // Удаление после завершения анимации
          setTimeout(() => {
            if (line.parentNode) line.parentNode.removeChild(line);
          }, 3000);
        }, i * 800 + 400);
      }
    }
    
    // Запуск анимации
    createReviewLines();
    setInterval(createReviewLines, 3000);
    
    // Остановка при скрытии раздела
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createReviewLines();
          if (!animationInterval) {
            animationInterval = setInterval(createReviewLines, 3000);
          }
        } else {
          clearInterval(animationInterval);
          animationInterval = null;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(reviewSection);
  }
});