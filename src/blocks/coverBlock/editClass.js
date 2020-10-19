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

class EditClass extends Component{

	onChangeContent = (content) => {
		this.props.setAttributes({ content })
	}
	onChangeAlignment = (alignment) => {
		this.props.setAttributes({ alignment })
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
		const { content, alignment } = attributes;
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
				<BlockControls
				>

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
								}]
							]}
						/>
					</Toolbar>
					}
				</BlockControls>
				<RichText
					tagName="p"
					className={ className}
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
