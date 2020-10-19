/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	getColorClassName,
} from '@wordpress/editor';


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
	{attributes}
) {
	const { content, alignment,backgroundColor, textColor, customBackgroundColor, customTextColor } = attributes;

	const backgroundClass = getColorClassName('background-color', backgroundColor)
	const textClass = getColorClassName('color', textColor)

	console.log(attributes);
	console.log(backgroundClass);
	console.log(textClass);
	return <RichText.Content
	tagName="p"
	value={ content }
	style={{
		textAlign: alignment,
		backgroundColor: backgroundColor,
		color: textColor }}
	/>;
}
