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
	var_dump( $attributes );
	return 'Dynamic Content';
}

function blocks_course_latest_posts_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build', [
		'render_callback' => 'blocks_course_render_latest_posts_block'
	] );
}
add_action( 'init', 'blocks_course_latest_posts_block_init' );
