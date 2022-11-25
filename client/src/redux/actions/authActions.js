import axios from 'axios'

export const login = (data) => (dispatch) => {
    try {
        dispatch({ type: "AUTH", data })
        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        dispatch({ type: "AUTH", message: "Something went wrong" })
    }

}

export const signup = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API}signup`, user)
        console.log(data);
        dispatch({ type: "AUTH", data })
        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        dispatch({ type: "AUTH", message: "Something went wrong" })
    }

}

export const currentUser = (data) => {
    return {
        type: "FETCH_USER",
        payload: data
    }
}

export const fetchAllUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}users`);
        dispatch({
            type: 'FETCH_ALL_USERS',
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, {name,about,tags}) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${process.env.REACT_APP_API}update/${id}`,{name,about,tags});
        dispatch({
            type: "UPDATE_USER", payload: data
        })  
           
    } catch (error) {
        console.log(error);
    }
}