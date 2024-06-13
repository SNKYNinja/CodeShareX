"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { createSnippet, getTags } from "@/lib/db";

import { Icons } from "@/components/Icons";

import { toast } from "sonner";
import { Language } from "@/types/enums";

const formSchema = z.object({
    name: z.string().min(3, "Name is too short"),
    code: z.string().min(10, "Code is too short"),
    description: z.string().optional(),
    language: z.string(),
    tag: z.string().optional(),
});

export default function CreateSnippet() {
    const [showModal, setShowModal] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setError } = useForm({
        resolver: zodResolver(formSchema),
    });

    // This is required as the form field values are not being inferred correctly
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        setIsLoading(true);
        const { data, error } = await createSnippet(formData as Snippet);
        setIsLoading(false);
        if (error) {
            toast.error(error.message);
        } else {
            setShowModal(false);
            toast.success("Snippet created successfully");
        }
    };

    useEffect(() => {
        (async () => {
            const { data } = await getTags();

            if (data) {
                setTags(data);
            }
        })();
    }, []);

    return (
        <div className="rounded-full shadow-xl bg-gray-700 group relative">
            {/* TODO: Add hover animation to this button */}
            <button
                className="border-border border-2 rounded-full p-2 z-10"
                onClick={() => setShowModal(true)}
            >
                <Icons.Plus
                    size={25}
                    className="group-hover:rotate-45 transition-all duration-200"
                />
            </button>

            <div
                className={cn(
                    "fixed top-0 left-0 w-full h-screen flex justify-center items-center opacity-0 -z-10 transition-all duration-300 ease-in-out",
                    showModal && "opacity-100 translate-y-0 z-10"
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-screen bg-black/45 backdrop-blur-[1px]"
                    onClick={() => setShowModal(false)}
                ></div>
                <div className="z-30 absolute border-border border-2 rounded-[0.6rem] p-4 bg-background ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3 justify-center items-center text-black"
                    >
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="name"
                        />
                        <textarea {...register("code")} placeholder="code" />
                        <input
                            type="text"
                            {...register("description")}
                            placeholder="description"
                        />
                        <select {...register("language")}>
                            {Object.entries(Language).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <select {...register("tag")}>
                            {tags?.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>

                        <button className="px-3 py-2 rounded-[0.6rem] bg-teal-500 text-white">
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
