"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Icons } from "../Icons";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set("query", query);
        } else {
            params.delete("query");
        }
        console.log(`${pathname}?${params.toString()}`);
        router.replace(`${pathname}?${params.toString()}`);
    });

    return (
        <div className="size-full relative w-1/2 h-14 shadow-xl">
            <Icons.Search className="absolute top-1/4 left-4" />
            <input
                type="text"
                className="bg-background/85 border-2 border-border disabled:cursor-not-allowed text-foreground font-medium focus:outline-none disabled:opacity-50 h-full pl-12 pr-3 rounded-[0.6rem] w-full placeholder:font-semibold focus:border-cyan-400 focus:ring-0 focus:border-2 hover:border-slate-400 peer"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
        </div>
    );
}
