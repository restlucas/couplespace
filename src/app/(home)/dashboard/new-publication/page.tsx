"use client";

import { TextEditor } from "@/components/TextEditor";
import { UserContext } from "@/contexts/UserContext";
import { createPublication } from "@/services/couple";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function NewPublicationPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createPublication({ message, userId: user.id });

    if (response.type === "success") {
      alert("Publicação criada com sucesso!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="font-bold">Criar nova publicação</h3>

      <form
        id="newPublicationForm"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <TextEditor setContent={setMessage} />
      </form>

      <div className="flex items-center justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex-1 sm:flex-none h-10 w-32 font-bold rounded-md duration-100 hover:bg-foreground flex items-center justify-center"
        >
          Voltar
        </Link>
        <button
          form="newPublicationForm"
          className="flex-1 sm:flex-none h-10 w-32 rounded-md bg-gradient-to-r from-rose to-blue-clean font-bold"
        >
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            <span>Criar</span>
          )}
        </button>
      </div>
    </div>
  );
}
