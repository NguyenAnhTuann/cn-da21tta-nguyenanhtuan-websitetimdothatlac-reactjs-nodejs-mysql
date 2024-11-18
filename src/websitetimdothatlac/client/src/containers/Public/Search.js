import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../ultils/icons'

const { BsChevronRight, CiCalendarDate, HiOutlineLocationMarker, IoIosApps, FiSearch } = icons

const Search = () => {
  return (
    <div className='p-[10px] w-3/5 my-3 bg-[#98A77C] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <SearchItem IconBefore={<CiCalendarDate/>} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text='Ngày đánh rơi'/>
        <SearchItem IconBefore={<HiOutlineLocationMarker/>} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text='Địa điểm'/>
        <SearchItem IconBefore={<IoIosApps/>} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text='Loại đồ vật'/> 
        <button
        type='button'
        className='outline-none py-2 px-4 w-full bg-[#728156] text-sm text-white flex items-center justify-center gap-2 font-medium rounded-md'
        >
            <FiSearch/>
            Tìm kiếm
        </button>
    </div>
  )
}

export default Search