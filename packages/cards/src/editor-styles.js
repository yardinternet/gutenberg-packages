/**
 * External dependencies
 */
import { css } from '@emotion/core';

export default css`
	[data-type='yard-block/cards'] {
		> .editor-block-list__block-edit {
			padding-right: 25px !important;
			padding-left: 25px !important;
		}

		max-width: 100%;
	}

	[data-type='yard-block/card'] {
		> .editor-block-list__block-edit {
			padding-right: 10px !important;
			padding-left: 10px !important;
		}
	}

	.wp-block-yard-block-cards {
		margin-top: 65px !important;
		margin-bottom: 65px !important;

		> .editor-inner-blocks > .editor-block-list__layout {
			display: flex;
			flex-wrap: wrap;
			margin-right: -15px !important;
			margin-left: -15px !important;

			.wp-block[data-type='yard-block/card'] {
				width: auto;
				flex: 1 1 0;

				.block-editor-block-list__layout {
					margin-right: 0;
					margin-left: 0;

					> .wp-block {
						> .editor-block-list__block-edit > * {
							margin-right: -14px;
							margin-left: -14px;
						}
					}
				}
			}

			.block-list-appender {
				flex-basis: 100%;
				margin-top: 65px;
			}
		}
		&.has-cards-equal-height {
			> .editor-block-list__block-edit {
				height: 100%;
			}

			[data-type='yard-block/card']:not( .is-selected ) {
				.editor-block-list__block-edit {
					> div {
						height: inherit;

						.wp-block-yard-block-card {
							height: inherit;

							.yard-block-card__inner {
								height: inherit;
							}
						}
					}
				}
			}
		}
	}

	.wp-block-yard-block-card {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
`;
