'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/custom/SubmitButton';
import postMessage from '@/lib/postNewMessage';
import { IActionMSG } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface IpartyMsgForm {
    message: string | null;
    partyId: number;
}
const PartyMessageForm = (props: IpartyMsgForm) => {
    const { toast } = useToast();


    console.log('props', props);
    async function setMessageFormSubmit(formData: FormData, ) {
        const msg = formData.get('message') as string;
        console.log('pid', props.partyId);

        const submitingFormStatus: IActionMSG | undefined =
            await postMessage({ newMsg: msg, partyId: Number(props.partyId) });

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
        <section className="border-primary border rounded-lg p-10">
            <form action={setMessageFormSubmit} className="flex flex-col gap-2">
                <h2>
                    Set message/party description that will be shown on the top
                    of the page
                </h2>
                <Label htmlFor="partyName">Message</Label>

                <Input
                    type="text"
                    placeholder="My message"
                    name="message"
                    required
                    defaultValue={props.message ?? ''}
                />

                <Input type="hidden" name="partyId" value={props.partyId}  />
                

                <SubmitButton
                    btnText="Set new message"
                    submitingText="Setting new message..."
                >
                    Set new message
                </SubmitButton>
            </form>
        </section>
    );
};

export default PartyMessageForm;
