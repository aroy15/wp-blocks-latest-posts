import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
// The RawHTML is not working properly with the post title. That's why using decodeHTML function to make it works.
import { decodeHTML } from './utils';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { numberOfPosts, displayFeaturedImage, order, orderBy } = attributes;
	const posts = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby: orderBy,
			} );
		},
		[ numberOfPosts, order, orderBy ]
	);

	const onDisplayFeaturedImageChange = ( value ) => {
		setAttributes( { displayFeaturedImage: value } );
	};

	const onNumberOfItemsChange = ( value ) => {
		setAttributes( { numberOfPosts: value } );
	};

	return (
		<>
			<ul { ...useBlockProps() }>
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
											featuredImage.media_details?.sizes
												.large?.source_url
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
									<time
										dateTime={ format(
											'c',
											post.date_gmt
										) }
									>
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
			</ul>
			<InspectorControls>
				<PanelBody
					title={ __( 'Posts Settings', metadata.textdomain ) }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Display Featured Image',
							metadata.textdomain
						) }
						checked={ displayFeaturedImage }
						onChange={ onDisplayFeaturedImageChange }
					/>
					<QueryControls
						numberOfItems={ numberOfPosts }
						onNumberOfItemsChange={ onNumberOfItemsChange }
						maxItems={ 9 }
						minItems={ 3 }
						orderBy={ orderBy }
						onOrderByChange={ ( newValue ) =>
							setAttributes( { orderBy: newValue } )
						}
						order={ order }
						onOrderChange={ ( newValue ) =>
							setAttributes( { order: newValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
