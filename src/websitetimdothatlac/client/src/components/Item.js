import React, { memo } from 'react'

const Item = ({images, user, title, created, description, address}) => {
    return (
        <div className='w-full flex border-t border-black py-4'>
            <div className='w-2/5 flex gap-[2px] items-center relative cursor-pointer'>
                <img src={images[0]} alt="preview" className='w-[190px] h-[170px] object-cover' />
                {/* <img src={images[1]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                <img src={images[2]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                <img src={images[3]} alt="preview" className='w-[140px] h-[120px] object-cover' /> */}
                
                {/* {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[140px] h-[120px] object-cover' />
                    )
                })} khi nào cần thì dùng vì nó dùng hiển thị nhiều ảnh + const indexs = [0] */}
            </div>
            <div className='w-3/5'>
                <div>
                    <div className='text-red-600 font-medium '>
                        {title}
                    </div>
                </div>
                <div>
                    <div className='text-black'>
                        Ngày đăng bài: <span className='font-light'>{created}</span>
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between'>
                    <span>{address}</span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                    <p>{user.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                        type='button'
                        className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            {`Gọi ${user?.phone}`}
                        </button>
                        <button
                        type='button'
                        className='text-blue-700 px-1 rounded-md border border-blue-700'
                        >
                            Nhắn Zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)