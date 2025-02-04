"use client";

import { UserContext } from "@/contexts/UserContext";
import { inviteUser } from "@/services/couple";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Invite() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await inviteUser({ userEmail, userId: user.id });
    if (response.type === "success") {
      alert("Convite enviado com sucesso!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="mb-8 text-xl">
        <span className="font-bold">Adicionar parceiro(a)</span>
      </h3>

      <form
        id="partnerForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <label htmlFor="userEmail">Email do parceiro(a)</label>
        <input
          id="userEmail"
          name="userEmail"
          type="email"
          value={userEmail || ""}
          onChange={(e) => setUserEmail(e.target.value)}
          className="h-10 px-4 rounded-md bg-foreground"
          required
        />
      </form>

      <div className="flex items-center justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex-1 sm:flex-none h-10 w-32 font-bold rounded-md duration-100 hover:bg-foreground flex items-center justify-center"
        >
          Voltar
        </Link>
        <button
          form="partnerForm"
          className="flex-1 sm:flex-none h-10 w-32 rounded-md bg-gradient-to-r from-rose to-blue-clean font-bold"
        >
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            <span>Salvar</span>
          )}
        </button>
      </div>
    </div>
  );
}
