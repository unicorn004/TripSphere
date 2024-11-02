import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import payment_success from '../../public/assets/payment_success.png'
import { getOrderEndpoint } from '../API/APIRoutes';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${getOrderEndpoint}/${orderId}`);
                setOrderDetails(response.data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Thank you for your payment. Your order has been processed successfully.
                    </p>

                    {orderDetails ? (
                        <div className="mt-6 text-left">
                            <h2 className="text-xl font-semibold text-gray-700">Order Details</h2>
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Order ID:</span> {orderId}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Amount:</span> ₹{(orderDetails.amount / 100).toFixed(2)} {orderDetails.currency}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Status:</span> {orderDetails.status}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-6">Loading order details...</p>
                    )}

                    <button
                        onClick={() => window.location.href = '/home'}
                        className="mt-8 bg-yellow-400 text-black py-3 px-6 rounded-md text-lg font-semibold"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>

            <div>
                <img src={payment_success} alt="" className='max-w-[500px]' />
            </div>
        </div>
    );
};

export default OrderSuccess;
