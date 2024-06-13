import CreateSnippet from "@/components/CreateSnippet";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function IndexPage({
    searchParams,
}: {
    searchParams: any;
}) {
    const {
        data: { user },
    } = await getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="min-h-full flex flex-col content relative">
            <Navbar user={user} />
            <Main query={searchParams.query} />
            <div className="absolute bottom-6 left-1/2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <CreateSnippet />
            </div>
        </div>
    );
}
