import React, { Component } from 'react';
import $ from 'jquery';
import { Button, } from 'semantic-ui-react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2'



export class AddCustomer extends Component {

    constructor(props) {
        super(props);
    }


    handleSubmit(event) {

        event.preventDefault();

        let name = event.target.name.value;
        let address = event.target.address.value;

        $.ajax({
            url: 'api/Customer',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name,
                address: address
            }),
            success: function (response) {

                event.target.name.value = '';
                event.target.address.value = '';

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
                    title: 'Failed!',
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

                            <p className="modal-title">Add New Customer</p>
                            <button className="btn-close" onClick={this.props.onHide}></button>

                        </div>
                        <div className="modal-body">
                            <Form id="ThisForm" className="form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Customer Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder="Customer Name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Customer Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        required
                                        placeholder="Address"
                                    />
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




