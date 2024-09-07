import React from 'react';
import { Button } from '../button';
import LoadingIcon from './loadingIcon';
import {useFormStatus } from 'react-dom';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnText: string;
    submitingText?: string;
    children: React.ReactNode;
    
};
const SubmitButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            // className="flex items-center"
            {...props}
            
        >
            {pending&&<LoadingIcon  />}
            {pending ? props.submitingText?props.submitingText:props.children : props.children}
            
        </Button>
    );
};

export default SubmitButton;
