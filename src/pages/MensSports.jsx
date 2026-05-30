import React from 'react';
import { getProductBySlug } from '../lib/products';

export default function MensSports({ setView, openConcierge }) {
  const velocityX   = getProductBySlug('velocity-x');
  const carbonRacer = getProductBySlug('carbon-racer');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-end pb-24 px-6 md:px-16">
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <img
            alt="Sports backdrop tarmac"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Qbf-5V57CdAzV8gKnjCflcgyy_qTtajTqUWqQrRh-IXhK1HbMllbRdMsU37AJOjwWcc0hiwsWbHnRus-PVMUBfxhlrVbyb4MXmjW0Vis1ukkDXg7f-klXeuwdE6zpgq13bOWfNobjJ3hom1WJ25ol5f13qq4MNR4VwyBciwocim5U8a7G0u0MvjU-KapuQtRnrOG4rSssvx_7TM5y8O8-zhsgH25uIgkSTEuEvJAkTL2HVCtgwaOoLGZA3aTBx5MgkYfZiN2vVfl"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto z-10">
          <div className="flex flex-col gap-6">
            <div className="font-mono text-xs text-on-surface-variant flex gap-2 items-center tracking-widest uppercase opacity-70">
              <span>Home</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Men</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-white">Sports</span>
            </div>
            <h1 className="font-display text-5xl md:text-8xl text-white font-bold leading-tight">Velocity &amp; Carbon</h1>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Engineered for the edge of human performance. The Men's Sports collection marries high-grade carbon composites with uncompromising precision.
            </p>
          </div>
        </div>
      </section>

      {/* Product Bento Grid */}
      <section className="px-6 md:px-16 py-24 bg-black">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Main Featured: Velocity X */}
          {velocityX && (
            <button
              type="button"
              onClick={() => setView(velocityX.viewSlug)}
              className="md:col-span-8 group relative rounded-2xl overflow-hidden glass-card h-150 flex flex-col justify-end p-8 cursor-pointer text-left"
            >
              <div className="absolute inset-0 z-0 bg-black/40">
                <img
                  alt={velocityX.title}
                  className="w-full h-full object-cover opacity-70 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
                  src={velocityX.image}
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10"></div>
              <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs text-white px-3 py-1 border border-white/20 rounded-full w-max backdrop-blur-md">Featured</span>
                  <h2 className="font-display text-3xl md:text-5xl text-white">{velocityX.title}</h2>
                  <p className="font-body text-sm text-on-surface-variant max-w-md">{velocityX.shortDescription}</p>
                </div>
                <div className="border border-white text-black bg-white px-8 py-4 font-mono text-xs uppercase tracking-widest rounded-full flex items-center gap-2 group-hover:bg-transparent group-hover:text-white transition-all shrink-0">
                  Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>
            </button>
          )}

          {/* Secondary Column */}
          <div className="md:col-span-4 flex flex-col gap-8 h-150">

            {/* Carbon Racer Details Card */}
            {carbonRacer && (
              <button
                type="button"
                onClick={() => setView(carbonRacer.viewSlug)}
                className="glass-card rounded-2xl p-8 flex-1 flex flex-col justify-between relative overflow-hidden group cursor-pointer text-left"
              >
                <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <img
                    alt="Carbon Texture"
                    className="w-75 h-75 object-cover rounded-full filter grayscale"
                    src={carbonRacer.cardImage || carbonRacer.image}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="font-display text-2xl text-white mb-2">{carbonRacer.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant">{carbonRacer.shortDescription}</p>
                </div>
                <div className="relative z-10 flex flex-col gap-2 font-mono text-xs text-on-surface-variant">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Weight</span>
                    <span className="text-white">{carbonRacer.specifications.weight}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Reserve</span>
                    <span className="text-white">{carbonRacer.specifications.powerReserve}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span>WR</span>
                    <span className="text-white">{carbonRacer.specifications.waterResistance}</span>
                  </div>
                </div>
              </button>
            )}

            {/* AI Concierge CTA */}
            <button
              type="button"
              onClick={openConcierge}
              className="glass-card rounded-2xl p-8 h-[200px] flex items-center justify-center cursor-pointer group hover:bg-white/10"
            >
              <div className="text-center">
                <span className="material-symbols-outlined text-[48px] text-white mb-2 group-hover:scale-110 transition-transform block">tune</span>
                <p className="font-mono text-xs text-white uppercase tracking-widest">Speak to Compare</p>
              </div>
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}
