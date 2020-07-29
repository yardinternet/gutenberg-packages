/**
 * External dependencies
 */
import Select from 'react-select';
/**
 * Internal dependencies
 */
import {
	parseToAttributes,
	findSourceByBaseUrl,
	findTypeBySlug,
} from '../utils';

const groupStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
};

/**
 *
 * @param {Object} data
 */
const formatGroupLabel = ( data = { label: '' } ) => {
	return (
		<div style={ groupStyles }>
			<span>{ data.label }</span>
		</div>
	);
};

/**
 *
 * @param {Object} source
 * @param {Object} type
 */
export const formatOption = ( source = {}, type = {} ) => {
	return {
		value: JSON.stringify( {
			baseUrl: source.baseUrl,
			title: source.title,
			type: type.name,
			slug: type.slug,
		} ),
		label: `${ source.title }: ${ type.name }`,
	};
};

/**
 *
 * @param {Array} sources
 */
export const formatGroupOptions = ( sources = [] ) => {
	return sources.map( ( source ) => {
		return {
			label: source.title,
			options: source.types.map( ( types ) => {
				return formatOption( source, types );
			} ),
		};
	} );
};

/**
 *
 * @param {Array} failedRemoteEndpoints
 * @param {string} currentUrl
 */
export const remoteExists = ( failedRemoteEndpoints = [], currentUrl = '' ) => {
	return failedRemoteEndpoints.find(
		( element ) => element.url === currentUrl
	);
};

export default function SourceTypeControl( props ) {
	const {
		sources,
		selectedSources,
		failedRemoteEndpoints,
		onChangeCallback,
	} = props;

	const styles = {
		multiValue: ( multiValueStyles, { data } ) => {
			const parseValue = JSON.parse( data.value );
			const remoteOnline = remoteExists(
				failedRemoteEndpoints,
				`${ parseValue.baseUrl }${ parseValue.slug }`
			);
			return {
				...multiValueStyles,
				backgroundColor:
					remoteOnline !== undefined
						? '#ffc4c4'
						: multiValueStyles.backgroundColor,
			};
		},
	};

	const formatOptionValues = ( values ) => {
		const options = [];
		values.map( ( item ) => {
			const source = findSourceByBaseUrl( sources, item.baseUrl );
			if ( ! source ) return [];
			return item.slugs.map( ( slug ) => {
				const type = findTypeBySlug( source.types, slug );
				return options.push( formatOption( source, type ) );
			} );
		} );

		return options;
	};

	const formatOptions = formatGroupOptions( sources, failedRemoteEndpoints );
	const formatValues = formatOptionValues( selectedSources );

	const onChange = ( options ) => {
		onChangeCallback( parseToAttributes( ! null ? options : [] ) );
	};

	return (
		<Select
			options={ formatOptions }
			defaultValue={ formatValues }
			label="Selecteer bronnen"
			isMulti
			onChange={ onChange }
			formatGroupLabel={ formatGroupLabel }
			styles={ styles }
		/>
	);
}
