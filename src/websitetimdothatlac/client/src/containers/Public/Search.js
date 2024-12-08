import React, { useCallback, useState } from 'react'
import { SearchItem, Modal } from '../../components'
import icons from '../../ultils/icons'
import { useSelector } from 'react-redux'

const { BsChevronRight, CiCalendarDate, HiOutlineLocationMarker, IoIosApps, FiSearch } = icons

const Search = () => {

  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, category } = useSelector(state => state.app)
  const [queries, setQueries] = useState({})
  // const [texts, setTexts] = useState({
  //   // date: '', // làm sau
  //   province: '',
  //   // category: '' // làm sau
  // })

  const handleShowModal = (content, name) => {
    setContent(content)
    setName(name)
    setIsShowModal(true)

  }

  const handleSubmit = useCallback((e, query) => {
    e.stopPropagation()
    setQueries(prev => ({ ...prev, ...query }))
    setIsShowModal(false)
  }, [isShowModal, queries])

  console.log(queries)

  return (
    <>
      <div className='p-[10px] w-3/5 my-3 bg-[#98A77C] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <span onClick={() => handleShowModal('Ngày đánh rơi')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<CiCalendarDate />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text='Ngày đánh rơi' />
        </span>
        <span onClick={() => handleShowModal(provinces, 'province')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText={'Địa điểm'} />
        </span>
        <span onClick={() => handleShowModal(category, 'categories')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<IoIosApps />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text='Loại đồ vật' />
        </span>
        <button
          type='button'
          className='outline-none py-2 px-4 flex-1 bg-[#728156] text-sm text-white flex items-center justify-center gap-2 font-medium rounded-md'
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && <Modal handleSubmit={handleSubmit} queries={queries} content={content} name={name} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search