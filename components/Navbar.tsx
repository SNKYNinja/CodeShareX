import { User } from "@supabase/supabase-js";

import Account from "@/components/Account";
import Search from "@/components/ui/Search";

export default function Navbar({ user }: { user: User }) {
    return (
        <nav className="w-full flex justify-between items-center mb-8">
            <Search />
            <Account user={user} />
        </nav>
    );
}
