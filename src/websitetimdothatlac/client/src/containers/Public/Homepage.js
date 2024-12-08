import React from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSlidebar } from '../../components'
import { List, Pagination } from './index'
import { useSearchParams } from 'react-router-dom'


const Homepage = () => {
    const [params] = useSearchParams()

    return (
        <div className='w-full flex flex-col gap-3'>
            <div>
                <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[100%]'>
                    <List page={params.get('page')} />
                    <Pagination page={params.get('page')} />
                    <div className='h-[500px'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage