import { useEffect, useState } from 'react';
import { getByUserId } from '../api/OrderApi';
import { getById } from '../api/ProductApi';
import { CircularProgress, Typography, Card, CardContent, Grid, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

/**
 * The `OrderByUser` component displays the orders of the logged-in user, with the option to view product details in a table.
 */
const OrderByUser = () => {
    const [orders, setOrders] = useState([]); // Stores the list of orders
    const [loading, setLoading] = useState(true); // Tracks the loading state
    const [error, setError] = useState(null); // Stores errors if any
    const [showProducts, setShowProducts] = useState({}); // Tracks which orders' products are shown
    const [productDetails, setProductDetails] = useState({}); // Stores product details by ID

    const currentUser = useSelector((state) => state.user.user); // Fetches the current user from Redux

    useEffect(() => {
        // Loads orders when the user logs in or the user changes
        if (currentUser?._id) {
            fetchOrders();
        }
    }, [currentUser]);

    /**
     * Fetches the user's orders.
     * @async
     * @returns {Promise<void>}
     */
    const fetchOrders = async () => {
        try {
            const response = await getByUserId(currentUser._id, currentUser.token);
            setOrders(response.data);
        } catch (err) {
            console.error('Error loading orders:', err);
            setError('Error loading orders!');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetches product details by product ID and stores them in the `productDetails` state.
     * @async
     * @param {string} productId - The ID of the product to fetch details for
     * @returns {Promise<void>}
     */
    const fetchProductDetails = async (productId) => {
        if (!productDetails[productId]) {
            try {
                const response = await getById(productId);
                setProductDetails((prevState) => ({
                    ...prevState,
                    [productId]: response.data,
                }));
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
    };

    /**
     * Toggles the visibility of products for a specific order and fetches product details if needed.
     * @param {string} orderId - The ID of the order whose products are to be shown/hidden
     * @param {Array} products - The list of products in the order
     */
    const handleShowProducts = (orderId, products) => {
        setShowProducts((prevState) => ({
            ...prevState,
            [orderId]: !prevState[orderId],
        }));

        // Fetch product details if they are not already loaded
        if (!showProducts[orderId]) {
            products.forEach((item) => fetchProductDetails(item._id));
        }
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
    }

    return (
        <div style={{ padding: '20px', marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00174F', fontSize: '32px' }}>
                Your Orders
            </Typography>

            {error && <Typography color="error" sx={{ textAlign: 'center', fontSize: '18px' }}>{error}</Typography>}

            <Grid container spacing={3} justifyContent="center">
                {orders.map((order) => (
                    <Grid item xs={12} md={10} key={order._id}>
                        <Card sx={{ padding: 3, boxShadow: 4, borderRadius: '12px', backgroundColor: '#fff', border: '2px solid #00174F' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00174F', fontSize: '20px' }}>ID: {order._id}</Typography>
                                <Divider sx={{ my: 1, backgroundColor: '#00174F' }} />

                                {/* Order Information */}
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Address</Typography>
                                        <Typography sx={{ fontSize: '16px' }}>{order.address}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Order Date</Typography>
                                        <Typography sx={{ fontSize: '16px' }}>{new Date(order.date).toLocaleString()}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Estimated Arrival</Typography>
                                        <Typography sx={{ fontSize: '16px' }}>{new Date(order.dateEnd).toLocaleString()}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Status</Typography>
                                        <Typography sx={{ color: order.isSend ? 'green' : 'red', fontSize: '16px' }}>
                                            {order.isSend ? 'Sent' : 'Not Sent Yet'}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* Button to toggle products display */}
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#fff', color: '#00174F', mt: 3, fontSize: '16px' }}
                                    onClick={() => handleShowProducts(order._id, order.products)}
                                >
                                    {showProducts[order._id] ? 'Hide Products' : 'Show Products'}
                                </Button>

                                {/* Display products in a table */}
                                {showProducts[order._id] && (
                                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontSize: '18px' , borderRight: '1px solid #ccc'}}>Picture</TableCell>
                                                    <TableCell align="center" style={{ fontSize: '18px', borderRight: '1px solid #ccc' }}>Name</TableCell>
                                                    <TableCell align="center" style={{ fontSize: '18px' , borderRight: '1px solid #ccc'}}>ID</TableCell>
                                                    <TableCell align="center" style={{ fontSize: '18px' }}>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.products.map((item, index) => {
                                                    const product = productDetails[item._id];
                                                    const totalPrice = product ? (product.price * (item.count )) : 0;

                                                    return (
                                                        <TableRow key={index}>
                                                            {/* Product Image */}
                                                            <TableCell align="center" style={{ borderRight: '1px solid #ccc' }}>
                                                                {product ? (
                                                                    <img
                                                                        src={`../src/assets/${product?.img}`}
                                                                        alt={product.name}
                                                                        style={{ width: '200px', height: '200px', borderRadius: '8px' }}
                                                                    />
                                                                ) : (
                                                                    <CircularProgress size={20} />
                                                                )}
                                                            </TableCell>

                                                            {/* Product Name */}
                                                            <TableCell align="center" style={{ fontSize: '16px', borderRight: '1px solid #ccc' }}>
                                                                {product ? product.name : <CircularProgress size={10} />}
                                                            </TableCell>

                                                            {/* Product ID */}
                                                            <TableCell align="center" style={{ fontSize: '16px', borderRight: '1px solid #ccc' }}>
                                                                {item._id}
                                                            </TableCell>

                                                            {/* Price */}
                                                            <TableCell align="center" style={{ fontSize: '16px' }}>
                                                                {product ? `${item.count + 1}x${product.price}` : <CircularProgress size={10} />}
                                                                <br />
                                                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                                    ${totalPrice}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
