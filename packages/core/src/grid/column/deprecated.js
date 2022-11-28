/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	withBackground,
	withBackgroundClass,
	withBackgroundImage,
	withSpacing,
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
} from '@yardinternet/gutenberg-editor-components';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Column from './components/column';

const blockAttributes = {
	editIsSelected: {
		type: 'boolean',
		default: false,
	},
	colClass: {
		type: 'number',
		default: 6,
	},
	bgColor: {
		type: 'string',
	},
	bgImgUrl: {
		type: 'string',
	},
	bgPosition: {
		type: 'string',
	},
	bgSize: {
		type: 'string',
	},
	bgRepeat: {
		type: 'string',
	},
	marginTop: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	marginRight: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	marginBottom: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	marginLeft: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	paddingTop: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	paddingRight: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	paddingBottom: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
	paddingLeft: {
		type: 'object',
		default: {
			desktop: false,
			tablet: false,
			mobile: false,
		},
	},
};

const deprecatedDefaultAttributes = {
	editIsSelected: {
		type: 'boolean',
		default: false,
	},
	colClassLg: {
		type: 'number',
		default: 0,
	},
	colClass: {
		type: 'number',
		default: 6,
	},
	colClassSm: {
		type: 'number',
		default: 0,
	},
	colClassXs: {
		type: 'number',
		default: 0,
	},
};

const deprecated = [
	{
		attributes: {
			...deprecatedDefaultAttributes,
			...backgroundAttributes,
			...getMarginAttributes(),
			...getPaddingAttributes(),
		},
		save: compose( [ withBackground(), withSpacing() ] )(
			( {
				className,
				attributes,
				styles,
				spacingClasses,
				backgroundFixedClass,
				dimRatioClass,
			} ) => {
				const { colClassLg, colClass, colClassSm, colClassXs } =
					attributes;
				const classNames = classnames( [
					!! colClassLg && `col-lg-${ colClassLg }`,
					!! colClass && `col-md-${ colClass }`,
					!! colClassSm && `col-sm-${ colClassSm }`,
					!! colClassXs && `col-${ colClassXs }`,
					className,
				] );

				return (
					<Column
						className={ classNames }
						innerStyles={ styles }
						innerClassName={ [
							spacingClasses,
							backgroundFixedClass,
							dimRatioClass,
							'column',
						] }
					>
						<InnerBlocks.Content />
					</Column>
				);
			}
		),
	},
	// since 0.4.2
	{
		attributes: blockAttributes,
		supports: {
			inserter: false,
			html: false,
			reusable: false,
		},
		save: compose( [
			withBackgroundClass( 'bgColor' ),
			withBackgroundImage(),
			withSpacing(),
		] )(
			( {
				className,
				attributes,
				styles,
				backgroundColorClass,
				spacingClasses,
			} ) => {
				const { colClass } = attributes;
				const classNames = classnames(
					!! colClass && `col-md-${ colClass }`,
					className
				);

				return (
					<div className={ classNames }>
						<div
							style={ styles }
							className={ classnames(
								backgroundColorClass,
								spacingClasses,
								'column'
							) }
						>
							<InnerBlocks.Content />
						</div>
					</div>
				);
			}
		),
	},
	// default dim-ratio, since 0.4.3, cmww project
	{
		attributes: blockAttributes,
		supports: {
			inserter: false,
			html: false,
			reusable: false,
		},
		save: compose( [
			withBackgroundClass( 'bgColor' ),
			withBackgroundImage(),
			withSpacing(),
		] )(
			( {
				className,
				attributes,
				styles,
				backgroundColorClass,
				spacingClasses,
			} ) => {
				const { colClass } = attributes;
				const classNames = classnames(
					!! colClass && `col-md-${ colClass }`,
					className
				);

				return (
					<div className={ classNames }>
						<div
							style={ styles }
							className={ classnames(
								backgroundColorClass,
								spacingClasses,
								'dim-ratio-0',
								'column'
							) }
						>
							<InnerBlocks.Content />
						</div>
					</div>
				);
			}
		),
	},
	// bgColor fix, since 0.4.3, cmww project
	{
		attributes: blockAttributes,
		supports: {
			inserter: false,
			html: false,
			reusable: false,
		},
		save: compose( [
			withBackgroundClass( 'bgColor' ),
			withBackgroundImage(),
			withSpacing(),
		] )( ( { className, attributes, styles, spacingClasses } ) => {
			const { colClass } = attributes;
			const classNames = classnames(
				!! colClass && `col-md-${ colClass }`,
				className
			);

			return (
				<div className={ classNames }>
					<div
						style={ styles }
						className={ classnames(
							spacingClasses,
							'dim-ratio-0',
							'column'
						) }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		} ),
	},
	// Bgcolor without dimratio, since 0.4.3, cmww project
	{
		attributes: blockAttributes,
		supports: {
			inserter: false,
			html: false,
			reusable: false,
		},
		save: compose( [
			withBackgroundClass( 'bgColor' ),
			withBackgroundImage(),
			withSpacing(),
		] )( ( { className, attributes, styles, spacingClasses } ) => {
			const { colClass } = attributes;
			const classNames = classnames(
				!! colClass && `col-md-${ colClass }`,
				className
			);

			return (
				<div className={ classNames }>
					<div
						style={ styles }
						className={ classnames( spacingClasses, 'column' ) }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		} ),
	},
	// Deprecated styles, since 0.4.3, cmww project
	{
		attributes: blockAttributes,
		supports: {
			inserter: false,
			html: false,
			reusable: false,
		},
		save: compose( [
			withBackgroundClass( 'bgColor' ),
			withBackgroundImage(),
			withSpacing(),
		] )( ( { className, attributes } ) => {
			const { colClass } = attributes;
			const classNames = classnames(
				!! colClass && `col-md-${ colClass }`,
				className
			);

			const deprecatedStyles = {
				backgroundColor: attributes.bgColor,
			};

			return (
				<div className={ classNames }>
					<div
						style={ deprecatedStyles }
						className="dim-ratio-0 column"
					>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		} ),
	},
];

export default deprecated;
