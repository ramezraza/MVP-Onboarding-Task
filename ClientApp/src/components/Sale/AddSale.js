import React, { Component } from 'react';
import $ from 'jquery';
import { Button, } from 'semantic-ui-react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2'






export class AddSale extends Component {


    constructor(props) {
        super(props);
        this.state = { Stores: [], Products: [], Customers: [] };
    }


    componentDidMount() {

        this.populateStoreData();
        this.populateProductData();
        this.populateCustomerData();


    }

    componentDidUpdate() {

        this.populateStoreData();
        this.populateProductData();
        this.populateCustomerData();

    }

    async populateStoreData() {
        const response = await fetch('api/Store');
        const data = await response.json();
        this.setState({ Stores: data });

    }

    async populateProductData() {
        const response = await fetch('api/Product');
        const data = await response.json();
        this.setState({ Products: data });

    }
    async populateCustomerData() {
        const response = await fetch('api/Customer');
        const data = await response.json();
        this.setState({ Customers: data });

    }




    handleSubmit(event) {

        event.preventDefault();



        let CustomerId = event.target.selectCustomer.value;
        let ProductId = event.target.selectProduct.value;
        let StoreId = event.target.selectStore.value;

        $.ajax({
            url: 'api/Sale',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                customerId: CustomerId,
                productId: ProductId,
                storeId: StoreId

            }),
            success: function (response) {
                event.target.selectCustomer.value = "blank";
                event.target.selectProduct.value = "blank";
                event.target.selectStore.value = "blank";
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response,
                    showConfirmButton: false,
                    timer: 1500
                })


            },
            error: function () {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed! Please check your input and try again..',
                    showConfirmButton: false,
                    timer: 2000
                })

            }
        });
    }





    render() {
        const today = new Date().toISOString().substr(0, 10);

        return (
            <div class="container">

                <div className="modal-popup" >

                    <div className="modal-content">
                        <div className="modal-header">

                            <p className="modal-title">Create New Sale</p>
                            <button className="btn-close" onClick={this.props.onHide}></button>

                        </div>
                        <div className="modal-body">
                            <Form id="ThisForm" className="form" onSubmit={this.handleSubmit}>

                                <FormGroup>
                                    <Label for="name"> Date of sale </Label>
                                    <Input type="text" disabled name="DateOfSale" id="DateOfSale" defaultValue={today}>

                                    </Input>
                                </FormGroup>
                                <FormGroup>

                                    <Input type="select" name="selectCustomer" id="selectCustomer" defaultValue="blank">
                                        <option value="blank" disabled hidden>Select Customer
                                        </option>

                                        {
                                            this.state.Customers.map(customer =>
                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>
                                <FormGroup>

                                    <Input type="select" name="selectProduct" id="selectProduct" defaultValue="blank">

                                        <option value="blank" disabled hidden>Select Product
                                        </option>
                                        {
                                            this.state.Products.map(product =>
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>
                                <FormGroup>

                                    <Input type="select" name="selectStore" id="selectStore" defaultValue="blank">
                                        <option value="blank" disabled hidden>Select Store
                                        </option>
                                        {
                                            this.state.Stores.map(store =>
                                                <option key={store.id} value={store.id}>{store.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>

                            </Form>
                        </div>
                        <div className="modal-footer">
                            <Button ui positive type="submit" form="ThisForm">Create </Button>
                            <Button ui secondary onClick={this.props.onHide}>Cancel </Button>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}




