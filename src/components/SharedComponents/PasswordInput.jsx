// src/SharedComponents/PasswordInput.jsx

import React from 'react';
import { Input } from 'antd';
import viewSign from '/images/view.png'
import notViewSign from '/images/notView.png'
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
            <a><img src={viewSign} alt="view" style={{ width: 18 }} /></a> 
          ) : (
            <a><img src={notViewSign} alt="not view" style={{ width: 18 }} /></a>
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
