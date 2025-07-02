// 로딩 화면
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1500);
});

// 타이핑 애니메이션 - 60타 수준
function typeWriter() {
    const text = "미래를 연결하는 기술";
    const element = document.getElementById('typingText');
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 80); // 80ms로 60타 수준
        } else {
            element.classList.add('typing-text');
        }
    }
    
    setTimeout(type, 1000);
}

// 스크롤 인디케이터
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
}

// 카운터 애니메이션
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const targets = ['500+', '98%', '50+', '24/7'];
    
    counters.forEach((counter, index) => {
        const target = targets[index];
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numValue = parseInt(target);
        
        let current = 0;
        const increment = numValue / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isPlus && current >= numValue) displayValue += '+';
            if (target === '24/7') displayValue = '24/7';
            
            counter.textContent = displayValue;
            counter.classList.add('counting');
            
            setTimeout(() => counter.classList.remove('counting'), 100);
        }, 50);
    });
}

// 플로팅 채팅 버튼
document.addEventListener('DOMContentLoaded', function() {
    const floatingChat = document.getElementById('floatingChat');
    if (floatingChat) {
        floatingChat.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                alert('💬 안녕하세요! 프로젝트 상담을 도와드리겠습니다.\n\n📞 전화: 02-1234-5678\n📧 이메일: info@nexustech.co.kr\n\n지금 바로 연락주세요!');
            }, 150);
        });
    }
});

// 포트폴리오 아이템 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`🎯 ${title}\n\n이런 수준의 프로젝트를 개발해드릴 수 있습니다!\n상세한 상담을 원하시면 연락주세요.`);
        });
    });
});

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // 통계 섹션이 보이면 카운터 애니메이션 시작
            if (entry.target.querySelector('.stat-number') && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                setTimeout(animateCounters, 300);
            }
        }
    });
}, observerOptions);

// 관찰 대상 요소들 등록
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
    updateScrollProgress();
    
    // 헤더 배경 변경
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// 폼 제출
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = '전송 중...';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.opacity = '1';
                alert('✅ 상담 요청이 성공적으로 접수되었습니다!\n\n빠른 시일 내에 담당자가 연락드리겠습니다.\n감사합니다! 🙏');
                
                // 폼 초기화
                this.reset();
            }, 2000);
        });
    }
});

// 버튼 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) return;
            
            if (this.type !== 'submit') {
                this.classList.add('loading');
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });
});

// 서비스 카드 균등 높이 조정
function adjustServiceCardHeights() {
    const cards = document.querySelectorAll('.service-card');
    if (window.innerWidth > 768) {
        let maxHeight = 0;
        
        // 모든 카드의 높이를 초기화
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // 최대 높이 찾기
        cards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        
        // 모든 카드를 최대 높이로 설정
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    } else {
        // 모바일에서는 자동 높이
        cards.forEach(card => {
            card.style.height = 'auto';
        });
    }
}

// 창 크기 변경 시 높이 재조정
window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(adjustServiceCardHeights, 250);
});

// 페이지 로드 완료 시 높이 조정
window.addEventListener('load', function() {
    setTimeout(adjustServiceCardHeights, 100);
});

// 초기화
window.addEventListener('load', function() {
    typeWriter();
    updateScrollProgress();
});

// 개발자 이스터에그
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        alert('🚀 NEXUS TECH 개발팀이 만든 웹사이트입니다!\n\n이런 퀄리티의 사이트를 원하시나요?\n지금 바로 상담받아보세요!');
    }
});

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
});

// 터치 디바이스 최적화
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 디바운스 적용
const debouncedScrollHandler = debounce(function() {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// 페이지 가시성 API를 사용한 성능 최적화
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 페이지가 숨겨졌을 때 애니메이션 일시정지
        document.querySelectorAll('.artifact, .particle, .hub-core').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // 페이지가 다시 보일 때 애니메이션 재개
        document.querySelectorAll('.artifact, .particle, .hub-core').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// 브라우저 호환성 확인
function checkBrowserSupport() {
    const features = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--css-custom-properties', 'inherit'),
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)')
    };
    
    // 필수 기능이 지원되지 않는 경우 경고
    if (!features.flexbox || !features.grid) {
        console.warn('이 브라우저는 일부 기능을 지원하지 않을 수 있습니다. 최신 브라우저 사용을 권장합니다.');
    }
}

// 브라우저 지원 확인 실행
document.addEventListener('DOMContentLoaded', checkBrowserSupport);

// 메모리 누수 방지: 이벤트 리스너 정리
window.addEventListener('beforeunload', function() {
    // 타이머 정리
    if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
    }
    
    // 옵저버 정리
    if (observer) {
        observer.disconnect();
    }
});

console.log('🚀 NEXUS TECH 웹사이트가 성공적으로 로드되었습니다!');
