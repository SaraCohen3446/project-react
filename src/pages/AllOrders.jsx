import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../api/OrderApi";
import { Container, Button, Typography, Paper, CircularProgress, Card, CardContent, CardActions, Collapse, Chip, Grid, Box } from "@mui/material";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const currentUser = useSelector((state) => state.user.user);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders(1, 1000, currentUser.token);
            setAllOrders(response.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const updatedOrder = { isSend: newStatus };
            await updateOrder(orderId, updatedOrder, currentUser.token);
            fetchOrders();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleExpandClick = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#00174F" }}>
                All Orders
            </Typography>

            <Grid container spacing={3}>
                {allOrders.map((order) => (
                    <Grid item xs={12} md={6} lg={4} key={order._id}>
                        <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#00174F", fontWeight: "bold" }}>
                                    Order ID: {order._id}
                                </Typography>
                                <Typography variant="body1">User ID: {order.userId}</Typography>
                                <Typography variant="body1">Address: {order.address}</Typography>
                                <Typography variant="body2">Order Date: {new Date(order.date).toLocaleString()}</Typography>
                                <Typography variant="body2">End Date: {new Date(order.dateEnd).toLocaleString()}</Typography>
                                <Chip
                                    label={order.isSend ? "Sent" : "Not Sent"}
                                    color={order.isSend ? "success" : "error"}
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>

                            <CardActions>
                                <Button
                                    variant="contained"
                                    color={order.isSend ? "secondary" : "primary"}
                                    onClick={() => handleStatusUpdate(order._id, !order.isSend)}
                                    sx={{
                                        backgroundColor: order.isSend ? "#D81633" : "#00174F",
                                        "&:hover": { backgroundColor: order.isSend ? "#F44336" : "#003366" },
                                    }}
                                >
                                    {order.isSend ? "Mark as Not Sent" : "Mark as Sent"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ color: "#00174F", borderColor: "#00174F", "&:hover": { backgroundColor: "#00174F", color: "#fff" } }}
                                    onClick={() => handleExpandClick(order._id)}
                                >
                                    {expandedOrder === order._id ? "Hide Products" : "Show Products"}
                                </Button>
                            </CardActions>

                            <Collapse in={expandedOrder === order._id}>
                                <Box sx={{ p: 2, backgroundColor: "#F5F5F5", borderRadius: "0 0 12px 12px" }}>
                                    <Typography variant="h6" sx={{ color: "#00174F", fontWeight: "bold" }}>
                                        Products:
                                    </Typography>
                                    {order.products.map((product, index) => (
                                        <Box key={index} sx={{ p: 1, borderBottom: "1px solid #ddd" }}>
                                            <Typography>Id: {product._id}</Typography>
                                            <Typography>Quantity: {product.count+1}</Typography>
                                            
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllOrders;