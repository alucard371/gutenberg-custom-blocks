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
	SelectControl
} from  "@wordpress/components"
import {__} from "@wordpress/i18n";

class TeamMemberEdit extends Component{

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

	render(){
		console.log(this.props);
		const { className, attributes, noticeUI } = this.props;
		const { title,info, url, alt, id } = attributes;
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
							options={[
								{label: 'Large', value: 'large'},
								{label: 'Medium', value: 'medium'}
							]}
							onChange={(value) => console.log(value)}
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
				</div>
			</>

)
	}
}

export default withNotices(TeamMemberEdit);
