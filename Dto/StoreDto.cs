using KeyAttribute = System.ComponentModel.DataAnnotations.KeyAttribute;

namespace MVP_Onboarding.Dto
{
    public class StoreDto
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Address { get; set; }
    }
}
