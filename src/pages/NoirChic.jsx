import React, { useState } from 'react';
import { getProductBySlug } from '../lib/products';
import ProductInfoCard from '../components/ProductInfoCard';

export default function NoirChic({ setView, openConcierge }) {
  const product = getProductBySlug('noir-chic');
  const [btnText, setBtnText] = useState('Acquire');
  const [isAcquired, setIsAcquired] = useState(false);

  const handleAcquire = () => {
    setBtnText('Acquired');
    setIsAcquired(true);
    setTimeout(() => {
      setBtnText('Acquire');
      setIsAcquired(false);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,53,53,0.2)_0%,rgba(14,14,14,1)_85%)] z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full relative z-10 items-center max-w-360 mx-auto">
          {/* Typography */}
          <div className="md:col-span-5 md:col-start-2 flex flex-col gap-6 z-20 mix-blend-difference">
            <h1 className="font-display text-5xl md:text-8xl text-white uppercase tracking-tighter leading-tight">
              Noir<br/>Chic
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-md">
              {product.description}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={handleAcquire}
                className={`px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 font-mono text-xs uppercase tracking-widest bg-white/5 backdrop-blur-md ${isAcquired ? 'bg-white text-black' : ''}`}
              >
                {btnText}
              </button>
              <span className="font-mono text-xs text-on-surface-variant">${product.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-7 relative h-[500px] md:h-[700px] flex items-center justify-center mt-12 md:mt-0 watch-float">
            <img
              alt={product.title}
              className="object-contain h-full w-full drop-shadow-[0_0_40px_rgba(255,255,255,0.05)] scale-100 hover:scale-105 transition-transform duration-1000 ease-out mix-blend-lighten"
              src={product.image}
            />
          </div>
        </div>
      </section>

      {/* Product Info Card */}
      <section className="py-12 px-6 md:px-16 bg-black max-w-360 mx-auto">
        <ProductInfoCard product={product} />
      </section>

      {/* Technical Specification Bento Grid */}
      <section className="py-24 px-6 md:px-16 relative bg-black max-w-360 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(180px,auto)]">
          <div className="col-span-1 md:col-span-12 mb-12">
            <h2 className="font-display text-3xl md:text-5xl text-white">The Architecture of Night</h2>
            <div className="w-24 h-px bg-white/20 mt-6"></div>
          </div>

          {/* Large Image Card */}
          <div className="col-span-1 md:col-span-8 row-span-2 glass-card rounded-xl overflow-hidden relative group min-h-[400px]">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
            <img
              alt="Movement Detail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              src={product.gallery[0] || product.image}
            />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="font-mono text-xs text-white bg-black/50 px-3 py-1 rounded backdrop-blur-md">
                {product.specifications.movement}
              </span>
            </div>
          </div>

          {/* Spec Card: Vantablack Dial */}
          <button
            type="button"
            onClick={openConcierge}
            className="col-span-1 md:col-span-4 glass-card rounded-xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors duration-500 cursor-pointer bg-black/20 text-left"
          >
            <span className="material-symbols-outlined text-outline text-3xl">dark_mode</span>
            <div>
              <h3 className="font-display text-xl text-white mb-2">Vantablack Dial</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Absorbs 99.96% of visible light, creating an optical void beneath the sapphire crystal.
              </p>
            </div>
          </button>

          {/* Spec Card: Abyssal Rating */}
          <button
            type="button"
            onClick={openConcierge}
            className="col-span-1 md:col-span-4 glass-card rounded-xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors duration-500 cursor-pointer bg-black/20 text-left"
          >
            <span className="material-symbols-outlined text-outline text-3xl">water_drop</span>
            <div>
              <h3 className="font-display text-xl text-white mb-2">Abyssal Rating</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Pressure tested to {product.specifications.waterResistance}. Engineered for the deep.
              </p>
            </div>
          </button>

          {/* Material Stats Card */}
          <div className="col-span-1 md:col-span-12 glass-card rounded-xl p-8 md:p-12 mt-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden bg-black/20">
            <div className="md:w-1/3 z-10">
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Forged Ceramic</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Three times harder than steel, entirely scratch-resistant, and astonishingly light. The {product.title}'s case undergoes a 14-day sintering process.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6 z-10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-outline">Weight</span>
                <span className="font-display text-xl text-white">{product.specifications.weight}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-outline">Diameter</span>
                <span className="font-display text-xl text-white">{product.specifications.diameter}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-outline">Thickness</span>
                <span className="font-display text-xl text-white">{product.specifications.thickness}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-outline">Reserve</span>
                <span className="font-display text-xl text-white">{product.specifications.powerReserve}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-24 w-full relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply"></div>
          <img
            alt="Lifestyle"
            className="w-full h-full object-cover object-center grayscale opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvMgaIlcXwNqjyi53ielmX_milaXzSMi92sNper55wHMCj2S1teqJ-A95uUYjjtfzM44dXEJpWQABH-yGifVEsYLBAvpqFlSeHAABkhLdQp1GPlHzjg6WhdMAh1uR1RqayZeVedYd70p_cOMmZXkpj5M2q_T0g2uuOnknIWRjq_y6md9XaJVc3pGckjK1gGyyj-bkBfexTl8l7YGQ8dbSKVIIDSne9gzypwqsVlaJRqFykDSdICivbaebrjiIW8CGD8xxATrfmdQ4H"
          />
        </div>
        <div className="relative z-20 px-6 md:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-start-8 md:col-span-5 glass-panel p-10 rounded-xl border-l-2 border-l-white/30 backdrop-blur-3xl bg-black/40">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-6">Presence,<br/>Not Noise.</h2>
            <p className="font-body text-sm text-on-surface-variant mb-8 leading-relaxed">
              True luxury whispers. The {product.title} is designed to disappear until it's needed, serving as a subtle extension of intention rather than a cry for attention.
            </p>
            <button
              type="button"
              onClick={openConcierge}
              className="flex items-center gap-4 text-white hover:text-white transition-colors group"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Speak to Explore Heritage</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
