package angcellar

import static org.grails.jaxrs.response.Responses.*

import javax.ws.rs.Consumes
import javax.ws.rs.DELETE
import javax.ws.rs.GET
import javax.ws.rs.Produces
import javax.ws.rs.PUT
import javax.ws.rs.core.Response

import org.grails.jaxrs.provider.DomainObjectNotFoundException

// added for error status to be returned
import static javax.ws.rs.core.MediaType.APPLICATION_XML
import static javax.ws.rs.core.MediaType.APPLICATION_JSON
import static javax.ws.rs.core.Response.Status.NOT_ACCEPTABLE 

import grails.converters.deep.JSON

@Consumes(['application/json','text/plain'])
@Produces(['application/json','text/plain'])
class WinesResource {
    
    def id
    
    @GET
    Response read() {
        def obj = Wines.get(id)
        if (!obj) {
            throw new DomainObjectNotFoundException(Wines.class, id)
        }
        ok obj
    }
    
    @PUT
    Response update(Wines dto) {
        def obj = Wines.get(id)
        if (!obj) {
            throw new DomainObjectNotFoundException(Wines.class, id)
        }
        obj.properties = dto.properties 
		// ok obj
		
		// added
		if (!obj.hasErrors() && obj.save(flush: true)) {
			ok obj
		} else {
			// extra added to return status 406 and the error messages
			def errors = obj.errors.allErrors.collect { it.getDefaultMessage() }
			def converter = errors as JSON
			Response.status(NOT_ACCEPTABLE).entity(converter.toString()).type(APPLICATION_JSON).build()
		}
    }
    
    @DELETE
    void delete() {
        def obj = Wines.get(id)
        if (!obj) { 
            throw new DomainObjectNotFoundException(Wines.class, id)
        }
		// obj.delete(flush: true)
		
		// added
		try {
			obj.delete(flush: true)
		}
		catch (org.springframework.dao.DataIntegrityViolationException e) {
			// extra added to return status 406 and the error messages
			def errors = obj.errors.allErrors.collect { it.getDefaultMessage() }
			def converter = errors as JSON
			Response.status(NOT_ACCEPTABLE).entity(converter.toString()).type(APPLICATION_JSON).build()
		}
    }
    
}

