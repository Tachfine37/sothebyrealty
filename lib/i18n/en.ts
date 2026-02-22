import type { Translations } from './fr';

export const en: Translations = {
    // ── Navigation ────────────────────────────────────────────
    nav: {
        listings: 'Listing',
        home: 'Home',
        faq: 'Faq',
        about: 'About Us',
        contact: 'Contact Us',
        contactUs: 'Contact Us',
        login: 'Sign In',
        register: 'Sign Up',
        admin: 'Administration',
        logout: 'Sign Out',
        listingTypes: {
            villas: 'Luxury Villas',
            apartments: 'Prestige Apartments',
            chalets: 'Chalets & Mountain',
            domains: 'Estates & Châteaux',
            penthouses: 'Penthouses',
        },
        destinationLinks: {
            paris: 'Paris & Île-de-France',
            cotedazur: "French Riviera",
            alpes: 'Alps & Savoie',
            bordeaux: 'Bordeaux',
            provence: 'Provence',
        },
    },
    // ── Hero ──────────────────────────────────────────────────
    hero: {
        eyebrow: 'Prestige Real Estate · France',
        line1: 'The Exceptional',
        line2: 'Property',
        line3: 'Awaits You',
        subtitle: "850+ exceptional properties. French Riviera, Paris, Alps, Bordeaux.\n18 years of expertise at the service of your ambitions.",
        cta1: 'Explore Listings',
        cta2: 'Contact an Expert',
    },
    // ── Stats ─────────────────────────────────────────────────
    stats: [
        { value: '850+', label: 'Properties' },
        { value: '32', label: 'Destinations' },
        { value: '18 yrs', label: 'Expertise' },
        { value: '€2.1B', label: 'Transactions' },
    ],
    // ── Search ────────────────────────────────────────────────
    search: {
        destination: 'Destination',
        allDestinations: 'All destinations',
        type: 'Property type',
        allTypes: 'All types',
        budget: 'Maximum budget',
        noBudget: 'No limit',
        search: 'Search',
        types: {
            villa: 'Villa',
            apartment: 'Apartment',
            chalet: 'Chalet',
            domain: 'Estate',
            penthouse: 'Penthouse',
        },
    },
    // ── Featured listings ─────────────────────────────────────
    featured: {
        eyebrow: 'Exclusive Selection',
        title: 'Featured Properties',
        allListings: 'All Listings',
        empty: 'No properties to display.',
    },
    // ── Destinations ──────────────────────────────────────────
    destinationsSection: {
        eyebrow: 'Our Markets',
        title: 'Explore by Destination',
        properties: 'properties →',
    },
    // ── Why us ────────────────────────────────────────────────
    whyUs: {
        eyebrow: 'Our Difference',
        title: 'Why Choose Sotheby Realty',
        items: [
            { title: 'Exclusive Portfolio', text: "850+ properties, 40% off-market exclusive. Access to properties never listed on public portals." },
            { title: 'International Expertise', text: "Multilingual advisors (FR/EN/ZH/RU/AR) and a network spanning 28 countries. Your buyers are everywhere — so are we." },
            { title: 'Absolute Discretion', text: "Every transaction is handled with the strictest confidentiality. ISO 27001-certified data protection protocol." },
        ],
    },
    // ── Testimonials ──────────────────────────────────────────
    testimonials: {
        eyebrow: 'Testimonials',
        title: 'They Trust Us',
        items: [
            { name: 'Kathline Andrews', title: '', text: "A hidden sanctuary where time slows down and every detail whispers luxury. The perfect gateway to a luxurious escape." },
            { name: 'Aisha Khan', title: '', text: "The location was peaceful and private. Waking up to the ocean view every morning was unforgettable." },
            { name: 'Michel Barabel', title: '', text: "Beautifully decorated and very clean. Minor noise from nearby construction, but overall a fantastic experience." },
            { name: 'Maud Xavier', title: '', text: "Beautiful property and very quiet, perfect for a relaxing retreat. Only minor issue was the parking, but otherwise flawless." },
        ],
    },
    // ── CTA Banner ────────────────────────────────────────────
    ctaBanner: {
        eyebrow: "Let's Begin Together",
        title: "Your Exceptional Property\nStarts Here",
        subtitle: "Share your project with one of our advisors. Response guaranteed within 2 hours, 7 days a week.",
        cta1: 'Schedule a Meeting',
        cta2: 'Explore Listings',
    },
    // ── Footer ────────────────────────────────────────────────
    footer: {
        tagline: '"Prestige real estate, reinvented."',
        copyright: 'All rights reserved. Professional card no. CPI 7501 2018 XXX XXX.',
        guarantee: 'Financial Guarantee: €110,000 — AXA Insurance · Professional Liability',
        cols: [
            {
                heading: '',
                links: [
                    { label: 'Terms & Conditions', href: '/cgu' },
                    { label: 'Privacy Policy', href: '/politique-confidentialite' },
                    { label: 'Legal Notice', href: '/mentions-legales' },
                ],
            },
        ],
    },
    // ── Login / Register ──────────────────────────────────────
    auth: {
        loginTab: 'Sign In',
        registerTab: 'Create Account',
        welcomeLogin: 'Welcome Back',
        welcomeRegister: 'Join Us',
        subtitleLogin: 'Sign in to your Sotheby Realty account',
        subtitleRegister: 'Create your account to access our exclusive selection',
        continueWithGoogle: 'Continue with Google',
        redirecting: 'Redirecting…',
        or: 'or',
        email: 'Email address',
        password: 'Password',
        minPassword: '(min. 8 characters)',
        confirmPassword: 'Confirm password',
        fullName: 'Full name',
        forgotPassword: 'Forgot password?',
        loginBtn: 'Sign In',
        loginLoading: 'Signing in…',
        registerBtn: 'Create Account',
        registerLoading: 'Creating account…',
        noAccount: 'No account yet?',
        alreadyAccount: 'Already have an account?',
        backToSite: '← Back to site',
        privateSpace: 'Private Area',
        registerSuccess: 'Account created! Please check your email to confirm your account.',
        resetSent: 'Password reset email sent!',
        errors: {
            authFailed: 'Authentication failed. Please try again.',
            unauthorized: 'Access not authorised.',
            invalidCredentials: 'Incorrect email or password.',
            passwordMismatch: 'Passwords do not match.',
            passwordTooShort: 'Password must be at least 8 characters.',
            enterEmail: 'Please enter your email first.',
        },
        legal: "By continuing, you agree to our terms of service and privacy policy.",
    },
    // ── Property card ─────────────────────────────────────────
    property: {
        rooms: 'bd.',
        bathrooms: 'ba.',
        surface: 'm²',
        viewDetails: 'View property',
    },
};
