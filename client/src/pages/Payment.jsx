import React, { useState } from 'react';
import axios from 'axios';
import { createOrderEndpoint, verifyPaymentEndpoint } from '../API/APIRoutes'; 

const Payment = () => {
    const [amount, setAmount] = useState(0); // State for amount

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Create a payment order with the specified amount
            const response = await axios.post(createOrderEndpoint, { amount });
            const { amount: orderAmount, currency, id: orderId } = response.data;

            // Step 2: Set up Razorpay options
            const options = {
                key: "rzp_test_jG8LkhdU5nzzoG", // Your Razorpay Key ID
                amount: orderAmount, // Amount in currency subunits
                currency: currency,
                name: "TripSphere",
                description: "Test Transaction",
                image: "../assets/logo.png",
                order_id: orderId,
                handler: async function (response) {
                    // Step 3: Verify the payment after successful transaction
                    try {
                        const verificationResponse = await axios.post(verifyPaymentEndpoint, {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        });
                        
                        // Redirect or show success message based on verification result
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

            // Step 4: Open Razorpay payment modal
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert('Payment Failed');
                alert('Error Code: ' + response.error.code);
                alert('Description: ' + response.error.description);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Complete Your Payment</h1>
            <input 
                type="number" 
                placeholder="Enter amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="mt-4 p-2 border rounded" 
            />
            <button className="paybtn mt-4 px-4 py-2 bg-yellow-400 rounded-md text-xl font-semibold" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
