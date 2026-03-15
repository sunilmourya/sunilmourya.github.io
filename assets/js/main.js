document.addEventListener('DOMContentLoaded', function () {

    // ─── Mobile menu ───
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    // ─── Reading progress bar ───
    const bar = document.getElementById('readingProgress');
    if (bar) {
        window.addEventListener('scroll', function () {
            const doc    = document.documentElement;
            const scroll = doc.scrollTop || document.body.scrollTop;
            const height = doc.scrollHeight - doc.clientHeight;
            bar.style.width = (height > 0 ? (scroll / height) * 100 : 0) + '%';
        }, { passive: true });
    }

    // ─── Highlight active nav link ───
    const path  = window.location.pathname;
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(function (a) {
        if (a.getAttribute('href') === path ||
            (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
            a.classList.add('active');
        }
    });

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});