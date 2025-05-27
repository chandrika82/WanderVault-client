import { AUTH , LOGOUT} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    
    dispatch({ type: AUTH, data });

    // ✅ Store in localStorage
    localStorage.setItem('profile', JSON.stringify(data));

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    // ✅ Store in localStorage
    localStorage.setItem('profile', JSON.stringify(data));

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('profile');  // clear localStorage on logout
};


