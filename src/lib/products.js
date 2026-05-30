import productsData from '../data/products.json';

/**
 * @typedef {Object} ProductSpecifications
 * @property {string} [movement]
 * @property {string} [crystal]
 * @property {string} [diameter]
 * @property {string} [waterResistance]
 * @property {string} [material]
 * @property {string} [caseback]
 * @property {string} [crown]
 * @property {string} [weight]
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} subcategory
 * @property {string} collection
 * @property {string} description
 * @property {string} shortDescription
 * @property {number} price
 * @property {string} currency
 * @property {string} image
 * @property {string[]} gallery
 * @property {string[]} features
 * @property {ProductSpecifications} specifications
 * @property {string} availability
 * @property {string} stockStatus
 * @property {string} deliveryDays
 * @property {string} expressDeliveryDays
 * @property {string} estimatedDelivery
 * @property {string[]} paymentMethods
 * @property {string} warranty
 * @property {number} rating
 * @property {number} reviewCount
 * @property {boolean} [featured]
 * @property {string[]} tags
 * @property {string[]} searchKeywords
 * @property {string} semanticDescription
 */

/** @returns {Product[]} */
export function getAllProducts() {
  return productsData.products;
}

/**
 * @param {string} slug
 * @returns {Product | undefined}
 */
export function getProductBySlug(slug) {
  return productsData.products.find(p => p.slug === slug);
}

/**
 * @param {string} category
 * @returns {Product[]}
 */
export function getProductsByCategory(category) {
  return productsData.products.filter(p => p.category === category);
}

/**
 * @param {string} category
 * @param {string} subcategory
 * @returns {Product[]}
 */
export function getProductsBySubcategory(category, subcategory) {
  return productsData.products.filter(
    p => p.category === category && p.subcategory === subcategory
  );
}

/**
 * @param {number} [limit]
 * @returns {Product[]}
 */
export function getFeaturedProducts(limit) {
  const featured = productsData.products.filter(p => p.featured);
  return limit !== undefined ? featured.slice(0, limit) : featured;
}

/**
 * @param {string} query
 * @returns {Product[]}
 */
export function searchProducts(query) {
  const q = query.toLowerCase();
  return productsData.products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.searchKeywords.some(k => k.toLowerCase().includes(q)) ||
    p.semanticDescription.toLowerCase().includes(q)
  );
}

/**
 * @param {number} amount
 * @param {string} [currency]
 * @returns {string}
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
