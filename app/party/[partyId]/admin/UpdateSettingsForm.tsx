'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // Assuming you have a Switch component
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'; // Shadcn Select components
import { FaSpotify, FaYoutube } from 'react-icons/fa'; // React Icons for Spotify and YouTube Music
import { Host } from '@/types';

interface UpdateSettingFormProps {
    host: Host;
}

async function SubmitForm(formData: FormData) {
    // Handle form submission on the server
    const supportedMusicServices = [];
    if (formData.get('spotify') === 'on') supportedMusicServices.push(1);
    if (formData.get('yt-music') === 'on') supportedMusicServices.push(2);

    const updatedData = {
        hostName: formData.get('hostName') as string,
        hostUrl: formData.get('hostUrl') as string,
        hostDescription: formData.get('hostDescription') as string,
        supportedMusicServices,
        keyWords: formData.get('keyWords') as string,
        logoUrl: formData.get('logoUrl') as string,
        votingFinishAt: formData.get('votingFinishAt') as string,
        repeat: formData.get('repeat') as string,
    };

    console.log('Updated Data:', updatedData);
    // Perform your server-side update here (e.g., API call or database update)
}

const UpdateSettingForm: React.FC<UpdateSettingFormProps> = ({ host }) => {
    return (
        <div className="space-y-4">
            <form
                action={SubmitForm}
                className="space-y-4 p-4 border rounded-lg"
            >
                {/* Host Name */}
                <div>
                    <Label htmlFor="hostName">Host Name</Label>
                    <Input
                        id="hostName"
                        name="hostName"
                        defaultValue={host.hostName}
                    />
                </div>

                {/* Host URL */}
                <div>
                    <Label htmlFor="hostUrl">Host URL</Label>
                    <Input
                        id="hostUrl"
                        name="hostUrl"
                        defaultValue={host.hostUrl}
                        disabled
                    />
                </div>

                {/* Host Description */}
                <div>
                    <Label htmlFor="hostDescription">Host Description</Label>
                    <Input
                        id="hostDescription"
                        name="hostDescription"
                        defaultValue={host.hostDescription}
                    />
                </div>

                {/* Supported Music Services */}
                <div>
                    <Label>
                        Supported Music Services{' '}
                        <span className="text-primary">
                            FREE PREMIUM feature
                        </span>
                    </Label>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="spotify"
                                name="spotify"
                                defaultChecked={host.supportedMusicServices.includes(
                                    1,
                                )}
                            />
                            <Label
                                htmlFor="spotify"
                                className="flex items-center"
                            >
                                <FaSpotify className="h-5 w-5 text-green-500 mr-2" />
                                Spotify
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="yt-music"
                                name="yt-music"
                                defaultChecked={host.supportedMusicServices.includes(
                                    2,
                                )}
                            />
                            <Label
                                htmlFor="yt-music"
                                className="flex items-center"
                            >
                                <FaYoutube className="h-5 w-5 text-red-500 mr-2" />
                                YouTube Music
                            </Label>
                        </div>
                    </div>
                </div>

                {/* Keywords */}
                <div>
                    <Label htmlFor="keyWords">Keywords</Label>
                    <Input
                        id="keyWords"
                        name="keyWords"
                        defaultValue={host.keyWords ?? ''}
                    />
                </div>

                {/* Logo URL (Disabled) */}
                <div>
                    <Label htmlFor="logoUrl">
                        Logo URL{' '}
                        <span className="text-primary">
                            PREMIUM feature - SOON
                        </span>
                    </Label>
                    <Input
                        id="logoUrl"
                        name="logoUrl"
                        defaultValue={host.logoUrl?? ''}
                        disabled
                        placeholder="default"
                    />
                </div>

                {/* Voting Finish At */}
                <div>
                    <Label htmlFor="votingFinishAt">Voting Finish At</Label>
                    <Input
                        id="votingFinishAt"
                        name="votingFinishAt"
                        type="datetime-local"
                        defaultValue={host.votingFinishAt?? ''}
                    />
                </div>

                {/* Repeat (Shadcn Select) */}
                <div>
                    <Label htmlFor="repeat">
                        Repeat &nbsp;
                        <span className="text-primary">
                             FREE PREMIUM feature
                        </span>
                    </Label>
                    <Select name="repeat" defaultValue={host.repeat}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select repeat option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="every 3 days">
                                Every 3 Days
                            </SelectItem>
                            <SelectItem value="every week">
                                Every Week
                            </SelectItem>
                            <SelectItem value="every month">
                                Every Month
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit Button */}
                <Button type="submit">Update Settings</Button>
            </form>
        </div>
    );
};

export default UpdateSettingForm;
