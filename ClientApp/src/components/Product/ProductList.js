import React, { Component } from 'react';
import { AddProduct } from './AddProduct';
import { Button } from 'semantic-ui-react';
import { EditProduct } from './EditProduct';
import $ from 'jquery';
import Swal from 'sweetalert2'

export class ProductList extends Component {
    static displayName = ProductList.name;

    constructor(props) {
        super(props);
        this.state = { Product: [], ShowAddProduct: false, ShowEditProduct: false };
    }

    componentDidMount() {
        this.populateProductTable();
    }

    componentDidUpdate() {
        this.populateProductTable();
    }

    async populateProductTable() {
        const response = await fetch('api/Product');
        const data = await response.json();
        this.setState({ Product: data });

    }

    DeleteProduct(ProductId) {
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
                    url: 'api/Product/' + ProductId,
                    type: 'DELETE',
                    contentType: 'application/json',
                    success: function () {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Product has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function () {



                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Product may have existing relationship with the sales.. ',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            }
        })
    }



    render() {

        const { Product, ProductId, ProductName, ProductPrice } = this.state;

        let HideAddProduct = () => this.setState({ ShowAddProduct: false });
        let HideEditProduct = () => this.setState({ ShowEditProduct: false });


        return (
            <div>
                <h2 id="tabelLabel" >Products</h2>
                <button className="btn-black-bg" onClick={() => this.setState({ ShowAddProduct: true })}>Create New Product</button>

                <div>
                    <table className='table table-border' aria-labelledby="tabelLabel">
                        <thead>
                            <tr className="table-header">

                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Product.map(product =>
                                <tr key={product.id}>

                                    <td>{product.name}</td>
                                    <td>{product.price}</td>

                                    <td> <Button ui primary content='Edit' icon='edit' labelPosition='left' size='small'
                                        onClick={() => this.setState({ ShowEditProduct: true, ProductId: product.id, ProductName: product.name, ProductPrice: product.price })} /></td>

                                    <td> <Button ui secondary content='Delete' icon='trash' labelPosition='left' size='small'
                                        onClick={() => this.DeleteProduct(product.id)}
                                    /></td>


                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



                {this.state.ShowAddProduct ? <AddProduct onHide={HideAddProduct} /> : ''}
                {this.state.ShowEditProduct ? <EditProduct onHide={HideEditProduct} ProductId={ProductId} ProductName={ProductName} ProductPrice={ProductPrice} />
                    : ''}


            </div>
        );
    }


}
