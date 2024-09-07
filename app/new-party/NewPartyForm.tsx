'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/custom/SubmitButton';
import postParty from '@/lib/postNewParty';
import { IActionMSG } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const NewPartyForm = () => {
    const { toast } = useToast();

    async function submitNewPartyForm(formData: FormData) {
        
        const submitingFormStatus: IActionMSG | undefined =
            await postParty(formData);

        console.log(submitingFormStatus);

        if (submitingFormStatus) {
            toast({
                title: `${submitingFormStatus.title}`,
                description: `${submitingFormStatus.message}`,
                variant: `${
                    submitingFormStatus.status === 200
                        ? 'success'
                        : 'destructive'
                }`,
            });
        }
    }

    return (
        <form action={submitNewPartyForm} className="flex flex-col gap-2">
            <Label htmlFor="partyName">Name your party</Label>

            <Input
                type="text"
                placeholder="my-ultimate-party"
                name="partyName"
                required
            />

            <SubmitButton
                btnText="Host my party"
                submitingText="Creating party..."
            >
                Host my party
                </SubmitButton>
        </form>
    );
};

export default NewPartyForm;
