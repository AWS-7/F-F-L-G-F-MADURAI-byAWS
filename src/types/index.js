// Type definitions (for JSDoc documentation)

/**
 * @typedef {Object} PricingPlan
 * @property {string} name
 * @property {string} price
 * @property {string} duration
 * @property {boolean} [highlight]
 * @property {string} [tag]
 */

/**
 * @typedef {Object} Branch
 * @property {'kadachanenthal' | 'ottakadai'} id
 * @property {string} name
 * @property {string} address
 * @property {string} phone
 * @property {PricingPlan[]} plans
 */

/**
 * @typedef {Object} Program
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} tag
 */

/**
 * @typedef {Object} Review
 * @property {string} name
 * @property {number} rating
 * @property {string} text
 * @property {string} branch
 * @property {string} avatar
 */

/**
 * @typedef {Object} HealthItem
 * @property {string} name
 * @property {string} price
 * @property {string} description
 * @property {string} icon
 */

export {};
