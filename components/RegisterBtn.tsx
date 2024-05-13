import { SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

// Define TypeScript interface for the component props
interface RegisterBtnProps {
    smallDevice?: boolean;
    onOpenNavbar?: boolean;
}

const RegisterBtn: React.FC<RegisterBtnProps> = ({ smallDevice, onOpenNavbar }) => {
    let buttonClass = 'border border-base-content p-2 px-3 rounded cursor-pointer'; // Default class

    if (smallDevice) {
        buttonClass = 'p-1 px-2 text-sm rounded cursor-pointer'; // Small device class
    } else if (onOpenNavbar) {
        buttonClass = 'border border-base-content p-2 px-3 rounded bg-[#292929] text-white w-fit cursor-pointer'; // Navbar open class
    }

    return (
        <div>
            <SignUpButton mode='modal'>
                <div className={buttonClass}>
                    <li>Регистрация</li>
                </div>
            </SignUpButton>
        </div>
    );
};

export default RegisterBtn;
