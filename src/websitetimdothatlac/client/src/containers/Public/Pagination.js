import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PageNumber } from '../../components';
import icons from '../../ultils/icons';

const { GrLinkNext, GrLinkPrevious } = icons

const Pagination = ({ page }) => {
    const { count} = useSelector(state => state.post || {});
    // const postsPerPage = 5;
    const postsPerPage = process.env.REACT_APP_LIMIT_POSTS || 5; // Sử dụng limit bài đăng từ env hoặc mặc định
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+page || 1)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)

    useEffect(() => {
        let maxPage = Math.ceil(count / postsPerPage)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, postsPerPage, currentPage])

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
            {!isHideStart && <PageNumber icon={<GrLinkPrevious />} setCurrentPage={setCurrentPage} text={1} />}
            {!isHideStart && <PageNumber text={'...'} />}
            
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )
            })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage} text={Math.floor(count / postsPerPage)} />}
        </div>
    )
}

export default Pagination