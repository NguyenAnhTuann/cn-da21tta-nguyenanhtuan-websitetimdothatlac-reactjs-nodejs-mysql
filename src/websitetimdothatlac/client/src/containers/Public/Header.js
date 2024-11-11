import React, { useCallback } from "react";
import logo from '../../assets/logo.png'
import { Button } from "../../components";
import icons from "../../ultils/icons"
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { FiPlusCircle } = icons

const Header = () => {
    const navigate = useNavigate()
    const goLogin = useCallback(() => {
        navigate(path.LOGIN)
    }, [navigate])

    return (
        <div className='w-1100'>
            <div className='w-1100 flex items-center justify-between'>
                <img
                    src={logo}
                    alt="logo"
                    className='w-[400px] h-[140px] object-contain'
                />
                <div className='flex items-center gap-1'>
                    <small>Đừng quá lo lắng, chúng tôi sẽ giúp bạn tìm kiếm!</small>
                    <Button
                        text={'Đăng nhập'}
                        textColor='text-white'
                        bgColor='bg-[#3961fb]'
                        onClick={goLogin}
                    />
                    <Button
                        text={'Đăng ký'}
                        textColor='text-white'
                        bgColor='bg-[#3961fb]'
                        onClick={goLogin}
                    />
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