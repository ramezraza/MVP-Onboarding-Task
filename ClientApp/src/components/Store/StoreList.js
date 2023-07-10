import React, { Component } from 'react';
import { AddStore } from './AddStore';
import { Button } from 'semantic-ui-react';
import { EditStore } from './EditStore';
import $ from 'jquery';
import Swal from 'sweetalert2'

export class StoreList extends Component {
    static displayName = StoreList.name;

    constructor(props) {
        super(props);
        this.state = { Store: [], ShowAddStore: false, ShowEditStore: false };
    }

    componentDidMount() {
        this.populateStoreTable();
    }

    componentDidUpdate() {
        this.populateStoreTable();
    }

    async populateStoreTable() {
        const response = await fetch('api/Store');
        const data = await response.json();
        this.setState({ Store: data });

    }

    DeleteStore(StoreId) {
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
                    url: 'api/Store/' + StoreId,
                    type: 'DELETE',
                    contentType: 'application/json',
                    success: function () {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Store has been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function () {



                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Store may have existing relationship with the sales.. ',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

            }
        })
    }



    render() {

        const { Store, StoreID, StoreName, StoreAddress } = this.state;

        let HideAddStore = () => this.setState({ ShowAddStore: false });
        let HideEditStore = () => this.setState({ ShowEditStore: false });


        return (
            <div>
                <h2 id="tabelLabel" >Stores</h2>
                <button className="btn-black-bg" onClick={() => this.setState({ ShowAddStore: true })}>Create New Store</button>

                <div>
                    <table className='table table-border' aria-labelledby="tabelLabel">
                        <thead>
                            <tr className="table-header">

                                <th>Store Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Store.map(Store =>
                                <tr key={Store.id}>

                                    <td>{Store.name}</td>
                                    <td>{Store.address}</td>

                                    <td> <Button ui primary content='Edit' icon='edit' labelPosition='left' size='small'
                                        onClick={() => this.setState({ ShowEditStore: true, StoreID: Store.id, StoreName: Store.name, StoreAddress: Store.address })} /></td>

                                    <td> <Button ui secondary content='Delete' icon='trash' labelPosition='left' size='small'
                                        onClick={() => this.DeleteStore(Store.id)}
                                    /></td>


                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



                {this.state.ShowAddStore ? <AddStore onHide={HideAddStore} /> : ''}
                {this.state.ShowEditStore ? <EditStore onHide={HideEditStore} StoreID={StoreID} StoreName={StoreName} StoreAddress={StoreAddress} />
                    : ''}


            </div>
        );
    }


}
