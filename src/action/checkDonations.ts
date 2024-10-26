'use server'

export default async function CheckAddress(username: string): Promise<any> {
    return new Promise(async (resolve, reject) => { // NOTE: THIS ENDPOINT DOES NOT EXIST (CURRENTLY).
        fetch(process.env.BACKEND + `/check-new-address?username=${username}`)
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                console.log(e);
                return reject({ status: false });
            })
    })
}