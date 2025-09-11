import React from "react";
import CardNav from "./CardNav";
import TargetCursor from "./TargetCursor";

export default function Navbar() {
  const items = [
    {
      label: "Docs",
      bgColor: "#4A1D1F",
      textColor: "#FFE4D6",
      links: [
        {
          label: "Getting Started",
          ariaLabel: "Getting Started Guide",
          href: "#",
        },
        {
          label: "SDK Installation",
          ariaLabel: "How to install the SDK",
          href: "#",
        },
        {
          label: "Website Integration",
          ariaLabel: "How to integrate on your website",
          href: "#",
        },
      ],
    },
    {
      label: "Pricing",
      bgColor: "#7B2D26",
      textColor: "#FFF2E6",
      links: [
        { label: "Plans", ariaLabel: "View our pricing plans", href: "#" },
        {
          label: "Compare Features",
          ariaLabel: "Compare features between plans",
          href: "#",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ];
  return (
    <div>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <CardNav
        logo={"/vercel.svg"}
        logoAlt="Company Logo"
        items={items}
        baseColor="#000"
        menuColor="#fff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </div>
  );
}
