"use client";

import { User } from "@supabase/supabase-js";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { useEffect, useMemo, useState } from "react";
import UserButton from "./ui/UserButton";

export default function Account({ user }: { user: User }) {
    const { email, avatar_url, name } = user.user_metadata;

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (showDetails) {
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape") setShowDetails(false);
            });
        }

        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.key === "Escape") setShowDetails(false);
            });
        };
    });

    const avatar =
        (avatar_url as string) ??
        useMemo(() => {
            return createAvatar(initials, {
                size: 200,
                seed: name[0],
            }).toDataUriSync();
        }, []);

    return (
        <div className="size-12 rounded-full cursor-pointer border-border border-2 flex justify-center items-center hover:border-white hover:border-2 select-none shadow-lg">
            <img
                src={avatar}
                alt={name}
                className="size-10 rounded-full select-none"
                onClick={() => setShowDetails(!showDetails)}
            />
            <UserButton
                avatar={avatar}
                name={name}
                email={email}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
            />
        </div>
    );
}
