import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OneProduct from "../component/OneProduct";
import { getAllProducts, totalPages } from "../api/ProductApi";
import CustomFilterMenu from "../component/CustomFilterMenu";
import { CircularProgress, Pagination, Stack, TextField, Box, } from "@mui/material";
import NavBar from "../component/NavBar";
import { Alert } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@mui/material";
import wellaper1 from "../assets/wellaper1.jpg"





const List = () => {
    const [arr, setArr] = useState([]);
    const [filteredArr, setFilteredArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [filters, setFilters] = useState({ category: "All", priceRange: "All", color: "All", ingredient: "All" });
    const [searchTerm, setSearchTerm] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();



    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(currentPage, 28); // קריאה ל-API
            setArr(response.data); // שמירת המוצרים במצב
            setLoading(false); // עצירת טעינה
        } catch (err) {
            setError("Error fetching products!"); // טיפול בשגיאות
            setLoading(false); // עצירת טעינה
        }
    };



    const fetchTotalPages = async () => {
        try {
            const response = await totalPages(28);
            setTotalPage(response.data);
        } catch (err) {
            console.error("Error fetching total pages:", err);
            alert("Error fetching total pages");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    useEffect(() => {
        fetchTotalPages();
    }, []);
    useEffect(() => {
        if (filteredArr.length === 0) {
            setOpenAlert(true); // אם אין מוצרים, פותחים את ההודעה
        }
    }, [filteredArr]);

    useEffect(() => {
        let filtered = arr.filter(product => {
            const isCategoryMatch = filters.category === "All" || product.category === filters.category;
            const isColorMatch = filters.color === "All" || product.color === filters.color;
            const isPriceMatch = filters.priceRange === "All" ||
                (product.price >= parseInt(filters.priceRange.split("-")[0]) && product.price <= parseInt(filters.priceRange.split("-")[1]));
            const isSubcategoryMatch = filters.ingredient === "All" || product.description.toLowerCase().includes(filters.ingredient.toLowerCase());
            const isSearchMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());

            return isCategoryMatch && isColorMatch && isPriceMatch && isSubcategoryMatch && isSearchMatch;
        });

        if (filtered.length === 0) {
            setOpenAlert(true); // הצגת ההודעה אם אין מוצרים תואמים
        } else {
            setOpenAlert(false); // אם יש תוצאות, נסגור את ההודעה
            setFilteredArr(filtered); // עדכון המערך עם התוצאות המותאמות
        }
    }, [filters, arr, searchTerm]); // הסינון יבוצע גם אם אחד מהם משתנה


    const deleteProductFromArr = (id) => {
        const updatedArr = arr.filter(product => product._id !== id);
        setArr(updatedArr);
        setFilteredArr(updatedArr);
    };

    return (
        <>
            <img src={wellaper1} alt="" style={{ width: "1440px", height: "800px", marginTop: 150 }} />
            <NavBar setFilters={setFilters} />
            <Box display="flex" alignItems="center" sx={{ mb: 2, width: "100%", justifyContent: "flex-start" }}>
                <CustomFilterMenu filters={filters} setFilters={setFilters} products={arr} />
            </Box>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <h1>{error}</h1>
            ) : (
                <>
                    {openAlert && (
                        <Dialog open={openAlert} onClose={() => setOpenAlert(false)} fullWidth maxWidth="sm">
                            <DialogTitle sx={{ textAlign: "center" }}>
                                No Products Found
                            </DialogTitle>
                            <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
                                We're sorry, no products match your search.
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        setOpenAlert(false);
                                    }}
                                    color="primary"
                                    autoFocus
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}

                    {/* אם יש תוצאות, מציגים את המוצרים */}
                    {filteredArr.length > 0 && (
                        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '38px', listStyleType: 'none', padding: 0 }}>
                            {filteredArr.map(item => (
                                <li key={item._id} style={{ flex: '1 1 250px', maxWidth: '300px' }}>
                                    <OneProduct item={item} onDelete={deleteProductFromArr} />
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPage }
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    size="large"
                    shape="rounded"
                    siblingCount={0}
                    boundaryCount={0}
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
        </>
    );

};

export default List;
