// src/SharedComponents/PasswordInput.jsx

import React from 'react';
import { Input } from 'antd';

const { Password } = Input;

export default function PasswordInput({ name, placeholder, value, onChange, label }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name}>{label}</label>
      <Password
        id={name}
        className="custom-placeholder"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        iconRender={(visible) =>
          visible ? (
            <a><img src="/images/view.png" alt="view" style={{ width: 18 }} /></a> 
          ) : (
            <a><img src="/images/notView.png" alt="not view" style={{ width: 18 }} /></a>
          )
        }
        style={{
          borderColor: '#E4AF00',
          padding: '10px 16px',
          borderRadius: '6px',
          marginTop: 6,
          
        }}
      />
    </div>
  );
}
