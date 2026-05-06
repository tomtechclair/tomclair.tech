window.addEventListener('load', function() {
    initLoadingScreen();
    initScrollProgress();
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initFAQ();
    initSmoothScroll();
});

function initLoadingScreen() {
    var overlay = document.getElementById('loadingOverlay');
    var closeBtn = document.getElementById('loadingCloseBtn');
    
    if (!overlay) return;
    
    // Ajouter des animations premium au chargement
    var loadingContent = overlay.querySelector('.loading-content');
    var loadingText = overlay.querySelector('.loading-text');
    var loadingSubtext = overlay.querySelector('.loading-subtext');
    
    // Animation d'apparition progressive
    setTimeout(function() {
        if (loadingContent) {
            loadingContent.style.opacity = '0';
            loadingContent.style.transform = 'translateY(30px)';
            loadingContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(function() {
                loadingContent.style.opacity = '1';
                loadingContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }, 100);
    
    // Fermeture automatique après 2 secondes
    setTimeout(function() {
        overlay.classList.add('hidden');
        setTimeout(function() {
            overlay.style.display = 'none';
        }, 800);
    }, 2000);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            overlay.classList.add('hidden');
            setTimeout(function() {
                overlay.style.display = 'none';
            }, 800);
        });
    }
}

function initScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

function initBackToTop() {
    var backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(form);
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                submitBtn.textContent = 'Message envoyé !';
                form.reset();
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(function(error) {
            submitBtn.textContent = 'Erreur - Réessayez';
            submitBtn.disabled = false;
            setTimeout(function() {
                submitBtn.textContent = originalText;
            }, 3000);
        });
    });
}

function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        var icon = item.querySelector('.fa-chevron-down');
        
        question.addEventListener('click', function() {
            var isOpen = answer.style.display === 'block';
            
            // Close all other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            answer.style.display = isOpen ? 'none' : 'block';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
}

function initSmoothScroll() {
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                var offsetTop = targetSection.offsetTop - 80;
                
                // Animation premium avec easing personnalisé
                var startPosition = window.pageYOffset;
                var distance = offsetTop - startPosition;
                var duration = 1200; // 1.2 secondes
                var startTime = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animateScroll(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    var timeElapsed = currentTime - startTime;
                    var progress = Math.min(timeElapsed / duration, 1);
                    var easeProgress = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * easeProgress));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
                
                // Update active nav link avec animation
                navLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');
                
                // Ajouter un effet de pulse sur la section cible
                targetSection.style.animation = 'sectionPulse 0.6s ease-out';
                setTimeout(function() {
                    targetSection.style.animation = '';
                }, 600);
            }
        });
    });
}

function initMobileMenu() {
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        var navToggle = document.getElementById('navToggle');
        var navLinks = document.querySelector('.nav-links');
        if (navToggle && navLinks) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
