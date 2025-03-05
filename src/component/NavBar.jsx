import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';

const NavBar = () => {
    const dis = useDispatch();
    const user = useSelector(st => st.user.user);
    const currentUser = user;

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#0d47a1' }}>
            <Toolbar>
                <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        My App
                    </Typography>
                    <div>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signin">Sign Up</Button>
                        {currentUser?.role === "MANAGER" && (
                            <Button color="inherit" component={Link} to="/FormProduct">Add product</Button>
                        )}
                        {user && (
                            <Button color="inherit" onClick={() => dis(logOut())}>Log Out</Button>
                        )}
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
