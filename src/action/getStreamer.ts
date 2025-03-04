'use server'

export default async function GetAddress(streamer: string): Promise<any> {
    return new Promise(async (resolve, reject) => { // NOTE: THIS ENDPOINT DOES NOT EXIST CURRENTLY.
        fetch(process.env.BACKEND + "/get-address" + `?username=${streamer}`)
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                return reject({ status: false });
            })
    })
}