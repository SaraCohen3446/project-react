import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OneProduct from "../component/OneProduct";
import { getAllProducts, totalPages } from "../api/ProductApi";
import { Pagination, Stack, TextField, Box } from "@mui/material";
import CustomFilterMenu from "../component/CustomFilterMenu";

const List = () => {
    const [arr, setArr] = useState([]);
    const [filteredArr, setFilteredArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [filters, setFilters] = useState({ category: "All", priceRange: "All", color: "All" });
    const [searchTerm, setSearchTerm] = useState(""); // שדה חיפוש

    // פונקציה להורדת מוצרים
    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(currentPage, 4);
            setArr(response.data);
            setFilteredArr(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching products!");
            setLoading(false);
        }
    };

    // פונקציה לחישוב מספר הדפים
    const fetchTotalPages = async () => {
        try {
            const response = await totalPages(4);
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

    // סינון המוצרים לפי פילטרים וחיפוש
    useEffect(() => {
        let filtered = arr.filter(product => {
            const isCategoryMatch = filters.category === "All" || product.category === filters.category;
            const isColorMatch = filters.color === "All" || product.color === filters.color;
            const isPriceMatch = filters.priceRange === "All" || 
                (product.price >= parseInt(filters.priceRange.split("-")[0]) && product.price <= parseInt(filters.priceRange.split("-")[1]));
            const isSearchMatch = searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());

            return isCategoryMatch && isColorMatch && isPriceMatch && isSearchMatch;
        });
        setFilteredArr(filtered);
    }, [filters, arr, searchTerm]); // הסינון יבוצע גם אם אחד מהם משתנה

    // פונקציה למחיקת מוצר מהמערך
    const deleteProductFromArr = (id) => {
        const updatedArr = arr.filter(product => product._id !== id);
        setArr(updatedArr);
        setFilteredArr(updatedArr);
    };

    return (
        <>
            {/* שורת פילטרים ושדה חיפוש */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <CustomFilterMenu filters={filters} setFilters={setFilters} />
                
                <TextField 
                    label="Search by name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: 250 }}
                />
            </Box>

            {/* הצגת מוצרים */}
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : filteredArr.length === 0 ? (
                <h1>No Products Found</h1>
            ) : (
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
                    {filteredArr.map(item => (
                        <li key={item._id} style={{ margin: '10px', flex: '1 0 auto', maxWidth: '30%' }}>
                            <Link to={`details/${item._id}`} style={{ textDecoration: 'none' }}>
                                <OneProduct item={item} onDelete={deleteProductFromArr} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* ניווט עמודים */}
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

            <Outlet />
        </>
    );
};

export default List;
