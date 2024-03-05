'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingIcon from '@/components/ui/custom/loadingIcon';
import SubmitButton from '@/components/ui/custom/SubmitButton';


const NewPartyForm = () => {
    return (
        <form action="" className="flex flex-col gap-2">
            <Label htmlFor="partyName">Name your party</Label>

            <Input
                type="text"
                placeholder="my-ultimate-party"
                name="partyName"
                required
            />

            <SubmitButton/>
        </form>
    );
};

export default NewPartyForm;


