// function setCookie(name: string, value: string, days: number) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

'use server'
 
import { cookies } from 'next/headers'

export async function setAdminCookie(pass:string){

    if(pass === process.env.ADMIN_PASS)
    {
        cookies().set('isAdmin', pass)
        console.log("correct pass")
    }
    else{
       console.log("wrong pass") 
    }
    
    
}

export async function getAdminCookie(){
    const isAdmin = cookies().get('isAdmin')?.value
    console.log("isAdmin", isAdmin)
    if(isAdmin === process.env.ADMIN_PASS){
        console.log("cookie login success")
        return true
        
    }
    else{
        console.log("cookie login failed")
        return false
    }
}