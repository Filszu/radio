'use server'

import supabase from "@/config/supaBaseClient"
import { get } from "http"
import { getUserIP } from "./getUserIP"

export async function getUserActions(userIP:string){
    
    let { data: uUsers, error } = await supabase
    .from('uUsers')
    .select('*').eq('ip', userIP).limit(1)

    // asc
    if(error){
        console.log("error", error)
    }
    else{
        console.log("data", uUsers)
        if(uUsers&&uUsers.length >0){
            return uUsers[0].userActions
            
        }else{
            createUserActions(userIP)
        }
    }
            


}

export async function createUserActions(userIP:string){
    
    

    const newUserActions:IUserActions = {
        postedSongs:0,
        votedSongs:[]
    }
    const { data, error } = await supabase
    .from('uUsers')
    .insert([
    { 
        userIP: userIP,
        userActions: newUserActions
     },
    ])
    .select()
        
    if(error){
        console.log("error", error)
    }
    else{
        console.log("data", data)
        return data
    }

}

export async function markSongAsVoted(songID:string){
    // userActions.votedSongs.push(songID)

    const userIP = await getUserIP();
    const userActions = await getUserActions(userIP)

    

    if(userActions&userActions.votedSongs.include(songID)){
        return false
    }else{
        const newUserActions:IUserActions = {
            ...userActions,
            votedSongs:[...userActions.votedSongs,songID]

        }

        
        const { data, error } = await supabase
        .from('uUsers')
        .update({ userActions: newUserActions })
        .eq('some_column', 'someValue')
        .select()
        
    }

}