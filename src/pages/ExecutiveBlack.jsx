import React, { useState } from 'react';
import { getProductBySlug } from '../lib/products';
import ProductInfoCard from '../components/ProductInfoCard';

export default function ExecutiveBlack({ setView, openConcierge }) {
  const product = getProductBySlug('executive-black');
  const [isAdded, setIsAdded] = useState(false);
  const [btnText, setBtnText] = useState('Add to Bag');

  const handleAddToBag = () => {
    setBtnText('Added');
    setIsAdded(true);
    setTimeout(() => {
      setBtnText('Add to Bag');
      setIsAdded(false);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="w-full">
      <main className="min-h-screen flex flex-col md:flex-row pt-24">

        {/* Left Side: Immersive Imagery */}
        <section className="w-full md:w-1/2 relative flex items-center justify-center p-8 overflow-hidden bg-[#0e0e0e]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="relative w-full max-w-2xl aspect-square group cursor-crosshair flex items-center justify-center">
            <img
              alt={product.title}
              className="w-full h-full object-contain watch-float transition-transform duration-700 ease-out group-hover:scale-[1.05] relative z-10"
              src={product.image}
            />
          </div>
        </section>

        {/* Right Side: Details */}
        <section className="w-full md:w-1/2 flex flex-col p-8 md:p-16 overflow-y-auto pb-32">
          <div className="max-w-xl mx-auto md:ml-0 md:mr-auto w-full space-y-12">

            {/* Product Header */}
            <div className="space-y-4">
              <p className="font-mono text-xs text-[#c4c7c8] uppercase tracking-widest">{product.collection}</p>
              <h1 className="font-display text-5xl md:text-7xl text-white">{product.title}</h1>
              <p className="font-display text-2xl text-[#c4c7c8]">${product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div>
              <p className="font-body text-lg text-white font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specs Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl flex flex-col space-y-2">
                <span className="material-symbols-outlined text-[#8e9192]">autorenew</span>
                <p className="font-mono text-[10px] text-[#c4c7c8] uppercase tracking-widest">Movement</p>
                <p className="font-body text-white font-medium">{product.specifications.movement}</p>
              </div>
              <div className="glass-panel p-6 rounded-xl flex flex-col space-y-2">
                <span className="material-symbols-outlined text-[#8e9192]">diamond</span>
                <p className="font-mono text-[10px] text-[#c4c7c8] uppercase tracking-widest">Crystal</p>
                <p className="font-body text-white font-medium">{product.specifications.crystal}</p>
              </div>
              <div className="glass-panel p-6 rounded-xl flex flex-col space-y-2">
                <span className="material-symbols-outlined text-[#8e9192]">straighten</span>
                <p className="font-mono text-[10px] text-[#c4c7c8] uppercase tracking-widest">Diameter</p>
                <p className="font-body text-white font-medium">{product.specifications.diameter}</p>
              </div>
              <div className="glass-panel p-6 rounded-xl flex flex-col space-y-2">
                <span className="material-symbols-outlined text-[#8e9192]">water_drop</span>
                <p className="font-mono text-[10px] text-[#c4c7c8] uppercase tracking-widest">Water Resistance</p>
                <p className="font-body text-white font-medium">{product.specifications.waterResistance}</p>
              </div>
            </div>

            {/* Product Info Card — price, delivery, warranty, payments */}
            <ProductInfoCard product={product} />

            {/* AI Concierge Panel */}
            <div
              onClick={openConcierge}
              className="glass-panel p-8 rounded-xl relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center orb-pulse flex-shrink-0">
                  <span className="material-symbols-outlined text-white">graphic_eq</span>
                </div>
                <div className="space-y-3">
                  <p className="font-mono text-xs text-white flex items-center gap-2 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse"></span>
                    Live Concierge
                  </p>
                  <p className="font-body text-sm text-[#c4c7c8] italic leading-relaxed">
                    "The {product.specifications.diameter} case profile of the {product.title} sits exceptionally well on medium to large wrists. Would you like to hear about the bespoke strap options for this model?"
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/10">
              <button
                onClick={openConcierge}
                className="flex-1 border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white font-mono text-xs uppercase py-4 px-8 rounded-full transition-all duration-300 flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">mic</span>
                Reserve via Voice
              </button>
              <button
                onClick={handleAddToBag}
                className={`flex-1 font-mono text-xs uppercase py-4 px-8 rounded-full transition-all duration-300 flex justify-center items-center gap-2 ${
                  isAdded ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-white/90 hover:scale-[0.98]'
                }`}
              >
                {btnText}
              </button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
