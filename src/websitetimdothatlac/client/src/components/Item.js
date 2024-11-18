import React, { memo } from 'react'

const images = [
    "https://product.hstatic.net/1000397717/product/8805047594_759492865_a191dfde5d3a462e8e640113a4163d3a_master.jpeg",
    "https://product.hstatic.net/1000397717/product/8769405180_759492865_33c0918b5a9e421d8bb2c1b75c6a6f42_master.jpeg",
    "https://product.hstatic.net/1000397717/product/8805059476_759492865_3e0cd3cabb8b4451b02f01353a2a4c9b_master.jpeg",
    "https://product.hstatic.net/1000397717/product/8805056519_759492865_02e928f351ba409d9fe33ad0e98c626a_master.jpeg",
]

const Item = () => {
    return (
        <div className='w-full flex border-t border-black p-4'>
            <div className='w-2/5 flex gap-[2px] items-center'>
                <img src={images[0]} alt="preview" className='w-[190px] h-[170px] object-cover' />
                {/* <img src={images[1]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                <img src={images[2]} alt="preview" className='w-[140px] h-[120px] object-cover' />
                <img src={images[3]} alt="preview" className='w-[140px] h-[120px] object-cover' /> */}
            </div>
            <div className='w-3/5'>
                <div>
                    <div>
                        <h3 className='text-red-600 font-medium'>TÚI XÁCH MÀU ĐEN</h3>
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between'>
                    <span>Địa chỉ: 18 Lê Lợi, Phường 4, Châu Thành, Trà Vinh</span>
                </div>
                <p className='text-gray-500'>
                    Túi xách đen có ít sọc trắng:
                    Bên trong có 1 cuốn sách và 1 vài đồ dùng trang điểm"
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                    <p>Nguyễn Anh Tuấn</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                        type='button'
                        className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            Gọi 0869094929
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