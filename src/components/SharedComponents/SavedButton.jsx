import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
export default function SavedButton() {
  return (
    <>
         <Button
                        type="primary"
                        style={{
                            backgroundColor: '#E4AF00',
                            border: 'none',
                            color: '#FEFEFE',
                            borderRadius: 4,
                            height: '48px',
                            padding: '0 44px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 16,
                        }}
                    >
                        Save Change
                    </Button>
    </>
  )
}
