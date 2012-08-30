package angcellar

class Phone {
	static mapping = {
		version false
        id generator: 'hilo',
           params: [table: 'hi_value',
                    column: 'next_value',
                    max_lo: 100000]
	}
	
	static expose = 'phones'
	
	Long id
	String carrier
	String imageUrl
	String name
	String snippet
	Integer age

	static constraints = {
		carrier(nullable: true)
		imageUrl(nullable: true)
		name(nullable: true)
		snippet(nullable: true)
		age(nullable: true)
    }
}
