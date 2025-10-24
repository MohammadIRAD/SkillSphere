import React from 'react';

export const Toaster: React.FC = () => null;

export default Toaster;

export const useToast = () => ({ toast: (msg: string) => console.log('toast:', msg) });
