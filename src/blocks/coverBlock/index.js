import EditClass from "./editClass";

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import {createBlock, registerBlockType} from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
//import Edit from './edit';
import save from './save';
import {getColorClassName, RichText} from "@wordpress/block-editor";
import classnames from "classnames";
import { omit } from 'lodash';

const attributes = {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h4'
		},
		alignment: {
			type:'string',
		},
		textColor: {
			type:'string',
		},
		backgroundColor: {
			type:'string',
		},
		customTextColor: {
			type:'string',
		},
		customBackgroundColor: {
			type:'string',
		},
		shadow: {
			type:'boolean',
			default: false
		},
		shadowOpacity: {
			type:'number',
			default: 0.3
		}
	};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/cover-block', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Cover block', 'cover-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Description de votre bloc custom',
		'cover-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'qtd-blocks-category',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/></svg>,

	keywords: [__('list', 'cover-block'),__('organise', 'cover-block')],

	styles: [
		{
			name: 'rounded',
			label: __('Rounded', 'qtd-blocks'),
			isDefault: true,
		},
		{
			name: 'squared',
			label: __('Squared', 'qtd-blocks')
		},
		{
			name: 'outlined',
			label: __('Outlined', 'qtd-blocks')
		}
	],

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				transform: ({content, align} ) => {
					return createBlock('create-block/cover-block',{
						content: content,
						alignment: align,
					} )
				}
			},
			{
				type: 'prefix',
				prefix: '#',
				transform: () => {
					return createBlock('create-block/cover-block',{
					} )
					}
				}
		],
		to: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				isMatch: ({content}) => {
						if(content) return true;
						return false;
				},
				transform: ({content, alignement} ) => {
					return createBlock('core/paragraph',{
						content: content,
						align: alignement,
					} )
				}
			}
		]
	},

	attributes: attributes,

	deprecated: [
		{
			attributes: omit({
				...attributes,
				textAlignment: {
					type: 'string'
				}
			}, ['textAlignment']),
			migrate: ( attributes ) => {
			return omit({
				...attributes,
				alignment: attributes.textAlignment
			}, ['textAlignment'])
			},
			save:(
				{attributes}
			) => {
				const { content, textAlignment,backgroundColor, textColor, customBackgroundColor, customTextColor, shadow, shadowOpacity } = attributes;

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
					'has-shadow': shadow,
					[`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
				})


				return <RichText.Content
					tagName="p"
					className={ classes }
					value={ content }
					style={{
						textAlign: textAlignment,
						//ignore the inline style if undefined
						//if backgroundClass === true backgroundColor=undefined else customBackgroundColor
						backgroundColor: backgroundClass ? undefined : customBackgroundColor ,
						color: textClass ? undefined : customTextColor }}
				/>;
			}
		},

		{
			//supports
			attributes: omit({
				...attributes,
				content: {
					type: 'string',
					source: 'html',
					selector: 'p'
				},
			}, ['textAlignment']),
			migrate: ( attributes ) => {
				return omit({
					...attributes,
					alignment: attributes.textAlignment
				}, ['textAlignment'])
			},
			save:(
				{attributes}
			) => {
				const { content, alignment,backgroundColor, textColor, customBackgroundColor, customTextColor, shadow, shadowOpacity } = attributes;

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
					'has-shadow': shadow,
					[`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
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
		}
	],



	/**
	 * @see ./edit.js
	 */
	edit: EditClass,

	/**
	 * @see ./save.js
	 */
	save,
} );
