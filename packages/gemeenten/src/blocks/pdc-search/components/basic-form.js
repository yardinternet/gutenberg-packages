/**
 * External dependencies
 */
import React, { useState } from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import { extractFromBlockAttributes } from '../../../helpers';
import metadata from '../block.json';
const { attributes } = metadata;

const minWidthBreakpoint = `450px`;

const Wrapper = styled.div`
	--pdc-search-padding: 2rem;
	--pdc-search-font-size: 1.25rem;
	--pdc-search-height: 55px;
	--pdc-search-box-shadow: 0 0.5rem 1rem rgba( 0, 0, 0, 0.15 );
	--pdc-search-border-radius: 45px;
	padding: var( --pdc-search, 1rem );

	@media ( max-width: ${ minWidthBreakpoint } ) {
		--pdc-search-padding: 1rem;
		--pdc-search-font-size: 1rem;
		padding: var( --pdc-search, 0.5rem );
	}
`;

const Form = styled.form`
	position: relative;
	display: flex;
	border-radius: 0 44px 44px 0;
`;

const Label = styled.label`
	position: absolute;
	top: 3px;
	left: 0;
	font-size: var( --pdc-search-font-size );
	transform: translate(
			var( --pdc-search-padding ),
			calc( var( --pdc-search-padding ) / 2 )
		)
		scale( 1 );
	transition: color 200ms cubic-bezier( 0, 0, 0.2, 1 ) 0ms,
		transform 200ms cubic-bezier( 0, 0, 0.2, 1 ) 0ms;

	&.gemeenten-block--pdc-search__label--active {
		background: #fff;
		transform: translate(
				var( --pdc-search-padding ),
				calc( var( --pdc-search-padding ) / -2.5 )
			)
			scale( 0.8 );
		transform-origin: top left;
	}
`;

const Input = styled.input`
	box-sizing: border-box;
	flex-grow: 2;
	padding: calc( var( --pdc-search-padding ) / 2 ) var( --pdc-search-padding ) !important;
	border: 0;
	border-radius: 44px 0 0 44px;
	box-shadow: var( --pdc-search-box-shadow );
	font-size: var( --pdc-search-font-size );
`;

const Btn = styled.button`
	padding: calc( var( --pdc-search-padding ) / 2 ) var( --pdc-search-padding );
	background: var( --pdc-btn-bg-color, green );
	border-radius: 0 var( --pdc-search-border-radius )
		var( --pdc-search-border-radius ) 0;
	box-shadow: var( --pdc-search-box-shadow );
	color: white;
	font-size: var( --pdc-search-font-size );

	i {
		font-size: 1.7rem;
	}

	@media ( max-width: ${ minWidthBreakpoint } ) {
		padding: calc( var( --pdc-search-padding ) / 2 )
			calc( var( --pdc-search-padding ) / 1.2 );
		i {
			font-size: 1.2rem;
		}
	}
`;

function BasicForm( props ) {
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ labelClasses, setLabelClasses ] = useState( '' );
	const labelShrinkClass = 'gemeenten-block--pdc-search__label--active';

	const onChange = ( event ) => {
		setSearchTerm( event.target.value );
		return event.target.value.length
			? setLabelClasses( labelShrinkClass )
			: setLabelClasses( '' );
	};

	const onFocus = () => {
		setLabelClasses( labelShrinkClass );
	};

	const onBlur = () => {
		if ( searchTerm.length === 0 ) {
			setLabelClasses( '' );
		}
	};

	const onSubmit = ( event ) => {
		if ( props.disabled ) {
			event.preventDefault();
		}
	};

	return (
		<Wrapper className="gemeenten-block gemeenten-block--pdc-search">
			<Form
				className="gemeenten-block--pdc-search__form"
				role="search"
				action={ props.searchUrl }
				onSubmit={ onSubmit }
				method="get"
			>
				<Label
					className={ classnames(
						'gemeenten-block--pdc-search__label',
						labelClasses
					) }
					htmlFor="pdc-search"
				>
					{ props.label }
				</Label>
				<Input
					className="gemeenten-block--pdc-search__input"
					type="text"
					value={ searchTerm }
					name="q"
					id="pdc-search"
					onBlur={ onBlur }
					onFocus={ onFocus }
					onChange={ onChange }
					autoComplete="off"
				/>
				<i className="fad fa-spinner fa-spin autosuggest-spinner invisible"></i>
				<Btn
					aria-label={ props.hasBtnText ? props.btnText : 'Zoeken' }
					disabled={ props.disabled }
					className="gemeenten-block--pdc-search__btn"
					type="submit"
				>
					{ props.hasBtnText ? props.btnText : props.btnIcon }
				</Btn>
			</Form>
		</Wrapper>
	);
}

BasicForm.defaultProps = {
	btnIcon: <i className="far fa-search"></i>,
	hasBtnText: false,
	btnText: 'Zoek',
	disabled: true,
	searchUrl: '',
	...extractFromBlockAttributes( attributes ),
};

export default BasicForm;
