'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/custom/SubmitButton';
import postParty from '@/lib/postNewParty';
import { IActionMSG } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const TimeTableForm = () => {
    const { toast } = useToast();

    async function submitNewPartyForm(formData: FormData) {
        return 1;
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
                placeholder="host id"
                name="hostId"
                required
                defaultValue={1}
                disabled
            />


            <Input type="checkbox" name="isOn" value="true" />
            <label htmlFor="isOn">Is on</label>

            <Input
                type="number"
                placeholder="current playlist id"
                name="currentPlaylistId"
                required
            />
           
            <Textarea
                name="timeTable"
                placeholder="time table JSON"
                required
            />

            <SubmitButton
                btnText="Host my party"
                submitingText="Creating party..."
            />
        </form>
    );
};

export default TimeTableForm;
