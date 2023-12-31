'use server';
import axios from 'axios';

export async function getUserIP_api() {
  const url = 'https://radio-elektron.vercel.app/api/userActions';

  try {
    const response = await axios.get(url);

    const ip = response.data.ip;
    return ip;
  } catch (error) {
    return null;
  }
}
