import React from 'react';
import { Button } from '../button';
import LoadingIcon from './loadingIcon';
import {useFormStatus } from 'react-dom';
interface Props  {
    btnText: string;
    submitingText?: string;
};
const SubmitButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="flex items-center"
            
        >
            {pending&&<LoadingIcon  />}
            {pending ? props.submitingText : props.btnText}
        </Button>
    );
};

export default SubmitButton;
