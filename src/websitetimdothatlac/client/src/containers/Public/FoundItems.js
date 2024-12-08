import React, { useState, useEffect } from 'react'
import { text } from '../../ultils/constant'
import { Province } from '../../components'
import { List, Pagination } from './index'
// import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import * as actions from '../../store/actions'

const FoundItems = () => {
    const { categories } = useSelector(state => state.app)
    // const [params] = useSearchParams()
    const [category, setCategory] = useState('none')
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        const category = categories?.find(item => new RegExp(formatVietnameseToString(item.value)).test(location.pathname));

        if (category) {
            setCategory(category.code)
        }

    }, [location])


    return (
        <div className='w-full flex flex-col gap-3'>
            <div>
                <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[100%]'>
                    <List category={category === 'DND' ? 'DND' : ''} />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default FoundItems