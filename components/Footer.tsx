'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/LanguageContext';

export default function Footer() {
    const { t } = useTranslations();

    return (
        <footer className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    {/* Left Side: Brand & Tagline */}
                    <div className="flex flex-col">
                        <Link href="/" className="block mb-4 no-underline group">
                            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-black group-hover:text-[#C9A84C] transition-colors">SOTHEBY REALTY</span>
                            <span className="block text-[10px] font-medium tracking-[0.25em] uppercase text-black/40 mt-1 group-hover:text-black/60 transition-colors">Prestige & Excellence</span>
                        </Link>
                        <p className="text-[#374151] text-sm font-medium italic">
                            {t.footer.tagline}
                        </p>
                    </div>

                    {/* Right Side: Legal Links */}
                    <div className="flex flex-col">
                        <ul className="space-y-4">
                            {t.footer.cols[0].links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 text-[15px] font-bold text-black hover:text-[#C9A84C] transition-colors group"
                                    >
                                        <span className="text-sm font-light text-black/60">&rsaquo;</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Legal / Copyright Footer Text */}
                <div className="pt-8 border-t border-gray-100/50">
                    <div className="text-[10px] leading-relaxed text-gray-400 space-y-4 text-justify sm:text-left">
                        <p>Copyright &copy; 2006-2026 Sotheby&apos;s International Realty Affiliates LLC. All Rights Reserved.</p>

                        <p>
                            <Link href="#" className="underline hover:text-gray-500">Texas Real Estate Commission Consumer Protection Notice</Link>
                        </p>

                        <p>
                            Sotheby&apos;s International Realty Affiliates LLC fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Each Office is Independently Owned and Operated. Sotheby&apos;s International Realty, the Sotheby&apos;s International Realty logo, &quot;For the Ongoing Collection of Life&quot; and RESIDE are registered (or unregistered) service marks owned or licensed to Sotheby&apos;s International Realty Affiliates LLC.
                        </p>

                        <p>
                            The information set forth on this site is based upon information which we consider reliable, but because it has been supplied by third parties to our franchisees (who in turn supplied it to us), we can not represent that it is accurate or complete, and it should not be relied upon as such. In accordance with applicable MLS rules, IDX listings displayed on this site may be filtered by certain objective criteria, including price. The offerings are subject to errors, omissions, changes, including price, or withdrawal without notice. All dimensions are approximate and have not been verified by the selling party and can not be verified by Sotheby&apos;s International Realty Affiliates LLC. It is recommended that you hire a professional in the business of determining dimensions, such as an appraiser, architect or civil engineer, to determine such information.
                        </p>

                        <p>
                            <Link href="#" className="underline hover:text-gray-500">Texas Real Estate Commission Information About Brokerage Services</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
