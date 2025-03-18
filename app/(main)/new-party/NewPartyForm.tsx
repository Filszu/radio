'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/custom/SubmitButton';
import postParty from '@/lib/postNewParty';
import { IActionMSG } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { ShareParty } from '@/components/ui/custom/ShareParty';
import { Checkbox } from '@/components/ui/checkbox';

const NewPartyForm = ({ userId }: { userId: string }) => {
    const { toast } = useToast();

    const [createdParty, setCreatedParty] = useState('');

    async function submitNewPartyForm(formData: FormData) {
        const partyName = formData.get('partyName') as string;
        const partyUrl = formData.get('partyUrl') as string;
        const partyDescription = formData.get('partyDescription') as string;

        const keyWords = formData.get('partyKeywords') as string;
        // const logoUrl = formData.get('partyImgUrl') as string;
        const logoUrl = formData.get('partyImgUrl') as string;
        const supportedMusicServices = [];
        if (formData.get('spotifyMusic')) {
            supportedMusicServices.push(1);
        }
        if (formData.get('ytMusic')) {
            supportedMusicServices.push(2);
        }

        const submitingFormStatus: IActionMSG | undefined = await postParty({
            partyName,
            partyUrl,
            partyDescription,
            userId,
            keyWords,
            logoUrl,
            supportedMusicServices,
            premiumStatus: 0,
            
        });

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
            if (submitingFormStatus.status === 200) {
                setCreatedParty(partyUrl);
            }
        }
    }

    return (
        <>
            {createdParty && <ShareParty partyUrlShort={createdParty} />}
            {!createdParty && (
                <form
                    action={submitNewPartyForm}
                    className="flex flex-col gap-2"
                >
                    <Label htmlFor="partyName">Name your party</Label>

                    <Input
                        type="text"
                        placeholder="my ultimate party"
                        name="partyName"
                        required
                    />

                    <Label htmlFor="partyUrl">Create your party url </Label>
                    <Input
                        type="text"
                        placeholder="my-ultimate-party-url"
                        name="partyUrl"
                        required
                    />
                    <Label htmlFor="partyDescription">
                        Your party description{' '}
                    </Label>
                    <Input
                        type="text"
                        placeholder="The best party in the world"
                        name="partyDescription"
                        required
                    />

                    <Label htmlFor="partyKeywords">Party keywords</Label>
                    <Input
                        type="text"
                        placeholder="18 birthday, user's party, best music, fun"
                        name="partyKeywords"
                    />

                    <Label htmlFor="partyImgUrl">Party image url <span className='text-primary'>[premium feture - SOON]</span></Label>
                    <Input
                        type="text"
                        placeholder="https://example.com/party.jpg"
                        name="partyImgUrl"
                        disabled
                    />
                    <div className="flex gap-1">
                        <Checkbox name="spotifyMusic" id="spotifyMusic" checked/>
                        <Label htmlFor="spotifyMusic">
                            Add music from Spotify
                        </Label>
                    </div>

                    <div className="flex gap-1">
                        <Checkbox name="ytMusic" id="ytMusic" defaultChecked/>
                        <Label htmlFor="ytMusic">
                            Add music from YouTube Music
                        </Label>
                    </div>

                    <SubmitButton
                        btnText="Host my party"
                        submitingText="Creating party..."
                    >
                        Host my party
                    </SubmitButton>
                </form>
            )}
        </>
    );
};

export default NewPartyForm;
