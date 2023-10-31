'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { RiSettings4Fill } from 'react-icons/ri';
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

const SongAdminOptions = ({songId}:{songId:string}) => {


 const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="mt-2 w-full flex justify-center flex-col">
    <Button className='' onClick={() => {setIsOpen(!isOpen)}}>
        <RiSettings4Fill size={20}/>Edit
       
    </Button>
     { isOpen&&<div className='border rounded-lg p-4 shadow-md w-300 hover:border-primary group hover:ease-out duration-300 mt-2'>
        <h2>edit song with id {songId}</h2>
        <br />
        <form action="">
            <Label htmlFor="votes">Votes</Label>
            <Input name="votes" id="votes" type="number" placeholder="votes" defaultValue={0}/>

            <Label htmlFor="status">Status</Label>
            <Input name="status" id="status" type="text" placeholder="status" defaultValue='banned'/>

            <Button type="submit" className="mt-4">Submit</Button>

            


        </form>

    </div>}
     </div>
  )
}

export default SongAdminOptions