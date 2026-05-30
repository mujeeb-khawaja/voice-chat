import React, { useState } from 'react';
import { getProductBySlug, getProductsByCategory } from '../lib/products';
import ProductInfoCard from '../components/ProductInfoCard';

export default function RoseGold({ setView, openConcierge }) {
  const product     = getProductBySlug('rose-gold-essence');
  const accessories = getProductsByCategory('accessories');

  const [btnText, setBtnText] = useState('Add to Bag');
  const [isAcquired, setIsAcquired] = useState(false);

  const handleAddToBag = () => {
    setBtnText('Acquired');
    setIsAcquired(true);
    setTimeout(() => {
      setBtnText('Add to Bag');
      setIsAcquired(false);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[716px] px-6 md:px-16 pt-24">
        {/* Text Content */}
        <div className="md:col-span-5 flex flex-col items-start z-10 order-2 md:order-1 mt-12 md:mt-0">
          <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-4">{product.collection}</p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
            Rose Gold<br/>Essence.
          </h1>
          <p className="font-body text-lg text-on-surface-variant mb-8 max-w-md">
            {product.description}
          </p>
          <div className="flex items-center space-x-6 mb-12 text-white">
            <span className="font-body text-xl">${product.price.toLocaleString()}</span>
            <span className="h-4 w-px bg-white/20"></span>
            <span className="font-mono text-xs text-on-surface-variant uppercase">{product.specifications.diameter} Case</span>
          </div>
          <button
            onClick={handleAddToBag}
            className={`group relative overflow-hidden border border-white/20 px-10 py-5 transition-all duration-500 rounded-lg ${isAcquired ? 'bg-white text-black' : 'bg-transparent text-white hover:border-white hover:bg-white hover:text-black'}`}
          >
            <span className="relative z-10 font-mono text-xs text-inherit uppercase tracking-widest flex items-center space-x-3 transition-colors duration-500">
              <span>{btnText}</span>
              <span className="material-symbols-outlined text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500">arrow_forward</span>
            </span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-7 h-125 md:h-175 relative order-1 md:order-2 group overflow-hidden rounded-2xl glass-card flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          <img
            className="w-full h-full object-contain transform transition-transform duration-[2s] group-hover:scale-105 relative z-10 mix-blend-lighten"
            src={product.image}
            alt={product.title}
          />
        </div>
      </section>

      {/* Spacer */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-24"></div>

      {/* Product Info Card */}
      <section className="px-6 md:px-16 mb-24">
        <ProductInfoCard product={product} />
      </section>

      {/* Detailed Shots Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16">
        <div className="md:col-span-12 mb-12 flex justify-between items-end">
          <h2 className="font-display text-3xl md:text-5xl text-white">Luminous Refinement.</h2>
          <p className="font-mono text-xs text-on-surface-variant max-w-xs text-right hidden md:block">
            Every angle reveals a dedication to immaculate surfacing and structural integrity.
          </p>
        </div>

        {/* Wide Gallery Image */}
        <div className="md:col-span-8 h-128 glass-card rounded-2xl overflow-hidden group">
          <div className="w-full h-full bg-surface-container-low relative">
            <img
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
              src={product.gallery[0] || product.image}
              alt="Luminous Refinement Details"
            />
          </div>
        </div>

        {/* Feature Card */}
        <div className="md:col-span-4 h-128 glass-card rounded-2xl overflow-hidden group p-8 flex flex-col justify-between relative bg-black/40">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-0"></div>
          <div className="z-10 relative">
            <span className="material-symbols-outlined text-white/50 mb-4">architecture</span>
            <h3 className="font-display text-2xl text-white">Sculpted Sapphire</h3>
          </div>
          <p className="font-body text-on-surface-variant z-10 relative leading-relaxed">
            The domed sapphire crystal is seamlessly integrated into the rose gold bezel, creating an edge-to-edge glass experience that practically vanishes when viewed head-on.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-24"></div>

      {/* Orb Suggests — Accessories */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16 mb-24">
        <div className="md:col-span-2 md:col-start-2 xl:col-start-1 xl:col-span-2 flex flex-col items-center justify-start pt-12 hidden md:flex">
          <button
            type="button"
            onClick={openConcierge}
            className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center orb-pulse mb-6 cursor-pointer hover:bg-white/15 transition-all"
          >
            <span className="material-symbols-outlined text-white/70">blur_on</span>
          </button>
        </div>

        <div className="md:col-span-10 xl:col-span-9 glass-card rounded-4xl p-8 md:p-16 relative overflow-hidden bg-black/40">
          <div className="absolute top-0 left-0 w-full h-full border-t border-l border-white/20 rounded-4xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="font-display text-3xl text-white mb-2 flex items-center gap-4">
                <span className="material-symbols-outlined text-white">auto_awesome</span>
                <span>The Orb Suggests</span>
              </h2>
              <p className="font-body text-on-surface-variant">Curated pairings to complete the {product.title} aesthetic.</p>
            </div>
            <button
              type="button"
              onClick={openConcierge}
              className="font-mono text-xs text-white uppercase tracking-widest border-b border-white/30 hover:border-white pb-1 transition-colors mt-6 md:mt-0"
            >
              View All Matches
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessories.slice(0, 2).map((item) => (
              <div key={item.slug} className="block group relative glass-card p-6 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="w-full h-48 bg-surface-container-low rounded-lg mb-6 overflow-hidden">
                  <img
                    className="w-full h-full object-cover mix-blend-lighten opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    src={item.cardImage || item.image}
                    alt={item.title}
                  />
                </div>
                <h4 className="font-body text-white mb-1">{item.title}</h4>
                <p className="font-mono text-xs text-on-surface-variant">${item.price.toLocaleString()}</p>
              </div>
            ))}

            {/* AI CTA Card */}
            <button
              type="button"
              onClick={openConcierge}
              className="hidden md:flex md:flex-col md:items-center md:justify-center glass-card p-6 rounded-xl border-dashed border-white/20 text-center hover:bg-white/5 transition-all cursor-pointer bg-black/20"
            >
              <span className="material-symbols-outlined text-white/40 mb-4 text-4xl">tune</span>
              <p className="font-body text-on-surface-variant text-sm">Speak to refine<br/>these recommendations.</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
