import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';

registerBlockType('qtd-blocks/team-members', {
	title: __( 'Team members', 'qtd-blocks' ),

	description: __(
		'Block to show team members',
		'team-members'
	),

	category: 'qtd-blocks-category',

	icon: 'grid-view',

	keywords: [
		__('list', 'team-member')
		, __('organise', 'team-member')
		, __('team', 'team-member')
		, __('member', 'team-member')
		, __('person', 'team-member')
	],

	edit ( {className}) {
		return (
		<div className={ className }>
			<InnerBlocks
			allowedBlocks={['qtd-blocks/team-member']}
			template={[
				['qtd-blocks/team-member'],
				['qtd-blocks/team-member'],
			]}
			// templateLock={"insert"}
			/>
		</div>
		)
	},

	save() {
		return (
			<div>
				<InnerBlocks.content />
			</div>
		)
	}
})
