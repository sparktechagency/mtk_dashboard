import React from 'react';
import { Input } from 'antd';

export default function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder="esteban_schiller@gmail.com"
        className="custom-placeholder"
        style={{
          borderColor: '#767676',
          padding: '10px 16px',
          borderRadius: '6px',
          marginTop: '5px',
          marginBottom: '24px',
          
        }}
      />
    </div>
  );
}
