/**
 * Find preset inside the preset collection
 *
 * @param {*} collection
 * @param {*} id
 * @return {undefined|Object} result
 */
const findElementById = ( collection, id ) =>
	collection
		.map( ( item ) => item.items )
		.reduce( ( acc, current ) => acc.concat( current ) )
		.find( ( item ) => item.id === id );

export { findElementById };
