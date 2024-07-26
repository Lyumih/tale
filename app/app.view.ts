namespace $.$$ {
	/** 0 - белые, 1 - чёрные */
	export class $tale_app extends $.$tale_app {
		@$mol_mem
		user() {
			return this.$.$hyoo_crus_realm.home().hall_by( $tale_dao_user, { '': $hyoo_crus_rank.get } )
		}

		user_id() {
			// console.log('hero', this.user()?.Hero())
			return this.user()?.ref().description ?? ''
		}
	}
}
