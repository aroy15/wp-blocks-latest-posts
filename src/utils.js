// Utility to decode HTML entities
export const decodeHTML = ( html ) => {
	// eslint-disable-next-line
	const doc = new DOMParser().parseFromString( html, 'text/html' );
	return doc.body.textContent || '';
};
