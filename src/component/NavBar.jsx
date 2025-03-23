import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { AppBar, Toolbar, Button, Box, IconButton, Badge, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import logo from '../assets/logo.png';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home'; 


const NavBar = ({ setFilters }) => {
    const dispatch = useDispatch();
    const user = useSelector(st => st.user.user);
    const navigate = useNavigate();
    const cartCount = useSelector(st => st.cart.count);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const location = useLocation();

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleCategoryChange = (category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: category
        }));
        setSelectedFilter(category);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#00174F', width: '100%', height: '110px' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 80 }}>
                {/* navbar -לוגו ב */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '70px', mb: 1 }}>
                    <img src={logo} alt="Logo" style={{ height: '100px', width: '450px' }} />
                </Box>


                {location.pathname === "/" &&
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: 70, left: 7, gap: 1 }}>
                        {['All', 'Women', 'Men', 'Infant', 'Children'].map(category => (
                            <Button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                color="inherit"
                                sx={{
                                    backgroundColor: selectedFilter === category ? 'white' : '#00174F', color: selectedFilter === category ? '#00174F' : 'white', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.75rem',
                                    '&:hover': { backgroundColor: 'white', color: '#00174F', transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out', },
                                    '&:active': { transform: 'scale(0.95)' }
                                }}>
                                {category}
                            </Button>

                        ))}
                    </Box>}

                {/* כפתור בית */}
                {location.pathname != "/" &&
                    <IconButton component={Link} to="/" sx={{ position: 'absolute', left: 10, top: 57, p: 1 }}>
                        <HomeIcon sx={{ fontSize: 30, color: 'white' }} />
                    </IconButton>}


                {/* אייקון סל קניות עם כמות מוצרים */}
                <Box sx={{ position: 'absolute', right: 10, top: 55, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleCartClick}
                        disableRipple
                        sx={{
                            color: 'white', backgroundColor: 'transparent', borderRadius: '4px', padding: 1, outline: 'none',
                            '&:focus': { outline: 'none' }, '&:active': { backgroundColor: 'transparent' }, '&:hover': { backgroundColor: 'transparent' }
                        }}>
                        <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { backgroundColor: 'white', color: '#D81633', fontSize: '0.9rem', fontWeight: 'bold' } }}>
                            <LocalMallIcon sx={{ fontSize: '2rem' }} />
                        </Badge>
                    </IconButton>
                </Box>


                {/* אייקון פרופיל בצד ימין */}
                <Box sx={{ position: 'absolute', right: 60, top: 67 }}>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: 'white', color: '#00174F', width: 30, height: 30, '&:hover': { bgcolor: 'white', } }} >
                            {user ? (
                                "U"
                            ) : (
                                <Avatar sx={{ bgcolor: 'white', width: 30, height: 30, color: '#00174F' }} />
                            )}
                        </Avatar>

                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{ p: 1, minWidth: 180 }} // יותר צר
                    >
                        {user ? (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                    <Avatar sx={{ width: 70, height: 70 }}>
                                    </Avatar>
                                    <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: '1rem' }}>Hello, {user.userName}!</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
                                    {user?.role === "MANAGER" && (
                                        <Button onClick={() => navigate("/FormProduct")}
                                            sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', '&:hover': { backgroundColor: 'white' } }}>
                                            Add product
                                        </Button>
                                    )}
                                    {user?.role === "MANAGER" && (
                                        <Button onClick={() => navigate("/AllOrders")}
                                            sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', '&:hover': { backgroundColor: 'white' } }} >
                                            All orders
                                        </Button>

                                    )}
                                    <Button onClick={() => navigate("/OrderByUser")}
                                        sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', '&:hover': { backgroundColor: 'white' } }}>
                                        Your orders
                                    </Button>
                                    <Button onClick={() => dispatch(logOut())}
                                        sx={{ color: '#D81633', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', '&:hover': { backgroundColor: 'white' } }}>
                                        LogOut <ExitToAppIcon fontSize="small" />
                                    </Button>



                                </Box>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, minWidth: 160 }}>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                    sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', width: '100%', textAlign: 'center', '&:hover': { color: '#00174F', } }}>
                                    Login
                                </Button>

                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/signUp"
                                    sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '0.9rem', width: '100%', textAlign: 'center', mt: 1, '&:hover': { color: '#00174F', } }}>
                                    Sign Up
                                </Button>
                            </Box>
                        )}
                    </Menu>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
