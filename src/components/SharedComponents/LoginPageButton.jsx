import React from 'react'
import {Button} from 'antd';
export default function LoginPageButton({text}) {
  return (
    <div>

        <Button
              type="primary"
              htmlType="submit"
              block
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
             {text}
            </Button>
    </div>
  )
}
