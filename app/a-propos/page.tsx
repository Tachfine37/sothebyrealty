import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'We offer unique places suitable for your comfort',
};

const values = [
    {
        title: 'Excellence',
        desc: "Every detail matters. From the careful curation of our properties to the seamless experience we offer, excellence is not a choice it's our standard. We strive for perfection in every stay, every service, every moment.",
        img: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: 'Authenticity',
        desc: 'True luxury is emotion. Each home tells a story of craftsmanship, culture, and character. We celebrate genuine experiences that connect people to places, far from anything ordinary or impersonal.',
        img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: 'Escape',
        desc: "Travel is more than movement it's transformation. Our villas and chalets invite you to slow down, to reconnect, to create lasting memories. Every stay is an invitation to live something extraordinary.",
        img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    },
];

const team = [
    {
        name: 'Olivier',
        title: 'CEO',
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: 'Sarah',
        title: 'Marketing Director',
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: 'Alexandre',
        title: 'Customer Care',
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
    },
];

export default function AboutPage() {
    return (
        <div className="bg-[#f9f9f9] min-h-screen font-sans">
            <Header />

            {/* Hero Section */}
            <section
                className="relative pt-40 pb-32 md:pt-56 md:pb-48 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583847268964-b28ce8fcf15d?auto=format&fit=crop&q=80&w=2000')" }}
            >
                {/* Subtle overlay to ensure text readability if needed, though the reference image is quite bright */}
                <div className="absolute inset-0 bg-white/20"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
                    <div className="text-left w-full max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#333333] mb-4">
                            About us
                        </h1>
                        <p className="text-lg md:text-xl text-[#333333] font-medium">
                            We offer unique places suitable for your comfort
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#DDA15E] mb-8">
                        Our Story
                    </h2>
                    <div className="space-y-6 text-[#555555] text-[15px] leading-relaxed max-w-5xl">
                        <p>
                            At <span className="font-semibold">Sotheby&apos;s</span>, we believe that every journey deserves a place as extraordinary as the memories it creates.<br />
                            Born from a passion for refined travel and exceptional design, our marketplace connects discerning travelers with the world&apos;s most exclusive villas, chalets, and luxury retreats.
                        </p>
                        <p>
                            We started with a simple vision: to make finding your dream home away from home effortless and inspiring. Each property on our platform is handpicked for its character, elegance, and sense of place from sun-drenched coastal villas to cozy mountain hideaways.
                        </p>
                        <p>
                            More than just a booking platform, <span className="font-semibold">Sotheby&apos;s</span> is a community built around authenticity, excellence, and experiences that stay with you long after you leave.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 md:py-24 bg-[#f9f9f9]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#DDA15E] mb-12">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v) => (
                            <div key={v.title} className="flex flex-col">
                                <div
                                    className="w-full aspect-[4/3] bg-cover bg-center mb-6"
                                    style={{ backgroundImage: `url('${v.img}')` }}
                                ></div>
                                <h3 className="text-lg font-bold text-[#DDA15E] mb-4">
                                    {v.title}
                                </h3>
                                <p className="text-[#666666] text-sm leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-20 md:py-24 bg-[#f9f9f9]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#DDA15E] mb-12">
                        Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((m) => (
                            <div key={m.name} className="flex flex-col">
                                <div
                                    className="w-full aspect-[4/3] bg-cover bg-top mb-4"
                                    style={{ backgroundImage: `url('${m.img}')` }}
                                ></div>
                                <p className="text-[13px] text-[#555555]">
                                    <span className="font-bold">{m.name}</span> - {m.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
