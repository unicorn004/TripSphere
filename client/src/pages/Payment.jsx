import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createOrderEndpoint, verifyPaymentEndpoint } from '../API/APIRoutes';
import { useParams } from 'react-router-dom';
import payment from '../../public/assets/payment.jpg';

const Payment = () => {
    const [amount, setAmount] = useState(0);
    const { price } = useParams();

    useEffect(() => {
        setAmount(price);
    }, [price]);

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(createOrderEndpoint, { amount });
            const { amount: orderAmount, currency, id: orderId } = response.data;

            const options = {
                key: "rzp_test_jG8LkhdU5nzzoG",
                amount: orderAmount,
                currency: currency,
                name: "TripSphere",
                description: "Test Transaction",
                image: "../assets/logo.png",
                order_id: orderId,
                handler: async function (response) {
                    try {
                        const verificationResponse = await axios.post(verifyPaymentEndpoint, {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });
                        if (verificationResponse.data.status === 'success') {
                            window.location.href = `/order/success/${response.razorpay_order_id}`;
                        } else {
                            alert('Payment verification failed.');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                    }
                },
                prefill: {
                    name: "Tanmay Sinkar",
                    email: "tanmaysinkar@gmail.com",
                    contact: "9000090000",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert('Payment Failed');
                console.log('Error:', response.error);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 space-y-8 lg:space-y-0 p-4">
            <div className="bg-white shadow-md rounded-l-lg p-10 max-w-lg w-full">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
                    Complete Your Payment
                </h1>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Amount (in ₹)</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    className="w-full py-3 mt-4 bg-yellow-500 text-white font-semibold rounded-lg text-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={handlePayment}
                >
                    Pay ₹{parseFloat(amount).toFixed(2)}
                </button>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    <p>Securely processed by Razorpay</p>
                </div>
            </div>

            <div className="max-w-lg w-full h-[350px]">
                <img
                    src={payment}
                    alt="Payment illustration"
                    className="w-full h-full object-cover rounded-r-lg shadow-md"
                    style={{ height: '100%' }}
                />
            </div>
        </div>
    );
};

export default Payment;
