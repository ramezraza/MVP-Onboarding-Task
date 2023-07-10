using KeyAttribute = System.ComponentModel.DataAnnotations.KeyAttribute;
namespace MVP_Onboarding.Dto
{
    public class ProductDto
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public decimal? Price { get; set; }

    }
}
