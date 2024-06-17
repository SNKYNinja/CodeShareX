"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
    const supabase = createClient();

    return supabase.auth.getUser();
}

export async function signIn(email: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            // set this to false if you do not want the user to be automatically signed up
            shouldCreateUser: true,
        },
    });

    if (error) {
        console.log("Supabase error:", error);
        return { error: "Could not send the verification email!" };
    }

    return { data };
}

export async function verifyOtp(email: string, otp: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "email",
    });

    if (error) {
        console.log("Supabase error:", error);
        return { error: "Invalid verification code!" };
    }

    return { data };
}

export async function googleSignIn() {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });
    if (error) {
        console.log(error);
        return { error: "Could not sign in with Google!" };
    }
    if (data.url) {
        return redirect(data.url);
    }
}

export async function signOut() {
    const supabase = createClient();

    await supabase.auth.signOut();

    return redirect("/login");
}
