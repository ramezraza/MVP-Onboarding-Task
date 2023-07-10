import { Home } from "./components/Home";
import { StoreList } from "./components/Store/StoreList";
import { ProductList } from "./components/Product/ProductList";
import { SaleReport } from "./components/Sale/SaleReport";
import { CustomerList } from "./components/Customer/CustomerList";



const AppRoutes = [
    {
        index: true,
        element: <Home />
    },

    {
        path: '/StoreList',
        element: <StoreList />
    },

    {
        path: '/CustomerList',
        element: <CustomerList />
    },

    {
        path: '/ProductList',
        element: <ProductList />

    },

    {
        path: '/SaleReport',
        element: <SaleReport />
    }
];

export default AppRoutes;
