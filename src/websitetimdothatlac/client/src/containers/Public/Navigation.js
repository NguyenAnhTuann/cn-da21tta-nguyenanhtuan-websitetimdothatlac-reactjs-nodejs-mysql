import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { apiGetCategories } from '../../services/category';
import * as actions from '../../store/actions';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';

const notActive = 'hover:bg-[#98A77C] h-full flex items-center px-4';
const active = 'hover:bg-[#98A77C] h-full flex items-center px-4';

const Navigation = () => {
  const [categoriesState, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.app);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response); // Set local state if needed
      }
    };
    fetchCategories();
    dispatch(actions.getCategories()); // Dispatch the existing action
  }, [dispatch]);

  return (
    <div className='w-full flex justify-center items-center h-[40px] bg-[#728156] text-white'>
      <div className='w-3/5 flex h-full items-center text-sm font-medium'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div key={item.code} className='h-full flex justify-center items-center'>
                <NavLink
                  to={`${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
