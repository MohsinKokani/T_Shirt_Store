
const login = (email, password) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // To include cookies
            body: JSON.stringify({ email, password })
        };
        try {
            fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/login`, options)
                .then(response => response.json())
                .then(response => {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: response,
                    });
                })
                .catch(error => {
                    console.log(error)
                    dispatch({
                        type: 'LOGIN_FAIL',
                        payload: error.response || 'Error while login',
                    });
                });
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.message || 'Error while login.',
            });
        }

    }
}
const logout = () => {
    return (dispatch) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // To include cookies
        };
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/logout`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: error.response || 'Failed to logout'
                })
            })
    }
}
const register = (userForm) => {
    return (dispatch) => {
        dispatch({ type: 'REGISTER_REQUEST' });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // To include cookies
            body: JSON.stringify({
                name: userForm.get('name'),
                email: userForm.get('email'),
                password: userForm.get('password'),
                phone_no: userForm.get('phone_no'),
                avatar: userForm.get('avatar')
            })
        };
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/register`, options)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: 'REGISTER_FAIL',
                    payload: error?.response || 'error while registration'
                })
            })
    }
}
const loadUser = () => {
    return async (dispatch) => {
        dispatch({ type: "LOAD_USER_REQUEST" });
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        };
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me`, options)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'LOAD_USER_SUCCESS',
                    payload: response,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_USER_FAIL',
                    payload: error.response || 'Error while login',
                });
            });
    }
}
const resetPasswordMail = (email) => {
    return async (dispatch) => {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email })
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/forgotPasswordMail`, options);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to send reset password email');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'RESET_PASSWORD_FAIL',
                payload: error.response || 'Error while login',
            });
        }
    };
};

const updateUser = (userForm) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const body = {
            name: userForm.get('name'),
            email: userForm.get('email'),
            phone_no: userForm.get('phoneNo'),
            avatar: userForm.get('avatar')
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me/update`, options);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'UPDATE_USER_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'UPDATE_USER_FAIL',
                payload: error.response || 'Error while login',
            });
        }
    };
};

const updatePassword = (oldPassword, password, confirmPass) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_PASS_REQUEST" });

        const body = { oldPassword, newPassword: password, confirmPassword: confirmPass };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/updatePassword`, options);
            const responseData = await response.json();

            if (response.ok) {
                alert(responseData.message || 'successfully changed');
                dispatch({
                    type: 'UPDATE_PASS_SUCCESS',
                    payload: responseData,
                });
            } else throw new Error('Failed to update password');

        } catch (error) {
            dispatch({
                type: 'UPDATE_PASS_FAIL',
                payload: error.response || 'Error while login',
            });
        }
    };
};

const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
}
export { login, logout, register, clearErrors, loadUser, resetPasswordMail, updateUser, updatePassword }
