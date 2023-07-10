using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVP_Onboarding.Code;
using MVP_Onboarding.Dto;
using MVP_Onboarding.Models;



namespace MVP_Onboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MvponboardingContext _context;

        public ProductController(MvponboardingContext context)
        {
            _context = context;
        }



        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.Select(p => Mapper.MapProductDto(p)).ToListAsync();
            return Ok(product);
        }





        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct(ProductDto product)
        {


            if (_context.Products == null)
            {
                return Problem("Entity set 'MvponboardingContext.Products'  is null.");
            }

            try
            {

                var entity = Mapper.MapProduct(product);

                if (product.Id == 0)
                {
                    _context.Products.Add(entity);
                    await _context.SaveChangesAsync();
                    return Ok("Product has been created successfully! ");

                }
                else
                {
                    _context.Products.Update(entity).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok("Product has been updated successfully!");

                }

                //return new JsonResult(Mapper.MapProductDto(entity));

                //return new JsonResult("Added Successfully");

            }

            catch (Exception)
            {
                return BadRequest();
            }
        }



        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();


        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
