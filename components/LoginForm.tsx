"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, verifyOtp, googleSignIn } from "@/lib/actions";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

type Inputs = {
    email: string;
    otp?: string;
};

export default function LoginForm() {
    const { handleSubmit, register, resetField } = useForm<Inputs>();

    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const [isGooglePending, startGoogleTransition] = useTransition();

    const router = useRouter();

    const buttonText = useMemo(() => {
        if (isPending) return "Loading...";
        return `Continue with ${showOTP ? "login code" : "email"}`;
    }, [isPending, showOTP]);

    const handleSignIn = (email: string) => {
        startTransition(async () => {
            const { error } = await signIn(email);
            error ? setError(error) : setShowOTP(true);
        });
    };
    const handleVerifyOtp = (email: string, otp: string) => {
        startTransition(async () => {
            const { error } = await verifyOtp(email, otp);
            error ? setError(error) : router.push("/");
        });
    };
    const handleGoogleSignIn = () => {
        startGoogleTransition(async () => {
            await googleSignIn();
        });
    };
    const handleTryAgain = () => {
        resetField("email");
        setShowOTP(false);
    };

    const onSubmit: SubmitHandler<Inputs> = ({ email, otp }) => {
        showOTP ? handleVerifyOtp(email, otp!) : handleSignIn(email);
    };

    return (
        <div className="max-w-md text-center mx-auto border-2 border-border rounded-[2rem] px-12 pt-6 pb-9 bg-background/5 shadow-2xl inline-flex justify-center items-center">
            <div className="bg-background/10 backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-sm">
                <h2 className="text-lg mb-4">
                    Get started with your email below
                </h2>
                <div className="grid gap-3 grid-cols-1 place-content-center">
                    <form
                        className="contents"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <input
                                type="email"
                                disabled={showOTP}
                                className="bg-background/85 border border-border disabled:cursor-not-allowed text-foreground font-medium focus:outline-none disabled:opacity-50 h-11 px-3 rounded-[0.6rem] w-full placeholder:font-semibold focus:border-cyan-400 focus:ring-0 focus:border-2 hover:border-slate-400"
                                placeholder="Email address"
                                {...register("email", { required: true })}
                            />
                        </div>
                        {showOTP && (
                            <div>
                                <h2 className="mb-4 text-base">
                                    We just sent you a temporary login code.
                                    Please check your inbox. Can't find it?{" "}
                                    <button
                                        className="underline"
                                        onClick={handleTryAgain}
                                    >
                                        Try again?
                                    </button>
                                </h2>
                                <input
                                    type="number"
                                    className="bg-background/85 border border-border disabled:cursor-not-allowed text-foreground font-medium focus:outline-none disabled:opacity-50 h-11 px-3 rounded-[0.6rem] w-full placeholder:font-semibold focus:border-cyan-400 focus:ring-0 focus:border-2 hover:border-slate-400 text-center placeholder:text-center"
                                    placeholder="Paste login code"
                                    minLength={6}
                                    maxLength={6}
                                    {...register("otp", { required: true })}
                                />
                            </div>
                        )}
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <button
                            className={cn(
                                "bg-teal-600/90 hover:bg-teal-600 text-white inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-teal-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-[1px] border-border font-medium drop-shadow-sm transition-all rounded-[0.6rem] h-11 whitespace-nowrap min-w-[6rem] px-5 focus-visible:outline-none focus-visible:ring-2 active:scale-[0.985]",
                                isPending && "opacity-80"
                            )}
                            type="submit"
                        >
                            <Icons.Spinner
                                className={cn("animate-spin mr-2", {
                                    hidden: !isPending,
                                })}
                                size={16}
                            />
                            {buttonText}
                        </button>
                    </form>
                </div>
                <p className="text-center text-xs uppercase -my-1 py-3 text-foreground">
                    or
                </p>
                <button
                    onClick={handleGoogleSignIn}
                    className={cn(
                        "inline-flex items-center justify-center shrink-0 relative text-slate-800 ring-offset-2 ring-offset-red-500 border-[1px] border-transparent rounded-xl bg-white/90 hover:bg-white px-5 min-w-24 font-medium w-full h-11 gap-2 transition-all hover:border-slate-800 drop-shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 active:scale-[0.985]",
                        isGooglePending && "opacity-80"
                    )}
                >
                    <Icons.Spinner
                        className={cn("animate-spin mr-1", {
                            hidden: !isGooglePending,
                        })}
                        size={16}
                    />
                    {isGooglePending ? (
                        "Loading..."
                    ) : (
                        <>
                            <img
                                alt=""
                                loading="lazy"
                                width="16"
                                height="16"
                                decoding="async"
                                data-nimg="1"
                                src="/logo/google.svg"
                                style={{ color: "transparent" }}
                            />
                            Continue with Google
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
