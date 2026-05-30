import React from 'react';
import { getProductBySlug } from '../lib/products';

export default function WomensFashion({ setView, openConcierge }) {
  const lunaWhite = getProductBySlug('luna-white');
  const noirChic  = getProductBySlug('noir-chic');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-150 min-h-125 w-full mb-24 rounded-2xl overflow-hidden glass-card group max-w-360 mx-auto px-6 md:px-16">
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Women's Fashion Hero"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATZWoK4uMjlHzrPkBlbjTGqAKGYUOxqBJ3Jd39qXer5YgXSmAqceAROz95AOudWvUUgzlfqkd-SGo3-02iyDmkp8kybjjm48Lmbxar5jVmIDDbZql0p_GmVLtdSu2xprygZ6gX5eUKDvjVtQ1KLjjG9mSKVtrg5Y8H9kxDTLqUH8yv6-yvaSe4o1gw9Ifn0NLuJdYekphtKOnjZTeTR9ile6erKH-rmloyyNZfryXi-ScsKZlgRSU7nO31W9Gj98ROzOpb6mDGXAMJ"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 z-10">
          <h1 className="font-display text-5xl md:text-8xl text-white mb-6 leading-tight">Women's<br/>Collection</h1>
          <p className="font-body text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            Discover the intersection of avant-garde design and timeless elegance. Curated pieces for the modern visionary.
          </p>
          <button
            type="button"
            onClick={() => lunaWhite && setView(lunaWhite.viewSlug)}
            className="px-8 py-4 border border-white/30 rounded-full font-mono text-xs text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest bg-white/5 backdrop-blur-sm"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Bento Grid Layout for Sub-Collections */}
      <section className="mb-24 px-6 md:px-16 max-w-360 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-3xl md:text-5xl text-white">Curated Aesthetics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-100">
          {/* Luna White */}
          {lunaWhite && (
            <button
              type="button"
              onClick={() => setView(lunaWhite.viewSlug)}
              className="col-span-1 md:col-span-8 glass-card rounded-2xl overflow-hidden relative group cursor-pointer text-left"
            >
              <div className="absolute inset-0 z-0">
                <img
                  alt={lunaWhite.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  src={lunaWhite.cardImage || lunaWhite.image}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <div className="inline-block px-3 py-1 border border-white/20 rounded-full font-mono text-xs text-white/70 mb-4 w-max backdrop-blur-md bg-black/20">
                  01 / {lunaWhite.collection.toUpperCase()}
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-2">Ethereal Purity</h3>
                <p className="font-body text-sm text-on-surface-variant max-w-md leading-relaxed">
                  {lunaWhite.shortDescription}
                </p>
              </div>
            </button>
          )}

          {/* Noir Chic */}
          {noirChic && (
            <button
              type="button"
              onClick={() => setView(noirChic.viewSlug)}
              className="col-span-1 md:col-span-4 glass-card rounded-2xl overflow-hidden relative group cursor-pointer text-left"
            >
              <div className="absolute inset-0 z-0">
                <img
                  alt={noirChic.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
                  src={noirChic.cardImage || noirChic.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="inline-block px-3 py-1 border border-white/20 rounded-full font-mono text-xs text-white/70 mb-4 w-max backdrop-blur-md bg-black/20">
                  02 / {noirChic.title.toUpperCase()}
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Abyssal Depth</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {noirChic.shortDescription}
                </p>
              </div>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
