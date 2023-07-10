import React, { Component } from 'react';
import $ from 'jquery';
import { Button, } from 'semantic-ui-react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';




export class EditCustomer extends Component {

    constructor(props) {
        super(props);

    }


    handleSubmit(event) {

        event.preventDefault();
        let CustomerId = event.target.CustomerId.value;
        let name = event.target.name.value;
        let address = event.target.address.value;

        $.ajax({
            url: 'api/Customer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id: CustomerId,
                name: name,
                address: address
            }),
            success: function (response) {
                //event.target.name.value = '';
                //event.target.address.value = '';
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
        return (
            <div class="container">
                <div className="modal-popup" >

                    <div className="modal-content">
                        <div className="modal-header">

                            <p className="modal-title">Edit Customer</p>
                            <button className="btn-close" onClick={this.props.onHide}></button>

                        </div>
                        <div className="modal-body">
                            <Form id="ThisForm" className="form" onSubmit={this.handleSubmit}>

                                <FormGroup>
                                    <Input
                                        type="hidden"
                                        name="CustomerId"
                                        disabled
                                        defaultValue={this.props.CustomerID}
                                        id="CustomerId"

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Customer Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        defaultValue={this.props.CustomerName}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        required
                                        defaultValue={this.props.CustomerAddress}
                                    />
                                </FormGroup>


                            </Form>
                        </div>
                        <div className="modal-footer">
                            <Button primary type="submit" form="ThisForm"> Update </Button>
                            <Button secondary onClick={this.props.onHide}>Cancel </Button>

                        </div>

                    </div>
                </div>
            </div>


        );
    }
}



