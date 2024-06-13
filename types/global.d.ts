import type { Database as DB } from "@/types/supabase";

declare global {
    type Database = DB;
    type Tag = DB["public"]["Tables"]["tags"]["Row"];
    type Snippet = DB["public"]["Tables"]["snippets"]["Row"] & {
        tag: Tag;
    };
    // type Language = DB["public"]["Enums"]["Language"];
}
