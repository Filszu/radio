import React from 'react';
import { Button } from '../button';
import LoadingIcon from './loadingIcon';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
type Props = {};
const SubmitButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            aria-disabled={pending}
            className="flex items-center"
        >
            <LoadingIcon  />
            Host my party
        </Button>
    );
};

export default SubmitButton;
