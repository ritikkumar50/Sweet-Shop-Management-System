import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Cake } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-[#FFFBF9] dark:bg-slate-900 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F2] to-[#FFE4D6] dark:from-slate-800 dark:to-slate-900 py-24 lg:py-36">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-700/50 backdrop-blur-sm px-6 py-2 rounded-full mb-8 shadow-sm border border-white/50">
                        <Cake className="w-5 h-5 text-primary" />
                        <span className="text-base font-semibold text-accent tracking-wide uppercase font-serif">Artisan sweets, made with love</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-[#4A3B32] dark:text-white mb-8 leading-tight">
                        Indulge in <span className="text-primary italic">Sweet</span> Perfection
                    </h1>
                    <p className="text-xl md:text-2xl text-[#6D5D54] dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Discover our handcrafted collection of cakes, chocolates, pastries, and more.
                        Every bite is a moment of pure bliss.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F2744B] to-[#E05757] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg tracking-wide"
                        >
                            Explore Sweets <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-700 text-accent dark:text-white border border-gray-100 dark:border-slate-600 px-10 py-4 rounded-full font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-lg tracking-wide"
                        >
                            Join Us
                        </Link>
                    </div>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-1/4 w-1/3 h-full bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-[#4A3B32] dark:text-white mb-4">Why Choose Sweet Delights?</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We're not just a sweet shop - we're artisans dedicated to creating unforgettable taste experiences.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { icon: Sparkles, title: "Handcrafted Quality", desc: "Every sweet is made with love using premium ingredients" },
                        { icon: Truck, title: "Fast Delivery", desc: "Fresh sweets delivered to your doorstep within hours" },
                        { icon: ShieldCheck, title: "100% Satisfaction", desc: "Not happy? We'll make it right, guaranteed" }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-gray-50/50 dark:border-slate-700 hover:shadow-xl transition-all duration-300 text-center shadow-sm">
                            <div className="w-20 h-20 bg-[#FFF5F2] dark:bg-slate-700/50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
                                <feature.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-[#4A3B32] dark:text-white mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-[#8D7F75] dark:text-gray-400 leading-relaxed text-base font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Proof / Testimonials */}
            <div className="py-24 bg-white dark:bg-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-[#4A3B32] dark:text-white mb-4">What Our Customers Say</h2>
                        <p className="text-gray-600 dark:text-gray-400">Don't just take our word for it</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", text: "The best chocolate truffles I've ever tasted! Absolutely divine." },
                            { name: "Michael Chen", text: "My go-to for birthday cakes. Never disappoints!" },
                            { name: "Emma Williams", text: "Fresh, delicious, and beautifully packaged. Love it!" }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-[#FFFBF9] dark:bg-slate-900 p-8 rounded-2xl border border-transparent hover:border-primary/20 transition-colors">
                                <div className="flex gap-1 text-primary mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-lg text-[#4A3B32] dark:text-gray-200 italic mb-6">"{testimonial.text}"</p>
                                <div className="font-bold font-serif text-[#4A3B32] dark:text-white">{testimonial.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Footer */}
            <div className="bg-gradient-to-b from-[#FFF5F2] to-[#FFE4D6] dark:from-slate-800 dark:to-slate-900 py-32 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl md:text-6xl font-serif text-[#4A3B32] dark:text-white mb-8">Ready to Satisfy Your Sweet Tooth?</h2>
                    <p className="text-xl text-[#6D5D54] dark:text-gray-300 mb-10">Browse our collection of artisan sweets and find your new favorite treat.</p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F2744B] to-[#E05757] text-white px-12 py-5 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-xl tracking-wide"
                    >
                        Shop Now <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>


            <footer className="bg-white dark:bg-slate-900 py-8 border-t border-gray-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center sm:flex justify-between items-center text-gray-500 dark:text-gray-500 text-sm">
                    <div className="flex items-center justify-center gap-2 mb-4 sm:mb-0">
                        <Cake className="w-5 h-5 text-primary" />
                        <span className="font-serif font-bold text-[#4A3B32] dark:text-gray-300 text-lg">Sweet Delights</span>
                    </div>
                    <p>© 2024 Sweet Delights. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
