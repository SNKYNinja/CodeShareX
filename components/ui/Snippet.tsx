"use client";

import { Language } from "@/types/enums";
import CodeBlock from "./CodeBlock";

export default function Snippet({ data }: { data: Snippet }) {
    const { name, description, code, created_at, tag } = data;
    const language = Language[data.language];

    return (
        <div className="p-4 rounded-[1.13rem] hover:shadow-lg border border-gray-700 bg-gray-800 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col justify-start">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-100">{name}</h2>
                    <p className="text-sm text-gray-400">{created_at}</p>
                </div>
                <div className="mt-2 text-gray-300">{description}</div>
            </div>
            <CodeBlock code={code} language={data.language} />
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-400">{language}</p>
                <div className="flex items-center rounded-2xl border border-gray-600 bg-gray-700 p-2">
                    <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: tag.color }}
                    ></div>
                    <span className="text-sm text-gray-300">{tag.name}</span>
                </div>
            </div>
        </div>
    );
}
