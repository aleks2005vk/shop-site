import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, IconButton, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../Features/user/UserSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.user);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = id => dispatch(removeFromCart(id));
  const handleIncrease = id => dispatch(increaseQuantity(id));
  const handleDecrease = id => dispatch(decreaseQuantity(id));

  if (!cart || cart.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.map(item => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <img
            src={item.images && item.images.length > 0 ? item.images[0] : item.image}
            alt={item.title}
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">{item.title}</Typography>
            {item.size && (
              <Typography variant="body2" color="textSecondary">
                Size: {item.size}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary">
              {item.category}
            </Typography>
            <Typography variant="body2">${item.price}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => handleDecrease(item.id)}>
              <RemoveIcon />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton onClick={() => handleIncrease(item.id)}>
              <AddIcon />
            </IconButton>
          </Box>

          <IconButton color="error" onClick={() => handleRemove(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
