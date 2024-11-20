import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PageNumber } from '../../components';
import icons from '../../ultils/icons';

const { GrLinkNext, GrLinkPrevious } = icons
const arrNumber = [1, 2, 3]

const Pagination = ({ number }) => {
    const { count = 20, post = [5] } = useSelector(state => state.post || {});
    const postsPerPage = 5;
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+number)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)

    useEffect(() => {
        let maxPage = Math.floor(count / postsPerPage)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, currentPage])

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