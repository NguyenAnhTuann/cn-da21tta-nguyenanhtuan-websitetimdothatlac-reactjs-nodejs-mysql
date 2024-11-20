import React, { useEffect } from 'react'
import { Button, Item } from '../../components'
import { getPosts, getPostsLimit } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

const List = () => {
    const dispatch = useDispatch()
    const { posts, count } = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPostsLimit(0))
    }, [])
    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-lg font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: 12:03 18/11/2024</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <Button bgColor='bg-gray-200' text='Mặc định' />
                <Button bgColor='bg-gray-200' text='Mới nhất' />
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            created={item?.created ? moment(item.created).format('DD/MM/YYYY HH:mm') : 'N/A'}
                            address={item?.address}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images?.image)}
                            title={item?.title}
                            user={item?.user}
                        />
                    )
                })}
            </div>
            
        </div>
    )
}

export default List