import Link from "next/link";

export default function Links() {
    return (
        <ul className="flex gap-6">
            <li className="text-border underline decoration-border">
                <Link href="https://github.com/SNKYNinja">Github</Link>
            </li>
            <li>
                <Link href="https://www.linkedin.com/in/aditya-chaudhary-36898a283/">
                    LinkedIn
                </Link>
            </li>
        </ul>
    );
}
