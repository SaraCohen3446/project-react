import { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from "../api/OrderApi";
import { CircularProgress, Typography, Pagination, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]); // כל ההזמנות
    const [orders, setOrders] = useState([]); // ההזמנות לעמוד הנוכחי
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // כמות הזמנות לעמוד
    const totalPage = Math.ceil(allOrders.length / ordersPerPage); // חישוב דפים
    const currentUser = useSelector((st) => st.user.user);

    // קריאה לכל ההזמנות ושמירתן במשתנה אחד
    const fetchOrders = async () => {
        try {
            console.log("Fetching all orders...");
            const response = await getAllOrders(1, 1000, currentUser.token); // מביא את כל ההזמנות
            console.log("Orders received:", response.data);
            setAllOrders(response.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Error fetching orders!");
        } finally {
            setLoading(false);
        }
    };

    // עדכון ההזמנות לפי עמוד נוכחי
    useEffect(() => {
        const startIndex = (currentPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        setOrders(allOrders.slice(startIndex, endIndex));
    }, [currentPage, allOrders]);

    // טעינת כל ההזמנות בפעם הראשונה
    useEffect(() => {
        fetchOrders();
    }, []);

    // עדכון סטטוס ההזמנה
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            console.log(`Updating order ${orderId} to ${newStatus ? "Sent" : "Not Sent"}`);
            const updatedOrder = { isSend: newStatus };
            await updateOrder(orderId, updatedOrder, currentUser.token);
            fetchOrders(); // רענון הנתונים
        } catch (err) {
            console.error("Error updating status:", err);
            setError("Error updating status!");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                All Orders
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <ul>
                {orders.map((order) => (
                    <li key={order._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        <Typography variant="h6">Order ID: {order._id}</Typography>
                        <Typography><strong>UserId:</strong> {order.userId}</Typography>
                        <Typography><strong>Address:</strong> {order.address}</Typography>
                        <Typography><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</Typography>
                        <Typography><strong>End Date:</strong> {new Date(order.dateEnd).toLocaleString()}</Typography>
                        <Typography><strong>Status:</strong> {order.isSend ? 'Sent' : 'Not Sent'}</Typography>


                        {/* הצגת המוצרים בהזמנה */}
                        <Typography variant="h6">Products:</Typography>
                        <ul>
                            {order.products.map((item, index) => (
                                <li key={index} style={{ marginBottom: "5px" }}>
                                    <Typography><strong>Product ID:</strong> {item._id}</Typography>
                                    <Typography><strong>Quantity:</strong> {item.count + 1}</Typography>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="contained"
                            color={order.isSend ? "secondary" : "primary"}
                            onClick={() => handleStatusUpdate(order._id, !order.isSend)}
                        >
                            {order.isSend ? 'Mark as Not Sent' : 'Mark as Sent'}
                        </Button>
                    </li>
                ))}
            </ul>


            <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPage || 1}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    size="large"
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                        '.MuiPaginationItem-root': {
                            backgroundColor: '#00174F',
                            color: '#fff',
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: '#D81633',
                            },
                        },
                        '.Mui-selected': {
                            backgroundColor: '#D81633',
                            color: '#fff',
                        },
                        '.MuiPaginationItem-ellipsis': {
                            color: '#00174F',
                        },
                    }}
                />
            </Stack>
        </div>
    );
};

export default AllOrders;
