import React from 'react'
import { Button } from 'antd';
export default function PrimaryButton({ text, icon, onClick}) {
    return (
        <Button
            type="primary"
            icon={icon}
            onClick={onClick}
            style={{
                backgroundColor: '#E4AF00',
                border: 'none',
                color: '#FEFEFE',
                borderRadius: 4,
                height: '48px',
                padding: '0 44px',     // Keep horizontal padding, remove vertical
                display: 'flex',
                alignItems: 'center',  // Center icon and text vertically
                fontFamily: 'Inter, sans-serif',
                fontSize: 16,

            }}
        >
            {text}
        </Button>
    )
}
