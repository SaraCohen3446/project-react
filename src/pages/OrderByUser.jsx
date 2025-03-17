import { useEffect, useState } from 'react';
import { getByUserId } from '../api/OrderApi'; // קריאה ל-API שלך
import { CircularProgress, Typography, Stack, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const OrderByUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUser = useSelector((state) => state.user.user); // שליפת פרטי המשתמש מה-state של Redux

    // קריאה ל-API כדי לקבל את כל ההזמנות של המשתמש
    const fetchOrders = async () => {
        try {
            const response = await getByUserId(currentUser._id, currentUser.token); // שימוש ב-ID של המשתמש שנמצא ב-Redux
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error fetching orders!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser?._id) {
            fetchOrders(); // נטען את ההזמנות כשיש למשתמש ID
        }
    }, [currentUser]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Your Orders
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <ul>
                {orders.map((order) => (
                    <li key={order._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                        <Typography variant="h6">Order ID: {order._id}</Typography>
                        <Typography>
                            <strong>Address:</strong> {order.address}
                        </Typography>
                        <Typography>
                            <strong>Order Date:</strong> {new Date(order.date).toLocaleString()}
                        </Typography>
                        <Typography>
                            <strong>End Date:</strong> {new Date(order.dateEnd).toLocaleString()}
                        </Typography>
                        <Typography>
                            <strong>Status:</strong> {order.isSend ? 'Sent' : 'Not Sent'}
                        </Typography>


                        {/* הצגת המוצרים בהזמנה */}
                        <Typography variant="h6">Products:</Typography>
                        <ul>
                            {order.products.map((item, index) => (
                                <li key={index} style={{ marginBottom: '5px' }}>
                                    <Typography>
                                        <strong>Product ID:</strong> {item._id}
                                    </Typography>
                                    <Typography>
                                        <strong>Quantity:</strong> {item.count}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {orders.length === 0 && (
                <Typography variant="h6" color="textSecondary">
                    No orders found.
                </Typography>
            )}
        </div>
    );
};

export default OrderByUser;
