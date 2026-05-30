import React from 'react';
import { getProductBySlug } from '../lib/products';

export default function WomensHub({ setView, openConcierge }) {
  const sapphireSilhouette = getProductBySlug('sapphire-silhouette');
  const roseGoldMesh       = getProductBySlug('rose-gold-mesh');
  const novaObsidian       = getProductBySlug('nova-obsidian');
  const ceramicNight       = getProductBySlug('ceramic-night');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-150 flex items-center px-6 md:px-16 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(14,14,14,0.8)_85%)] pointer-events-none z-10"></div>
        <div className="absolute inset-0 z-0">
          <img
            alt="Women's Watch Hero Lifestyle"
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI0cB8jSmoWvJ2WSi5kTTd6NHWvC-5deCzVPZ60NQperkZ9txCLyMTSF3uURX0jxYjZ2aHRJmBPoQBO2zRRmwtFZ3mOzrvMNSwmGztWJRBodQ8Ya6HtFM-wxhPjw9yJbHA4FA62XENHizyByvoHPcFmaJKuDIN32l1zanq97cFQFR87tkT9dJ-xYJtVF0PwrMvxrWOBxpU9pRnL39v-Kxi9NHvDVEfxgLd7xW8hAQPvSkCP1pV0Zbszh6so3O6mPpSTu6phJxd1pSU"
          />
        </div>
        <div className="relative z-20 max-w-4xl">
          <nav className="mb-6">
            <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase">Home / Women</span>
          </nav>
          <h1 className="font-display text-5xl md:text-8xl text-white mb-6 leading-tight">
            Women's<br/>Collection
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
            A curation of exquisite timepieces blending traditional horological prestige with fluid, modern aesthetics. Discover a physical layer of polished luxury floating within infinite design space.
          </p>
        </div>
      </section>

      {/* Elegant Collection Section */}
      <section className="px-6 md:px-16 mt-24 relative max-w-360 mx-auto bg-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-2">Elegant Collection</h2>
            <p className="font-body text-on-surface-variant max-w-md">Masterpieces of understatement, designed for moments that demand quiet confidence.</p>
          </div>
          <button
            type="button"
            onClick={openConcierge}
            className="group px-6 py-3 border border-white/20 rounded-full font-mono text-xs text-white hover:bg-white hover:text-black transition-all duration-500 ease-out flex items-center gap-2"
          >
            <span>Ask Live Concierge</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Featured Card */}
          {sapphireSilhouette && (
            <button
              type="button"
              onClick={() => setView(sapphireSilhouette.viewSlug)}
              className="md:col-span-8 glass-card rounded-xl overflow-hidden relative group min-h-125 flex items-end p-8 cursor-pointer text-left"
            >
              <img
                alt={sapphireSilhouette.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src={sapphireSilhouette.cardImage || sapphireSilhouette.image}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              <div className="relative z-10 w-full flex justify-between items-end">
                <div>
                  <span className="font-mono text-xs text-on-surface-variant uppercase block mb-2">{sapphireSilhouette.collection}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white">{sapphireSilhouette.title}</h3>
                </div>
                <div className="font-mono text-xs text-on-surface-variant text-right">
                  <span className="block text-white text-lg mb-1">${sapphireSilhouette.price.toLocaleString()}</span>
                  {sapphireSilhouette.specifications.diameter} • {sapphireSilhouette.specifications.movement}
                </div>
              </div>
            </button>
          )}

          {/* Stacked Cards */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {roseGoldMesh && (
              <button
                type="button"
                onClick={() => setView(roseGoldMesh.viewSlug)}
                className="flex-1 glass-card rounded-xl overflow-hidden relative group p-6 cursor-pointer min-h-59.5 flex items-end text-left"
              >
                <img
                  alt={roseGoldMesh.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  src={roseGoldMesh.cardImage || roseGoldMesh.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="font-mono text-xs text-on-surface-variant block mb-1">{roseGoldMesh.collection}</span>
                  <h3 className="font-display text-lg text-white">{roseGoldMesh.title}</h3>
                </div>
              </button>
            )}

            {novaObsidian && (
              <button
                type="button"
                onClick={() => setView(novaObsidian.viewSlug)}
                className="flex-1 glass-card rounded-xl overflow-hidden relative group p-6 cursor-pointer min-h-59.5 flex items-end text-left"
              >
                <img
                  alt={novaObsidian.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity"
                  src={novaObsidian.cardImage || novaObsidian.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="font-mono text-xs text-on-surface-variant block mb-1">{novaObsidian.collection}</span>
                  <h3 className="font-display text-lg text-white">{novaObsidian.title}</h3>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Fashion Collection Section */}
      <section className="px-6 md:px-16 mt-24 relative max-w-360 mx-auto bg-black">
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-white mb-2 text-center">Fashion Collection</h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto text-center">Avant-garde forms meeting traditional mechanics. A bold statement on the wrist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-8 items-center">
          {/* Left Offset Card */}
          {ceramicNight && (
            <button
              type="button"
              onClick={() => setView(ceramicNight.viewSlug)}
              className="md:col-start-2 md:col-span-5 relative group cursor-pointer z-10 text-left"
            >
              <div className="glass-card rounded-xl overflow-hidden aspect-4/5 relative">
                <img
                  alt={ceramicNight.title}
                  className="w-full h-full object-cover opacity-80"
                  src={ceramicNight.cardImage || ceramicNight.image}
                />
              </div>

              {/* Overlapping Details Card */}
              <div className="absolute -bottom-8 -right-8 md:-right-12 glass-card p-6 rounded-xl w-3/4 shadow-2xl z-20 group-hover:bg-white/10 transition-all duration-300">
                <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase mb-1 block">{ceramicNight.collection}</span>
                <h3 className="font-display text-xl text-white mb-2">{ceramicNight.title}</h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed line-clamp-2">{ceramicNight.shortDescription}</p>
              </div>
            </button>
          )}

          {/* Right Offset — Gallery Detail + Editorial */}
          <div className="md:col-start-8 md:col-span-4 flex flex-col justify-center space-y-12">
            {ceramicNight && (
              <button
                type="button"
                onClick={() => setView(ceramicNight.viewSlug)}
                className="relative group cursor-pointer w-full md:w-5/6 ml-auto"
              >
                <div className="glass-card rounded-full overflow-hidden aspect-square relative">
                  <img
                    alt="Iridescent Dial Detail"
                    className="w-full h-full object-cover opacity-70"
                    src={ceramicNight.gallery[0] || ceramicNight.image}
                  />
                </div>
              </button>
            )}

            <div className="pl-8 border-l border-white/10">
              <h4 className="font-display text-xl text-white mb-4">Material Innovation</h4>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                Utilizing high-density sapphire and precision-milled titanium, the Fashion Collection challenges structural norms while maintaining perfect weight distribution.
              </p>
              <button
                type="button"
                onClick={openConcierge}
                className="inline-flex items-center gap-2 font-mono text-xs text-white border-b border-white/30 hover:border-white pb-1"
              >
                <span>Discover Materials</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
