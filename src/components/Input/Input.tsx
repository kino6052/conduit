import React, { PropsWithChildren } from 'react';

export const Input: React.FC<PropsWithChildren<React.InputHTMLAttributes<{}>>> = (props) => {
  return <textarea {...props} />
}