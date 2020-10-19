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

import classnames from 'classnames';


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

	//get the color classes names from colors
	const backgroundClass = getColorClassName('background-color', backgroundColor)
	const textClass = getColorClassName('color', textColor)
	//add the classes names
	//let classes='';
	/*if (backgroundClass) {
		classes += backgroundClass;
	}*/

	const classes = classnames({
		//variable as a key to see if the condition is true
		[backgroundClass] : backgroundClass,
		[textClass] : textClass,
	})


	return <RichText.Content
	tagName="p"
	className={ classes }
	value={ content }
	style={{
		textAlign: alignment,
		//ignore the inline style if undefined
		//if backgroundClass === true backgroundColor=undefined else customBackgroundColor
		backgroundColor: backgroundClass ? undefined : customBackgroundColor ,
		color: textClass ? undefined : customTextColor }}
	/>;
}
