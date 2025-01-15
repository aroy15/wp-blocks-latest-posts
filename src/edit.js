import { RawHTML } from '@wordpress/element';
// The RawHTML is not working properly with the post title. That's why using decodeHTML function to make it works.
import { decodeHTML } from './utils';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit( { attributes } ) {
	const { numberOfPosts, displayFeaturedImage } = attributes;
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
		<div { ...useBlockProps() }>
			{ posts &&
				posts.map( ( post ) => {
					const featuredImage =
						post._embedded &&
						post._embedded[ 'wp:featuredmedia' ] &&
						post._embedded[ 'wp:featuredmedia' ].length > 0 &&
						post._embedded[ 'wp:featuredmedia' ][ 0 ];

					return (
						<li key={ post.id }>
							{ displayFeaturedImage && featuredImage && (
								<img
									src={
										featuredImage.media_details.sizes.large
											?.source_url
									}
									alt={ featuredImage.alt_text }
								/>
							) }
							<h5>
								<a
									href={ post.link }
									dangerouslySetInnerHTML={ {
										__html: decodeHTML(
											post.title.rendered
										),
									} }
								/>
							</h5>
							{ post.date_gmt && (
								<time dateTime={ format( 'c', post.date_gmt ) }>
									{ dateI18n(
										getSettings().formats.date,
										post.date_gmt
									) }
								</time>
							) }
							{ post.excerpt.rendered && (
								<RawHTML>{ post.excerpt.rendered }</RawHTML>
							) }
						</li>
					);
				} ) }
		</div>
	);
}
