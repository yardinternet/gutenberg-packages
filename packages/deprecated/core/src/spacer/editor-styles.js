/**
 * External dependencies
 */
import { css } from '@emotion/react';

export default css`
	.yard-blocks-spacer-wrapper {
		display: flex;
		height: 47px;
		flex-wrap: wrap;
		align-items: center;
		padding: 5px 12px;
		background-color: rgba( 139, 139, 150, 0.1 );
		transition: 0.15s ease all;

		.components-range-control {
			width: 300px;
		}

		.components-base-control__field {
			margin-bottom: 0;
		}

		.components-range-control__number {
			display: none;
		}

		.components-range-control__slider {
			width: 100% !important;
		}
	}

	.yard-blocks-spacer-icon {
		margin-right: 0.5rem;
	}

	.yard-blocks-spacer-number {
		margin-right: 1rem;
	}

	.yard-blocks-spacer-label {
		margin-right: 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
		font-size: 13px;
		font-weight: 600;
	}

	.yard-blocks-spacer-size {
		background-color: rgba( 139, 139, 150, 0.1 );
		transition: 0.15s ease all;
	}
`;
