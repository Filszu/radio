import React from 'react'

type Props = {}
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { getAdminCookie, setAdminCookie } from '@/lib/cookies/adminCookies'
import { redirect } from 'next/navigation'
const Page = async(props: Props) => {


    async function handleSubmit(formData: FormData){
        'use server'

        console.log("try to log in...")

        const pswd= formData.get('pswd')
        console.log(pswd)
        if(pswd){
            setAdminCookie(pswd.toString())
        }
    }

    const isLogged = await getAdminCookie()
    console.log(isLogged)

    isLogged&&redirect('/admin-dashboard')
  return (
     
        <form action={handleSubmit} className=''>
            hello Admin 🙂 {isLogged&&"Logged IN 🎯"}
            <Input name="pswd" type="password" className='mt-2 mb-2'></Input>
            <Button>Log in</Button>
        </form>
  )
}

export default Page