/**
 * Exclude node_modules from a loader, except the given packages.
 *
 * Matches the path tail, not the first `/node_modules/`, which under pnpm is `.pnpm`.
 *
 * @param {string[]} packages
 * @return {Function} webpack exclude matcher
 */
const packageExclude =
	( packages = [] ) =>
	( modulePath ) => {
		const path = modulePath.replace( /\\/g, '/' );

		return (
			path.includes( '/node_modules/' ) &&
			! packages.some( ( pkg ) =>
				path.includes( `/node_modules/${ pkg }/` )
			)
		);
	};

module.exports = packageExclude;
