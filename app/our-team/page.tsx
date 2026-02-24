import Image from 'next/image';

export default function OurTeamPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0F2644] mb-6 font-sans">
                        Our team
                    </h1>
                    <p className="text-xl md:text-2xl text-[#3A4B6B] font-serif max-w-2xl leading-relaxed">
                        We are at your entire disposal to sell or find your property
                    </p>
                </div>

                {/* Board of Directors Section */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F2644] mb-10 font-sans">
                        Board of Directors
                    </h2>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12">

                        {/* Luca Tagliaboschi */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/luca.jpg"
                                    alt="Luca Tagliaboschi"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Luca Tagliaboschi
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                CO-FOUNDER, PRESIDENT & CEO
                            </p>
                        </div>

                        {/* Alexandre Baechler */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/alexandre.jpg"
                                    alt="Alexandre Baechler"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Alexandre Baechler
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                CO-FOUNDER, ADMINISTRATOR & DIRECTOR
                            </p>
                        </div>

                        {/* Eliano Zaccaria */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/eliano.jpg"
                                    alt="Eliano Zaccaria"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Eliano Zaccaria
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                CFO, COO & ADMINISTRATOR
                            </p>
                        </div>

                    </div>
                </div>

                {/* Directors Section */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F2644] mb-10 font-sans">
                        Directors
                    </h2>

                    {/* Directors Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">

                        {/* Eliano Zaccaria */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/eliano.jpg"
                                    alt="Eliano Zaccaria"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Eliano Zaccaria
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                CFO, COO & ADMINISTRATOR
                            </p>
                        </div>

                        {/* Elisabeth Ribeiro */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/stefania.jpg"
                                    alt="Elisabeth Ribeiro"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Elisabeth Ribeiro
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                HUMAN RESOURCES DIRECTOR
                            </p>
                        </div>

                        {/* Stefania Rousseau */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/elisabeth.jpg"
                                    alt="Stefania Rousseau"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Stefania Rousseau
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                MARKETING DIRECTOR
                            </p>
                        </div>

                        {/* Yoan Patrao */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/yoan.jpg"
                                    alt="Yoan Patrao"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Yoan Patrao
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                RESALE MANAGER
                            </p>
                        </div>

                    </div>
                </div>

                {/* Service Manager Section */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F2644] mb-10 font-sans">
                        Service Manager
                    </h2>

                    {/* Service Manager Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">

                        {/* Franck Robinet */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/franck.jpg"
                                    alt="Franck Robinet"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Franck Robinet
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                GENEVA REGIONAL DIRECTOR & ACADEMY
                            </p>
                        </div>

                        {/* Nicolas Maillot */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/nicolas.jpg"
                                    alt="Nicolas Maillot"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Nicolas Maillot
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                WESTERN VAUD REGIONAL DIRECTOR & ACADEMY TRAINER
                            </p>
                        </div>

                        {/* Kenny Flückiger */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/kenny.jpg"
                                    alt="Kenny Flückiger"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Kenny Flückiger
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase leading-tight mt-1">
                                EASTERN VAUD AND NEUCHÂTEL REGIONAL DIRECTOR &<br />ACADEMY TRAINER
                            </p>
                        </div>

                        {/* Isabelle Bauwens */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/isabelle.jpg"
                                    alt="Isabelle Bauwens"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Isabelle Bauwens
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase leading-tight mt-1">
                                REGIONAL DIRECTOR FOR FRIBOURG AND VALAIS
                            </p>
                        </div>

                    </div>
                </div>

                {/* Sales Force Section */}
                <div className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F2644] mb-10 font-sans">
                        Sales force
                    </h2>

                    {/* Sales Force Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">

                        {/* Julien Schneider */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/julien.jpg"
                                    alt="Julien Schneider"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Julien Schneider
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                REAL ESTATE AGENT, TRUSTEE
                            </p>
                        </div>

                        {/* Surya Ecabert-Cotting */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/surya.jpg"
                                    alt="Surya Ecabert-Cotting"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Surya Ecabert-Cotting
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                REAL ESTATE AGENT, NEW PROJECT MANAGER, TRUSTEE
                            </p>
                        </div>

                        {/* Julie Ogiz */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/julie.jpg"
                                    alt="Julie Ogiz"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Julie Ogiz
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                REAL ESTATE AGENT, TRUSTEE
                            </p>
                        </div>

                        {/* Carole Clément */}
                        <div className="flex flex-col">
                            <div className="w-full aspect-[4/5] relative mb-4 overflow-hidden bg-gray-100">
                                <Image
                                    src="/images/team/carole.jpg"
                                    alt="Carole Clément"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-[#3A4B6B] text-lg font-serif mb-1">
                                Carole Clément
                            </h3>
                            <p className="text-[#6B7280] text-[10px] tracking-widest uppercase">
                                REAL ESTATE AGENT, TRUSTEE
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}
