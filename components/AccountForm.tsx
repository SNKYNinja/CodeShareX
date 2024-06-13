"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface Inputs {
    name: string;
    username: string;
    avatar_url: string;
    website: string;
}

export default function AccountForm({ user }: { user: User }) {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [avatar_url, setAvatarURL] = useState("");
    const [website, setWebsite] = useState("");

    const getProfile = useCallback(async () => {
        try {
            setIsLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select("name, username, website, avatar_url")
                .eq("id", user?.id)
                .single();

            console.log(data, error, status);
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setName(data.name);
                setUsername(data.username);
                setAvatarURL(data.avatar_url);
                setWebsite(data.website);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({ name, username, avatar_url }: Inputs) {
        try {
            setIsLoading(true);

            const { error } = await supabase.from("profiles").upsert({
                id: user.id,
                name,
                username,
                website,
                avatar_url,
            });
            if (error) throw error;
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            <div>
                <label htmlFor="email">Email</label>
                <input
                    className="rounded-md ml-2 text-black p-2 focus-visible:outline-none"
                    id="email"
                    type="text"
                    value={user?.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="fullName">Name</label>
                <input
                    className="rounded-md ml-2 text-black p-2 focus-visible:outline-none"
                    id="fullName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    className="rounded-md ml-2 text-black p-2 focus-visible:outline-none"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    className="rounded-md ml-2 text-black p-2 focus-visible:outline-none"
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="bg-blue-500 p-2 rounded-lg block"
                    onClick={() =>
                        updateProfile({
                            name,
                            username,
                            website,
                            avatar_url,
                        })
                    }
                    disabled={isLoading}
                >
                    {isLoading ? "Loading ..." : "Update"}
                </button>
            </div>

            <div>
                <form action="/api/signout" method="post">
                    <button
                        className="bg-btn-background rounded-lg p-2 block"
                        type="submit"
                    >
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    );
}
