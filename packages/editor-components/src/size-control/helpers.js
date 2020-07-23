/**
 * Set max based on the unit
 *
 * @param {string} unit px|em|vh
 * @return {number} range
 */
const setMax = ( unit ) => ( unit === 'px' ? 1000 : 100 );

/**
 * Limit value when unit is switching from px to %
 *
 * @param {number} value 200
 * @param {string} unit %
 * @return {number} 100
 */
const limitValueByUnit = ( value, unit ) =>
	value > 100 && unit !== 'px' ? 100 : value;

export { limitValueByUnit, setMax };
