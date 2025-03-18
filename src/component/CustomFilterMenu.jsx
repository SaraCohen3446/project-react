
import React, { useState } from "react";
import { Popover, IconButton, Box, Typography, MenuItem, Select, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomFilterMenu = ({ setFilters, filters, products, setFilteredArr }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        category: "All",
        priceRange: "All",
        ingredient: "All", // Subcategory
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectChange = (key) => (event) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [key]: event.target.value,
        }));
    };
    const applyFilters = () => {
        let { ingredient } = localFilters;
        let filteredProducts = products;

        if (ingredient !== "All") {
            // סינון לפי Subcategory בתיאור המוצר
            filteredProducts = products.filter((product) =>
                product.description.toLowerCase().includes(ingredient.toLowerCase())
            );
        }

       

        const filters = { ...localFilters, ingredient: ingredient !== "All" ? ingredient : "All" };
        setFilters(filters);
        setFilteredArr(filteredProducts); // עדכון רשימת המוצרים המסוננים
        handleClose();
    };



    const resetFilters = () => {
        const defaultFilters = {
            category: "All",
            priceRange: "All",
            ingredient: "All",
        };
        setLocalFilters(defaultFilters);
        setFilters(defaultFilters);
    };

    return (
        <div style={{ position: "absolute", left: 20, top: 950 }}>
            <IconButton onClick={handleClick}>
                <FilterAltIcon />
            </IconButton>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Box sx={{ p: 2, width: 250 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Filter</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="body2" mt={2}>Price Range</Typography>
                    <Select fullWidth value={localFilters.priceRange} onChange={handleSelectChange('priceRange')}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="100-200">\$100 - \$200</MenuItem>
                        <MenuItem value="200-300">\$200 - \$300</MenuItem>
                        <MenuItem value="300-400">\$300 - \$400</MenuItem>
                        <MenuItem value="400-500">\$400 - \$500</MenuItem>
                    </Select>

                    <Typography variant="body2" mt={2}>Subcategory</Typography>
                    <Select fullWidth value={localFilters.ingredient} onChange={handleSelectChange('ingredient')}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pants">Pants</MenuItem>
                        <MenuItem value="Shirts">Shirts</MenuItem>
                        <MenuItem value="Shoes">Shoes</MenuItem>
                        <MenuItem value="Skirts">Skirts</MenuItem>
                        <MenuItem value="Dresses">Dresses</MenuItem>
                    </Select>


                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={resetFilters} color="secondary">Reset</Button>
                        <Button variant="contained" color="primary" onClick={applyFilters}>Apply</Button>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};

export default CustomFilterMenu;
