window.addEventListener('load', function() {
    showWeekendUpdateAlert();
    initScrollProgress();
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initFAQ();
    initSmoothScroll();
});

function showWeekendUpdateAlert() {
    // Créer une alerte stylisée pour la mise à jour du weekend
    var alertDiv = document.createElement('div');
    alertDiv.id = 'weekendAlert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">
                <i class="fa-solid fa-bell"></i>
            </div>
            <div class="alert-text">
                <h3>🚀 Mise à Jour Weekend !</h3>
                <p>Nouvelles fonctionnalités et améliorations arrivent ce weekend sur tomclair.tech !</p>
            </div>
            <button class="alert-close" onclick="closeWeekendAlert()">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `;
    
    // Ajouter les styles CSS
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
        color: white;
        padding: 0;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Ajouter le CSS pour l'animation
    var style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        #weekendAlert .alert-content {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            position: relative;
        }
        
        #weekendAlert .alert-icon {
            font-size: 24px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        #weekendAlert .alert-text h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
            font-weight: 700;
            color: white;
        }
        
        #weekendAlert .alert-text p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
            line-height: 1.4;
        }
        
        #weekendAlert .alert-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        #weekendAlert .alert-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
            #weekendAlert {
                top: 80px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            #weekendAlert .alert-content {
                padding: 15px;
                gap: 10px;
            }
            
            #weekendAlert .alert-icon {
                font-size: 20px;
            }
            
            #weekendAlert .alert-text h3 {
                font-size: 14px;
            }
            
            #weekendAlert .alert-text p {
                font-size: 12px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alertDiv);
    
    // Fermeture automatique après 8 secondes
    setTimeout(function() {
        closeWeekendAlert();
    }, 8000);
}

function closeWeekendAlert() {
    var alert = document.getElementById('weekendAlert');
    if (alert) {
        alert.style.animation = 'slideOutRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(function() {
            alert.remove();
        }, 600);
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
