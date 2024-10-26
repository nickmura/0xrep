'use server'

export default async function RecentDonations(): Promise<any> {
    return new Promise(async (resolve, reject) => { // NOTE: THIS ENDPOINT DOES NOT EXIST (CURRENTLY).
        fetch(process.env.BACKEND + "/recent-address-lookup")
            .then(res => res.json())
            .then(res => {
                return resolve(res.donations);
            })
            .catch(e => {
                return reject({ status: false });
            })
    })
}