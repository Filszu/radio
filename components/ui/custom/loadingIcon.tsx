import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbLoader2 } from "react-icons/tb";
const LoadingIcon = () => {
    return (
        <span className="animate-spin">
            {/* <AiOutlineLoading3Quarters /> */}
            <TbLoader2 />
        </span>
    );
};

export default LoadingIcon;
