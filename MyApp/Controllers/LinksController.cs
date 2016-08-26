using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MyApp.Models;
using System.Web.Http.Description;
using System.Web.Http.Cors;

namespace MyApp.Controllers
{
    
    [EnableCorsAttribute("*","*","*")]
    public class LinksController : ApiController
    {
        // GET api/links
        [ResponseType(typeof(LinkModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var linkRepo = new LinksRepository();
                return Ok(linkRepo.Retrive());
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET api/links/5
        [ResponseType(typeof(LinkModel))]
        public IHttpActionResult Get(int id)
        {
            
            try
            {
                var links = new LinksRepository().Retrive();
                var link = links.FirstOrDefault(p => p.Id == id);
                if (link == null)
                    return NotFound();

                return Ok(link);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }
        }

        // POST api/links
        [ResponseType(typeof(LinkModel))]
        public IHttpActionResult Post([FromBody]LinkModel link)
        {
            
            try
            {
                if (link == null)
                    return BadRequest("Product Cannont be null");
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var savedLink =new LinksRepository().Save(link);
                if (savedLink == null)
                    return Conflict();
                return Created<LinkModel>(Request.RequestUri + savedLink.Id.ToString(),savedLink);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }
        }

        // PUT api/links/5
        public IHttpActionResult Put(int id, [FromBody]LinkModel link)
        {
            new LinksRepository().Save(id, link);

            try
            {
                if (link == null)
                    return BadRequest("Product Cannont be null");
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var savedLink = new LinksRepository().Save(id,link);
                if (savedLink == null)
                    return NotFound();
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }


        }

        // DELETE api/links/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var links = new LinksRepository().Retrive();
                var link = links.FirstOrDefault(p => p.Id == id);
                if (link == null)
                    return NotFound();
                var linkDeleted = new LinksRepository().Delete(id,link);
                return Ok(linkDeleted);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);

            }
        }
    }
}
