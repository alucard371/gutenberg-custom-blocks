/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element'
import { RichText } from "@wordpress/editor";


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(
	{ attributes }
	) {
	const { title, info } = attributes;
	return (
		<div>
			{title &&
			<RichText.Content
				className={'wp-block-qtd-blocks-team-member__title'}
				tagName="h4"
				value={ title }
			/>
			}
			{info &&
			<RichText.Content
				className={'wp-block-qtd-blocks-team-member__info'}
				tagName="p"
				value={ info }
			/>
			}

		</div>
	);
}
