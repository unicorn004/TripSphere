import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
    const { orderId } = useParams(); 
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/order/${orderId}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div>
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            {orderDetails ? (
                <div>
                    <h2>Order ID: {orderDetails.id}</h2>
                    <p>Amount: {orderDetails.amount / 100} {orderDetails.currency}</p>
                    <p>Status: {orderDetails.status}</p>
                    {/* Add any other details you want to show */}
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderSuccess;
