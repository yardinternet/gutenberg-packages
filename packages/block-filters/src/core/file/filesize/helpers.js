import filesize from 'filesize';

export async function getFileDetails( href = '' ) {
	if ( href.length === 0 ) return false;

	try {
		const response = await fetch( href ).then( ( res ) => res.blob() );
		return filesize( response.size );
	} catch ( error ) {
		throw new Error( 'File not found' );
	}
}
