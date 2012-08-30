package angcellar

class Wines {
	static mapping = {
		table 'wine'
        version false
        id generator: 'hilo',
           params: [table: 'hi_value',
                    column: 'next_value',
                    max_lo: 100000]
	}
  
	static expose = 'wines'
	/*static api = [
		excludedFields: [ "fullName" ]
		list : { params -> Wines.list(params) },
		count: { params -> Wines.count() }
	]*/
	
	Long id
	String name
	Integer year
	String grapes
	String country
	String region
	String description
	String picture
  
    static constraints = {
		name(nullable: true)
		year(nullable: true)		
		grapes(nullable: true)		
		country(nullable: true)
		region(nullable: true)
		description(size:0..2000, nullable: true)
		picture(nullable: true)
	}
}
