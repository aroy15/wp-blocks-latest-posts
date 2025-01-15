import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit( { attributes } ) {
	const { numberOfPosts } = attributes;
	// eslint-disable-next-line
	const posts = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
			} );
		},
		[ numberOfPosts ]
	);

	return (
		<p { ...useBlockProps() }>
			{ __( 'Boilerplate – hello from the editor!', 'boilerplate' ) }
		</p>
	);
}
