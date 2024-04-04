/**
 * Internal dependencies
 */
import layoutImages from './layout-images';

/**
 * Allow to override the layout presets with custom classes and images
 */
export const preset = {
	1: {
		layouts: {
			desktop: [
				{
					id: 'col-1-desktop-full-width',
					...layoutImages.fullWidth,
					classNames: [ 'col-1-desktop-full-width' ],
					col: 1,
				},
				{
					id: 'col-1-desktop-full-width-centered',
					...layoutImages.fullWidthCentered,
					classNames: [ 'col-1-desktop-full-width-centered' ],
					col: 1,
				},
			],
			tablet: [
				{
					id: 'col-1-tablet-full-width',
					...layoutImages.fullWidth,
					classNames: [ 'col-1-tablet-full-width' ],
					col: 1,
				},
			],
			mobile: [
				{
					id: 'col-1-mobile-full-width',
					...layoutImages.fullWidth,
					classNames: [ 'col-1-mobile-full-width' ],
					col: 1,
				},
			],
		},
	},
	2: {
		layouts: {
			desktop: [
				{
					id: 'col-2-desktop-equal-width',
					...layoutImages.equalWidth,
					classNames: [ 'col-2-desktop-equal-width' ],
					col: 2,
				},
				{
					id: 'col-2-desktop-heavy-left',
					...layoutImages.twoHeavyLeft,
					classNames: [ 'col-2-desktop-heavy-left' ],
					col: 2,
				},
				{
					id: 'col-2-desktop-heavy-right',
					...layoutImages.twoHeavyRight,
					classNames: [ 'col-2-desktop-heavy-right' ],
					col: 2,
				},
			],
			tablet: [
				{
					id: 'col-2-tablet-equal-width',
					...layoutImages.equalWidth,
					classNames: [ 'col-2-tablet-equal-width' ],
					col: 2,
				},
				{
					id: 'col-2-tablet-heavy-right',
					...layoutImages.twoHeavyRight,
					classNames: [ 'col-2-tablet-heavy-right' ],
					col: 2,
				},
				{
					id: 'col-2-tablet-heavy-left',
					...layoutImages.twoHeavyLeft,
					classNames: [ 'col-2-tablet-heavy-left' ],
					col: 2,
				},
				{
					id: 'mobile-collapse',
					...layoutImages.collapseRows,
					classNames: [ 'mobile-collapse' ],
					col: 2,
				},
			],
			mobile: [
				{
					id: 'col-2-mobile-equal-width',
					...layoutImages.equalWidth,
					classNames: [ 'col-2-mobile-equal-width' ],
					col: 2,
				},
				{
					id: 'mobile-collapse',
					...layoutImages.collapseRows,
					classNames: [ 'mobile-collapse' ],
					col: 2,
				},
			],
		},
	},
	3: {
		layouts: {
			desktop: [
				{
					id: 'col-3-desktop-equal-width',
					...layoutImages.threeEqualWidth,
					classNames: [ 'col-3-desktop-equal-width' ],
					col: 3,
				},
			],
			tablet: [
				{
					id: 'col-3-tablet-equal-width',
					...layoutImages.threeEqualWidth,
					classNames: [ 'col-3-tablet-equal-width' ],
					col: 3,
				},
				{
					id: 'mobile-collapse',
					...layoutImages.collapseRows,
					classNames: [ 'mobile-collapse' ],
					col: 3,
				},
			],
			mobile: [
				{
					id: 'mobile-collapse',
					...layoutImages.collapseRows,
					classNames: [ 'mobile-collapse' ],
					col: 3,
				},
			],
		},
	},
};
