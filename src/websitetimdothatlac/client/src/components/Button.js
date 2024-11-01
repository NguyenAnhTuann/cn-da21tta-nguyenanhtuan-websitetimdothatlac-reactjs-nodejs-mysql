import React, { memo } from "react";


const Button = ({text, textColor, bgColor, IcFiPlus, onClick, fullWidth}) => {
    console.log('re-render');
    return(
        <button
        type='button'
        className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
        onClick={onClick}
        >
            <span>{text}</span>
            <span>{IcFiPlus && <IcFiPlus />}</span>
        </button>
    )
}

export default memo(Button)