import LoginForm from "@/components/LoginForm";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const {
        data: { user },
    } = await getUser();

    if (user) {
        return redirect("/");
    }

    return <LoginForm />;
}
