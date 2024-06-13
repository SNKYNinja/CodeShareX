"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Icons } from "@/components/Icons";
import { useState } from "react";
import { Language } from "@/types/enums";

export default function CodeBlock({
    code,
    language,
}: {
    code: string;
    language: keyof typeof Language;
}) {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 4000);
    };

    return (
        <div className="mt-4 rounded-md overflow-visible relative group">
            <button
                className="opacity-0 group-hover:opacity-100 border border-border p-2 rounded-md absolute right-4 top-4 cursor-pointer z-20 transition-opacity duration-200 bg-background tooltip"
                data-tooltip={copied ? "Copied!" : "Copy"}
                onClick={handleClick}
            >
                {copied ? (
                    <Icons.Checkmark className="size-4 text-gray-300 text-base" />
                ) : (
                    <Icons.Copy className="size-4 text-gray-300 text-base" />
                )}
            </button>

            <SyntaxHighlighter
                language={language}
                style={atomOneDarkReasonable}
                customStyle={{ padding: "1rem" }}
                wrapLongLines
                
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
