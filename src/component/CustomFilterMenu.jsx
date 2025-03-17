import React, { useState } from "react";
import { Popover, IconButton, Box, Typography, MenuItem, Select, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomFilterMenu = ({ setFilters }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [localFilters, setLocalFilters] = useState({
        category: "All",
        priceRange: "All",
        color: "All",
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
        setFilters(localFilters);
        handleClose();
    };

    const resetFilters = () => {
        const defaultFilters = {
            category: "All",
            priceRange: "All",
            color: "All",
        };
        setLocalFilters(defaultFilters);
        setFilters(defaultFilters);
    };

    return (
        <div style={{ position: "absolute", left: 20, top: "150px" }}> {/* הצמד את כל הקומפוננטה לשמאל ולמעלה */}
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

                    <Typography variant="body2" mt={2}>Category</Typography>
                    <Select fullWidth value={localFilters.category} onChange={handleSelectChange('category')}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Women">Women</MenuItem>
                        <MenuItem value="Men">Men</MenuItem>
                        <MenuItem value="Children">Children</MenuItem>
                        <MenuItem value="Infants">Infants</MenuItem>
                    </Select>

                    <Typography variant="body2" mt={2}>Price Range</Typography>
                    <Select fullWidth value={localFilters.priceRange} onChange={handleSelectChange('priceRange')}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="100-200">$100 - $200</MenuItem>
                        <MenuItem value="200-300">$200 - $300</MenuItem>
                        <MenuItem value="300-400">$300 - $400</MenuItem>
                        <MenuItem value="400-500">$400 - $500</MenuItem>
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
