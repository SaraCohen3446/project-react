import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { AppBar, Toolbar, Button, Box, IconButton, Badge, Typography, Menu, MenuItem, Avatar, Divider, TextField, InputAdornment } from '@mui/material';
import logo from '../assets/logo.png';
import homePicture from '../assets/homePicture.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { updateProfileImage } from '../features/userSlice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(st => st.user.user);
    const navigate = useNavigate();
    const cartCount = useSelector(st => st.cart.count);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleCartClick = () => {
        navigate("/cart");
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setShowSearch(prev => !prev);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSearch(false), 200);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(updateProfileImage(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#00174F', width: '100%', height: '110px' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 80 }}>
                {/* לוגו באמצע */}
                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '70px', mb: 1, backgroundColor: '#00174F' }}>
                        <img src={logo} alt="Logo" style={{ height: '100px', width: '450px' }} />
                    </Box>
                </div>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: 57, left: 0, gap: 1 }}>
                    {/* כפתור בית */}
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            backgroundColor: '#00174F',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#00174F' },
                        }}
                    >
                        HOME
                        {/* <img src={homePicture} alt="homePicture" style={{ height: '30px', width: '30px' }} /> */}

                    </Button>

                    {/*Login*/}
                    {/* <Button
                        color="inherit"
                        component={Link}
                        to="/login"
                        sx={{
                            backgroundColor: '#00174F',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#00174F' },
                        }}
                    >
                        Login

                    </Button> */}
                    {/* SignUp */}
                    {/* <Button
                        color="inherit"
                        component={Link}
                        to="/signUp"
                        sx={{
                            backgroundColor: '#00174F',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#00174F' },
                        }}
                    >
                        SignUp

                    </Button> */}
                </Box>

                

                {/* אייקון סל קניות עם כמות מוצרים */}
                <Box sx={{ position: 'absolute', right: 10, top: 55, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleCartClick}
                        disableRipple
                        sx={{
                            color: 'white',
                            backgroundColor: 'transparent',
                            borderRadius: '4px',
                            padding: 1,
                            outline: 'none',
                            '&:focus': { outline: 'none' },
                            '&:active': { backgroundColor: 'transparent' },
                            '&:hover': { backgroundColor: 'transparent' }
                        }}
                    >
                        <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { backgroundColor: 'white', color: '#D81633', fontSize: '0.9rem', fontWeight: 'bold' } }}>
                            <LocalMallIcon sx={{ fontSize: '2rem' }} />
                        </Badge>
                    </IconButton>
                </Box>


                {/* אייקון פרופיל בצד ימין */}
                <Box sx={{ position: 'absolute', right: 60, top: 60 }}>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar
                            sx={{
                                bgcolor: 'white', // הרקע לבן
                                color: '#00174F', // הצבע של האותיות יהיה כחול
                                width: 40,
                                height: 40,
                                '&:hover': {
                                    bgcolor: 'white', // גם בהובר הרקע לבן
                                }
                            }}
                        >
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : user ? (
                                "U" // אם אין תמונה, ה- U יהיה בצבע כחול
                            ) : (
                                <Avatar sx={{ bgcolor: '#00174F', width: 40, height: 40 }} /> // ציור אווטר כחול
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
                                        {user.profileImage ? (
                                            <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                        ) : (
                                            user.name?.charAt(0).toUpperCase()
                                        )}
                                    </Avatar>
                                    <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: '1rem' }}>Hello, {user.userName}!</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
                                    {user?.role === "MANAGER" && (
                                        <Button
                                            onClick={() => navigate("/FormProduct")}
                                            sx={{
                                                color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                                fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', // כפתורים צרים יותר
                                                '&:hover': { backgroundColor: 'white' } // בלי שינוי בהובר
                                            }}
                                        >
                                            Add product <AddIcon fontSize="small" />
                                        </Button>
                                    )}
                                    {user?.role === "MANAGER" && (
                                        <Button
                                            onClick={() => navigate("/AllOrders")}
                                            sx={{
                                                color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                                fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', // כפתורים צרים יותר
                                                '&:hover': { backgroundColor: 'white' } // בלי שינוי בהובר
                                            }}
                                        >
                                            All orders
                                        </Button>

                                    )}
                                    <Button
                                        onClick={() => navigate("/OrderByUser")}
                                        sx={{
                                            color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                            fontSize: '0.9rem', p: '5px 10px', minWidth: '100%', // כפתורים צרים יותר
                                            '&:hover': { backgroundColor: 'white' } // בלי שינוי בהובר
                                        }}
                                    >
                                        Your orders
                                    </Button>
                                    <Button
                                        onClick={() => dispatch(logOut())}
                                        sx={{
                                            color: '#D81633', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                            fontSize: '0.9rem', p: '5px 10px', minWidth: '100%',
                                            '&:hover': { backgroundColor: 'white' }
                                        }}
                                    >
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
                                    sx={{
                                        color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                        fontSize: '0.9rem', width: '100%', textAlign: 'center',
                                        '&:hover': { backgroundColor: 'white' }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/signUp"
                                    sx={{
                                        color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none',
                                        fontSize: '0.9rem', width: '100%', textAlign: 'center', mt: 1,
                                        '&:hover': { backgroundColor: 'white' }
                                    }}
                                >
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
