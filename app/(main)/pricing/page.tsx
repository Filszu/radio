'use server';
import { PricingTable } from '@/components/pricing-table';

import { redirect } from 'next/navigation';
import React from 'react';


const PricingPage = async () => {
 


    async function retirectToTrialPremium(){
        "use server";
        redirect('/checkout?planId=trial');
    }

    async function retirectToCheckoutPremium(){
        "use server";
        redirect('/checkout?planId=premium');
    }
    async function retirectToCheckoutPro(){
        "use server";
        console.log('redirecting to pro');
        redirect('/checkout?planId=pro');
    }


    // handleCreateProfile()
    return (
        <>
          

            
               

            <PricingTable
                        plan1ButtonFunction={retirectToTrialPremium}
                        plan2ButtonFunction={retirectToCheckoutPremium}
                        plan3ButtonFunction={retirectToCheckoutPro}
            />
               
        
        </>
    );
};

export default PricingPage;
