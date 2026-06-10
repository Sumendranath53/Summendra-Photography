import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ShaderAnimation } from './components/ui/shader-animation';
import { TextReveal } from './components/ui/text-reveal';
import { MagneticButton } from './components/ui/magnetic-button';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types & Data
interface PortfolioItem {
    src: string;
    alt: string;
    category: 'weddings' | 'portraits' | 'destination';
    title: string;
}

const portfolioData: PortfolioItem[] = [
    { src: 'Images/image 1.jpg', alt: 'Eternal Vows', category: 'weddings', title: 'Eternal Vows' },
    { src: 'Images/image 2.jpg', alt: 'Whispers of the Soul', category: 'portraits', title: 'Whispers of the Soul' },
    { src: 'Images/image 3.jpg', alt: 'A Sacred Promise', category: 'weddings', title: 'A Sacred Promise' },
    { src: 'Images/image 4.jpg', alt: 'Golden Hour Glow', category: 'portraits', title: 'Golden Hour Glow' },
    { src: 'Images/image 5.jpg', alt: 'The Royal Entrance', category: 'weddings', title: 'The Royal Entrance' },
    { src: 'Images/image 6.jpg', alt: 'Echoes of Silence', category: 'portraits', title: 'Echoes of Silence' },
    { src: 'Images/image 7.jpg', alt: 'Dancing in Love', category: 'weddings', title: 'Dancing in Love' },
    { src: 'Images/image 8.jpg', alt: 'Seaside Romance', category: 'destination', title: 'Seaside Romance' },
    { src: 'Images/image 9.jpg', alt: 'Mountain Vows', category: 'destination', title: 'Mountain Vows' },
    { src: 'Images/image 10.jpg', alt: 'Palace Splendor', category: 'destination', title: 'Palace Splendor' },
    { src: 'Images/image 11.jpg', alt: 'Sunset Bliss', category: 'destination', title: 'Sunset Bliss' },
    { src: 'Images/image 12.jpg', alt: 'Mehndi Rituals', category: 'weddings', title: 'Mehndi Rituals' },
    { src: 'Images/image 13.jpg', alt: 'Colors of Joy', category: 'weddings', title: 'Colors of Joy' },
    { src: 'Images/image 14.jpg', alt: 'The Radiant Bride', category: 'portraits', title: 'The Radiant Bride' },
    { src: 'Images/image 15.jpg', alt: 'Adorned details', category: 'portraits', title: 'Adorned Details' },
    { src: 'Images/image 16.jpg', alt: 'Bridal Preparation', category: 'portraits', title: 'Bridal Preparation' },
    { src: 'Images/image 17.jpg', alt: 'Groom Portrait', category: 'weddings', title: 'Groom Portrait' },
    { src: 'Images/image 18.jpg', alt: 'Candid Laughs', category: 'portraits', title: 'Candid Laughs' },
    { src: 'Images/image 19.jpg', alt: 'Royal Court Couple', category: 'destination', title: 'Royal Court Couple' },
    { src: 'Images/image 20.jpg', alt: 'The Garland Exchange', category: 'weddings', title: 'The Garland Exchange' },
    { src: 'Images/image 21.jpg', alt: 'Traditional Details', category: 'portraits', title: 'Traditional Details' },
    { src: 'Images/image 22.jpg', alt: 'Holy Fire Pheras', category: 'weddings', title: 'Holy Fire Pheras' },
    { src: 'Images/image 23.jpg', alt: 'Desert Sand Sunset', category: 'destination', title: 'Desert Sand Sunset' },
    { src: 'Images/image 24.jpg', alt: 'Emotional Farewell', category: 'portraits', title: 'Emotional Farewell' },
    { src: 'Images/image 25.jpg', alt: 'Grand Reception Dance', category: 'weddings', title: 'Grand Reception Dance' },
    { src: 'Images/image 26.jpg', alt: 'Henna & Bangles', category: 'portraits', title: 'Henna & Bangles' },
    { src: 'Images/image 27.jpg', alt: 'Fortress Vows', category: 'destination', title: 'Fortress Vows' },
    { src: 'Images/image 30.jpg', alt: 'Vidai Ceremony', category: 'weddings', title: 'Vidai Ceremony' }
];

