import { useEffect, useState } from 'react';
import { getByUserId } from '../api/OrderApi';
import { CircularProgress, Typography, Card, CardContent, Grid, Divider, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const OrderByUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProducts, setShowProducts] = useState({});

    const currentUser = useSelector((state) => state.user.user);

    const fetchOrders = async () => {
        try {
            const response = await getByUserId(currentUser._id, currentUser.token);
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
            fetchOrders();
        }
    }, [currentUser]);

    const handleShowProducts = (orderId) => {
        setShowProducts((prevState) => ({
            ...prevState,
            [orderId]: !prevState[orderId], // Toggle the visibility of products for the specific order
        }));
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
    }

    return (
        <div style={{ padding: '20px', marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00174F' }}>
                Your Orders
            </Typography>

            {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}

            <Grid container spacing={3} justifyContent="center">
                {orders.map((order) => (
                    <Grid item xs={12} md={10} key={order._id}>  {/* Increase the width of the cards here */}
                        <Card sx={{ padding: 3, boxShadow: 4, borderRadius: '12px', backgroundColor: '#fff', border: '2px solid #00174F' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00174F' }}>ID: {order._id}</Typography>
                                <Divider sx={{ my: 1, backgroundColor: '#00174F' }} />

                                {/* Order Info - Displaying titles side by side */}
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Address</Typography>
                                        <Typography>{order.address}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Order Date</Typography>
                                        <Typography>{new Date(order.date).toLocaleString()}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Estimated arrival date</Typography>
                                        <Typography>{new Date(order.dateEnd).toLocaleString()}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
                                        <Typography sx={{ color: order.isSend ? 'green' : 'red' }}>
                                            {order.isSend ? 'Sent' : 'Not sent yet'}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* Show Products Button */}
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#fff', color: '#00174F', mt: 3 }} // Change button color to white with blue text
                                    onClick={() => handleShowProducts(order._id)}
                                >
                                    {showProducts[order._id] ? 'Hide Products' : 'Show Products'}
                                </Button>


                                {/* Show Products */}
                                {showProducts[order._id] && (
                                    <Stack spacing={1} sx={{ mt: 2 }}>
                                        {order.products.map((item, index) => (
                                            <Card key={index} sx={{ padding: 2, boxShadow: 2, borderRadius: '8px', backgroundColor: '#F5F5F5', border: '1px solid #ddd' }}>
                                                <CardContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: 'bold' }}>ID</Typography>
                                                            <Typography>{item._id}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
                                                            <Typography>{item.count+1}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {orders.length === 0 && (
                <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 3 }}>
                    No orders found.
                </Typography>
            )}
        </div>
    );
};

export default OrderByUser;
