/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/editor';

import { Fragment } from '@wordpress/element'
import {
	Toolbar,
	DropdownMenu,
	PanelBody,
	ToggleControl,
	ColorPicker,
	ColorPalette
} from '@wordpress/components'



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */


export default function Edit( { className, attributes, setAttributes } ) {
	console.log(attributes);
	const { content, alignment,backgroundColor, textColor } = attributes;
	const onChangeContent = (content) => {
		setAttributes({ content })
	}
	const onChangeAlignment = (alignment) => {
		setAttributes({ alignment })
	}
	const onChangeBackgroundColor = (backgroundColor) => {
		setAttributes({ backgroundColor })
	}
	const onChangeTextColor = (textColor) => {
		setAttributes({ textColor })
	}
	return(
	<>
		<InspectorControls>
			<PanelColorSettings
				title={__('Panel Color Settings', 'qtd-blocks')}
				colorSettings={[
					{
						value: backgroundColor,
						onChange: onChangeBackgroundColor,
						label: __('Background color', 'qtd-blocks')
					},
					{
						value: textColor,
						onChange: onChangeTextColor,
						label: __('Text color', 'qtd-blocks')
					},
				]}
			>

			</PanelColorSettings>
		{/*	<PanelBody
			title={__('Panel', 'qtd-blocks')}>
				<ToggleControl
				label="Hello world!!!"
				onChange={(v) => console.log(v)}
				/>
				<ColorPicker
				color="#dedede"
				onChangeComplete = {(v) => console.log((v))}
				/>
				<ColorPalette
				colors={[
					{color: '#f03'},
					{color: '#dedede'},
					{color: '#d52'},
					{color: '#b28'},
					]}
				onChange={onChangeBackgroundColor}
				/>


			</PanelBody>*/}
		</InspectorControls>
		<BlockControls
			/*controls={ [
				[{
					icon: 'editor-alignleft',
					title: __('left', 'qtdtheme'),
					onClick: () => onChangeAlignment('left'),
					isActive: true
				}],
				[{
					icon: 'editor-aligncenter',
					title: __('center', 'qtdtheme'),
					onClick: () => onChangeAlignment('center'),
					isActive: true
				}],
				[{
					icon: 'editor-alignright',
					title: __('right', 'qtdtheme'),
					onClick: () => onChangeAlignment('right'),
					isActive: true
				}]
			]}*/
		>

			<AlignmentToolbar
				value = {alignment}
				onChange={(alignment)=>onChangeAlignment(alignment)}
			/>
			{(content && content.length > 0) &&
			<Toolbar>
				<DropdownMenu
					icon="editor-table"
					label="Dropdown menu"
					controls={[
						[{
							icon: 'wordpress',
							title: __('test', 'qtdtheme'),
							onClick: () => alert(true),
							isActive: false
						}],
						[{
							icon: 'admin-site',
							title: __('test', 'qtdtheme'),
							onClick: () => alert(false),
							isActive: true
						}]
					]}
				/>
			</Toolbar>
			}
		</BlockControls>
		<RichText
			tagName="p"
			className={ className}
			onChange={onChangeContent}
			value={ content }
			style={{
				textAlign: alignment,
				backgroundColor: backgroundColor,
				color: textColor}}
			// formattingControls={[]}
		/>


	</>
	)
}
