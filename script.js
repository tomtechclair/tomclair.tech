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
    // Créer une alerte stylisée et détaillée pour la mise à jour du weekend
    var alertDiv = document.createElement('div');
    alertDiv.id = 'weekendAlert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <div class="alert-header">
                <div class="alert-icon">
                    <i class="fa-solid fa-bell"></i>
                </div>
                <div class="alert-title">
                    <h2>🚀 MISE À JOUR WEEKEND !</h2>
                    <p>Nouvelles fonctionnalités et améliorations majeures</p>
                </div>
                <button class="alert-close" onclick="closeWeekendAlert()">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="alert-details">
                <div class="feature-list">
                    <div class="feature-item">
                        <i class="fa-solid fa-sparkles"></i>
                        <span>Interface utilisateur complètement repensée</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-rocket"></i>
                        <span>Performance optimisée et chargement ultra-rapide</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Sécurité renforcée et protection des données</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-mobile-alt"></i>
                        <span>Expérience mobile 100% responsive</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-code"></i>
                        <span>Nouvelles fonctionnalités avancées</span>
                    </div>
                </div>
                <div class="alert-footer">
                    <div class="alert-timing">
                        <i class="fa-solid fa-clock"></i>
                        <span>Déploiement : Samedi et Dimanche</span>
                    </div>
                    <div class="alert-cta">
                        <button class="alert-btn" onclick="closeWeekendAlert()">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <span>Super !</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les styles CSS améliorés
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #7c3aed 100%);
        color: white;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 212, 255, 0.5);
        z-index: 10000;
        max-width: 500px;
        min-width: 400px;
        animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        font-family: 'Rajdhani', sans-serif;
    `;
    
    // Ajouter le CSS pour l'animation améliorée
    var style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(120%);
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
                transform: translateX(120%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
            50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.8); }
        }
        
        #weekendAlert .alert-content {
            padding: 0;
            position: relative;
        }
        
        #weekendAlert .alert-header {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 25px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px 20px 0 0;
        }
        
        #weekendAlert .alert-icon {
            font-size: 32px;
            animation: pulse 2s infinite, glow 3s infinite;
            background: rgba(255, 255, 255, 0.2);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #weekendAlert .alert-title h2 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 900;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1.2;
        }
        
        #weekendAlert .alert-title p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
            line-height: 1.4;
            font-weight: 500;
        }
        
        #weekendAlert .alert-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 18px;
        }
        
        #weekendAlert .alert-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg) scale(1.1);
        }
        
        #weekendAlert .alert-details {
            padding: 20px 25px;
        }
        
        #weekendAlert .feature-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        #weekendAlert .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        #weekendAlert .feature-item:last-child {
            border-bottom: none;
        }
        
        #weekendAlert .feature-item:hover {
            transform: translateX(5px);
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding-left: 10px;
        }
        
        #weekendAlert .feature-item i {
            font-size: 18px;
            color: #00ff88;
            min-width: 20px;
        }
        
        #weekendAlert .feature-item span {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
        }
        
        #weekendAlert .alert-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 0 0 20px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        #weekendAlert .alert-timing {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            opacity: 0.8;
        }
        
        #weekendAlert .alert-timing i {
            color: #00ff88;
        }
        
        #weekendAlert .alert-btn {
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 14px;
        }
        
        #weekendAlert .alert-btn:hover {
            background: rgba(0, 255, 136, 0.3);
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }
        
        @media (max-width: 768px) {
            #weekendAlert {
                top: 60px;
                right: 10px;
                left: 10px;
                max-width: none;
                min-width: auto;
            }
            
            #weekendAlert .alert-header {
                padding: 20px;
                gap: 15px;
            }
            
            #weekendAlert .alert-icon {
                width: 50px;
                height: 50px;
                font-size: 24px;
            }
            
            #weekendAlert .alert-title h2 {
                font-size: 20px;
            }
            
            #weekendAlert .alert-title p {
                font-size: 14px;
            }
            
            #weekendAlert .alert-details {
                padding: 15px 20px;
            }
            
            #weekendAlert .feature-item {
                gap: 10px;
            }
            
            #weekendAlert .feature-item span {
                font-size: 13px;
            }
            
            #weekendAlert .alert-footer {
                flex-direction: column;
                gap: 15px;
                padding: 15px 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alertDiv);
    
    // Plus de fermeture automatique - l'utilisateur doit cliquer sur "Super"
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
