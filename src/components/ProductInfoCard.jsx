import React from 'react';
import { formatPrice } from '../lib/products';

const PAYMENT_LABELS = {
  'visa': 'Visa',
  'mastercard': 'Mastercard',
  'amex': 'Amex',
  'apple-pay': 'Apple Pay',
  'google-pay': 'Google Pay',
  'cash-on-delivery': 'Cash on Delivery',
};

/**
 * @param {{ product: import('../lib/products').Product }} props
 */
export default function ProductInfoCard({ product }) {
  const isInStock = product.availability === 'In Stock';

  return (
    <div className="glass-panel rounded-xl overflow-hidden">

      {/* Price + availability */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-3xl text-white">
            {formatPrice(product.price, product.currency)}
          </p>
          <span className={`shrink-0 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
            isInStock
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }`}>
            {product.availability}
          </span>
        </div>
        {product.stockStatus && (
          <p className="font-mono text-[10px] text-[#8e9192] mt-1 uppercase tracking-widest">
            {product.stockStatus}
          </p>
        )}
      </div>

      {/* Delivery + warranty */}
      <div className="p-6 space-y-4 border-b border-white/10">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#8e9192] mt-0.5">local_shipping</span>
          <div>
            <p className="font-mono text-[10px] text-[#8e9192] uppercase tracking-widest">Standard Delivery</p>
            <p className="font-body text-sm text-white">{product.deliveryDays}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#8e9192] mt-0.5">bolt</span>
          <div>
            <p className="font-mono text-[10px] text-[#8e9192] uppercase tracking-widest">Express Delivery</p>
            <p className="font-body text-sm text-white">{product.expressDeliveryDays}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#8e9192] mt-0.5">verified_user</span>
          <div>
            <p className="font-mono text-[10px] text-[#8e9192] uppercase tracking-widest">Warranty</p>
            <p className="font-body text-sm text-white">{product.warranty}</p>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="p-6">
        <p className="font-mono text-[10px] text-[#8e9192] uppercase tracking-widest mb-3">
          Accepted Payments
        </p>
        <div className="flex flex-wrap gap-2">
          {product.paymentMethods.map(method => (
            <span
              key={method}
              className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#c4c7c8]"
            >
              {PAYMENT_LABELS[method] ?? method}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
