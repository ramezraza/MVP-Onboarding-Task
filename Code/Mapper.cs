using MVP_Onboarding.Dto;

namespace MVP_Onboarding.Code
{
    public class Mapper
    {
        public static CustomerDto MapCustomerDto(Models.Customer customer)
        {
            var DtoObj = new CustomerDto();
            if (customer != null)
            {
                DtoObj = new()
                {
                    Id = customer.Id,
                    Name = customer.Name,
                    Address = customer.Address
                };
            }
            return DtoObj;
        }

        public static Models.Customer MapCustomer(CustomerDto customer)
        {
            var EntityObj = new Models.Customer();
            if (customer != null)
            {
                EntityObj = new()
                {
                    Id = customer.Id,
                    Name = customer.Name,
                    Address = customer.Address
                };
            }
            return EntityObj;
        }

        public static StoreDto MapStoreDto(Models.Store store)
        {
            var DtoObj = new StoreDto();

            if (store != null)
            {
                DtoObj = new()
                {
                    Id = store.Id,
                    Name = store.Name,
                    Address = store.Address
                };
            }
            return DtoObj;
        }

        public static Models.Store MapStore(StoreDto store)
        {
            var EntityObj = new Models.Store();
            if (store != null)
            {
                EntityObj = new()
                {
                    Id = store.Id,
                    Name = store.Name,
                    Address = store.Address
                };

            }
            return EntityObj;
        }

        public static ProductDto MapProductDto(Models.Product Product)
        {
            var DtoObj = new ProductDto();

            if (Product != null)
            {
                DtoObj = new()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    Price = Product.Price
                };
            }
            return DtoObj;
        }

        public static Models.Product MapProduct(ProductDto Product)
        {
            var EntityObj = new Models.Product();

            if (Product != null)
            {
                EntityObj = new()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    Price = Product.Price
                };
            }
            return EntityObj;
        }

        public static SaleDto MapSaleDto(Models.Sale Sale)
        {
            var DtoObj = new SaleDto();

            if (Sale != null)
            {
                DtoObj = new()
                {
                    Id = Sale.Id,
                    DateSold = Sale?.DateSold,
                    CustomerId = (int)Sale.CustomerId,
                    CustomerName = Sale?.Customer?.Name,
                    ProductId = (int)Sale.ProductId,
                    ProductName = Sale?.Product?.Name,
                    StoreId = (int)Sale.StoreId,
                    StoreName = Sale?.Store?.Name

                };
            }
            return DtoObj;
        }

        public static Models.Sale MapSale(SaleDtoDefault Sale)
        {
            var EntityObj = new Models.Sale();
            if (Sale != null)
            {
                EntityObj = new()
                {
                    Id = Sale.Id,
                    ProductId = Sale.ProductId,
                    CustomerId = Sale.CustomerId,
                    StoreId = Sale.StoreId,
                    DateSold = DateTime.Now
                };
            }
            return EntityObj;
        }

    }
}
