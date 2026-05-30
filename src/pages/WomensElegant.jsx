import React from 'react';
import { getProductBySlug } from '../lib/products';
import ProductInfoCard from '../components/ProductInfoCard';

export default function WomensElegant({ setView, openConcierge }) {
  const roseGold     = getProductBySlug('rose-gold-essence');
  const diamondGrace = getProductBySlug('diamond-grace');

  if (!roseGold) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mb-24 relative px-6 md:px-16 pt-24 max-w-360 mx-auto">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl md:text-8xl text-white mb-8 tracking-tighter leading-tight">
            Elegant Form.<br/>
            <span className="text-on-surface-variant">Luminous Spirit.</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Discover a collection defined by delicate proportions and an ethereal presence. Crafted for the modern woman, each piece explores the balance between strength and soft luminosity, suspending time in a quiet, glowing void.
          </p>
        </div>
      </section>

      {/* Product Grid (Asymmetric Bento) */}
      <section className="grid grid-cols-12 gap-8 mb-24 relative px-6 md:px-16 max-w-360 mx-auto">
        {/* Contextual AI Suggestion Card */}
        <button
          type="button"
          onClick={openConcierge}
          className="absolute -left-12 top-1/4 z-0 opacity-80 animate-float hidden lg:block cursor-pointer text-left"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-[24px] rounded-lg p-4 max-w-xs shadow-2xl flex items-start space-x-4">
            <span className="material-symbols-outlined text-white mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <div>
              <p className="font-mono text-[10px] text-outline mb-1">AI Suggestion</p>
              <p className="font-body text-sm text-white leading-relaxed">
                Based on your preference for delicate profiles, the {roseGold.title} aligns with your curation.
              </p>
            </div>
          </div>
        </button>

        {/* Featured Product: Rose Gold Essence */}
        <button
          type="button"
          onClick={() => setView(roseGold.viewSlug)}
          className="col-span-12 lg:col-span-7 group relative z-10 cursor-pointer text-left"
        >
          <div className="relative h-[650px] w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-[20px] overflow-hidden flex flex-col justify-end p-8 shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-white/10">
            <div className="absolute inset-0 z-0">
              <img
                alt={roseGold.title}
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out opacity-85 mix-blend-lighten"
                src={roseGold.cardImage || roseGold.image}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6">
              <div>
                <h2 className="font-display text-3xl md:text-5xl text-white mb-2">{roseGold.title}</h2>
                <p className="font-body text-sm text-on-surface-variant max-w-md leading-relaxed">
                  {roseGold.shortDescription}
                </p>
              </div>
              <div className="text-left md:text-right flex flex-col md:items-end gap-2">
                <span className="font-mono text-xs text-white block">{roseGold.collection}</span>
                <span className="px-6 py-3 border border-white text-black bg-white rounded-full font-mono text-xs uppercase tracking-widest group-hover:bg-transparent group-hover:text-white transition-all">
                  Explore
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Secondary Product: Diamond Grace */}
        {diamondGrace && (
          <button
            type="button"
            onClick={() => setView(diamondGrace.viewSlug)}
            className="col-span-12 lg:col-span-4 lg:col-start-9 group relative z-10 lg:mt-[160px] cursor-pointer text-left"
          >
            <div className="relative h-122.5 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-[20px] overflow-hidden flex flex-col justify-between p-8 shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-white/10">
              <div className="absolute inset-0 z-0">
                <img
                  alt={diamondGrace.title}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.03] transition-transform duration-1500 ease-out opacity-75 mix-blend-lighten"
                  src={diamondGrace.cardImage || diamondGrace.image}
                />
                <div className="absolute inset-0 bg-linear-to-b from-surface-container-lowest/80 via-transparent to-surface-container-lowest/90"></div>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-xs text-outline">New Arrival</span>
              </div>

              <div className="relative z-10">
                <h2 className="font-display text-2xl text-white mb-2">{diamondGrace.title}</h2>
                <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {diamondGrace.shortDescription}
                </p>
                <span className="group-hover:translate-x-2 transition-all duration-300 flex items-center text-white font-mono text-xs uppercase tracking-widest gap-2">
                  View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </button>
        )}
      </section>

      {/* Product Info Card */}
      <section className="px-6 md:px-16 mb-24 max-w-360 mx-auto">
        <ProductInfoCard product={roseGold} />
      </section>

      {/* Editorial / Luminous Focus Section */}
      <section className="mb-24 px-6 md:px-16 max-w-360 mx-auto">
        <div className="border-t border-white/10 pt-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <h3 className="font-display text-3xl text-white mb-6">Crafting the Light</h3>
            <p className="font-body text-sm text-on-surface-variant mb-8 leading-relaxed">
              Our approach to the women's collection prioritizes optical density and weightlessness. By utilizing advanced sapphire crystal shaping and micro-polishing techniques, each timepiece becomes a conduit for light, rendering heavy metals seemingly buoyant.
            </p>
            <button
              type="button"
              onClick={openConcierge}
              className="px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-mono text-xs uppercase tracking-widest rounded-full"
            >
              Speak to Consult
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
