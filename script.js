// 粒子效果配置
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#4ecdc4'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff6b6b',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// 自定义光标效果
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 平滑跟随效果
function animate() {
    // 主光标
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // 跟随光标
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animate);
}
animate();

// 悬停效果
const hoverElements = document.querySelectorAll('a, button, .magic-tag, .magic-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
    });
});

// 滚动动画
const scrollElements = document.querySelectorAll('.magic-title, .typing-text, .magic-button, .about-content, .magic-card, .magic-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

scrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 打字机效果
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// 当元素进入视口时开始打字效果
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            typingObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

typingObserver.observe(typingText);

// 3D卡片效果
const cards = document.querySelectorAll('.magic-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// 魔法火花效果
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'magic-sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animation = `sparkle ${Math.random() * 2 + 1}s linear forwards`;
    document.querySelector('.magic-sparkles').appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

setInterval(createSparkle, 500);

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}); 