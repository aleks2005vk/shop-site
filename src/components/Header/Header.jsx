import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { toggleForm, logout } from '../../Features/user/UserSlice';
import UserForm from '../User/userform';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadsetIcon from '@mui/icons-material/Headset';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import WatchIcon from '@mui/icons-material/Watch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useGetProductsQuery } from '../../Features/api/ApiSlice';
import { ROUTES } from '../../utils/routes';

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, showForm } = useSelector(state => state.user);
    const items = useSelector(state => state.categories.items);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(toggleForm(false));
        navigate('/');
    };

    const toggleDrawer = () => setDrawerOpen(s => !s);

    const handleProfileClick = () => {
        if (!currentUser?.name) dispatch(toggleForm(true));
    };

    const handleCloseModal = () => dispatch(toggleForm(false));

    const categoryIcons = [
        <PhoneIphoneIcon />,
        <LaptopMacIcon />,
        <HeadsetIcon />,
        <CameraAltIcon />,
        <WatchIcon />,
        <LocalOfferIcon />,
    ];

    const rawName = currentUser?.name;
    const displayName =
        typeof rawName === 'string'
            ? rawName
            : rawName && typeof rawName === 'object'
              ? `${rawName.firstname ?? ''} ${rawName.lastname ?? ''}`.trim()
              : '';

    // грузим все продукты 1 раз
    const { data: allProducts = [], isLoading, error } = useGetProductsQuery();

    // фильтруем по подстроке
    const filteredProducts = useMemo(() => {
        if (!searchValue) return [];
        return allProducts.filter(p =>
            p.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [allProducts, searchValue]);

    const handleSearchChange = e => setSearchValue(e.target.value);

    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: '#1976d2', px: 2 }}>
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {/* Left: Burger + Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            color="inherit"
                            onClick={toggleDrawer}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                fontWeight: 700,
                                fontSize: 20,
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/')}
                        >
                            SHOP
                        </Box>
                    </Box>

                    {/* Center: Search */}
                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: 500,
                            mx: 3,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                            position: 'relative',
                        }}
                    >
                        <InputBase
                            placeholder="Search products..."
                            sx={{ ml: 1, flex: 1, color: '#fff' }}
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        <IconButton type="submit" sx={{ p: 1, color: '#fff' }}>
                            <SearchIcon />
                        </IconButton>

                        {searchValue && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    bgcolor: '#fff',
                                    boxShadow: 3,
                                    zIndex: 10,
                                    borderRadius: 1,
                                    mt: 1,
                                    maxHeight: 300,
                                    overflowY: 'auto',
                                }}
                            >
                                {isLoading && (
                                    <div style={{ padding: 10 }}>
                                        Loading...
                                    </div>
                                )}
                                {error && (
                                    <div style={{ padding: 10 }}>
                                        Error: {error.message}
                                    </div>
                                )}
                                {filteredProducts.length === 0 && (
                                    <div style={{ padding: 10, color: '#999' }}>
                                        No results found
                                    </div>
                                )}
                                {filteredProducts.map(
                                    ({ title, image, id }) => (
                                        <Link
                                            to={`/products/${id}`}
                                            key={id}
                                            onClick={() => setSearchValue('')}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                textDecoration: 'none',
                                                color: '#000',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    marginRight: 10,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition:
                                                        'center',
                                                    borderRadius: 4,
                                                    backgroundImage: `url(${image})`,
                                                }}
                                            />
                                            <div>{title}</div>
                                        </Link>
                                    ),
                                )}
                            </Box>
                        )}
                    </Box>

                    {/* Right: Cart + Profile + Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            color="inherit"
                            onClick={() => navigate('/cart')}
                        >
                            <Badge
                                badgeContent={currentUser?.cart?.length ?? 0}
                                color="error"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <IconButton
                                color="inherit"
                                onClick={handleProfileClick}
                            >
                                {currentUser?.avatar ? (
                                    <Avatar
                                        src={currentUser.avatar}
                                        alt={displayName}
                                    />
                                ) : displayName ? (
                                    <Avatar>
                                        {displayName[0]?.toUpperCase()}
                                    </Avatar>
                                ) : (
                                    <Avatar sx={{ bgcolor: 'transparent' }}>
                                        <AccountCircleIcon
                                            sx={{ color: '#fff' }}
                                        />
                                    </Avatar>
                                )}
                            </IconButton>

                            {displayName && (
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#fff', fontWeight: 500 }}
                                >
                                    {displayName}
                                </Typography>
                            )}
                            {displayName && (
                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    sx={{ ml: 1 }}
                                >
                                    Logout
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for Categories */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 280, p: 2 }}>
                    <Box sx={{ fontWeight: 700, fontSize: 22, mb: 2 }}>
                        SHOP
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                        {items?.map((cat, i) => (
                            <ListItem key={cat} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={`/categories/${cat.toLowerCase()}`}
                                >
                                    <Box sx={{ mr: 2 }}>
                                        {
                                            categoryIcons[
                                                i % categoryIcons.length
                                            ]
                                        }
                                    </Box>
                                    <ListItemText
                                        primary={cat}
                                        secondary={`Explore ${cat.toLowerCase()}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <Box sx={{ fontSize: 13, color: 'gray' }}>
                        Need help? Contact support or check our Help Center.
                    </Box>
                </Box>
            </Drawer>

            {/* Auth Modal */}
            <UserForm
                open={showForm}
                onClose={handleCloseModal}
                initial="signup"
            />
        </>
    );
}
