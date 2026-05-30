import React, { useState } from 'react';
import { getProductBySlug } from '../lib/products';
import ProductInfoCard from '../components/ProductInfoCard';

export default function CarbonRacer({ setView, openConcierge }) {
  const product = getProductBySlug('carbon-racer');

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
      <main className="w-full relative pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative min-h-200 flex items-center px-6 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full relative z-10">
            {/* Typography / Intro */}
            <div className="md:col-span-5 md:col-start-1 flex flex-col justify-center gap-8 relative z-20">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-outline uppercase tracking-[0.2em]">{product.specifications.reference}</span>
                <h1 className="font-display text-5xl md:text-8xl text-white leading-tight uppercase">
                  {product.title.split(' ')[0]}<br/>{product.title.split(' ').slice(1).join(' ')}
                </h1>
              </div>
              <p className="font-body text-lg text-on-surface-variant max-w-md">
                {product.description}
              </p>
              <div className="flex items-center gap-6 mt-8">
                <button
                  onClick={handleAcquire}
                  className={`px-8 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest transition-all duration-500 rounded-none relative overflow-hidden group hover:border-white hover:bg-white hover:text-black ${isAcquired ? 'bg-white text-black' : ''}`}
                >
                  <span className="relative z-10">{btnText}</span>
                </button>
                <span className="font-mono text-sm text-on-surface-variant">${product.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Hero Imagery */}
            <div className="md:col-span-7 relative h-125 md:h-auto mt-12 md:mt-0 flex items-center justify-center group">
              <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full mix-blend-screen opacity-50 transition-opacity duration-700 group-hover:opacity-80"></div>
              <img
                alt={product.title}
                className="w-full h-125 object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform duration-1500 ease-out group-hover:scale-105 group-hover:-translate-y-4 relative z-10 mix-blend-lighten"
                src={product.image}
              />
            </div>
          </div>
        </section>

        {/* Product Info Card */}
        <section className="px-6 md:px-16 py-12">
          <ProductInfoCard product={product} />
        </section>

        {/* Exploded View / Glassmorphism Overlay Section */}
        <section className="relative min-h-screen py-24 px-6 md:px-16 overflow-hidden border-t border-white/5 bg-black/30">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity grayscale">
            <img
              alt="Movement Background"
              className="w-full h-full object-cover object-center"
              src={product.gallery[0]}
            />
            <div className="absolute inset-0 bg-surface-container-lowest/80"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
            <div className="md:col-span-4 flex flex-col justify-center">
              <h2 className="font-display text-4xl text-white mb-6">
                {product.specifications.movement.split(' ')[0]}<br/>{product.specifications.movement.split(' ').slice(1).join(' ')}
              </h2>
              <p className="font-body text-on-surface-variant mb-12 leading-relaxed">
                {product.movementDescription}
              </p>

              <ul className="space-y-4">
                {product.movementComponents.map((component, i) => (
                  <li key={component}>
                    <button
                      type="button"
                      onClick={openConcierge}
                      className={`glass-panel p-6 rounded-lg w-full text-left cursor-pointer hover:bg-white/10 transition-colors${i > 0 ? ' opacity-70 hover:opacity-100' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-white">
                          {`${String(i + 1).padStart(2, '0')} // ${component}`}
                        </span>
                        <span className="material-symbols-outlined text-outline">arrow_forward</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Glass Overlay Focus Area */}
            <div className="md:col-span-7 md:col-start-6 relative flex items-center justify-center mt-16 md:mt-0">
              <div className="w-full aspect-square md:aspect-video glass-panel rounded-xl flex items-center justify-center relative overflow-hidden group bg-black/20">
                <div className="absolute w-65 h-65 border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-1000 ease-in-out">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0 transform -translate-y-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 transform translate-y-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute left-0 transform -translate-x-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute right-0 transform translate-x-1/2"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-full h-[1px] bg-white/40"></div>
                  <div className="h-full w-[1px] bg-white/40 absolute"></div>
                </div>
                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-outline">
                  MAG 4.5X // {product.specifications.movement.split(' ').pop()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs / Bento Grid */}
        <section className="py-24 px-6 md:px-16 bg-surface-container-lowest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-100 max-w-7xl mx-auto">
            {/* Bento Card 1: Tachymeter */}
            <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <img
                  alt="Tachymeter"
                  className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen"
                  src={product.gallery[1]}
                />
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[32px] text-white mb-4 block">speed</span>
                <h3 className="font-display text-2xl md:text-3xl text-white">{product.details.tachymeterTitle}</h3>
              </div>
              <div className="relative z-10 max-w-sm">
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {product.details.tachymeterDescription}
                </p>
              </div>
            </div>

            {/* Bento Card 2: Water Resistance */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative bg-black/20">
              <div className="absolute inset-0 z-0 bg-linear-to-t from-black/80 to-transparent">
                <img
                  alt="Water"
                  className="w-full h-full object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  src={product.gallery[2]}
                />
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[32px] text-white mb-4 block">water_drop</span>
                <h3 className="font-display text-2xl text-white">{product.specifications.waterResistance}</h3>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider block mt-2">Water Resistance</span>
              </div>
              <div className="relative z-10 mt-8">
                <p className="font-body text-xs text-on-surface-variant">
                  {product.details.waterResistanceDescription}
                </p>
              </div>
            </div>

            {/* Bento Card 3: Carbon Material */}
            <div className="md:col-span-3 glass-panel rounded-xl p-8 min-h-75 flex flex-col md:flex-row items-center gap-12 group overflow-hidden relative bg-black/20">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[#131313]/50 opacity-50"></div>
              </div>
              <div className="md:w-1/3 relative z-10">
                <h3 className="font-display text-3xl text-white mb-4">{product.specifications.material}</h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {product.details.materialDescription}
                </p>
              </div>
              <div className="md:w-2/3 h-full relative z-10 overflow-hidden rounded-lg min-h-75">
                <img
                  alt="Forged Carbon Texture"
                  className="w-full h-full object-cover object-center transform transition-transform duration-2000 group-hover:scale-110"
                  src={product.gallery[3]}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
