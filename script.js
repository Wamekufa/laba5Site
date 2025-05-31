document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Фиксированная шапка при прокрутке
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }
        
        if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Модальные окна
    const loginModal = document.getElementById('login-modal');
    const applyModal = document.getElementById('apply-modal');
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const applyBtn = document.getElementById('apply-btn');
    const videoBtn = document.getElementById('video-btn');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal(loginModal));
    }
    
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            openModal(loginModal);
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => openModal(applyModal));
    }
    
    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            // Здесь можно добавить открытие видео
            alert('Здесь будет воспроизведение видео о колледже');
        });
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Фильтрация специальностей
    const tabButtons = document.querySelectorAll('.tab-btn');
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.getAttribute('data-tab');
            
            // Показываем/скрываем карточки в зависимости от категории
            specialtyCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Лайки для новостей
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff6b6b';
                
                // Увеличиваем счетчик
                const count = parseInt(this.textContent.trim());
                this.innerHTML = `<i class="fas fa-heart"></i> ${count + 1}`;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                
                // Уменьшаем счетчик
                const count = parseInt(this.textContent.trim());
                this.innerHTML = `<i class="far fa-heart"></i> ${count - 1}`;
            }
        });
    });
    
    // Отправка форм
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить AJAX-запрос для отправки формы
            if (this.classList.contains('subscribe-form')) {
                alert('Спасибо за подписку!');
                this.reset();
            } else if (this.classList.contains('auth-form')) {
                alert('Форма входа отправлена');
                closeModal(loginModal);
            } else if (this.classList.contains('apply-form')) {
                alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
                closeModal(applyModal);
                this.reset();
            } else if (this.classList.contains('contact-form')) {
                alert('Ваше сообщение отправлено. Спасибо!');
                this.reset();
            }
        });
    });
});