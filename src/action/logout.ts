'use server'

import { cookies } from 'next/headers';

export default async function Logout() { // TODO: REMOVE (OR MODIFY?)
    cookies().delete("access-token");
    return true;
}