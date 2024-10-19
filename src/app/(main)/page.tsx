'use client'

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useCurrentAccount } from "@mysten/dapp-kit";

import Logout from "@/action/logout";
import RecentDonations from "@/action/recentDonations";
import TwitchAccountUpdate from "@/action/twitchAccountUpdate";
import Checkbox from "@/components/Checkbox";
import VerifySignAddress from '@/components/VerifySignAddress';
import { b64DecodeUnicode, truncateWalletAddress } from "@/lib/helper";
import { useAccountStore } from "@/lib/states";

export default function Dashboard() {

  const router = useRouter();

  const setUser = useAccountStore(state => state.setUser);
  const user = useAccountStore(state => state.user);
  const currentAccount = useCurrentAccount();

  const [search, setSearch] = useState<string>("");
  const [recentDonations, setRecentDonations] = useState([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  function settingChange() {
    if (!user) return;

    setSubmitting(true);

    TwitchAccountUpdate({ ...user })
      .then((res: any) => {
        if (res.status !== false) {
          setSubmitting(false);
          toast.success("Handle is successfully changed");
        }
      })
      .catch(err => {
        if (err?.error_message) toast.error(err.error_message);
        setSubmitting(false);
      })
  }

  const [eventURL, setEventURL] = useState<string>()
  useEffect(() => {
    if (user) setEventURL(`https://stream.gift/${user?.preferred_username}/donationEvents`);

    else {
      RecentDonations()
        .then(res => {
          if (res?.status !== false) {
            setRecentDonations(res);
          }
        })
    }
  }, [user])

  return (
    <div className="min-h-screen pt-16">
        <>
          <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
           0xrep.com
          </h1>
          <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
            Check the rating of a given crypto address
          </p>

          <input
            placeholder="0x000..."
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter")
                router.push(`/${search}`);
            }}
            className="
              w-full max-w-[800px] block p-2
              border-[1px] border-gr font-bold text-xl mt-16 rounded-md
              placeholder:text-gr"
          />

          { recentDonations?.length ? (
            <p className="mt-24 text-gr font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
              Recent Donations
            </p>
          ) : <></>}

          <div className="mt-12 mb-2 max-md:overflow-x-auto max-md:mx-auto max-md:w-[320px] ">
            { recentDonations?.length ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Message</th>
                      <th>Donation</th>
                      <th>Receiver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((d: any, i: number) => {
                      return (
                        <tr key={i}>
                          <td>{d.sender_suins ?? truncateWalletAddress(d.sender)}</td>
                          <td>{d.message !== "null" ? b64DecodeUnicode(d.message) : "-"}</td>
                          <td>{parseFloat(d.amount)?.toFixed(3)} SUI</td>
                          <td>{truncateWalletAddress(d.recipient)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            ) : <></>}
          </div>
        </>
    </div>
  );
}
