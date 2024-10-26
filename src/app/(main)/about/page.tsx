'use client'

import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";
import '../../../components/Header/wallet-button.scss';
import React from "react";

export default function GetStarted() {
  return (
    <div className="min-h-screen pt-16">
      <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">About 0xrep.com</h1>
      <p className="text-gr mb-7 font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">Created by Nick Mura</p>



      <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">0xrep <a href='https://github.com/0x-rep' target="_blank">(0x-rep on GitHub)</a> is a newly formed security project researching harm reduction solutions, and cybercrime prevention for cryptocurrency payments.</p>
      <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">We started development on the project in October 2024, in Alberta, Canada, with an inspiration from the late SteamRep tool for preventing fraud and scams on Steam based
        trading platforms. We also submitted our solutions to ScamShield.
      </p>

      <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">Relevant links/resources & contact information to the left sidebar & below.
      
      </p>
      <div className="w-full flex max-md:justify-center mt-7 ">

      </div>
    </div>
  );
}
