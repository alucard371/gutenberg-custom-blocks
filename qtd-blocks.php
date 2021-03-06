<?php
/**
 * Plugin Name:     Qtd Blocks
 * Description:     Custom block development module - build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     qtd-blocks
 * Domain Path: 	/languages
 * @package         create-block
 */

function qtd_blocks_categories($categories, $post){
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'qtd-blocks-category',
				'title' => __('Qtd theme category', 'qtd-blocks'),
				'icon' => 'welcome-view-site'
			)
		)
	);
};

add_filter(
	'block_categories',
	'qtd_blocks_categories',
	10,
	2
);

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

function create_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/qtd-blocks" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array('jquery'),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-editor', 'qtd-blocks' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-editor-style',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-style',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/qtd-blocks', array(
		'editor_script' => 'create-block-editor',
		'editor_style'  => 'create-block-editor-style',
		'style'         => 'create-block-style',
	) );
}
add_action( 'init', 'create_block_init' );
