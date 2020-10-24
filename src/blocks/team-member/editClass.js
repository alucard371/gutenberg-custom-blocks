import { Component } from '@wordpress/element'
import { RichText, MediaPlaceholder } from "@wordpress/block-editor";
import { isBlobURL } from "@wordpress/blob"
import { Spinner, withNotices } from  "@wordpress/components"
import {__} from "@wordpress/i18n";

class TeamMemberEdit extends Component{
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

	onUploadError = (message) => {
		const { noticeOperations } = this.props;
		noticeOperations.createErrorNotice( message )
	}

	render(){
		console.log(this.props);
		const { className, attributes, noticeUI } = this.props;
		const { title,info, url, alt } = attributes;
		return(
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
)
	}
}

export default withNotices(TeamMemberEdit);
