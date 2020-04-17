/**
 * External dependencies
 */
import { css } from '@emotion/core';

export default css`
	[data-type='yard-block/cards'] {
		max-width: 100%;
		padding: 0 20px;
	}

	[data-type='yard-block/card'] {
		padding: 0 14px;
		width: auto;
		flex: 1 1 0;

		&::before {
			right: 0px !important;
			left: 0px !important;
		}
	}

	.block-list-appender {
		flex-basis: 100%;
		margin-top: 65px;
	}

	.wp-block-yard-block-cards {
		margin: 0 !important;

		> .block-editor-inner-blocks > .block-editor-block-list__layout {
			display: flex;
			flex-wrap: wrap;
		}

		&.has-cards-equal-height {
			.wp-block-yard-block-card {
				height: 100%;

				.yard-block-card__inner {
					height: inherit;
				}
			}
		}
	}

	.wp-block-yard-block-card {
		padding-left: 0 !important;
		padding-right: 0 !important;
		margin-bottom: 0 !important;
	}
`;
