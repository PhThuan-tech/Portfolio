/**
 * ==========================================================================
 * PORTFOLIO AI - JAVASCRIPT LOGIC
 * Author: Pham Van Vuong Thuan (PhThuan-tech / VNU-UET)
 * Features:
 * 1. Bilingual i18n Engine (EN default, VI optional)
 * 2. Multi-theme Switcher (Dark / Light / Solar) with Dynamic Theme Colors
 * 3. Dynamic Scroll-Driven Fluid Wave Simulation
 * 4. Interactive Canvas Particle Physics
 * 5. Top Bar Scroll Progress Indicator
 * 6. Interactive AI Query Playground Simulator
 * 7. Architecture Pipeline Modal Viewer
 * 8. Recruiter FAQ Accordion
 * 9. 3D Tilt Hover Physics & Category Filtering
 * 10. Copy Email & Toast Feedback
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. BILINGUAL i18n ENGINE (EN default, VI)
       ========================================================================== */
    let currentLang = localStorage.getItem('portfolio-lang') || 'en';
    const langButtons = document.querySelectorAll('.lang-btn');

    function setLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        document.documentElement.setAttribute('lang', lang);

        langButtons.forEach(btn => {
            if (btn.getAttribute('data-set-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const translatables = document.querySelectorAll('[data-i18n]');
        translatables.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-set-lang');
            setLanguage(selectedLang);
        });
    });

    setLanguage(currentLang);


    /* ==========================================================================
       2. THEME SWITCHER (Dark / Light / Solar)
       ========================================================================== */
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-set-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (window.updateCanvasTheme) {
            window.updateCanvasTheme();
        }
        if (window.updateWaveTheme) {
            window.updateWaveTheme();
        }
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-set-theme');
            setTheme(selectedTheme);
        });
    });

    setTheme(savedTheme);


    /* ==========================================================================
       3. TOP BAR SCROLL PROGRESS INDICATOR
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    });


    /* ==========================================================================
       4. DYNAMIC SCROLL-DRIVEN FLUID WAVE ENGINE (Canvas 60FPS)
       ========================================================================== */
    const waveCanvas = document.getElementById('wave-canvas');
    if (waveCanvas) {
        const ctx = waveCanvas.getContext('2d');
        let width, height;
        let step = 0;
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;

        let waveColors = {
            c1: 'rgba(56, 189, 248, 0.22)',
            c2: 'rgba(99, 102, 241, 0.18)',
            c3: 'rgba(168, 85, 247, 0.12)'
        };

        function getWaveColors() {
            const style = getComputedStyle(document.documentElement);
            waveColors.c1 = style.getPropertyValue('--wave-color-1').trim() || waveColors.c1;
            waveColors.c2 = style.getPropertyValue('--wave-color-2').trim() || waveColors.c2;
            waveColors.c3 = style.getPropertyValue('--wave-color-3').trim() || waveColors.c3;
        }

        window.updateWaveTheme = getWaveColors;
        getWaveColors();

        function resizeWave() {
            width = waveCanvas.width = waveCanvas.parentElement.offsetWidth;
            height = waveCanvas.height = waveCanvas.parentElement.offsetHeight;
        }

        window.addEventListener('resize', resizeWave);
        resizeWave();

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY);
            scrollVelocity = Math.min(25, scrollVelocity + delta * 0.15);
            lastScrollY = currentScrollY;
        });

        const waveMouse = { x: -1000, y: -1000 };
        waveCanvas.addEventListener('mousemove', (e) => {
            const rect = waveCanvas.getBoundingClientRect();
            waveMouse.x = e.clientX - rect.left;
            waveMouse.y = e.clientY - rect.top;
        });
        waveCanvas.addEventListener('mouseleave', () => {
            waveMouse.x = -1000;
            waveMouse.y = -1000;
        });

        function drawWave(color, frequency, amplitude, speed, offsetHeight, phaseShift) {
            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 4) {
                let dynamicAmp = amplitude + (scrollVelocity * 0.8);
                const distToMouse = Math.abs(x - waveMouse.x);
                if (distToMouse < 120) {
                    dynamicAmp += (120 - distToMouse) * 0.25;
                }

                const y = Math.sin((x * frequency) + (step * speed) + phaseShift) * dynamicAmp 
                        + Math.cos((x * frequency * 0.5) + (step * speed * 0.7)) * (dynamicAmp * 0.4)
                        + (height * offsetHeight);

                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }

        function animateWave() {
            ctx.clearRect(0, 0, width, height);

            step += 0.025 + (scrollVelocity * 0.003);
            scrollVelocity *= 0.94;

            drawWave(waveColors.c3, 0.004, 22, 0.8, 0.55, 0);
            drawWave(waveColors.c2, 0.006, 18, 1.2, 0.62, 2.2);
            drawWave(waveColors.c1, 0.008, 14, 1.6, 0.68, 4.4);

            requestAnimationFrame(animateWave);
        }

        animateWave();
    }


    /* ==========================================================================
       5. INTERACTIVE PARTICLE CANVAS
       ========================================================================== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const mouse = { x: -1000, y: -1000, radius: 130 };
        let dotRgb = '255, 255, 255';

        function getCanvasDotColor() {
            const computedColor = getComputedStyle(document.documentElement).getPropertyValue('--canvas-dot').trim();
            dotRgb = computedColor || '255, 255, 255';
        }

        window.updateCanvasTheme = getCanvasDotColor;
        getCanvasDotColor();

        const particleSpacing = 36;
        const baseRadius = 1.8;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.radius = baseRadius;
                this.opacity = 0.55;
                this.baseOpacity = 0.55;
            }

            draw() {
                if (this.opacity <= 0.02) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${dotRgb}, ${this.opacity})`;
                ctx.fill();
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    
                    const pushX = Math.cos(angle) * force * 40;
                    const pushY = Math.sin(angle) * force * 40;

                    this.x -= pushX * 0.2;
                    this.y -= pushY * 0.2;

                    this.opacity = Math.max(0, this.baseOpacity * (distance / mouse.radius) * 0.7);
                    this.radius = Math.max(0.6, baseRadius * (distance / mouse.radius));
                } else {
                    const returnDx = this.baseX - this.x;
                    const returnDy = this.baseY - this.y;

                    this.x += returnDx * 0.08;
                    this.y += returnDy * 0.08;

                    if (this.opacity < this.baseOpacity) this.opacity += 0.03;
                    if (this.radius < baseRadius) this.radius += 0.05;
                }
            }
        }

        function initParticles() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            particles = [];

            const cols = Math.floor(width / particleSpacing);
            const rows = Math.floor(height / particleSpacing);
            const offsetX = (width - (cols * particleSpacing)) / 2;
            const offsetY = (height - (rows * particleSpacing)) / 2;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = offsetX + i * particleSpacing;
                    const y = offsetY + j * particleSpacing;
                    particles.push(new Particle(x, y));
                }
            }
        }

        function connectParticles() {
            const maxDist = 48;
            for (let a = 0; a < particles.length; a += 2) {
                for (let b = a + 1; b < particles.length; b += 2) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.1 * Math.min(particles[a].opacity, particles[b].opacity);
                        if (alpha > 0.01) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${dotRgb}, ${alpha})`;
                            ctx.lineWidth = 0.6;
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            connectParticles();
            requestAnimationFrame(animate);
        }

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initParticles, 150);
        });

        initParticles();
        animate();
    }


    /* ==========================================================================
       6. INTERACTIVE AI QUERY PLAYGROUND SIMULATOR
       ========================================================================== */
    const runInferenceBtn = document.getElementById('run-inference-btn');
    const playgroundInput = document.getElementById('playground-query-input');
    const playgroundPresets = document.querySelectorAll('.playground-preset');
    const playgroundLogs = document.getElementById('playground-logs');
    const playgroundResult = document.getElementById('playground-result');
    const playgroundAnswerText = document.getElementById('playground-answer-text');

    const sampleAnswers = {
        q1: {
            en: "According to Q3 Financial Report (Doc ID: #FIN-2024-Q3), operating profit increased by <strong>18.4% YoY</strong>, primarily driven by a <strong>32% reduction in cloud GPU inference latency</strong> following TensorRT quantization rollout.",
            vi: "Theo Báo cáo Tài chính Quý 3 (Tài liệu #FIN-2024-Q3), lợi nhuận hoạt động tăng <strong>18.4% so với cùng kỳ</strong>, chủ yếu nhờ vào việc <strong>giảm 32% chi phí vận hành máy chủ GPU</strong> sau khi tối ưu hóa mô hình bằng TensorRT."
        },
        q2: {
            en: "Based on Continual Learning Benchmarks (RSIAT), Representation-Steered Adapter Tuning achieves <strong>86.7% Top-1 Accuracy</strong> on incremental tasks while keeping catastrophic forgetting under <strong>-1.8% BWT</strong> with < 3.5% trainable parameters.",
            vi: "Dựa trên thực nghiệm Continual Learning (RSIAT), cơ chế Representation-Steered Adapter Tuning đạt độ chính xác <strong>86.7% Top-1</strong> trên các tác vụ tăng dần, đồng thời kiểm soát độ quên lãng dưới <strong>-1.8% BWT</strong> với chỉ < 3.5% tham số cần huấn luyện."
        },
        q3: {
            en: "Vision Surveillance Log (#MOT-CAMERA-04) tracked <strong>1,420 vehicles/hour</strong> with an average speed of 42.5 km/h. Bottleneck detected at intersection B with <strong>98.7% classification confidence</strong>.",
            vi: "Nhật ký Giám sát Camera (#MOT-CAMERA-04) ghi nhận lưu lượng <strong>1,420 phương tiện/giờ</strong> với tốc độ trung bình 42.5 km/h. Phát hiện điểm nghẽn tại giao lộ B với <strong>độ tin cậy phân loại 98.7%</strong>."
        }
    };

    let activePresetKey = 'q1';

    playgroundPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            playgroundPresets.forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            activePresetKey = preset.getAttribute('data-preset');
            playgroundInput.value = preset.textContent.trim();
        });
    });

    if (runInferenceBtn) {
        runInferenceBtn.addEventListener('click', () => {
            runInferenceBtn.disabled = true;
            runInferenceBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Running Pipeline...`;
            
            playgroundLogs.classList.remove('hidden');
            playgroundResult.classList.add('hidden');
            playgroundLogs.innerHTML = '';

            const step1 = document.createElement('div');
            step1.className = 'font-mono text-xs text-sky-400 animate-pulse';
            step1.innerHTML = `<i class="fa-solid fa-database mr-1.5"></i> [1/3] Searching ChromaDB Vector Space with BGE-M3 (Similarity: 0.942)...`;
            playgroundLogs.appendChild(step1);

            setTimeout(() => {
                const step2 = document.createElement('div');
                step2.className = 'font-mono text-xs text-purple-400 animate-pulse mt-1.5';
                step2.innerHTML = `<i class="fa-solid fa-filter mr-1.5"></i> [2/3] Cohere Reranker re-ordering top 3 grounded context chunks...`;
                playgroundLogs.appendChild(step2);
            }, 600);

            setTimeout(() => {
                const step3 = document.createElement('div');
                step3.className = 'font-mono text-xs text-emerald-400 mt-1.5';
                step3.innerHTML = `<i class="fa-solid fa-bolt mr-1.5"></i> [3/3] LLM synthesizing grounded output with zero hallucination!`;
                playgroundLogs.appendChild(step3);

                setTimeout(() => {
                    playgroundResult.classList.remove('hidden');
                    const ans = sampleAnswers[activePresetKey] ? sampleAnswers[activePresetKey][currentLang] : sampleAnswers.q1[currentLang];
                    playgroundAnswerText.innerHTML = ans;
                    runInferenceBtn.disabled = false;
                    runInferenceBtn.innerHTML = `<i class="fa-solid fa-play mr-1 text-xs"></i> <span data-i18n="play_btn_run">${translations[currentLang].play_btn_run}</span>`;
                }, 400);

            }, 1300);
        });
    }


    /* ==========================================================================
       7. ARCHITECTURE PIPELINE MODAL
       ========================================================================== */
    const modalBackdrop = document.getElementById('architecture-modal');
    const modalTitle = document.getElementById('modal-arch-title');
    const modalPipelineText = document.getElementById('modal-arch-pipeline');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const archTriggers = document.querySelectorAll('.view-arch-btn');

    const architectureData = {
        cv: {
            title: "Computer Vision & Multi-Object Tracking Pipeline",
            pipeline: "RTSP Video Stream (1080p@60FPS) → Frame Preprocessing & Normalize → YOLOv8 TensorRT Engine (FP16 Engine) → ByteTrack Association (Kalman Filter + Hungarian Matching) → FastAPI Async Worker (Redis Queue) → Real-Time Analytics WebSocket UI"
        },
        genai: {
            title: "Enterprise Hybrid RAG Assistant Architecture",
            pipeline: "Multi-Format Documents (PDF, Docx, MD) → Semantic Chunking (512 tokens, 50 overlap) → BGE-M3 Dense + BM25 Sparse Embeddings → Hybrid Vector Search (ChromaDB) → Cohere Cross-Encoder Rerank → Llama 3 / Gemini Pro Synthesis → RAGAS Evaluation Shield"
        },
        ml: {
            title: "RSIAT: Continual Learning & Representation-Steered Adapter Tuning",
            pipeline: "Incremental Task Data Stream → Frozen Vision Backbone (Pretrained ViT / ResNet) → Representation Steering Adapter Modules (PEFT < 3.5%) → Contrastive Memory Replay Buffer → Dual Classification Head & Gradient Projection → Continual Evaluation (Avg Acc & BWT Matrix)"
        }
    };

    archTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projKey = btn.getAttribute('data-arch-key');
            if (architectureData[projKey] && modalBackdrop) {
                modalTitle.textContent = architectureData[projKey].title;
                modalPipelineText.textContent = architectureData[projKey].pipeline;
                modalBackdrop.classList.add('is-open');
            }
        });
    });

    if (modalCloseBtn && modalBackdrop) {
        modalCloseBtn.addEventListener('click', () => {
            modalBackdrop.classList.remove('is-open');
        });

        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('is-open');
            }
        });
    }


    /* ==========================================================================
       8. RECRUITER FAQ ACCORDION
       ========================================================================== */
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.parentElement;
            const isOpen = faqItem.classList.contains('is-open');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('is-open');
            });

            if (!isOpen) {
                faqItem.classList.add('is-open');
            }
        });
    });


    /* ==========================================================================
       9. 3D TILT EFFECT ON CARDS
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.interactive-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3.5;
            const rotateY = ((x - centerX) / centerX) * 3.5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });


    /* ==========================================================================
       10. PROJECT CATEGORY FILTERING
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.98)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });


    /* ==========================================================================
       11. SCROLL REVEAL OBSERVER
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       12. ACTIVE NAVBAR & MOBILE MENU
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a.nav-item');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('opacity-100', 'font-semibold');
                    link.classList.add('opacity-70');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('opacity-70');
                        link.classList.add('opacity-100', 'font-semibold');
                    }
                });
            }
        });
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    /* ==========================================================================
       13. COPY EMAIL TO CLIPBOARD & TOAST
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = copyEmailBtn.getAttribute('data-email') || 'vuogthuan06@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(currentLang === 'vi' ? `Đã sao chép email: ${email}` : `Copied email to clipboard: ${email}`);
            }).catch(() => {
                showToast('Failed to copy email!');
            });
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }
});
