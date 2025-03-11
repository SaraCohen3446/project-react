import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { AppBar, Toolbar, Button, Box, IconButton, Badge, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import logo from '../assets/logo.png';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { updateProfileImage } from '../features/userSlice';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';




const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(st => st.user.user);
    const navigate = useNavigate();
    const cartCount = useSelector(st => st.cart.count);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleCartClick = () => {
        navigate("/cart");
    };

    //פונקציה לשמירת התמונה שהמשתמש העלה לפרופיל
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(updateProfileImage(reader.result)); // עדכון Redux
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#00174F', width: '100%' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 80 }}>
                {/* לוגו באמצע */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100px', mb: 1, backgroundColor: '#00174F' }}>
                    <img src={logo} alt="Logo" style={{ height: '100px', width: '600px' }} />
                </Box>

                {/* תפריט ניווט לבית */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: 60, left: 2, gap: 2 }}>
                    <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: 'white' } }}>
                        {/* <HomeIcon sx={{ color: 'white', fontSize: '2rem' }} /> */}
                        HOME
                    </Button>
                </Box>

                {/* אייקון סל קניות עם כמות מוצרים */}
                <Box sx={{ position: 'absolute', right: 20, top: 35, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

                {/* אייקון פרופיל בצד ימן */}
                <Box sx={{ position: 'absolute', right: 75, top: 40 }}>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: '#D81633', width: 40, height: 40 }}>
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : user ? (
                                "U"
                            ) : (
                                "?"
                            )}
                        </Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ p: 2, minWidth: 300 }}>
                        {user ? (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar sx={{ width: 80, height: 80 }}>
                                            {user.profileImage ? (
                                                <img src={user.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                            ) : (
                                                user.name?.charAt(0).toUpperCase()
                                            )}
                                        </Avatar>
                                        <IconButton component="label" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'white', borderRadius: '50%' }}>
                                            <EditIcon sx={{ fontSize: 16, color: '#00174F' }} />
                                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                                        </IconButton>
                                    </Box>
                                    <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>Hello, {user.userName}!</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
                                    {user?.role === "MANAGER" && (
                                        <Button onClick={() => navigate("/FormProduct")} sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '1rem', p: 1 }}>
                                            Add product <AddIcon />
                                        </Button>
                                    )}
                                    <Button onClick={() => dispatch(logOut())} sx={{ color: '#D81633', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '1rem', p: 1 }}>
                                        LogOut <ExitToAppIcon />
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>
                                {/* <Typography sx={{ fontSize: '1rem', color: 'white' }}>You should LogIn / SignIn </Typography> */}
                                <Button color="inherit" component={Link} to="/login" sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '1rem', p: 1, '&:hover': { backgroundColor: '#00174F', color: 'white' } }}>Login</Button>
                                <Button color="inherit" component={Link} to="/signin" sx={{ color: '#00174F', backgroundColor: 'white', borderRadius: '20px', textTransform: 'none', fontSize: '1rem', p: 1, '&:hover': { backgroundColor: '#00174F', color: 'white' } }} > Sign Up</Button>
                            </Box>
                        )}
                    </Menu>
                </Box>


                {/* {!user && (
                        <Box sx={{ position: 'absolute', top: 60, left: 70, display: 'flex', gap: 1 }}>
                            <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { color: 'white' } }}>Login</Button>
                            <Button color="inherit" component={Link} to="/signin" sx={{ '&:hover': { color: 'white' } }}>Sign Up</Button>
                            {user?.role === "MANAGER" && (
                                <Button color="inherit" component={Link} to="/FormProduct" sx={{ '&:hover': { color: 'white' } }}>
                                    Add product
                                </Button>
                            )}
                            {user && (
                                <Button color="inherit" onClick={() => dispatch(logOut())} sx={{ '&:hover': { color: 'white' } }}>
                                    Log Out
                                </Button>
                            )}
                        </Box>
                    )} */}
            </Toolbar >
        </AppBar >
    );
}

export default NavBar;