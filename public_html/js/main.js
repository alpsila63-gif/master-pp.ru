document.addEventListener('DOMContentLoaded', function() {

    // === Header scroll effect ===
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // === Burger menu ===
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav__link').forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // === Service tabs ===
    const tabs = document.querySelectorAll('.services__tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');

            document.querySelectorAll('.services__content').forEach(function(content) {
                content.classList.remove('active');
            });

            var tabId = 'tab-' + tab.dataset.tab;
            var targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // === Phone mask ===
    var phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            var val = e.target.value.replace(/\D/g, '');
            var formatted = '';

            if (val.length > 0) {
                if (val[0] === '7' || val[0] === '8') {
                    formatted = '+7';
                    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
                    if (val.length > 4) formatted += ') ' + val.substring(4, 7);
                    if (val.length > 7) formatted += '-' + val.substring(7, 9);
                    if (val.length > 9) formatted += '-' + val.substring(9, 11);
                } else {
                    formatted = '+7 (' + val.substring(0, 3);
                    if (val.length > 3) formatted += ') ' + val.substring(3, 6);
                    if (val.length > 6) formatted += '-' + val.substring(6, 8);
                    if (val.length > 8) formatted += '-' + val.substring(8, 10);
                }
            }

            e.target.value = formatted;
        });
    }

    // === Form submit ===
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = (form.querySelector('input[name="name"]') || {}).value || '';
            var phone = (form.querySelector('input[name="phone"]') || {}).value || '';
            var message = (form.querySelector('textarea[name="message"]') || {}).value || '';
            var text = encodeURIComponent(
                'Новая заявка с сайта master-pp.ru\n' +
                'Имя: ' + (name || 'Не указано') + '\n' +
                'Телефон: ' + (phone || 'Не указан') + '\n' +
                'Задача: ' + (message || 'Не указана')
            );

            var wrapper = document.querySelector('.contact__form-wrapper');
            wrapper.innerHTML = '<div class="form-success">' +
                '<div class="form-success__icon">&#9989;</div>' +
                '<div class="form-success__title">Сообщение подготовлено</div>' +
                '<div class="form-success__text">Сейчас откроется WhatsApp с заполненной заявкой для мастера</div>' +
                '</div>';

            window.setTimeout(function() {
                window.open('https://wa.me/79771002262?text=' + text, '_blank', 'noopener');
            }, 350);
        });
    }

    // === Scroll animations ===
    var animatedElements = document.querySelectorAll(
        '.advantage, .service-card, .gallery__item, .pricing__table, .contact__card, .seo-copy__card, .blog-card, .faq__item, .sidebar-card'
    );

    animatedElements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
        observer.observe(el);
    });

    // === Smooth scroll for anchors ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
