"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Bot } from "lucide-react";
import Link from "next/link";
import { useRouter} from "next/navigation";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  return (
    <div className="w-screen h-[7vh] flex px-10 items-center justify-between fixed top-0 left-0 bg-white z-50 shadow-md">
      <div className="flex gap-2 font-bold items-center">
        <Link href="/" >
        <Bot /> EcoEdu AI</Link>
      </div>
      <div className="flex gap-10">
        <NavigationMenu>
          <NavigationMenuList className="gap-10">
            {/* <SignedIn> */}
              <NavigationMenuItem className="text-black">
                <NavigationMenuLink asChild>
                  <Link href="/dashboard" className="font-medium text-lg">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            {/* </SignedIn> */}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="h-[7vh] flex justify-center items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
                onSignIn={() => {
                router.push("/home");
              }}
            >
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
