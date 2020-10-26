import { Component } from '@wordpress/element'
import {
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	ContrastChecker, PanelColorSettings, withColors
} from "@wordpress/block-editor";
import { isBlobURL } from "@wordpress/blob"
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton,
	PanelBody,
	TextareaControl,
	SelectControl,
	Dashicon,
	Tooltip,
	TextControl
} from  "@wordpress/components"
import {__} from "@wordpress/i18n";
import { withSelect} from "@wordpress/data";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";


class TeamMemberEdit extends Component{

	state= {
		selectedLink: null
	}

	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { url,id } = attributes;
		if(url && isBlobURL(url) && !id) {
			setAttributes({
				url: '',
				alt: ''
			})
		}
	}

	componentDidUpdate( prevProps ) {
		if (prevProps.isSelected && !this.props.isSelected) {
			this.setState({
				selectedLink: null,
			})
		}
	}

	onChangeTitle = (title) => {
		this.props.setAttributes( {title} )
	};
	onChangeInfo = (info) => {
		this.props.setAttributes( {info} )
	};
	onSelectImage = ( {id,url,alt } ) => {
		this.props.setAttributes( {
			id,
			url,
			alt
		})
	};
	onSelectURL = (url) => {
		this.props.setAttributes({
			url,
			id: null,
			alt: ""
		});
	};

	removeImage = () => {
		this.props.setAttributes({
			url:"",
			id: null,
			alt: ""
		});
	}

	updateAlt = (alt) => {
		this.props.setAttributes({
			alt
		});
	}

	onUploadError = (message) => {
		const { noticeOperations } = this.props;
		noticeOperations.createErrorNotice( message )
	}

	getImageSizes() {
		const { image, imageSizes } = this.props;
		if (!image) return [];
		let options = [];
		const sizes = image.media_details.sizes;
		console.log(sizes)
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find(size => size.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url
				});
			}
		}
		return options;
	}

	imageSizeChange =  (url) => {
		this.props.setAttributes({
			url
		});
	}

	addNewLink = () => {
		const {setAttributes, attributes} = this.props;
		const {social} = attributes;
		setAttributes({
			social: [...social, { icon : 'wordpress', link : ''}]
		})
		this.setState({
			selectedLink: social.length
		})
	}

	updateSocialItem = (type, value) => {
		const {setAttributes, attributes} = this.props;
		const {social} = attributes;
		const { selectedLink } = this.state;
		//makes a copy of the original array
		let new_social = [...social];
		new_social[selectedLink][type] = value;
		setAttributes({
			social: new_social
		});
	}

	removeLink = (e) => {
		e.preventDefault();
		const {setAttributes, attributes} = this.props;
		const {social} = attributes;
		const { selectedLink } = this.state;

		setAttributes({
			social: [...social.slice(0, selectedLink), ...social.slice(selectedLink+1)]
		});
		this.setState({
			selectedLink: null
		})
	}

	onSortEnd = (oldIndex, newIndex) => {
		const {setAttributes, attributes} = this.props;
		const {social} = attributes;
		let new_social = arrayMove(social, oldIndex, newIndex);

		setAttributes({
			social: new_social
		});
		this.setState({
			selectedLink: null
		})

	}

	/*onChangeBackgroundColor = (backgroundColor) => {
		this.props.setAttributes({ backgroundColor })
	}
	onChangeTextColor = (textColor) => {
		this.props.setAttributes({ textColor })
	}*/

	render(){
		console.log(this.props);
		const { className, attributes, noticeUI, isSelected, setTextColor, setBackgroundColor,backgroundColor, textColor } = this.props;
		const { title,info, url, alt, id, social } = attributes;

		const SortableLink = SortableContainer(()=> {
			return (
				<ul>
					{social.map((item, index) => {
						let SortableItem = SortableElement(() => {
							return (
								<li
									key={index}
									onClick={() => this.setState({ selectedLink: index })}
									className={ this.state.selectedLink === index ? 'is-selected' : null}
								>
									<Dashicon icon={item.icon} size={16}/>
								</li>
							)
						})
						return <SortableItem key={index} index={index}/>
					})}
					{isSelected &&
						<li className={'wp-block-qtd-blocks-team-member__addIconLi'}>
							<Tooltip text={__('Remove image', 'qtd-blocks')}>
								<button
									className={'wp-block-qtd-blocks-team-member__addIcon'}
									onClick={ this.addNewLink }
								>
									<Dashicon icon={'plus'} size={14}/>
								</button>
							</Tooltip>
						</li>
					}
				</ul>
			)
		})
		return(
			<>
				<InspectorControls>
					<PanelBody title={ __('Image settings', 'qtd-blocks') }>
						{url && !isBlobURL(url) &&
						<TextareaControl
							label={ __('Alt text', 'qtd-blocks') }
							value={ alt }
							onChange={ this.updateAlt }
							help={__('The alt attribute provides alternative information for an image if a user for some reason cannot view it', 'qtd-blocks')}
						/>
						}
						{id &&
						<SelectControl
							label={ __('Image size', 'qtd-blocks') }
							options={ this.getImageSizes() }
							onChange={ this.imageSizeChange }
							value={ url }
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
					{url &&
						<Toolbar>
							{id &&
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ this.onSelectImage }
									allowedTypes={["image"]}
									value={ id }
									render={({ open }) => {
										return(
											<IconButton
												className="components-icon-button components-toolbar__control"
												icon="edit"
												label={ __('Edit image', 'qtd-blocks') }
												onClick={ open }
											/>
										)
									}}
								/>
							</MediaUploadCheck>
							}
							<IconButton
								className="components-icon-button components-toolbar__control"
								icon="trash"
								label={ __('Remove image', 'qtd-blocks') }
								onClick={ this.removeImage }
							/>
						</Toolbar>
					}
				</BlockControls>
				<div
					className={ className }
					style={{
						backgroundColor: backgroundColor.color}}
				>
					{url ?
						<>
							<img src={url} alt={alt}/>
							{isBlobURL(url) && <Spinner />}
						</>
						: <MediaPlaceholder
							icon="format-image"
							onSelect={ this.onSelectImage }
							onSelectURL={ this.onSelectURL }
							onError={ this.onUploadError }
							//accept="image/*"
							allowedTypes={["image"]}
							notices={ noticeUI }

						/>
					}
					<RichText
						//classname is in BEM format
						//This will be the class of our div
						className={'wp-block-qtd-blocks-team-member__title'}
						tagName="h4"
						onChange={ this.onChangeTitle }
						value = {title}
						placeholder={__("Member name", 'team-member')}
						formattingControle={[]}
						format="string"
						style={{ color: textColor.color }}
					/>
					<RichText
						//classname is in BEM format
						//This will be the class of our div
						className={'wp-block-qtd-blocks-team-member__info'}
						tagName="p"
						onChange={ this.onChangeInfo }
						value = {info}
						placeholder={__("Member info", 'team-member')}
						formattingControle={[]}
						format="string"
						style={{ color: textColor.color }}
					/>
					<div className={'wp-block-qtd-blocks-team-member__social'}>
						<SortableLink
						axis="x"
						helperClass={'social_dragging'}
						distance={10}
						onSortEnd={({oldIndex, newIndex}) => this.onSortEnd(oldIndex, newIndex)}
						/>
						{/*<ul>
							{social.map((item, index) => {
								return (
									<li
										key={index}
										onClick={() => this.setState({ selectedLink: index })}
										className={ this.state.selectedLink === index ? 'is-selected' : null}
									>
										<Dashicon icon={item.icon} size={16}/>
									</li>
								)
							})}
							{isSelected &&
							<li className={'wp-block-qtd-blocks-team-member__addIconLi'}>
								<Tooltip text={__('Remove image', 'qtd-blocks')}>
									<button
										className={'wp-block-qtd-blocks-team-member__addIcon'}
										onClick={ this.addNewLink }
									>
										<Dashicon icon={'plus'} size={14}/>
									</button>
								</Tooltip>
							</li>
							}
						</ul>*/}
					</div>
					{this.state.selectedLink !== null &&
					<div className={'wp-block-qtd-blocks-team-member__linkForm'}>
						<TextControl
							label={__('Icon', 'qtd-blocks')}
							value={social[this.state.selectedLink].icon}
							onChange={(icon) => this.updateSocialItem('icon', icon)}
						/>
						<TextControl
							label={__('URL', 'qtd-blocks')}
							value={social[this.state.selectedLink].link}
							onChange={(url) => this.updateSocialItem('link', url)}
						/>
						<a
							className={'wp-block-qtd-blocks-team-member__removeLink'}
							onClick={ this.removeLink }
						>
							{__('RemoveLink', 'qtd-blocks')}
						</a>
					</div>
					}
				</div>
			</>

)
	}
}

export default withSelect((select, props)=> {
	const id = props.attributes.id;
	return {
		image: id ? select('core').getMedia(id) : null,
		imageSizes: select('core/editor').getEditorSettings().imageSizes
	}
})(withColors('backgroundColor', {'textColor': 'color'})(withNotices(TeamMemberEdit)));
