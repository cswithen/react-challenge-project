import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import EditOrderForm from './editOrderForm/editOrderForm';
import './viewOrders.css';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`


class ViewOrders extends Component {
    state = {
        orders: [],
        selectedOrder: ""
    }

    componentDidMount() {
        this.fetchOrders()
    }

    fetchOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
        .then(response => response.json())
        .then(response => {
            if(response.success) {
                this.setState({ orders: response.orders });
            } else {
                console.log('Error getting orders');
            }
        });
    }

    deleteOrder(event) {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: event.target.id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {console.log("Success", JSON.stringify(response))
        })
        .catch(error => console.error(error))
    }

    handleClick(event) {
        if(this.state.selectedOrder === event.target.id){
            this.setState({
                selectedOrder: ""
            })
        } else {
            this.setState({
                selectedOrder: event.target.id
            })

        }
    }


    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        const editOrder = {
                            id: order._id,
                            order_item: order.order_item,
                            quantity: order.quantity,
                        }

                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" id={order._id} onClick={this.handleClick.bind(this)
                                     }>Edit</button>
                                     <button className="btn btn-danger" id={order._id} onClick={this.deleteOrder}>Delete</button>
                                 </div>
                                 {(this.state.selectedOrder === order._id ? <EditOrderForm editOrder={editOrder}/>: <div />)}
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
