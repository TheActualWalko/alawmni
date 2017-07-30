import React = require('react');

interface inputProps {
  id: string
  label: string
  text: string
  onChange: (string) => void
  email?: boolean
  children?: any,
  className?: string
};


export default ({ 
  id,
  label, 
  text, 
  email,
  onChange,
  children,
  className
}: inputProps) => {
  return (
    <div className={className || 'input'}>
      <label htmlFor={id}>{label}</label>
      <input 
        type={email ? 'email' : 'text'}
        id={id} 
        placeholder="Type here" 
        value={text}
        autoComplete="off"
        onChange={(e) => {
          const input: any = e.nativeEvent.target;
          onChange(input.value);
        }}
      />
      {children}
    </div>
  );
}