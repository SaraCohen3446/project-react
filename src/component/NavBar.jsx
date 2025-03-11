import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { AppBar, Toolbar, Button, Box, IconButton, Badge } from '@mui/material';
import logo from '../assets/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(st => st.user.user);
    const navigate = useNavigate();
    const cartItems = useSelector(st => st.cart.items) || []; // ודא שהערך לא יהיה undefined


    const handleCartClick = () => {
        navigate("/cart");
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#00174F', width: '100%' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 80 }}>

                {/* לוגו באמצע */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100px', mb: 1, backgroundColor: '#00174F' }}>
                    <img src={logo} alt="Logo" style={{ height: '100px', width: '600px' }} />
                </Box>

                {/* תפריט ניווט בצד שמאל */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: 60, left: 10, gap: 2 }}>
                    <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: 'white' } }}>Home</Button>
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
                    {!user && (
                        <Button color="inherit" component={Link} to="/login" sx={{ '&:hover': { color: 'white' } }}>
                            Login
                        </Button>
                    )}
                    {!user && (
                        <Button color="inherit" component={Link} to="/signin" sx={{ '&:hover': { color: 'white' } }}>
                            Sign Up
                        </Button>
                    )}
                </Box>

                {/* אייקון סל קניות עם כמות מוצרים */}
                <Box sx={{ position: 'absolute', right: 20, top: 45 }}>
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
                        <Badge badgeContent={cartItems.length} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: 'white', color: '#D81633', fontSize: '0.9rem', fontWeight: 'bold' } }}>
                            <ShoppingCartIcon sx={{ fontSize: '2rem' }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
