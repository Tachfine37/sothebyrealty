/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Official Sotheby's International Realty brand palette
                navy: '#002247',          // primary — iconic deep navy
                'navy-mid': '#003366',    // hover state
                'navy-light': '#0A3660',  // card backgrounds etc.
                champagne: '#C6A96B',          // warm tan/champagne accent
                'champagne-light': '#D6BD8A',  // light champagne
                'champagne-dark': '#B89555',   // dark champagne (hover state)
                luxury: {
                    black: '#002247',     // map luxury-black to navy
                    dark: '#001A36',
                    charcoal: '#0A2540',
                    muted: '#64748B',     // slate-medium
                    light: '#94A3B8',     // slate-light
                    cream: '#F9F7F4',     // warm off-white
                    grey: '#F4F2EF',      // light warm grey
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
            },
            backgroundImage: {
                'champagne-gradient': 'linear-gradient(135deg, #C6A96B 0%, #D6BD8A 50%, #B89555 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
                slideUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                kenBurns: { from: { transform: 'scale(1.0)' }, to: { transform: 'scale(1.08)' } },
            },
            spacing: { '18': '4.5rem', '22': '5.5rem', '88': '22rem', '100': '25rem', '112': '28rem', '128': '32rem' },
            maxWidth: { '8xl': '88rem', '9xl': '96rem' },
            letterSpacing: { widest: '0.2em', superwide: '0.3em' },
        },
    },
    plugins: [],
}