const testimonials = [
    {
        text: "Sumendra did an absolute wonder with our wedding photos. Every laugh, tear, and dance move was documented with so much life and vibrancy. Looking at the gallery felt like watching a luxury film. Highly recommended!",
        name: "Aditya & Meera",
        loc: "Destination Wedding, Udaipur"
    },
    {
        text: "We were so nervous about posing, but Sumendra made us feel completely relaxed. The portraits came out incredibly natural and full of emotion. The lighting is simply magical, especially during the golden hour shots!",
        name: "Rohan & Sneha",
        loc: "Pre-Wedding & Portraits, Jaipur"
    },
    {
        text: "The level of professionalism and artistry is unmatched. From capturing the intricate details of the dress to the grand drone shots of the venue, Sumendra Photography delivered beyond our wild imaginations.",
        name: "Vikram & Ananya",
        loc: "Luxury Wedding, Goa"
    },
    {
        text: "Every picture is a masterpiece. Sumendra has an incredible eye for storytelling. The emotions captured in the rituals are so pure, it brings tears to our eyes every time we look at them.",
        name: "Kabir & Pooja",
        loc: "Royal Palace Wedding, Jodhpur"
    },
    {
        text: "We wanted something quiet, candid, and authentic, and Sumendra delivered exactly that. No artificial posing—just pure, raw, and beautiful moments captured in the hills.",
        name: "Arjun & Diya",
        loc: "Intimate Vows, Mussoorie"
    },
    {
        text: "Shooting in extreme weather in Ladakh was a challenge, but Sumendra's energy and passion kept us going. The frames with the lakes and mountains are spectacular.",
        name: "Neel & Shreya",
        loc: "Pre-Wedding Session, Ladakh"
    },
    {
        text: "The lighting, the compositions, the colors—everything is perfect. Sumendra and his team were so non-intrusive yet managed to capture every key moment of our three-day celebration.",
        name: "Rishabh & Kritika",
        loc: "Grand Wedding, Mumbai"
    },
    {
        text: "We love the traditional yet modern feel of the photographs. The colors of the Kanjeevaram sarees and the temple architecture are so beautifully highlighted.",
        name: "Dev & Priya",
        loc: "South Indian Wedding, Chennai"
    },
    {
        text: "Amazing experience! The beach sunset portraits are breath-taking. Sumendra's understanding of natural light is superior. We could not have asked for a better photographer.",
        name: "Karan & Natasha",
        loc: "Destination Wedding, Thailand"
    },
    {
        text: "Full of life, energy, and joy! Sumendra captured the bhangra beats and late-night laughter in high spirits. The photo book is a luxury heirloom.",
        name: "Aman & Simran",
        loc: "Punjabi Wedding, Delhi"
    },
    {
        text: "Every photograph feels historic and grand. The way he uses the fort walls and arches to frame the couple is sheer art. Highly professional crew.",
        name: "Yash & Tanvi",
        loc: "Heritage Shoot, Gwalior"
    },
    {
        text: "Sumendra made our engagement shoot feel like a fun date. The candids are so genuine, and the fine-art edits are incredibly clean and elegant.",
        name: "Siddharth & Shruti",
        loc: "Engagement Session, Pune"
    },
    {
        text: "Even with heavy rain, Sumendra created magic. He used the rain and fog to create dramatic, romantic shots that look like they belong in a film.",
        name: "Varun & Riya",
        loc: "Monsoon Wedding, Lonavala"
    },
    {
        text: "The action shots on the dance floor are spectacular! Not a single blur, just crisp, dynamic captures of our friends and family celebrating.",
        name: "Abhishek & Ritu",
        loc: "Sangeet & Cocktail, Gurgaon"
    },
    {
        text: "Flawless execution. Sumendra is not just a photographer; he is a director of emotions. He captured the grand scale of the palace while preserving intimate closeups.",
        name: "Manish & Payal",
        loc: "Royal Heritage, Udaipur"
    },
    {
        text: "Beautiful, spiritual, and elegant. The Ganges and ghats backdrop portraits are divine. Thank you, Sumendra, for capturing our soul connection.",
        name: "Rajesh & Sunita",
        loc: "Traditional Vows, Rishikesh"
    }
];

