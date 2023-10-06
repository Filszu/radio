//do wywalenia to
'use client'
import { useTransition } from 'react';
import { Button, ButtonProps } from './ui/button'

type Props = {
    onClick: () => void;
    children: React.ReactNode;   
    variant?: string;
    clickEvent:()=>void;
    }

const VoteBtn: React.FC<Props> = ({ onClick, children, clickEvent }) => {
    let [isPending, setIsPending] = useTransition()
    return (
        <Button className="w-10 mx-1"  onClick={onClick}>
            {children}
        </Button>
        );
        }
export default VoteBtn;


