<?php
/**
 * Plugin Name:       Blocks Latest Posts
 * Description:       Display and filter latest posts.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Anjon Roy
 * Author URI:		  https://anjonroy.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocks-latest-posts
 *
 * @package BlocksCourse
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function blocks_course_render_latest_posts_block( $attributes ) {
	$args = [
		'posts_per_page' => $attributes[ 'numberOfPosts' ],
		'post_status' => 'publish'
	];
	$recent_posts = get_posts($args);
	
	$posts = '<ul ' . get_block_wrapper_attributes() . '>';
	foreach($recent_posts as $post) {
		$title = get_the_title($post);
		$permalink = get_permalink( $post );
		$excerpt = get_the_excerpt( $post );

		$posts .= '<li>';

		if ( $attributes[ 'displayFeaturedImage' ] && has_post_thumbnail( $post )) {
			$posts .= get_the_post_thumbnail( $post, 'large' );
		}
		$posts .= '<h5><a href="' . esc_url( $permalink ) . '">' . $title . '</a></h5>';

		// first parameter is set to blank to get date format from the WordPress backend setttings.
		$posts .= '<time datetime="' . esc_attr( get_the_date( 'c', $post ) ) . '">' . esc_html( get_the_date( '', $post ) ) . '</time>';

		if ( !empty( $excerpt ) ) {
			$posts .= '<p>' .  $excerpt . '</p>';
		}

		$posts .= '</li>';
	}
	$posts .= '</ul>';

	return $posts;
}

function blocks_course_latest_posts_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build', [
		'render_callback' => 'blocks_course_render_latest_posts_block'
	] );
}
add_action( 'init', 'blocks_course_latest_posts_block_init' );
