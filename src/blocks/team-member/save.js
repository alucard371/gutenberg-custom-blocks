/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { RichText } from "@wordpress/block-editor";
import {Dashicon} from "@wordpress/components";


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
	{ attributes }
	) {
	const { title, info, url, alt, id, social } = attributes;
	return (
		<div>
			{url &&
			<img src={url} alt={alt} className={id ? `wp-image-${id}`:null}/>
			}
			{title &&
			<RichText.Content
				className={'wp-block-qtd-blocks-team-member__title'}
				tagName="h4"
				value={ title }
			/>
			}
			{info &&
			<RichText.Content
				className={'wp-block-qtd-blocks-team-member__info'}
				tagName="p"
				value={ info }
			/>
			}
			{social.length > 0 &&
			<div className={'wp-block-qtd-blocks-team-member__social'}>
				<ul>
					{social.map((item, index) => {
						return (
							<li key={index} data-icon={item.icon}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									<Dashicon icon={item.icon} size={16}/>
								</a>
							</li>
							)
					})}
				</ul>
			</div>
			}
		</div>
	);
}
