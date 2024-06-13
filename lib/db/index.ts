"use server";
// TODO: Error Handling
import { createClient } from "@/utils/supabase/server";
import { getUser } from "../actions";

export async function getSnippets(query: string = "") {
    const supabase = createClient();

    const {
        data: { user },
    } = await getUser();

    const { data, error } = await supabase
        .from("snippets")
        .select(
            `
            name,
            description,
            code,
            language,
            tag (
                name,
                url,
                color
            )
        `
        )
        .eq("user_id", user!.id)
        .returns<Snippet[]>();

    if (error) {
        console.log(error);
        return { error };
    }

    return {
        data: data.filter((snippet) => snippet.name.includes(query)),
    };
}

export async function getTags() {
    const supabase = createClient();

    const {
        data: { user },
    } = await getUser();

    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .eq("user_id", user!.id)
        .returns<Tag[]>();

    if (error) {
        console.error(error);
        return { error };
    }

    return { data };
}

export async function createSnippet(snippet: Snippet) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("snippets")
        .insert(snippet)
        .select();

    if (error) {
        console.log(error);
        return { error };
    }

    return { data };
}

export async function createTag(tag: Tag) {
    const supabase = createClient();

    const { data, error } = await supabase.from("tags").insert(tag).select();

    return data;
}
