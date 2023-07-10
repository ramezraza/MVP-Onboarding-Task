import React, { Component } from 'react';
import { AddSale } from './AddSale';
import { Button } from 'semantic-ui-react';
import { EditSale } from './EditSale';
import $ from 'jquery';
import Swal from 'sweetalert2'

export class SaleReport extends Component {
    static displayName = SaleReport.name;

    constructor(props) {
        super(props);
        this.state = { Sales: [], ShowAddSale: false, ShowEditSale: false };
    }

    componentDidMount() {
        this.populateSaleTable();
    }

    componentDidUpdate() {
        this.populateSaleTable();
    }

    async populateSaleTable() {
        const response = await fetch('api/Sale');
        const data = await response.json();
        this.setState({ Sales: data });

    }

    DeleteSale(SaleId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'api/Sale/' + SaleId,
                    type: 'DELETE',
                    contentType: 'application/json',
                    success: function () {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sale record has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function () {



                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Failed, Please try again! ',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            }
        })
    }



    render() {

        const { Sales, SaleId, CustomerId, ProductId, StoreId, DateSold, Customer, Product, Store } = this.state;

        let HideAddSale = () => this.setState({ ShowAddSale: false });
        let HideEditSale = () => this.setState({ ShowEditSale: false });


        return (
            <div>
                <h2 id="tabelLabel" >Sales</h2>
                <button className="btn-black-bg" onClick={() => this.setState({ ShowAddSale: true })}>Create New Sale</button>

                <div>
                    <table className='table table-border' aria-labelledby="tabelLabel">
                        <thead>
                            <tr className="table-header">


                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>Date Sold</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr >
                        </thead >
                        <tbody>
                            {Sales.map(sale =>
                                <tr key={sale.id}>


                                    <td>{sale.customerName}</td>
                                    <td>{sale.productName}</td>
                                    <td>{sale.storeName}</td>
                                    <td>{sale.dateSold}</td>

                                    <td> <Button ui primary content='Edit' icon='edit' labelPosition='left' size='small'
                                        onClick={() => this.setState(
                                            {
                                                ShowEditSale: true, SaleId: sale.id, CustomerId: sale.customerId, ProductId: sale.productId, StoreId: sale.storeId, DateSold: sale.dateSold,
                                                Customer: sale.customerName, Product: sale.productName, Store: sale.storeName
                                            })} /></td>

                                    <td> <Button ui secondary content='Delete' icon='trash' labelPosition='left' size='small'
                                        onClick={() => this.DeleteSale(sale.id)}
                                    /></td>


                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



                {this.state.ShowAddSale ? <AddSale onHide={HideAddSale} /> : ''}
                {this.state.ShowEditSale ? <EditSale onHide={HideEditSale} SaleId={SaleId} CustomerId={CustomerId} ProductId={ProductId} StoreId={StoreId} DateSold={DateSold}
                    Customer={Customer} Store={Store} Product={Product} />
                    : ''}


            </div>
        );
    }


}

























