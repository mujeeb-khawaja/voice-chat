import React from 'react';
import { getProductBySlug, getProductsBySubcategory } from '../lib/products';

export default function MensHub({ setView, openConcierge }) {
  const obsidianDial   = getProductBySlug('obsidian-dial');
  const chronoMono     = getProductBySlug('chronograph-monopusher');
  const lunarComp      = getProductBySlug('lunar-complication');
  const sportsProducts = getProductsBySubcategory('mens', 'sports');

  return (
    <div className="w-full">
      {/* Cinematic Hero Header */}
      <header className="relative w-full h-[600px] flex flex-col justify-end px-6 md:px-16 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            alt="Cinematic mechanical watch dial"
            className="w-full h-full object-cover object-center opacity-65 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdwlV36SVPQ5FzpNLmlbp57VbRuWE5aBtKzXFYElMsGb-CU86tHRo8emS5cIw7dqEHeIL8QB4lLhS1-Qsz0imByatrSNwDt0XTbD9Yua9UvlXgvTogh-5hSOyh-e1O_TlMLiYXiqDDNxEM1y4aymVYViqSk5uRIMStpyXfWw_ECxQrwjDrR-hbCrK0l4xzv9Ubk0a91MHk3MUVZn0JeP59AJ6qGriHzHMc09eiuY-cm9R32mOMrfN-D7EETbo_4EjmUl2vvcSZzU39"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <div className="flex flex-col space-y-6">
            <nav className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
              Home / Men
            </nav>
            <h1 className="font-display text-5xl md:text-8xl text-white font-bold leading-tight">
              Men's Collection
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              A curation of mechanical excellence. Engineered for those who understand that time is not merely measured, but mastered.
            </p>
          </div>
        </div>
      </header>

      {/* Classic Collection Section */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-6">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Classic</h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Timeless silhouettes that transcend generations. Crafted with traditional horological techniques and refined materials.
            </p>
          </div>
          <div className="md:col-span-6 flex justify-end">
            <button
              type="button"
              onClick={openConcierge}
              className="font-mono text-xs text-white uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
            >
              Ask Live Concierge
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Featured Card */}
          {obsidianDial && (
            <button
              type="button"
              onClick={() => setView(obsidianDial.viewSlug)}
              className="md:col-span-8 glass-card group rounded-xl overflow-hidden relative flex flex-col justify-end h-125 cursor-pointer text-left"
            >
              <div className="absolute inset-0 watch-img-container z-0">
                <img
                  alt={obsidianDial.title}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  src={obsidianDial.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col space-y-2">
                <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase">{obsidianDial.collection}</span>
                <h3 className="font-display text-2xl md:text-3xl text-white">{obsidianDial.title}</h3>
                <div className="pt-4 flex justify-between items-center w-full">
                  <span className="font-mono text-xs text-white">${obsidianDial.price.toLocaleString()}</span>
                  <span className="material-symbols-outlined text-white group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </button>
          )}

          {/* Side Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {chronoMono && (
              <button
                type="button"
                onClick={() => setView(chronoMono.viewSlug)}
                className="glass-card group rounded-xl overflow-hidden relative flex flex-col justify-end h-59.5 cursor-pointer text-left"
              >
                <div className="absolute inset-0 watch-img-container z-0">
                  <img
                    alt={chronoMono.title}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    src={chronoMono.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="font-display text-xl text-white">{chronoMono.title}</h3>
                  <div className="pt-2 flex justify-between items-center w-full">
                    <span className="font-mono text-xs text-on-surface-variant">${chronoMono.price.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            )}

            {lunarComp && (
              <button
                type="button"
                onClick={() => setView(lunarComp.viewSlug)}
                className="glass-card group rounded-xl overflow-hidden relative flex flex-col justify-end h-59.5 cursor-pointer text-left"
              >
                <div className="absolute inset-0 watch-img-container z-0">
                  <img
                    alt={lunarComp.title}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    src={lunarComp.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent"></div>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="font-display text-xl text-white">{lunarComp.title}</h3>
                  <div className="pt-2 flex justify-between items-center w-full">
                    <span className="font-mono text-xs text-on-surface-variant">${lunarComp.price.toLocaleString()}</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Soft Break */}
      <div className="w-full h-32 bg-linear-to-b from-black to-[#09090B]"></div>

      {/* Sports Collection Section */}
      <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#09090B]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-6">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Sports</h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Purpose-built instruments forged from advanced composites and grade 5 titanium. Uncompromising performance in extreme conditions.
            </p>
          </div>
          <div className="md:col-span-6 flex justify-end">
            <button
              type="button"
              onClick={openConcierge}
              className="font-mono text-xs text-white uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
            >
              Customise with AI
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sportsProducts.map((product) => (
            <button
              key={product.slug}
              type="button"
              onClick={() => setView(product.viewSlug)}
              className="glass-card group rounded-xl overflow-hidden relative flex flex-col justify-end h-120 cursor-pointer text-left"
            >
              <div className="absolute inset-0 watch-img-container z-0 bg-[#131313]">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                  src={product.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8">
                <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase block mb-2">{product.collection}</span>
                <h3 className="font-display text-2xl text-white mb-4">{product.title}</h3>
                <div className="font-mono text-xs text-white border border-white/20 px-6 py-3 rounded hover:bg-white hover:text-black transition-colors duration-300 w-full text-center">
                  Explore Details
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