export default function App() {
    // Navigation & Layout
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [viewState, setViewState] = useState<'home' | 'gallery'>('home');

    const handleNavigation = (sectionId: string, e: React.MouseEvent) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (viewState !== 'home') {
            setViewState('home');
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };


    // Intro overlay active state
    const [introActive, setIntroActive] = useState(true);

    // Auto-dismiss intro overlay after 5 seconds
    useEffect(() => {
        if (introActive) {
            const timer = setTimeout(() => {
                setIntroActive(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [introActive]);

    // Hero background slideshow images
    const lightHeroImages = useMemo(() => [
        'Images/landing light mode 1.jpg',
        'Images/landing light mode 2.jpg',
        'Images/landing light mode 3.jpg',
        'Images/landing light mode 4.jpg'
    ], []);

    const darkHeroImages = useMemo(() => [
        'Images/landing dark mode 1.jpg',
        'Images/landing dark mode 2.jpg',
        'Images/landing dark mode 3.jpg',
        'Images/landing dark mode 4.jpg'
    ], []);

    const [heroImageIndex, setHeroImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroImageIndex(prev => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(timer);
    }, []);


    // Theme state
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved === 'light' || saved === 'dark') return saved;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };




    // Portfolio state
    const [filter, setFilter] = useState<'all' | 'weddings' | 'portraits' | 'destination'>('all');

    // Lightbox state
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [lightboxActive, setLightboxActive] = useState(false);

    // Testimonial slider state
    const [currentSlide, setCurrentSlide] = useState(0);

    // Contact Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Stats counter state
    const [stats, setStats] = useState({ weddings: 0, experience: 0, destinations: 0 });
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsAnimated, setStatsAnimated] = useState(false);

    // Sticky nav state check (highly optimized scroll listener)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section highlighting using IntersectionObserver (replaces heavy scroll loop)
    useEffect(() => {
        const sections = ['home', 'about', '3d-gallery', 'portfolio', 'testimonials', 'contact'];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            rootMargin: '-30% 0px -60% 0px' // Triggers when section occupies the middle view
        });

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Stats counter trigger using IntersectionObserver
    useEffect(() => {
        if (!statsRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                setStatsAnimated(true);
                animateStats();
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        
        observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, [statsAnimated]);

    // Animate statistics counter
    const animateStats = () => {
        const targets = { weddings: 150, experience: 5, destinations: 30 };
        const duration = 2000;
        const startTime = performance.now();

        const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress * (2 - progress); // Ease out quad

            setStats({
                weddings: Math.floor(ease * targets.weddings),
                experience: Math.floor(ease * targets.experience),
                destinations: Math.floor(ease * targets.destinations)
            });

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                setStats(targets);
            }
        };

        requestAnimationFrame(update);
    };

    // Testimonial auto-play loop
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    // Filtered items list
    const filteredItems = useMemo(() => {
        return portfolioData.filter(item => filter === 'all' || item.category === filter);
    }, [filter]);

    // Limit visible portfolio items
    const [portfolioLimit, setPortfolioLimit] = useState(8);

    // Reset portfolio limit when filter changes
    useEffect(() => {
        setPortfolioLimit(8);
    }, [filter]);

    const visibleItems = useMemo(() => {
        return filteredItems.slice(0, portfolioLimit);
    }, [filteredItems, portfolioLimit]);

    // Behind the Lens Carousel Images
    const aboutCarouselImages = useMemo(() => [
        'Images/image 1.jpg',
        'Images/image 2.jpg',
        'Images/image 3.jpg',
        'Images/image 4.jpg',
        'Images/image 5.jpg'
    ], []);

    const [aboutSlideIndex, setAboutSlideIndex] = useState(0);

    // Behind the Lens autoplay
    useEffect(() => {
        const timer = setInterval(() => {
            setAboutSlideIndex(prev => (prev + 1) % aboutCarouselImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [aboutCarouselImages.length]);
    // Popup states for "Let's Connect" form modal
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [popupHasShown, setPopupHasShown] = useState(false);
    const [popupFormData, setPopupFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: ''
    });
    const [popupSubmitting, setPopupSubmitting] = useState(false);

    // Trigger contact popup 10 seconds after intro screen is closed
    useEffect(() => {
        if (!introActive && !popupHasShown) {
            const timer = setTimeout(() => {
                setShowContactPopup(true);
                setPopupHasShown(true);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [introActive, popupHasShown]);

    // Lock body scroll while any overlay modal/popup is active (with mobile touchmove support for the intro screen)
    useEffect(() => {
        const preventDefault = (e: TouchEvent) => {
            if (introActive) {
                e.preventDefault();
            }
        };

        if (introActive || showContactPopup || lightboxActive || showSuccess) {
            document.body.style.overflow = 'hidden';
            if (introActive) {
                window.addEventListener('touchmove', preventDefault, { passive: false });
            }
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('touchmove', preventDefault);
        };
    }, [introActive, showContactPopup, lightboxActive, showSuccess]);

    const handlePopupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!popupFormData.name || !popupFormData.email || !popupFormData.phone || !popupFormData.eventType || !popupFormData.message) {
            alert('Please fill out all required fields.');
            return;
        }

        setPopupSubmitting(true);

        const sessionLabels: Record<string, string> = {
            wedding: "Luxury Destination Wedding",
            "pre-wedding": "Pre-Wedding / Engagement",
            portraits: "Fine Art Portrait Session",
            editorial: "Editorial / Fashion / Other"
        };
        const sessionTypeLabel = sessionLabels[popupFormData.eventType] || popupFormData.eventType;

        const formattedMsg = `Hello Sumendra Photography,
        
I would like to make an inquiry (via Pop-up). Here are my details:

*Name:* ${popupFormData.name}
*Email:* ${popupFormData.email}
*Phone:* ${popupFormData.phone}
*Event Date:* ${popupFormData.eventDate || 'Not specified'}
*Session Type:* ${sessionTypeLabel}

*Message:*
${popupFormData.message}`;

        const whatsappUrl = `https://wa.me/919027619344?text=${encodeURIComponent(formattedMsg)}`;

        setTimeout(() => {
            setPopupSubmitting(false);
            window.open(whatsappUrl, '_blank');
            setShowContactPopup(false);
            setShowSuccess(true);
            setPopupFormData({
                name: '',
                email: '',
                phone: '',
                eventDate: '',
                eventType: '',
                message: ''
            });
        }, 1200);
    };


    // Scroll reveal triggers using IntersectionObserver for static sections
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        const targets = document.querySelectorAll('.scroll-reveal');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, []);

    // Lightbox index operations
    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxActive(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxActive(false);
        setTimeout(() => setLightboxIndex(null), 300); // Wait for transition
        document.body.style.overflow = '';
    };

    const nextLightboxImg = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % portfolioData.length);
        }
    };

    const prevLightboxImg = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + portfolioData.length) % portfolioData.length);
        }
    };

    // Keyboard support for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxActive) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightboxImg();
            if (e.key === 'ArrowLeft') prevLightboxImg();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxActive, lightboxIndex]);

    // Handle Contact Form Submit
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation check
        if (!formData.name || !formData.email || !formData.phone || !formData.eventType || !formData.message) {
            alert('Please fill out all required fields.');
            return;
        }

        setIsSubmitting(true);

        const sessionLabels: Record<string, string> = {
            wedding: "Luxury Destination Wedding",
            "pre-wedding": "Pre-Wedding / Engagement",
            portraits: "Fine Art Portrait Session",
            editorial: "Editorial / Fashion / Other"
        };
        const sessionTypeLabel = sessionLabels[formData.eventType] || formData.eventType;

        // Construct beautifully formatted WhatsApp message
        const formattedMsg = `Hello Sumendra Photography,

I would like to make an inquiry. Here are my event details:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Event Date:* ${formData.eventDate || 'Not specified'}
*Session Type:* ${sessionTypeLabel}

*Message:*
${formData.message}`;

        const whatsappUrl = `https://wa.me/919027619344?text=${encodeURIComponent(formattedMsg)}`;

        // Simulate network API submission + Redirect
        setTimeout(() => {
            setIsSubmitting(false);
            
            // Redirect to WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Show Success feedback overlay
            setShowSuccess(true);
            document.body.style.overflow = 'hidden';
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventDate: '',
                eventType: '',
                message: ''
            });
        }, 1200);
    };

    return (
        <div className="react-root-wrapper">
            
            {/* Full-Screen Click Intro Overlay */}
            <AnimatePresence>
                {introActive && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        onTap={() => setIntroActive(false)}
                        className="intro-overlay"
                        style={{ cursor: 'pointer' }}
                    >
                        {/* The SVG Mask Zoom-through Layer (Middle layer) */}
                        <motion.svg 
                            initial={{ scale: 1 }}
                            exit={{ scale: 22 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                            className="intro-mask-svg"
                            viewBox="0 0 1000 1000"
                            preserveAspectRatio="xMidYMid slice"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transformOrigin: 'center center',
                                zIndex: 9999
                            }}
                        >
                            <defs>
                                <mask id="intro-svg-mask">
                                    <rect x="0" y="0" width="1000" height="1000" fill="white" />
                                    <image 
                                        href={theme === 'dark' ? '/logo/Dark Theme Logo.png' : '/logo/Light Theme Logo.png'} 
                                        x="445" 
                                        y="385" 
                                        width="110" 
                                        height="110" 
                                        style={{ filter: 'brightness(0)' }}
                                    />
                                    <text 
                                        x="500" 
                                        y="570" 
                                        textAnchor="middle" 
                                        fill="black" 
                                        style={{ 
                                            fontFamily: "var(--font-heading)", 
                                            fontSize: '64px', 
                                            fontWeight: '400',
                                            letterSpacing: '0.05em' 
                                        }}
                                    >
                                        SUMENDRA
                                    </text>
                                    <text 
                                        x="500" 
                                        y="615" 
                                        textAnchor="middle" 
                                        fill="black" 
                                        style={{ 
                                            fontFamily: "var(--font-body)", 
                                            fontSize: '14px', 
                                            fontWeight: '500',
                                            letterSpacing: '0.45em' 
                                        }}
                                    >
                                        PHOTOGRAPHY
                                    </text>
                                </mask>
                            </defs>
                            <rect x="0" y="0" width="1000" height="1000" fill="var(--bg-primary)" mask="url(#intro-svg-mask)" />
                        </motion.svg>

                        {/* The Solid Logo & Text Layer (Top layer, covering the mask holes initially) */}
                        <motion.svg 
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="intro-solid-svg"
                            viewBox="0 0 1000 1000"
                            preserveAspectRatio="xMidYMid slice"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transformOrigin: 'center center',
                                pointerEvents: 'none',
                                zIndex: 10000
                            }}
                        >
                            <image 
                                href={theme === 'dark' ? '/logo/Dark Theme Logo.png' : '/logo/Light Theme Logo.png'} 
                                x="445" 
                                y="385" 
                                width="110" 
                                height="110" 
                            />
                            <text 
                                x="500" 
                                y="570" 
                                textAnchor="middle" 
                                fill="var(--text-primary)" 
                                style={{ 
                                    fontFamily: "var(--font-heading)", 
                                    fontSize: '64px', 
                                    fontWeight: '400',
                                    letterSpacing: '0.05em' 
                                }}
                            >
                                SUMENDRA
                            </text>
                            <text 
                                x="500" 
                                y="615" 
                                textAnchor="middle" 
                                fill="var(--accent)" 
                                style={{ 
                                    fontFamily: "var(--font-body)", 
                                    fontSize: '14px', 
                                    fontWeight: '500',
                                    letterSpacing: '0.45em' 
                                }}
                            >
                                PHOTOGRAPHY
                            </text>
                        </motion.svg>

                        {/* Helper instruction text */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="intro-helper-text"
                        >
                            Click (touch) on the screen to navigate to the website
                        </motion.div>
                    </motion.div>

                )}
            </AnimatePresence>




            {/* Header Navigation */}
            <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="nav-container">
                    <a href="#home" className="logo-container" onClick={(e) => handleNavigation('home', e)}>
                        <img 
                            src={theme === 'dark' ? '/logo/Dark Theme Logo.png' : '/logo/Light Theme Logo.png'} 
                            alt="Sumendra Photography Logo" 
                            className="logo-img" 
                        />
                        <div className="logo-text">
                            <span className="logo-main">SUMENDRA</span>
                            <span className="logo-sub">PHOTOGRAPHY</span>
                        </div>
                    </a>
                    
                    <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => handleNavigation('home', e)}>Home</a>
                        <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleNavigation('about', e)}>About</a>
                        <a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`} onClick={(e) => handleNavigation('portfolio', e)}>Portfolio</a>
                        <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={(e) => handleNavigation('testimonials', e)}>Reviews</a>
                        <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleNavigation('contact', e)}>Contact</a>
                    </nav>

                    <div className="nav-actions">
                        <button 
                            onClick={toggleTheme} 
                            className="theme-toggle-btn" 
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </button>
                        <a href="tel:9027619344" className="phone-link">
                            <ion-icon name="call-outline"></ion-icon>
                            <span>9027619344</span>
                        </a>
                        <MagneticButton>
                            <a href="#contact" className="btn-cta" onClick={(e) => handleNavigation('contact', e)}>Book Session</a>
                        </MagneticButton>
                        <button className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                    </div>
                </div>
            </header>


            {/* Hero / Landing Section */}
            {viewState === 'home' && (
                <>
                    <section id="home" className="hero">
                        <div className="hero-bg-wrapper">
                            {(theme === 'dark' ? darkHeroImages : lightHeroImages).map((src, index) => (
                                <div 
                                    key={src}
                                    className="hero-bg" 
                                    style={{ 
                                        backgroundImage: `url('${src}')`,
                                        opacity: heroImageIndex === index ? 1 : 0,
                                        zIndex: heroImageIndex === index ? 1 : 0
                                    }}
                                />
                            ))}
                            <div className="hero-shader-overlay" style={{ zIndex: 2 }}>
                                <ShaderAnimation />
                            </div>
                            <div className="hero-overlay" style={{ zIndex: 2 }}></div>
                        </div>

                        <div className="hero-content">
                            <TextReveal delay={0.1}>
                                <p className="hero-subtitle fade-in">LUXURY WEDDING & PORTRAIT PHOTOGRAPHY</p>
                            </TextReveal>
                            <TextReveal delay={0.3}>
                                <h1 className="hero-title fade-in">Sumendra Photography</h1>
                            </TextReveal>
                            <TextReveal delay={0.5}>
                                <p className="hero-tagline fade-in">Capturing the poetry of love, light, and raw human connection.</p>
                            </TextReveal>
                            <TextReveal delay={0.7}>
                                <div className="hero-btns fade-in">
                                    <MagneticButton>
                                        <a href="#portfolio" className="btn btn-primary" onClick={(e) => handleNavigation('portfolio', e)}>Explore Portfolio</a>
                                    </MagneticButton>
                                    <MagneticButton>
                                        <a href="#contact" className="btn btn-secondary" onClick={(e) => handleNavigation('contact', e)}>Book Session</a>
                                    </MagneticButton>
                                </div>
                            </TextReveal>
                        </div>
                        <a href="#about" className="scroll-indicator" aria-label="Scroll Down" onClick={(e) => handleNavigation('about', e)}>
                            <span className="mouse-icon">
                                <span className="wheel"></span>
                            </span>
                            <span className="scroll-text">Scroll Down</span>
                        </a>
                    </section>


            {/* Intro / About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-visual scroll-reveal">
                            <div className="image-wrapper about-carousel-wrapper">
                                {aboutCarouselImages.map((src, index) => (
                                    <div 
                                        key={src}
                                        className="about-img"
                                        style={{ 
                                            backgroundImage: `url('${src}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            opacity: aboutSlideIndex === index ? 1 : 0,
                                            zIndex: aboutSlideIndex === index ? 1 : 0,
                                            transition: 'opacity 1.0s ease-in-out',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                ))}
                                <div className="image-border" style={{ zIndex: 2 }}></div>
                                
                                {/* Carousel Navigation Controls */}
                                <div className="about-carousel-controls" style={{ zIndex: 3 }}>
                                    <button 
                                        className="about-carousel-btn prev"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setAboutSlideIndex(prev => (prev - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
                                        }}
                                        aria-label="Previous Slide"
                                    >
                                        <ion-icon name="chevron-back-outline"></ion-icon>
                                    </button>
                                    <div className="about-carousel-dots">
                                        {aboutCarouselImages.map((_, index) => (
                                            <span 
                                                key={index} 
                                                className={`about-dot ${aboutSlideIndex === index ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAboutSlideIndex(index);
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <button 
                                        className="about-carousel-btn next"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setAboutSlideIndex(prev => (prev + 1) % aboutCarouselImages.length);
                                        }}
                                        aria-label="Next Slide"
                                    >
                                        <ion-icon name="chevron-forward-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="about-text scroll-reveal">
                            <TextReveal>
                                <span className="section-tag">The Storyteller</span>
                            </TextReveal>
                            <TextReveal delay={0.2}>
                                <h2 className="section-title">Behind the Lens</h2>
                            </TextReveal>
                            <p className="lead-text">"Photography is not about capturing what you see, but creating a portal to how it felt."</p>
                            <p className="body-text">I believe in creating images that breathe. Based in India and available worldwide, I specialize in fine-art wedding cinematography and off-beat candid portraits. Drawing inspiration from cinematic lighting, painterly colors, and raw, spontaneous feelings, my goal is to craft visual heirlooms that you will treasure for a lifetime.</p>
                            <p className="body-text">Whether it's a grand destination wedding or a private, quiet vow exchange in the mountains, I capture the energy, the laughter, and the tears in their truest forms.</p>
                            
                            <div className="stats-grid" ref={statsRef}>
                                <div className="stat-item">
                                    <div>
                                        <span className="stat-num">{stats.weddings}</span>
                                        <span className="stat-plus">+</span>
                                    </div>
                                    <span className="stat-label">Weddings Captured</span>
                                </div>
                                <div className="stat-item">
                                    <div>
                                        <span className="stat-num">{stats.experience}</span>
                                        <span className="stat-plus">+</span>
                                    </div>
                                    <span className="stat-label">Years of Experience</span>
                                </div>
                                <div className="stat-item">
                                    <div>
                                        <span className="stat-num">{stats.destinations}</span>
                                        <span className="stat-plus">+</span>
                                    </div>
                                    <span className="stat-label">Destinations Traveled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2D Portfolio Grid Section */}
            <section id="portfolio" className="portfolio-section">
                <div className="container">
                    <div className="section-header center scroll-reveal">
                        <span className="section-tag">Featured Portfolio</span>
                        <TextReveal>
                            <h2 className="section-title">Moments Frozen In Time</h2>
                        </TextReveal>
                        <p className="section-desc">Browse through our curated stories of love, expressions, and scenic backdrops.</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="portfolio-filters" style={{ justifyContent: 'center' }}>
                        {(['all', 'weddings', 'portraits', 'destination'] as const).map(cat => (
                            <button 
                                key={cat} 
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Items Grid */}
                    <div className="portfolio-grid">
                        {visibleItems.map((item) => {
                            const originalIndex = portfolioData.findIndex(p => p.src === item.src);
                            return (
                                <div key={item.src} className="portfolio-item scroll-reveal">
                                    <div className="portfolio-card" onClick={() => openLightbox(originalIndex)}>
                                        <img src={item.src} alt={item.alt} className="portfolio-img" loading="lazy" />
                                        <div className="portfolio-overlay">
                                            <span className="item-cat">{item.category}</span>
                                            <h3 className="item-title">{item.title}</h3>
                                            <div className="view-btn">
                                                <ion-icon name="eye-outline"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredItems.length > 8 && (
                        <div className="portfolio-load-more" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                            <MagneticButton>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setViewState('gallery');
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    View All Photos
                                </button>
                            </MagneticButton>
                        </div>
                    )}


                </div>
            </section>

            {/* Testimonials Review Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-tag">Reviews</span>
                        <h2 className="section-title">Kind Words from Couples</h2>
                    </div>
                    
                    <div className="testimonial-slider-container">
                        <div className="testimonial-slider">
                            {testimonials.map((slide, idx) => (
                                <div key={idx} className={`testimonial-slide ${currentSlide === idx ? 'active' : ''}`}>
                                    <div className="quote-icon">
                                        <ion-icon name="quote"></ion-icon>
                                    </div>
                                    <p className="testimonial-text">"{slide.text}"</p>
                                    <div className="client-info">
                                        <h4 className="client-name">{slide.name}</h4>
                                        <span className="client-loc">{slide.loc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="slider-controls">
                            <button className="slider-btn prev-btn" onClick={() => setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length)} aria-label="Previous Review">
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </button>
                            <div className="slider-dots">
                                {testimonials.map((_, idx) => (
                                    <span 
                                        key={idx} 
                                        className={`dot ${currentSlide === idx ? 'active' : ''}`}
                                        onClick={() => setCurrentSlide(idx)}
                                    ></span>
                                ))}
                            </div>
                            <button className="slider-btn next-btn" onClick={() => setCurrentSlide(prev => (prev + 1) % testimonials.length)} aria-label="Next Review">
                                <ion-icon name="chevron-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        
                        {/* Info details */}
                        <div className="contact-info-card scroll-reveal">
                            <span className="section-tag">Let's Connect</span>
                            <h2 className="section-title">Begin Your Story</h2>
                            <p className="contact-desc">Let's collaborate to capture your monumental moments. Reach out for dates, pricing, or custom packages. We reply within 24 hours.</p>
                            
                            <div className="contact-details">
                                <div className="detail-item">
                                    <div className="icon-box">
                                        <ion-icon name="call-outline"></ion-icon>
                                    </div>
                                    <div className="detail-text">
                                        <span>Phone &amp; WhatsApp</span>
                                        <a href="tel:9027619344">+91 9027619344</a>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="icon-box">
                                        <ion-icon name="mail-outline"></ion-icon>
                                    </div>
                                    <div className="detail-text">
                                        <span>Email Address</span>
                                        <a href="mailto:sumendranath36@gmail.com">sumendranath36@gmail.com</a>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="icon-box">
                                        <ion-icon name="location-outline"></ion-icon>
                                    </div>
                                    <div className="detail-text">
                                        <span>Based in</span>
                                        <a>India Noida, Available Worldwide</a>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="#" className="social-link" aria-label="Instagram"><ion-icon name="logo-instagram"></ion-icon></a>
                                <a href="#" className="social-link" aria-label="Facebook"><ion-icon name="logo-facebook"></ion-icon></a>
                                <a href="#" className="social-link" aria-label="YouTube"><ion-icon name="logo-youtube"></ion-icon></a>
                                <a href="#" className="social-link" aria-label="Pinterest"><ion-icon name="logo-pinterest"></ion-icon></a>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <div className="contact-form-wrapper scroll-reveal">
                            <form className="contact-form" onSubmit={handleFormSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name *</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required 
                                            placeholder="e.g. Meera Patel" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required 
                                            placeholder="e.g. meera@gmail.com" 
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            required 
                                            placeholder="e.g. 9876543210" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="eventDate">Event Date</label>
                                        <input 
                                            type="date" 
                                            id="eventDate" 
                                            value={formData.eventDate}
                                            onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="eventType">Session Type *</label>
                                    <select 
                                        id="eventType" 
                                        value={formData.eventType}
                                        onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="wedding">Luxury Destination Wedding</option>
                                        <option value="pre-wedding">Pre-Wedding / Engagement</option>
                                        <option value="portraits">Fine Art Portrait Session</option>
                                        <option value="editorial">Editorial / Fashion / Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Tell Us About Your Event *</label>
                                    <textarea 
                                        id="message" 
                                        rows={5} 
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        required 
                                        placeholder="Describe the vibe, locations, dates, and what you're looking for..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span>Sending...</span>
                                            <ion-icon name="sync-outline" className="spin-icon"></ion-icon>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Inquiry</span>
                                            <ion-icon name="arrow-forward-outline"></ion-icon>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
                </>
            )}

            {/* Dedicated Full Collection Gallery Page */}
            {viewState === 'gallery' && (
                <section className="full-gallery-section" style={{ paddingTop: '140px', minHeight: '80vh' }}>
                    <div className="container">
                        <div className="section-header center">
                            <span className="section-tag">Complete Collection</span>
                            <h2 className="section-title">Frozen In Time</h2>
                            <p className="section-desc">Browse our full photography collection across all categories.</p>
                            
                            <div style={{ marginTop: '20px' }}>
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        setViewState('home');
                                        setTimeout(() => {
                                            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    style={{ padding: '10px 25px', textTransform: 'uppercase', fontSize: '0.8rem', gap: '8px', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                    Back to Home
                                </button>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="portfolio-filters" style={{ justifyContent: 'center', marginTop: '40px' }}>
                            {(['all', 'weddings', 'portraits', 'destination'] as const).map(cat => (
                                <button 
                                    key={cat} 
                                    className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Gallery Grid containing ALL items of current filter */}
                        <div className="portfolio-grid" style={{ marginTop: '40px' }}>
                            {filteredItems.map((item) => {
                                const originalIndex = portfolioData.findIndex(p => p.src === item.src);
                                return (
                                    <div key={item.src} className="portfolio-item scroll-reveal revealed">
                                        <div className="portfolio-card" onClick={() => openLightbox(originalIndex)}>
                                            <img src={item.src} alt={item.alt} className="portfolio-img" loading="lazy" />
                                            <div className="portfolio-overlay">
                                                <span className="item-cat">{item.category}</span>
                                                <h3 className="item-title">{item.title}</h3>
                                                <div className="view-btn">
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', marginBottom: '40px' }}>
                            <MagneticButton>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setViewState('home');
                                        setTimeout(() => {
                                            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                >
                                    Back to Home Page
                                </button>
                            </MagneticButton>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="main-footer">
                <div className="container">
                    <div className="footer-top">
                        <a href="#home" className="logo-container-footer" onClick={(e) => handleNavigation('home', e)}>
                            <img 
                                src={theme === 'dark' ? '/logo/Dark Theme Logo.png' : '/logo/Light Theme Logo.png'} 
                                alt="Sumendra Photography Logo" 
                                className="logo-img-footer" 
                            />
                            <div className="logo-text-footer">
                                <span className="logo-main">SUMENDRA</span>
                                <span className="logo-sub">PHOTOGRAPHY</span>
                            </div>
                        </a>
                        <ul className="footer-links">
                            <li><a href="#home" onClick={(e) => handleNavigation('home', e)}>Home</a></li>
                            <li><a href="#about" onClick={(e) => handleNavigation('about', e)}>About</a></li>
                            <li><a href="#portfolio" onClick={(e) => handleNavigation('portfolio', e)}>Portfolio</a></li>
                            <li><a href="#testimonials" onClick={(e) => handleNavigation('testimonials', e)}>Reviews</a></li>
                            <li><a href="#contact" onClick={(e) => handleNavigation('contact', e)}>Contact</a></li>
                        </ul>
                    </div>
                    <hr className="footer-divider" />
                    <div className="footer-bottom">
                        <div className="footer-info-group">
                            <p className="footer-brand-tag">Sumendra Photography &mdash; A Summi Creations Brand</p>
                            <p className="footer-services">Weddings | Corporate Events | Music Videos | Concerts | All Event Photography | Cinematography &amp; Travel</p>
                            <p className="copyright">&copy; 2026 All Rights Reserved by Sumendra Nath</p>
                        </div>
                        <p className="developer">Crafted with Luxury &amp; Aesthetics</p>
                    </div>
                </div>
            </footer>


            {/* Custom Lightbox Modal */}
            {lightboxIndex !== null && (
                <div className={`lightbox ${lightboxActive ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Image Gallery Lightbox">
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <button className="lightbox-arrow prev" onClick={prevLightboxImg} aria-label="Previous Image">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </button>
                    <div className="lightbox-content">
                        <div className="lightbox-img-wrapper">
                            <img src={portfolioData[lightboxIndex].src} alt={portfolioData[lightboxIndex].alt} />
                        </div>
                        <div className="lightbox-caption">
                            <span className="lightbox-cat">{portfolioData[lightboxIndex].category}</span>
                            <h3 className="lightbox-title">{portfolioData[lightboxIndex].title}</h3>
                        </div>
                    </div>
                    <button className="lightbox-arrow next" onClick={nextLightboxImg} aria-label="Next Image">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </button>
                </div>
            )}

            {/* Success Feedback Overlay */}
            {showSuccess && (
                <div className="success-overlay active" onClick={() => setShowSuccess(false)}>
                    <div className="success-card" onClick={e => e.stopPropagation()}>
                        <div className="success-icon">
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </div>
                        <h3>Inquiry Sent Successfully!</h3>
                        <p>Thank you for reaching out to Sumendra Photography. We are thrilled at the prospect of documenting your stories. A response will be sent to your email within 24 hours.</p>
                        <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>Great, Thank You</button>
                    </div>
                </div>
            )}

            {/* "Let's Connect" Contact Pop-up Modal */}
            <div className={`contact-popup-overlay ${showContactPopup ? 'active' : ''}`} onClick={() => setShowContactPopup(false)}>
                <div className="contact-popup-card" onClick={e => e.stopPropagation()}>
                    <button className="contact-popup-close" onClick={() => setShowContactPopup(false)} aria-label="Close Modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <div className="contact-popup-header">
                        <span className="section-tag">Let's Connect</span>
                        <h3>Begin Your Story</h3>
                        <p>Tell us about your event details and let's collaborate to capture your monumental moments.</p>
                    </div>
                    <form className="contact-form" onSubmit={handlePopupSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="popup-name">Your Name *</label>
                                <input 
                                    type="text" 
                                    id="popup-name" 
                                    value={popupFormData.name}
                                    onChange={e => setPopupFormData({ ...popupFormData, name: e.target.value })}
                                    required 
                                    placeholder="e.g. Meera Patel" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="popup-email">Email Address *</label>
                                <input 
                                    type="email" 
                                    id="popup-email" 
                                    value={popupFormData.email}
                                    onChange={e => setPopupFormData({ ...popupFormData, email: e.target.value })}
                                    required 
                                    placeholder="e.g. meera@gmail.com" 
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="popup-phone">Phone Number *</label>
                                <input 
                                    type="tel" 
                                    id="popup-phone" 
                                    value={popupFormData.phone}
                                    onChange={e => setPopupFormData({ ...popupFormData, phone: e.target.value })}
                                    required 
                                    placeholder="e.g. 9876543210" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="popup-eventDate">Event Date</label>
                                <input 
                                    type="date" 
                                    id="popup-eventDate" 
                                    value={popupFormData.eventDate}
                                    onChange={e => setPopupFormData({ ...popupFormData, eventDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="popup-eventType">Session Type *</label>
                            <select 
                                id="popup-eventType" 
                                value={popupFormData.eventType}
                                onChange={e => setPopupFormData({ ...popupFormData, eventType: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="wedding">Luxury Destination Wedding</option>
                                <option value="pre-wedding">Pre-Wedding / Engagement</option>
                                <option value="portraits">Fine Art Portrait Session</option>
                                <option value="editorial">Editorial / Fashion / Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="popup-message">Tell Us About Your Event *</label>
                            <textarea 
                                id="popup-message" 
                                rows={4} 
                                value={popupFormData.message}
                                onChange={e => setPopupFormData({ ...popupFormData, message: e.target.value })}
                                required 
                                placeholder="Describe the vibe, locations, dates, and what you're looking for..."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-submit" disabled={popupSubmitting} style={{ width: '100%' }}>
                            {popupSubmitting ? (
                                <>
                                    <span>Sending...</span>
                                    <ion-icon name="sync-outline" className="spin-icon"></ion-icon>
                                </>
                            ) : (
                                <>
                                    <span>Send Inquiry</span>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </div>

    );
}
