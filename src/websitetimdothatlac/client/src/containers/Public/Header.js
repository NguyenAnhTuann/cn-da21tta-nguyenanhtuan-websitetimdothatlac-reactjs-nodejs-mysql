import React, { useCallback } from "react";
import logo from '../../assets/logo.png'
import { Button } from "../../components";
import icons from "../../ultils/icons"
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const { FiPlusCircle } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [navigate])

    return (
        <div className='w-1100'>
            <div className='w-1100 flex items-center justify-between'>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[400px] h-[140px] object-contain'
                    />
                </Link>
                <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        <small>Đừng quá lo lắng, chúng tôi sẽ giúp bạn tìm kiếm!</small>
                        <Button
                            text={'Đăng nhập'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(false)}
                        />
                        <Button
                            text={'Đăng ký'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className='flex items-center gap-1'>
                        <small>Tên user</small>
                        <Button
                            text={'Đăng xuất'}
                            textColor='text-white'
                            bgColor='bg-red-700'
                            onClick={() => dispatch(actions.logout())}
                        />
                    </div>}
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-[#F73859]'
                        IcFiPlus={FiPlusCircle}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header