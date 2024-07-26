namespace $.$$ {
	export class $tale_app_hero extends $.$tale_app_hero {
		user() {
			return this.$.$hyoo_crus_realm.home().hall_by( $tale_dao_user, { '': $hyoo_crus_rank.get } )
		}

		@$mol_mem
		hero_name( next?: string | undefined ): string {
			console.log( 'hero in 2', this.user(), next )
			this.user()?.Hero()
			return next ?? ''
		}

	}
}
