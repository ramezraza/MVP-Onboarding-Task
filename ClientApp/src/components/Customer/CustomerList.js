import React, { Component } from 'react';
import { AddCustomer } from './AddCustomer';
import { Button } from 'semantic-ui-react';
import { EditCustomer } from './EditCustomer';
import $ from 'jquery';
import Swal from 'sweetalert2'

export class CustomerList extends Component {
    static displayName = CustomerList.name;

    constructor(props) {
        super(props);
        this.state = { Customer: [], ShowAddCustomer: false, ShowEditCustomer: false };
    }

    componentDidMount() {
        this.populateCustomerTable();
    }

    componentDidUpdate() {
        this.populateCustomerTable();
    }

    async populateCustomerTable() {
        const response = await fetch('api/Customer');
        const data = await response.json();
        this.setState({ Customer: data });

    }

    DeleteCustomer(CustomerId) {
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
                    url: 'api/Customer/' + CustomerId,
                    type: 'DELETE',
                    contentType: 'application/json',
                    success: function () {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Customer has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function () {



                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Customer may have existing relationship with the sales.. ',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            }
        })
    }



    render() {

        const { Customer, CustomerID, CustomerName, CustomerAddress } = this.state;

        let HideAddCustomer = () => this.setState({ ShowAddCustomer: false });
        let HideEditCustomer = () => this.setState({ ShowEditCustomer: false });


        return (
            <div>
                <h2 id="tabelLabel" >Customers</h2>
                <button className="btn-black-bg" onClick={() => this.setState({ ShowAddCustomer: true })}>Create New Customer</button>

                <div>
                    <table className='table table-border' aria-labelledby="tabelLabel">
                        <thead>
                            <tr className="table-header">

                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Customer.map(Customer =>
                                <tr key={Customer.id}>

                                    <td>{Customer.name}</td>
                                    <td>{Customer.address}</td>

                                    <td> <Button ui primary content='Edit' icon='edit' labelPosition='left' size='small'
                                        onClick={() => this.setState({ ShowEditCustomer: true, CustomerID: Customer.id, CustomerName: Customer.name, CustomerAddress: Customer.address })} /></td>

                                    <td> <Button ui secondary content='Delete' icon='trash' labelPosition='left' size='small'
                                        onClick={() => this.DeleteCustomer(Customer.id)}
                                    /></td>


                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



                {this.state.ShowAddCustomer ? <AddCustomer onHide={HideAddCustomer} /> : ''}
                {this.state.ShowEditCustomer ? <EditCustomer onHide={HideEditCustomer} CustomerID={CustomerID} CustomerName={CustomerName} CustomerAddress={CustomerAddress} />
                    : ''}


            </div>
        );
    }


}
