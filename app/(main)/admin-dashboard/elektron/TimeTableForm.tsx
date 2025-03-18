'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/custom/SubmitButton';
import postParty from '@/lib/postNewParty';
import { IActionMSG, ITimeTableRow } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import putTimeTable from '@/lib/putTimeTable';

const TimeTableForm = ({ timeTable }: { timeTable: ITimeTableRow }) => {
    const { toast } = useToast();

    async function submitNewPartyForm(formData: FormData) {
        const submitingFormStatus: IActionMSG | undefined =
            await putTimeTable(formData);

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
            <h1>Set TimeTable</h1>
            <Label htmlFor="host id">hostId</Label>

            <Input
                type="text"
                placeholder="host id"
                name="hostId"
                required
                defaultValue={timeTable.hostid}
                disabled
            />

            <label htmlFor="isOn">Is on</label>
            <Input
                type="checkbox"
                name="isOn"
                value="true"
                defaultChecked={timeTable.isOn}
            />

            <Input
                type="number"
                placeholder="current playlist id"
                name="currentPlaylistId"
                required
                defaultValue={timeTable.currentPlaylistId}
            />
            {/* NOTE: in the future u can create nice UI for that types are already created */}
            <Textarea
                name="timeRules"
                placeholder="time table JSON"
                required
                defaultValue={JSON.stringify(timeTable.timeRules)}
                className="w-full"
            />

            <SubmitButton btnText="Update" submitingText="Creating party..." >
                Update
                </SubmitButton>
        </form>
    );
};

export default TimeTableForm;
