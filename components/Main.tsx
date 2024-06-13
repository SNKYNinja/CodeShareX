import { getSnippets } from "@/lib/db";
import Snippet from "@/components/ui/Snippet";

export default async function Main({ query }: { query: string }) {
    let snippets: Snippet[] = [];
    const { data, error } = await getSnippets(query);

    if (data) {
        snippets = [...data];
    }

    return (
        <div className="w-full rounded-[0.6rem] overflow-x-scroll border-2 border-border no-scrollbar flex-grow p-5 bg-background/85 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {snippets.map((snippet) => (
                    <Snippet key={snippet.id} data={snippet} />
                ))}
            </div>
        </div>
    );
}
