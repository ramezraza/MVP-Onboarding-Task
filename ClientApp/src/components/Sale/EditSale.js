import React, { Component } from 'react';
import $ from 'jquery';
import { Button, } from 'semantic-ui-react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2'
import FormSelect from '../../../../node_modules/react-bootstrap/esm/FormSelect';
import { FormControl, Select } from '../../../../node_modules/@mui/material/index';



export class EditSale extends Component {

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


        let SaleId = event.target.SaleId.value;
        let CustomerId = event.target.selectCustomer.value;
        let ProductId = event.target.selectProduct.value;
        let StoreId = event.target.selectStore.value;

        $.ajax({
            url: 'api/Sale',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id: SaleId,
                customerId: CustomerId,
                productId: ProductId,
                storeId: StoreId

            }),
            success: function (response) {

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
                    title: 'Update failed!',
                    showConfirmButton: false,
                    timer: 1500
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

                            <p className="modal-title">Edit Sale Record</p>
                            <button className="btn-close" onClick={this.props.onHide}></button>

                        </div>
                        <div className="modal-body">
                            <Form id="ThisForm" className="form" onSubmit={this.handleSubmit}>
                                <FormGroup>

                                    <Input
                                        hidden
                                        name="SaleId"
                                        disabled
                                        defaultValue={this.props.SaleId}
                                        id="productId"

                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="name"> Date of sale:</Label>
                                    <Input type="text" disabled name="DateOfSale" id="DateOfSale" defaultValue={"Date of sale : " + this.props.DateSold}>

                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="selectCustomer"> Customer:</Label>
                                    <Input type="select" name="selectCustomer" id="selectCustomer" defaultValue={this.props.CustomerId}>
                                        <option disabled hidden value={this.props.CustomerId}>{this.props.Customer}</option>

                                        {
                                            this.state.Customers.map(customer =>
                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="selectProduct"> Product:</Label>
                                    <Input type="select" name="selectProduct" id="selectProduct" defaultValue={this.props.ProductId}>
                                        <option disabled hidden value={this.props.ProductId}>{this.props.Product}</option>

                                        {
                                            this.state.Products.map(product =>
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="selectStore"> Store:</Label>
                                    <Input type="select" name="selectStore" id="selectStore" defaultValue={this.props.StoreId}>
                                        <option disabled hidden value={this.props.StoreId}>{this.props.Store}</option>
                                        {
                                            this.state.Stores.map(store =>
                                                <option key={store.id} value={store.id}>{store.name}</option>
                                            )}
                                    </Input>
                                </FormGroup>


                                {/* For testing*/}
                                {/*<FormGroup>*/}
                                {/*    <Label for="selectStore"> Values Passed for Editing</Label>*/}
                                {/*    <Input type="select" name="selectSt" id="selectSt">*/}
                                {/*        <option value="5" >{"Sale id : " + this.props.SaleId}</option>*/}
                                {/*        <option value="2" >{"Customer Id : " + this.props.CustomerId} {"," + this.props.Customer}</option>*/}
                                {/*        <option value="3" >{"Product Id : " + this.props.ProductId} {"," + this.props.Product}</option>*/}
                                {/*        <option value="4" >{"Store Id : " + this.props.StoreId} {"," + this.props.Store}</option>*/}
                                {/*        <option value="5" >{"Date of Sale : " + this.props.DateSold}</option>*/}

                                {/*    </Input>*/}
                                {/*</FormGroup>*/}


                            </Form>
                        </div>
                        <div className="modal-footer">
                            <Button ui positive type="submit" form="ThisForm">Update</Button>
                            <Button ui secondary onClick={this.props.onHide}>Cancel </Button>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


