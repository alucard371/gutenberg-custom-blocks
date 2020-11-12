import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from "@wordpress/components";

const attributes = {
	columns: {
		type: "number",
		default: 4
	}
};

registerBlockType('qtd-blocks/team-members', {
	title: __( 'Team members', 'qtd-blocks' ),

	description: __(
		'Block to show team members',
		'team-members'
	),

	category: 'qtd-blocks-category',

	icon: 'grid-view',

	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: ({columns, images}) => {
					let inner = images.map(({alt, id, url}) =>
						createBlock('qtd-blocks/team-member',
						{alt, id, url}));
				return createBlock('qtd-blocks/team-members', {
					columns: columns

					},inner);
				}
			}
		]
	},

	keywords: [
		__('list', 'team-member')
		, __('organise', 'team-member')
		, __('team', 'team-member')
		, __('member', 'team-member')
		, __('person', 'team-member')
	],

	supports: {
		// Removes support for an HTML mode.
		html: false,
		align: ['wide', "full"]
	},

	attributes,

	edit ( {className, attributes, setAttributes}) {
		const { columns } = attributes;
		return (
		<div className={`${className} has-${columns}-columns`}>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__("column", "qtd-blocks")}
						value={columns}
						onChange={columns => setAttributes({ columns })}
						min={1}
						max={6}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={['qtd-blocks/team-member']}
				template={[
					["qtd-blocks/team-member"],
					["qtd-blocks/team-member"],
					["qtd-blocks/team-member"],
					["qtd-blocks/team-member"]
				]}
			/>
		</div>
		)

	},

	save({ attributes }) {
		const { columns } = attributes;
		return (
			<div className={`has-${columns}-columns`}>
				<InnerBlocks.Content />
			</div>
		);
	}
})
