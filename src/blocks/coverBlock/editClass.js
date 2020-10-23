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
	from "@wordpress/block-editor";


import {__} from "@wordpress/i18n";
import {DropdownMenu, Toolbar, RangeControl, PanelBody} from "@wordpress/components";

import classnames from 'classnames';

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
	onChangeShadowOpacity = (shadowOpacity) => {
		this.props.setAttributes({ shadowOpacity })
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
		const { content, alignment, shadow, shadowOpacity } = attributes;
		const classes = classnames(className, {
			'has-shadow': shadow,
			[`shadow-opacity-${shadowOpacity * 100}`] : shadowOpacity
		})
		return(
			<>
				<InspectorControls>
					<PanelBody title={__('Settings', 'qtd-blocks')}>
						{/*//show only if shadow is on*/}
						{shadow &&
							<RangeControl
								label={__('Shadow opacity', 'qtd-blocks')}
								value={ shadowOpacity }
								onChange={this.onChangeShadowOpacity }
								min={ 0.1 }
								max={ 0.4 }
								step={ 0.1 }
							/>
						}
					</PanelBody>
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
									title: __('test', 'qtd-blocks'),
									onClick: () => alert(true),
									isActive: false
								}],
								[{
									icon: 'admin-site',
									title: __('test', 'qtd-blocks'),
									onClick: () => alert(false),
									isActive: true
								}],
								[{
									icon: 'wordpress',
									title: __('shadow', 'qtd-blocks'),
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
