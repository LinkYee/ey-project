import './index.scss'
import React, { useEffect, useState } from 'react'

interface IniProps {
    tipText: string
    showTip: boolean
}
const CommonTip: React.FC<IniProps> = (props) => {
    return (
        <div className='tip-container1' style={{ display: props.showTip ? 'block' : 'none', zIndex: 9999 }}>
            <div style={{ color: '#ffffff' }}>{props.tipText}</div>
        </div>
    );
};

export default CommonTip;