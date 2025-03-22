import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../api/OrderApi";
import { Container, Button, Typography, CircularProgress, Card, CardContent, CardActions, Table, TableBody, TableRow, TableCell, Chip, Grid, Box, Collapse } from "@mui/material";

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
        <Container sx={{ mt: 17}}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#00174F" }}>
                All Orders
            </Typography>

            <Grid container spacing={3}>
                {allOrders.map((order) => (
                    <Grid item xs={12} key={order._id}>
                        <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", boxShadow: 6, padding: 2 }}>
                            <CardContent>
                                <Table sx={{ width: "100%" }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Order ID:</TableCell>
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>User ID:</TableCell>
                                            <TableCell>{order.userId}</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                                            <TableCell>{order.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Order Date:</TableCell>
                                            <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>End Date:</TableCell>
                                            <TableCell>{new Date(order.dateEnd).toLocaleString()}</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Status:</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.isSend ? "Sent" : "Not Sent"}
                                                    color={order.isSend ? "success" : "error"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>

                            <CardActions sx={{ justifyContent: "space-between", padding: "16px 24px" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#00174F",
                                        "&:hover": { backgroundColor: "#003366" },
                                        padding: "6px 16px"
                                    }}
                                    onClick={() => handleStatusUpdate(order._id, !order.isSend)}
                                >
                                    {order.isSend ? "Mark as Not Sent" : "Mark as Sent"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: "#00174F",
                                        borderColor: "#00174F",
                                        "&:hover": { backgroundColor: "#00174F", color: "#fff" },
                                        padding: "6px 16px"
                                    }}
                                    onClick={() => handleExpandClick(order._id)}
                                >
                                    {expandedOrder === order._id ? "Hide Products" : "Show Products"}
                                </Button>
                            </CardActions>

                            <Collapse in={expandedOrder === order._id}>
                                <Box sx={{ p: 2, backgroundColor: "#F5F5F5", borderRadius: "0 0 16px 16px" }}>
                                    <Typography variant="h6" sx={{ color: "#00174F", fontWeight: "bold" }}>
                                        Products:
                                    </Typography>
                                    <Table sx={{ width: "100%", backgroundColor: "#fff" }}>
                                        <TableBody>
                                            {order.products.map((product, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ fontWeight: "bold" }}>ID :  {product._id}</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }}>Quantity :  {product.count }</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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
