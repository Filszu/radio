import { PricingTable } from '@/components/pricing-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    postCreatorProfile,
    getCreatorProfile,
} from '@/lib/auth/getCreatorProfile';
import { getUser } from '@/lib/auth/getUser';
import { Checkbox } from '@radix-ui/react-checkbox';

import { redirect } from 'next/navigation';
import React from 'react';
const PricingPage = async () => {
 


    // handleCreateProfile()
    return (
        <>
          

            
               

            <PricingTable
                        // plan1ButtonFunction={}
                        // plan2ButtonFunction={}
            />
               
        
        </>
    );
};

export default PricingPage;
