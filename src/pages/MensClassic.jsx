import React, { useState } from 'react';
import { getProductsBySubcategory } from '../lib/products';

export default function MensClassic({ setView, openConcierge }) {
  const [selectedMovement, setSelectedMovement] = useState('Mechanical');
  const [selectedMaterial, setSelectedMaterial] = useState('Stainless Steel');

  const products = getProductsBySubcategory('mens', 'classic');

  return (
    <div className="w-full">
      {/* Header Section with AI Suggestion */}
      <div className="mb-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between px-6 pt-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-8xl text-white mb-6 tracking-tight">
            Classic<br/><span className="text-on-surface-variant">Collection</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Timeless proportions and unyielding precision. Designed for those who dictate the tempo of their own lives.
          </p>
        </div>

        {/* AI Suggestion Pill */}
        <button
          type="button"
          onClick={openConcierge}
          className="mt-8 md:mt-0 glass-panel rounded-full pl-2 pr-6 py-2 flex items-center space-x-4 self-start md:self-auto border border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white">graphic_eq</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] text-outline uppercase tracking-widest">Concierge Suggests</span>
            <span className="font-body text-xs text-white">"A classic for the boardroom."</span>
          </div>
        </button>
      </div>

      {/* Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mt-24 px-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-3">
          <div className="sticky top-[140px] space-y-8">
            <div className="border-b border-white/5 pb-6">
              <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-4">Movement</h3>
              <div className="space-y-3 font-body text-sm text-on-surface-variant">
                {['Automatic', 'Mechanical', 'Tourbillon'].map((m) => (
                  <label key={m} className="flex items-center space-x-3 cursor-pointer group">
                    <div
                      onClick={() => setSelectedMovement(m)}
                      className={`w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-white/50 transition-colors ${selectedMovement === m ? 'bg-white/25 border-white' : ''}`}
                    >
                      {selectedMovement === m && (
                        <span className="material-symbols-outlined text-[12px] text-white">check</span>
                      )}
                    </div>
                    <span className={`group-hover:text-white transition-colors ${selectedMovement === m ? 'text-white' : ''}`}>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-b border-white/5 pb-6">
              <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-4">Case Material</h3>
              <div className="space-y-3 font-body text-sm text-on-surface-variant">
                {['Stainless Steel', 'Platinum', 'Rose Gold'].map((mat) => (
                  <label key={mat} className="flex items-center space-x-3 cursor-pointer group">
                    <div
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-white/50 transition-colors ${selectedMaterial === mat ? 'bg-white/25 border-white' : ''}`}
                    >
                      {selectedMaterial === mat && (
                        <span className="material-symbols-outlined text-[12px] text-white">check</span>
                      )}
                    </div>
                    <span className={`group-hover:text-white transition-colors ${selectedMaterial === mat ? 'text-white' : ''}`}>{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#131313]/20 blur-[80px] rounded-full pointer-events-none -z-10"></div>

          {products.map((product, index) => (
            <button
              key={product.slug}
              type="button"
              onClick={() => setView(product.viewSlug)}
              className={`group relative flex flex-col text-left glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/12 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${index % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              {/* AI Highlight Badge */}
              {product.isOrbMatch && (
                <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-white">graphic_eq</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white">Orb Match</span>
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-100 flex items-center justify-center overflow-hidden bg-linear-to-b from-transparent to-surface-container-lowest/50">
                <img
                  alt={product.title}
                  className="w-auto h-[80%] object-contain transition-transform duration-1000 ease-out group-hover:scale-110 drop-shadow-2xl mix-blend-lighten"
                  src={product.cardImage || product.image}
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col grow justify-end bg-linear-to-t from-surface-container-lowest to-transparent relative z-10">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="font-display text-xl text-white mb-1">{product.title}</h2>
                    <p className="font-mono text-[10px] text-outline uppercase tracking-widest">
                      {product.specifications.movement}
                    </p>
                  </div>
                  <span className="font-mono text-sm text-on-surface-variant">${product.price.toLocaleString()}</span>
                </div>
                <div className="w-full py-4 border border-white/20 rounded-lg font-mono text-xs text-white tracking-widest uppercase transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white text-center">
                  Discover Details
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
