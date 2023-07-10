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
    public class SaleController : ControllerBase
    {
        private readonly MvponboardingContext _context;

        public SaleController(MvponboardingContext context)
        {
            _context = context;
        }

        // GET: api/Sale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sale = await _context.Sales
                .Include(p => p.Product)
                .Include(c => c.Customer)
                .Include(s => s.Store).Select(s => Mapper.MapSaleDto(s)).ToListAsync();
            return Ok(sale);
        }

        


        // POST: api/Sale
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SaleDtoDefault>> PostSale(SaleDtoDefault sale)
        {
            if (_context.Sales == null)
            {
                return Problem("Entity set 'MvponboardingContext.Sales'  is null.");
            }

            var entityObj = Mapper.MapSale(sale);

            try
            {

                if (sale.Id == 0)
                {
                    _context.Sales.Add(entityObj);
                    await _context.SaveChangesAsync();
                    return Ok("Sale has been created!");
                }
                else
                {
                    _context.Sales.Update(entityObj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok("Sale has been updated!");
                };

            }

            catch (Exception) 
            {
                return BadRequest();
            }

            
        }

        // DELETE: api/Sale/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return (_context.Sales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
