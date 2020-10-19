import { Component } from '@wordpress/element'
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	withColors,
	ContrastChecker
}
	from "@wordpress/editor";

import {__} from "@wordpress/i18n";
import {DropdownMenu, Toolbar} from "@wordpress/components";

import classnames from 'classnames';
import {icon} from "@wordpress/components/src/button/stories";

class EditClass extends Component{

	onChangeContent = (content) => {
		this.props.setAttributes({ content })
	}
	onChangeAlignment = (alignment) => {
		this.props.setAttributes({ alignment })
	}
	//if shadow === true turn shadow = false
	toggleShadow = () => {
		this.props.setAttributes({ shadow: !this.props.attributes.shadow })
	}
	/*onChangeBackgroundColor = (backgroundColor) => {
		this.props.setAttributes({ backgroundColor })
	}
	onChangeTextColor = (textColor) => {
		this.props.setAttributes({ textColor })
	}*/

	render() {
		console.log(this.props)
		const { className, attributes, setTextColor, setBackgroundColor,backgroundColor, textColor } = this.props;
		const { content, alignment, shadow } = attributes;
		const classes = classnames(className, {
			'has-shadow': shadow,
		})
		return(
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__('Panel Color Settings', 'qtd-blocks')}
						colorSettings={[
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __('Background color', 'qtd-blocks')
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __('Text color', 'qtd-blocks')
							},
						]}
					>
						<ContrastChecker
						textColor={textColor.color}
						backgroundColor={backgroundColor.color}
						/>
					</PanelColorSettings>
				</InspectorControls>
				<BlockControls>

					<AlignmentToolbar
						value = {alignment}
						onChange={(alignment)=>this.onChangeAlignment(alignment)}
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
								}],
								[{
									icon: 'wordpress',
									title: __('shadow', 'qtdtheme'),
									onClick: this.toggleShadow,
									isActive: shadow
								}]
							]}
						/>
					</Toolbar>
					}
				</BlockControls>
				<RichText
					tagName="p"
					className={ classes }
					onChange={this.onChangeContent}
					value={ content }
					style={{
						textAlign: alignment,
						backgroundColor: backgroundColor.color,
						color: textColor.color}}
					// formattingControls={[]}
				/>
			</>
		)
	}
}

export default withColors('backgroundColor', {'textColor': 'color'})(EditClass);
