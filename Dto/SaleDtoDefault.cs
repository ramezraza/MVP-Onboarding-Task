using KeyAttribute = System.ComponentModel.DataAnnotations.KeyAttribute;

namespace MVP_Onboarding.Dto
{
    public class SaleDtoDefault
    {
        [Key]
        public int Id { get; set; }

        public int? ProductId { get; set; }

        public int? CustomerId { get; set; }

        public int? StoreId { get; set; }

        public DateTime? DateSold { get; set; }
    }
}
