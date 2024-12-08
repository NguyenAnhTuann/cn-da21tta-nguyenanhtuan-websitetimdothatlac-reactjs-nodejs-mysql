import actionTypes from './actionTypes'
import * as apis from '../../services'



export const getCategories = () => async (dispatch) => {
    try {
        // const response = await apiGetCategories()
        // console.log(response)
        // if (response?.data.err === 0) {
        //     dispatch({
        //         type: actionTypes.GET_CATEGORIES,
        //         categories: response.data.response
        //     })
        // } else {
        //     dispatch({
        //         type: actionTypes.GET_CATEGORIES,
        //         msg: response.data.msg,
        //         categories: null
        //     })
        // }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
}

export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                msg: response.data.msg,
                provinces: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            msg: ''
        })
    }
}