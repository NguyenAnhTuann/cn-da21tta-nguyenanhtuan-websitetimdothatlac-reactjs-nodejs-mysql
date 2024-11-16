import React from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
  { name: "Trang chủ", path: 'home' },
  { name: "Đồ nhặt được", path: 'do-nhat-duoc' },
  { name: "Đồ thất lạc", path: 'do-that-lac' }
]

const notActive = 'hover:bg-red-600 h-full flex items-center px-4 bg-blue-600'
const active = 'hover:bg-red-600 h-full flex items-center px-4 bg-red-600'

const Navigation = () => {
  return (
    <div className='w-screen flex justify-center items-center h-[40px] bg-blue-600 text-white'>
      <div className='w-1100 flex h-full items-center text-sm font-medium'>
        {nav?.length > 0 && nav.map((item, index) => {
          return (
            <div key={index} className='h-full flex justify-center items-center'>
              <NavLink 
              to={item.path}
              className={({isActive}) => isActive ? active : notActive}
              >
                {item.name}
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation
