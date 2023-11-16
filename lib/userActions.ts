'use server';

import supabase from '@/config/supaBaseClient';
import { get } from 'http';
import { getUserIP } from './getUserIP';

export async function getUserActions(userIP: string) {
  let { data: uUsers, error } = await supabase
    .from('uUsers')
    .select('*')
    .eq('userIP', userIP).order('created_at', { ascending: false })
    .limit(1);

  // asc
  if (error) {
    console.log('error', error);
  } else {
    console.log('data', uUsers);
    if (uUsers && uUsers.length > 0) {
      return uUsers[0];
    } else {
      return createUserActions(userIP);
    }
  }
}

export async function createUserActions(userIP: string) {
  const newUserActions: IUserActions = {
    postedSongs: 0,
    votedSongs: [],
  };

  const { data, error } = await supabase
    .from('uUsers')
    .insert([
      {
        userIP: userIP,
        userActions: JSON.stringify(newUserActions),
      },
    ])
    .select();

  if (error) {
    console.log('error', error);
  } else {
    console.log('data', data);
    return data[0];
  }
}

export async function markSongAsVoted(songID: string) {
  // userActions.votedSongs.push(songID)

  const userIP = await getUserIP();
  const user = await getUserActions(userIP);

  if (user && user.userActions && typeof user.userActions === 'string') {
    
    const userActions: IUserActions = JSON.parse(user.userActions);

    if (userActions.votedSongs.includes(songID)) {

        // console.log("userActions.votedSongs.includes(songID)",userActions.votedSongs.includes(songID))
      return true;
    } else {
      const newUserActions: IUserActions = {
        ...userActions,
        votedSongs: [...userActions.votedSongs, songID],
      };

      console.log('newUserActions', newUserActions)

      const { data, error } = await supabase
        .from('uUsers')
        .update({ userActions: JSON.stringify(newUserActions) })
        .eq('id', user.id)
        .select();

        return false;
    }
  }
}
