'use client'
import { Button, ButtonProps } from './ui/button'

type Props = {
    onClick: () => void;
    children: React.ReactNode;   
    variant?: string;
    }

const VoteBtn: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <Button className="w-10 mx-1"  onClick={onClick}>
            {children}
        </Button>
        );
        }
export default VoteBtn;


