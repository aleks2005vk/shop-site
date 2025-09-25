import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронная регистрация пользователя
export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post('https://fakestoreapi.com/users', payload);
      return {
        ...res.data,
        name: payload.name,
        email: payload.email,
        username: payload.name,
      };
    } catch (err) {
      console.error('Error creating user:', err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Асинхронный логин пользователя
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', payload);
      const token = res?.data?.token ?? null;

      let profile = null;
      try {
        const usersRes = await axios.get('https://fakestoreapi.com/users');
        if (Array.isArray(usersRes.data)) {
          profile = usersRes.data.find(
            u =>
              (payload.email && u.email === payload.email) ||
              (payload.username && u.username === payload.username) ||
              (payload.email && u.username === payload.email)
          );
        }
      } catch (err) {
        console.warn('Could not fetch users list:', err);
      }

      const name = profile && profile.name
        ? `${profile.name.firstname || ''} ${profile.name.lastname || ''}`.trim()
        : payload.name || payload.username || (payload.email ? payload.email.split('@')[0] : 'User');

      const email = profile?.email ?? payload.email ?? null;
      const id = profile?.id ?? null;
      const username = profile?.username ?? payload.username ?? null;

      return { id, name, email, username, token, avatar: profile?.avatar ?? null };
    } catch (err) {
      const message = err?.response?.data || err?.message || 'Login failed';
      console.error('Error logging in user:', err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Загрузка сохранённого пользователя из localStorage
const loadSavedUser = () => {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const initialState = {
  currentUser: loadSavedUser(),
  cart: [],
  isLoading: false,
  status: null,
  showForm: false,
  formType: 'signup',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload || {};
      try {
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      } catch (e) {}
    },
    logout: state => {
      state.currentUser = {};
      state.cart = [];
      state.status = null;
      state.isLoading = false;
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
      } catch (e) {}
    },
    toggleForm: (state, { payload }) => {
      state.showForm = !!payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    // КОРЗИНА
    addToCart: (state, { payload }) => {
      if (!payload) return;
      const id = payload?.id ?? payload?._id ?? null;
      const qtyToAdd = typeof payload?.quantity === 'number' ? payload.quantity : 1;

      let found = null;
      if (id) {
        found = state.cart.find(
          item => (item.id ?? item._id) === id && item.size === payload.size
        );
      }
      if (!found) {
        found = state.cart.find(
          item =>
            item.title === payload.title &&
            item.size === payload.size &&
            (item.price ?? null) === (payload.price ?? null)
        );
      }

      if (found) {
        found.quantity = (found.quantity ?? 0) + qtyToAdd;
      } else {
        const syntheticId =
          id ??
          `${(payload.title || 'no-title').replace(/\s+/g, '_')}_${payload.size || 'no-size'}_${payload.price ?? 0}`;
        state.cart.push({ ...payload, id: syntheticId, quantity: qtyToAdd });
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(item => item.id !== payload);
    },
    increaseQuantity: (state, { payload }) => {
      const item = state.cart.find(i => i.id === payload);
      if (item) item.quantity = (item.quantity ?? 0) + 1;
    },
    decreaseQuantity: (state, { payload }) => {
      const item = state.cart.find(i => i.id === payload);
      if (item) {
        item.quantity = (item.quantity ?? 1) - 1;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== payload);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.showForm = false;
        if (action.payload?.token) {
          try {
            localStorage.setItem('token', action.payload.token);
          } catch (e) {}
        }
      })
      .addCase(createUser.rejected, state => {
        state.isLoading = false;
        state.status = 'failed';
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.status = 'succeeded';
        state.showForm = false;
        try {
          if (action.payload?.token) localStorage.setItem('token', action.payload.token);
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(loginUser.rejected, state => {
        state.isLoading = false;
        state.status = 'failed';
      });
  },
});

export const {
  setCurrentUser,
  logout,
  toggleForm,
  toggleFormType,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = userSlice.actions;

export default userSlice.reducer;
