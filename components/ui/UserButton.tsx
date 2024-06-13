import { Dispatch, SetStateAction } from "react";
import { Icons } from "../Icons";
import { signOut } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Props = {
    name: string;
    email: string;
    avatar: string;
    showDetails: boolean;
    setShowDetails: Dispatch<SetStateAction<boolean>>;
};

// TODO: Improve UI

export default function UserButton({
    name,
    email,
    avatar,
    showDetails,
    setShowDetails,
}: Props) {
    return (
        <div
            className={cn(
                "fixed top-0 left-0 w-full h-screen cursor-default opacity-0 -translate-y-10 transition-all duration-300 ease-in-out -z-10",
                showDetails && "opacity-100 translate-y-0 z-10"
            )}
        >
            <div
                className="absolute top-0 left-0 w-full h-screen bg-black/45 backdrop-blur-[1px]"
                onClick={() => setShowDetails(false)}
            ></div>
            <div className="z-30 absolute top-4 right-24 border-border border-2 rounded-[0.6rem] p-4 bg-background">
                <div className="flex gap-4 mb-3 justify-start items-center">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="size-8 rounded-full"
                    />
                    <h2 className="font-medium">{name}</h2>
                </div>
                <h1 className="mb-4">{email}</h1>
                <form action={signOut}>
                    <button className="flex gap-2 border-2 border-border rounded-[0.6rem] p-2 hover:border-white">
                        <Icons.Signout className="size-6" />
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}
