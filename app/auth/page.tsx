"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { EyeClosed, EyeIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import api from "@/lib/api";

export default function Page() {
  useEffect(() => {
    let created = false;
    if (typeof window !== "undefined") {
      let el = document.getElementById("clerk-captcha");
      if (!el) {
        el = document.createElement("div");
        el.id = "clerk-captcha";
        document.body.appendChild(el);
        created = true;
      }
    }
    return () => {
      const el = document.getElementById("clerk-captcha");
      if (created && el?.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: signInLoaded, signIn } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setcode] = useState("");
  const [togglePass, setTogglePass] = useState<"password" | "text">("password");
  const [icon, seticon] = useState(<EyeClosed />);
  const [subMessage, setsubMessage] = useState("Sign up");
  const [subMessage1, setsubMessage1] = useState("Log in");
  const [subVerify, setsubVerify] = useState("Verify");

  const origin_api = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!signUpLoaded || !signInLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2Icon className=" animate-spin" />
      </div>
    );
  }

  const getErrorMessage = (err: any) =>
    err?.errors?.[0]?.message ?? err?.message ?? String(err ?? "Unknown error");

  const eye = () => {
    if (togglePass === "password") {
      setTogglePass("text");
      seticon(<EyeIcon />);
    } else {
      setTogglePass("password");
      seticon(<EyeClosed />);
    }
  };

  const loginsub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded || !signIn) return;
    try {
      setsubMessage1("Logging in...");
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Log in successful", {
          description: "You have successfully logged in!",
        });
        setsubMessage1("Logged In");
        router.push("/");
      } else {
        setsubMessage1("Try Again!");
        toast.error("Login incomplete");
      }
    } catch (error: any) {
      setsubMessage1("Try Again!");
      toast.error("Something went Wrong, Try Again!", {
        description: getErrorMessage(error),
      });
      setsubMessage1("Log in");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) return;
    try {
      setsubMessage("Signing Up...");
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
      setsubMessage("Done!!");
    } catch (error: any) {
      console.error(error);
      setsubMessage("Try Again!!..");
      toast.error("Something went Wrong!", {
        description: getErrorMessage(error),
      });
      setsubMessage("Sign up");
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded || !signUp) return;

    try {
      setsubVerify("Verifying ...");

      const CompleteSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (CompleteSignUp.status !== "complete") {
        toast.error("Verification failed — please try again.");
        setsubVerify("Not Verified");
        return;
      }

      const sessionId = CompleteSignUp.createdSessionId;
      if (sessionId) {
        await setActive({ session: sessionId });
        toast.success("Verified and logged in!");
        setsubVerify("Verified!");
        const { data } = await api.post("/api/org/create", {
          clerkId: user?.id || "sdasdas",
          name: user?.firstName || "Niraj",
          email: user?.emailAddresses[0]?.emailAddress || emailAddress,
        });
        console.log(data.success);
        router.push("/");
        return;
      }

      toast.success(
        "Verified! Please sign in to continue. (Automatic session creation not enabled.)"
      );
      setsubVerify("Verified!");
      router.push("/auth");
    } catch (error: any) {
      const msg =
        error?.errors?.[0]?.message ?? error?.message ?? String(error);
      toast.error("Something went Wrong!", { description: msg });
      setsubVerify("Not Verified");
    }
  };

  return (
    <>
      {isSignedIn ? (
        <div className="text-center w-screen h-screen flex flex-col gap-10 justify-center items-center">
          <div className="font-bold text-3xl max-w-[50vw]">
            Hey {user?.firstName}, You already filled out the whole
            autobiography earlier. Let’s get back to the good stuff — home’s
            waiting for you!
          </div>
          <Link href={"/"}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      ) : (
        <div className="w-screen h-screen transition-all flex justify-center items-center">
          <div className="w-1/2 h-screen md:block hidden bg-black">
            <Image
              width={800}
              height={600}
              src="/poster.png"
              alt="img"
              className="h-full opacity-75 bg-black object-cover"
              loading="lazy"
            />
          </div>
          <div className="max-w-md md:w-1/2 w-full mx-auto rounded-none flex flex-col gap-3 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Welcome to MediTrack AI
            </h2>
            <p className="text-center text-neutral-800 dark:text-neutral-200">
              All in one solution for Health Care and Inventory Management!
            </p>

            {!pendingVerification ? (
              <Tabs defaultValue="sign-up" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
                  <TabsTrigger value="log-in">Log-in</TabsTrigger>
                </TabsList>

                <TabsContent value="sign-up">
                  <form className="my-8" onSubmit={submit}>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                      <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                          id="firstname"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          placeholder="Niraj"
                          type="text"
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                          id="lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Salunke"
                          type="text"
                        />
                      </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        value={emailAddress}
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        type="email"
                      />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4 ">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                          value={password}
                          id="password"
                          placeholder="••••••••"
                          type={togglePass}
                          onChange={(e) => setPass(e.target.value)}
                        />
                        <Button type="button" onClick={eye}>
                          {icon}
                        </Button>
                      </div>
                    </LabelInputContainer>

                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      {subMessage} &rarr;
                      <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                  </form>
                </TabsContent>

                <TabsContent value="log-in">
                  <form className="my-8" onSubmit={loginsub}>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        value={emailAddress}
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        type="email"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        value={password}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                      <div id="clerk-captcha"></div>
                    </LabelInputContainer>

                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      {subMessage1} &rarr;
                      <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <form className="my-8" onSubmit={verify}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Verification Code</Label>
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setcode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  {subVerify} &rarr;
                  <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
