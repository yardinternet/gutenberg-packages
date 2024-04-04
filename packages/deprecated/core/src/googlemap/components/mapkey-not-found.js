const { Fragment } = wp.element;
const { Placeholder } = wp.components;
const { __ } = wp.i18n;

const mapKeyNotFound = () => {
	return (
		<Placeholder icon="location-alt" label={ __( 'Map' ) }>
			<Fragment>
				<div className="">
					{ __(
						'Om de map te gebruiken moet er een Google Map API key aanwezig zijn'
					) }
					<br />
					<a href="/wp-admin/admin.php?page=yard-blocks">
						{ __( 'Voer de API key in onder het blok Google Map' ) }
					</a>
				</div>
			</Fragment>
		</Placeholder>
	);
};

export default mapKeyNotFound;
