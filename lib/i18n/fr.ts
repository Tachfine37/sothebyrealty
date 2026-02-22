export const fr = {
    // ── Navigation ────────────────────────────────────────────
    nav: {
        listings: 'Annonces',
        destinations: 'Destinations',
        services: 'Services',
        about: 'À Propos',
        contact: 'Contact',
        contactUs: 'Nous Contacter',
        login: 'Connexion',
        register: "S'inscrire",
        admin: 'Administration',
        logout: 'Déconnexion',
        listingTypes: {
            villas: 'Villas de luxe',
            apartments: 'Appartements prestige',
            chalets: 'Chalets & montagne',
            domains: 'Domaines & châteaux',
            penthouses: 'Penthouses',
        },
        destinationLinks: {
            paris: 'Paris & Île-de-France',
            cotedazur: "Côte d'Azur",
            alpes: 'Alpes & Savoie',
            bordeaux: 'Bordeaux',
            provence: 'Provence',
        },
    },
    // ── Hero ──────────────────────────────────────────────────
    hero: {
        eyebrow: 'Immobilier de Prestige · France',
        line1: 'La Propriété',
        line2: 'Exceptionnelle',
        line3: 'Vous Attend',
        subtitle: "850+ propriétés d'exception. Côte d'Azur, Paris, Alpes, Bordeaux.\n18 ans d'expertise au service de vos ambitions.",
        cta1: 'Explorer les Annonces',
        cta2: 'Contacter un Expert',
    },
    // ── Stats ─────────────────────────────────────────────────
    stats: [
        { value: '850+', label: 'Propriétés' },
        { value: '32', label: 'Destinations' },
        { value: '18 ans', label: "d'Expertise" },
        { value: '€2.1Md', label: 'Transactions' },
    ],
    // ── Search ────────────────────────────────────────────────
    search: {
        destination: 'Destination',
        allDestinations: 'Toutes les destinations',
        type: 'Type de bien',
        allTypes: 'Tous les types',
        budget: 'Budget maximum',
        noBudget: 'Sans limite',
        search: 'Rechercher',
        types: {
            villa: 'Villa',
            apartment: 'Appartement',
            chalet: 'Chalet',
            domain: 'Domaine',
            penthouse: 'Penthouse',
        },
    },
    // ── Featured listings ─────────────────────────────────────
    featured: {
        eyebrow: 'Sélection Exclusive',
        title: 'Propriétés Phares',
        allListings: 'Toutes les Annonces',
        empty: 'Aucune propriété à afficher.',
    },
    // ── Destinations ──────────────────────────────────────────
    destinationsSection: {
        eyebrow: 'Nos Marchés',
        title: 'Explorer par Destination',
        properties: 'propriétés →',
    },
    // ── Why us ────────────────────────────────────────────────
    whyUs: {
        eyebrow: 'Notre Différence',
        title: 'Pourquoi Choisir Sotheby Realty',
        items: [
            { title: 'Portefeuille Exclusif', text: "850+ propriétés dont 40% en off-market exclusif. Accès à des biens jamais publiés sur les portails grand public." },
            { title: 'Expertise Internationale', text: "Conseillers multilingues (FR/EN/ZH/RU/AR) et réseau dans 28 pays. Vos acheteurs sont partout, nous aussi." },
            { title: 'Discrétion Absolue', text: "Chaque transaction est traitée avec la plus stricte confidentialité. Protocole de protection des données certifié ISO 27001." },
        ],
    },
    // ── Testimonials ──────────────────────────────────────────
    testimonials: {
        eyebrow: 'Témoignages',
        title: 'Ils Nous Font Confiance',
        items: [
            { name: 'Alexandre D.', title: 'Acquéreur, Paris 8e', text: "Un accompagnement d'une qualité rare. L'équipe de Sotheby Realty a trouvé notre appartement de rêve en moins de 3 semaines. Discrets, professionnels, excellents négociateurs." },
            { name: 'Isabelle R.', title: 'Vendeur, Cap-Ferrat', text: "Ma villa a été vendue au-dessus du prix estimé, grâce à leur réseau international d'acheteurs qualifiés. Je recommande sans réserve." },
            { name: 'Thomas & Sarah M.', title: 'Acquéreurs, Courchevel', text: "Notre chalet de rêve à Courchevel 1850 trouvé via leur base off-market exclusive. Une expérience premium de bout en bout." },
        ],
    },
    // ── CTA Banner ────────────────────────────────────────────
    ctaBanner: {
        eyebrow: 'Commençons Ensemble',
        title: "Votre Propriété d'Exception\nCommence Ici",
        subtitle: "Partagez votre projet avec l'un de nos conseillers. Réponse garantie sous 2 heures, 7j/7.",
        cta1: 'Prendre Rendez-vous',
        cta2: 'Explorer les Annonces',
    },
    // ── Footer ────────────────────────────────────────────────
    footer: {
        tagline: "L'immobilier de prestige, réinventé.",
        copyright: 'Tous droits réservés. Carte professionnelle n° CPI 7501 2018 XXX XXX.',
        guarantee: 'Garantie Financière : 110\u202f000 € — AXA Assurances · Responsabilité Civile Professionnelle',
        cols: [
            {
                heading: 'Annonces',
                links: [
                    { label: 'Villas de luxe', href: '/annonces?type=VILLA' },
                    { label: 'Appartements prestige', href: '/annonces?type=APPARTEMENT' },
                    { label: 'Chalets & montagne', href: '/annonces?type=CHALET' },
                    { label: 'Domaines & châteaux', href: '/annonces?type=DOMAINE' },
                    { label: 'Penthouses', href: '/annonces?type=PENTHOUSE' },
                ],
            },
            {
                heading: 'Destinations',
                links: [
                    { label: 'Paris & Île-de-France', href: '/destinations/paris' },
                    { label: "Côte d'Azur", href: '/destinations/cote-dazur' },
                    { label: 'Alpes & Savoie', href: '/destinations/alpes' },
                    { label: 'Bordeaux', href: '/destinations/bordeaux' },
                    { label: 'Provence', href: '/destinations/provence' },
                ],
            },
            {
                heading: 'Agence',
                links: [
                    { label: 'À Propos', href: '/a-propos' },
                    { label: 'Services', href: '/services' },
                    { label: "L'Équipe", href: '/equipe' },
                    { label: 'Blog & Magazine', href: '/blog' },
                    { label: 'Contact', href: '/contact' },
                ],
            },
            {
                heading: 'Juridique',
                links: [
                    { label: 'Mentions légales', href: '/mentions-legales' },
                    { label: 'Confidentialité', href: '/politique-confidentialite' },
                    { label: 'CGU', href: '/cgu' },
                    { label: 'Cookies', href: '/cookies' },
                ],
            },
        ],
    },
    // ── Login / Register ──────────────────────────────────────
    auth: {
        loginTab: 'Se connecter',
        registerTab: 'Créer un compte',
        welcomeLogin: 'Bienvenue',
        welcomeRegister: 'Rejoignez-nous',
        subtitleLogin: 'Connectez-vous à votre espace Sotheby Realty',
        subtitleRegister: 'Créez votre compte pour accéder à notre sélection exclusive',
        continueWithGoogle: 'Continuer avec Google',
        redirecting: 'Redirection…',
        or: 'ou',
        email: 'Adresse email',
        password: 'Mot de passe',
        minPassword: '(min. 8 caractères)',
        confirmPassword: 'Confirmer le mot de passe',
        fullName: 'Prénom et nom',
        forgotPassword: 'Mot de passe oublié ?',
        loginBtn: 'Se connecter',
        loginLoading: 'Connexion…',
        registerBtn: 'Créer mon compte',
        registerLoading: 'Création du compte…',
        noAccount: 'Pas encore de compte ?',
        alreadyAccount: 'Déjà inscrit ?',
        backToSite: '← Retour au site',
        privateSpace: 'Espace privé',
        registerSuccess: 'Inscription réussie ! Vérifiez votre email pour confirmer votre compte.',
        resetSent: 'Email de réinitialisation envoyé !',
        errors: {
            authFailed: 'La connexion a échoué. Veuillez réessayer.',
            unauthorized: 'Accès non autorisé.',
            invalidCredentials: 'Email ou mot de passe incorrect.',
            passwordMismatch: 'Les mots de passe ne correspondent pas.',
            passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
            enterEmail: "Entrez votre email d'abord.",
        },
        legal: "En continuant, vous acceptez nos mentions légales et notre politique de confidentialité.",
    },
    // ── Property card ─────────────────────────────────────────
    property: {
        rooms: 'ch.',
        bathrooms: 'sdb.',
        surface: 'm²',
        viewDetails: 'Voir le bien',
    },
};

export type Translations = typeof fr;
