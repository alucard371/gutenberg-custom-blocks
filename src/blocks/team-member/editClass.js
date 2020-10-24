import { Component } from '@wordpress/element'
import { RichText, MediaPlaceholder, BlockControls, MediaUpload, MediaUploadCheck, InspectorControls } from "@wordpress/block-editor";
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
	Tooltip
} from  "@wordpress/components"
import {__} from "@wordpress/i18n";
import { withSelect} from "@wordpress/data";

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

	render(){
		console.log(this.props);
		const { className, attributes, noticeUI, isSelected } = this.props;
		const { title,info, url, alt, id, social } = attributes;
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
				<div className={ className }>
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
					/>
					<div className={'wp-block-qtd-blocks-team-member__social'}>
						<ul>
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
						</ul>
					</div>
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
})(withNotices(TeamMemberEdit));
