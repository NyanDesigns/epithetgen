import Link from "next/link";
//icons
import { Button } from "@/components/ui/button";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailSendFill } from "react-icons/ri";
import { SlPaypal } from "react-icons/sl";

//list of Contacts
const contactList = [
  {
    icon: (
      <RiMailSendFill className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-blue-400" />
    ),
    href: "mailto:nyandesigns0@gmail.com",
  },
  {
    icon: (
      <FaInstagram className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-blue-400" />
    ),
    href: "https://www.instagram.com/nyandesigns0/",
  },
  {
    icon: (
      <FaTiktok className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-blue-400" />
    ),
    href: "https://www.tiktok.com/@nyandesigns0",
  },
  {
    icon: (
      <FaXTwitter className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-blue-400" />
    ),
    href: "https://x.com/NyanDesigns0",
  },
  {
    icon: (
      <FaDiscord className="h-[20px] w-[20px] transform text-background transition-transform hover:scale-150 hover:text-blue-400" />
    ),
    href: "https://discord.com/users/nyandesigns",
  },
];

export function Footer() {
  return (
    //footer
    <footer className="flex flex-col min-w-full">
      {/* Donate */}
      <div className="flex flex-col items-center justify-between w-full gap-3">
        {/* copyright */}
        <Link
          href="https://www.paypal.com/paypalme/nyandesigns0"
          target="_blank"
        >
          <Button variant="bluebg" className="max-w-[175px] py-2">
            <p>Buy me a ☕ @ </p>
            <SlPaypal className="h-[20px] w-[20px] transform text-foreground" />
          </Button>
        </Link>
        {/* Connect */}
        <div className="flex flex-col justify-between w-full gap-2 px-6 py-3 bg-gray-950">
          {/* socialLogos */}
          <ul className="flex flex-row items-center justify-between grow">
            {contactList.map((nav, index) => {
              return (
                <li key={index}>
                  <Link href={nav.href} target="_blank">
                    {nav.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* copyright */}
          <p className=" w-full text-center text-[10px] text-slate-400 -mb-1">
            © 2024 Epithet OC Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
