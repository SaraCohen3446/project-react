import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OneProduct from "../component/OneProduct";
import { getAllProducts, totalPages } from "../api/ProductApi";
import { Pagination, Stack } from "@mui/material";


// import CustomFilterMenu from "../component/CustomFilterMenu";



const List = () => {
    const [arr, setArr] = useState([]); // ניהול המוצרים במצב מקומי
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // מצב לטעינת נתונים
    const [error, setError] = useState(null); // טיפול בשגיאות
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)


    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(currentPage, 4); // קריאה ל-API
            setArr(response.data); // שמירת המוצרים במצב
            setLoading(false); // עצירת טעינה
        } catch (err) {
            setError("Error fetching products!"); // טיפול בשגיאות
            setLoading(false); // עצירת טעינה
        }
    };

    const fetchTotalPages = async () => {
        try {
            const response = await totalPages(4);
            setTotalPage(response.data)
        }
        catch (err) {
            console.log(err);
            alert("error fetching total pages")
        }
    }

    const deleteProductFromArr = (id) => {
        let copy = arr.filter(p => p._id !== id)
        setArr(copy)
    }

    /**
     * בכל פעם שהעמוד הנוכחי משתנה
     */
    useEffect(() => {
        fetchProducts(); // קריאה ל-API כשמועלה הקומפוננטה
    }, [currentPage]);

    /**
     * רק בעת טעינת הדף
     */
    useEffect(() => {
        fetchTotalPages();
    }, []);

    const handleCartClick = () => {
        navigate("/cart");
    };


    return (
        <>

        {/* <CustomFilterMenu /> */}


            {loading ? ( // הצגת הודעה אם בטעינה
                <h1>Loading...</h1>
            ) : error ? ( // הצגת הודעת שגיאה אם יש
                <h1>{error}</h1>
            ) : arr.length === 0 ? ( // הצגת הודעה אם אין מוצרים
                <h1>No Product Found</h1>
            ) : (
               
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
                    {arr.map(item => (
                        <li key={item._id} style={{ margin: '10px', flex: '1 0 auto', maxWidth: '30%' }}>
                            <Link to={`details/${item._id}`} style={{ textDecoration: 'none' }}>
                                <OneProduct item={item} onDelete={deleteProductFromArr} style={{ width: '100%', height: 'auto' }} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
           <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                <Pagination          
                    count={totalPage}
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
                            backgroundColor: '#D81633', // צבע הבחירה
                            color: '#fff',
                        },
                        '.MuiPaginationItem-ellipsis': {
                            color: '#00174F',
                        },
                    }}
                />
            </Stack>
            <Outlet />
        </>
    );
};

export default List;