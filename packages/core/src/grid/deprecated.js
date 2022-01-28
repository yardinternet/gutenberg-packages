/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	getMarginAttributes,
	getPaddingAttributes,
	backgroundAttributes,
	withSpacing,
	withBackground,
	withBackgroundClass,
	withBackgroundImage,
} from '@yardinternet/gutenberg-editor-components';
/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Row from './components/row';

const blockAttributes = {
	fullWidth: {
		type: 'boolean',
		default: false,
	},
	minHeight: {
		type: 'string',
	},
	rowGutter: {
		type: 'boolean',
		default: false,
	},
	columnsEqualHeight: {
		type: 'boolean',
		default: false,
	},
	flexAlignment: {
		type: 'string',
		default: '',
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
	fullWidth: {
		type: 'boolean',
		default: false,
	},
	minHeight: {
		type: 'string',
	},
	rowGutter: {
		type: 'boolean',
		default: false,
	},
	isInnerContainerFluid: {
		type: 'boolean',
		default: false,
	},
	columnsEqualHeight: {
		type: 'boolean',
		default: false,
	},
	flexAlignment: {
		type: 'string',
		default: '',
	},
	hasContainerPadding: {
		type: 'boolean',
		default: true,
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
				dimRatioClass,
				backgroundFixedClass,
				spacingClasses,
			} ) => {
				const {
					fullWidth,
					minHeight,
					columnsEqualHeight,
					flexAlignment,
					isInnerContainerFluid,
					hasContainerPadding,
				} = attributes;
				const gridStyles = { ...styles, ...{ minHeight } };
				const gridClasses = classnames( className, spacingClasses, {
					'columns-equal-height': columnsEqualHeight,
					'remove-container-padding': ! hasContainerPadding,
				} );

				const containerClass = isInnerContainerFluid
					? 'container-fluid'
					: 'container';

				return (
					<Fragment>
						{ fullWidth ? (
							<div
								style={ gridStyles }
								className={ classnames(
									'container-fluid',
									gridClasses,
									dimRatioClass,
									backgroundFixedClass,
									flexAlignment
								) }
							>
								<div className={ containerClass }>
									<Row attributes={ attributes }>
										<InnerBlocks.Content />
									</Row>
								</div>
							</div>
						) : (
							<div
								className={ classnames(
									'container',
									gridClasses
								) }
							>
								<div
									style={ gridStyles }
									className={ classnames(
										dimRatioClass,
										backgroundFixedClass
									) }
								>
									<Row
										attributes={ attributes }
										flexAlignment={ flexAlignment }
									>
										<InnerBlocks.Content />
									</Row>
								</div>
							</div>
						) }
					</Fragment>
				);
			}
		),
	},
	// since 0.4.2
	{
		attributes: blockAttributes,
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
				const {
					fullWidth,
					minHeight,
					columnsEqualHeight,
					flexAlignment,
				} = attributes;

				const gridStyles = { ...styles, ...{ minHeight } };
				const gridClasses = classnames( className, spacingClasses, {
					'columns-equal-height': columnsEqualHeight,
				} );

				return (
					<Fragment>
						{ fullWidth ? (
							<div
								style={ gridStyles }
								className={ classnames(
									gridClasses,
									'container-fluid',
									backgroundColorClass,
									flexAlignment
								) }
							>
								<div className="container">
									<Row attributes={ attributes }>
										<InnerBlocks.Content />
									</Row>
								</div>
							</div>
						) : (
							<div
								className={ classnames(
									gridClasses,
									'container'
								) }
							>
								<div
									style={ gridStyles }
									className={ classnames(
										backgroundColorClass,
										! backgroundColorClass
											? 'dim-ratio-0'
											: ''
									) }
								>
									<Row
										attributes={ attributes }
										flexAlignment={ flexAlignment }
									>
										<InnerBlocks.Content />
									</Row>
								</div>
							</div>
						) }
					</Fragment>
				);
			}
		),
	},
];

export default deprecated;
