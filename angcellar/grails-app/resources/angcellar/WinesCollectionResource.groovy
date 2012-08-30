package angcellar

import static org.grails.jaxrs.response.Responses.*

import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.Produces
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.POST
import javax.ws.rs.core.Response

// added for error status to be returned
import static javax.ws.rs.core.MediaType.APPLICATION_XML
import static javax.ws.rs.core.MediaType.APPLICATION_JSON
import static javax.ws.rs.core.Response.Status.NOT_ACCEPTABLE 

import grails.converters.deep.JSON

@Path('/api/wines')
@Consumes(['application/json','text/plain'])
@Produces(['application/json','text/plain'])
class WinesCollectionResource {

    @POST
    Response create(Wines dto) {
		//created dto.save(flush:true)
		
		// added
		def saved = dto.save(flush: true)
		if (saved) {
			created saved
		} else {
			// extra added to return status 406 and the error messages
			def errors = dto.errors.allErrors.collect { it.getDefaultMessage() }
			def converter = errors as JSON
			Response.status(NOT_ACCEPTABLE).entity(converter.toString()).type(APPLICATION_JSON).build()
		}
	}

    @GET
    Response readAll() {
		ok Wines.findAll()
    }
    
    @Path('/{id}')
    WinesResource getResource(@PathParam('id') String id) {
        new WinesResource(id:id)
    }
        
}
