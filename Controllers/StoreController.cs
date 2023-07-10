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
    public class StoreController : ControllerBase
    {
        private readonly MvponboardingContext _context;

        public StoreController(MvponboardingContext context)
        {
            _context = context;
        }

        // GET: api/Store
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoreDto>>> GetStores()
        {
            if (_context.Stores == null)
            {
                return NotFound();
            }
            var store = await _context.Stores.Select(s => Mapper.MapStoreDto(s)).ToListAsync();

            return Ok(store);
        }



        // POST: api/Store
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreDto>> PostStore(StoreDto store)
        {
            if (_context.Stores == null)
            {
                return Problem("Entity set 'MvponboardingContext.Stores'  is null.");
            }
            var entity = Mapper.MapStore(store);


            try
            {

                if (store.Id == 0)
                {
                    _context.Stores.Add(entity);
                    await _context.SaveChangesAsync();
                    return Ok("Store has been created successfully! ");
                }
                else
                {
                    _context.Stores.Update(entity).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok("Store has been updated successfully!");
                };


                //return new JsonResult(Mapper.MapStoreDto(entity));

            }

            catch (Exception)
            {
                return BadRequest("Please check your inpur and try again");
            }

        }

        // DELETE: api/Store/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            if (_context.Stores == null)
            {
                return NotFound();
            }
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreExists(int id)
        {
            return (_context.Stores?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
