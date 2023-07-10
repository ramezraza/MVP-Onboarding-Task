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
    public class CustomerController : ControllerBase
    {
        private readonly MvponboardingContext _context;

        public CustomerController(MvponboardingContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetCustomers()
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.Select(c => Mapper.MapCustomerDto(c)).ToListAsync();
            return Ok(customer);

        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
       



        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerDto>> PostCustomer(CustomerDto customer)
        {
            if (_context.Customers == null)
            {
                return Problem("Entity set 'MvponboardingContext.Customers'  is null.");
            }
            var entity = Mapper.MapCustomer(customer);

            try
            {

                if (customer.Id == 0)
                {
                    _context.Customers.Add(entity);
                    await _context.SaveChangesAsync();
                    return Ok("Customer has been created successfully!");
                }
                else
                {
                    _context.Customers.Update(entity).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok("Customer has been updated successfully!");
                };


                //return new JsonResult(Mapper.MapStoreDto(entity));

            }

            catch (Exception)
            {
                return BadRequest();
            }
        }



        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
