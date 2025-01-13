"use client";

import { UserContext } from "@/contexts/UserContext";
import { sendQrCode } from "@/services/couple";
import { Eye, PencilSimple, Plus, QrCode } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export function PageOptions() {
  const { user } = useContext(UserContext);
  const [loading, setIsLoading] = useState(true);

  const handleQrCode = async () => {
    await sendQrCode(user.id);
  };

  useEffect(() => {
    if (user.id !== "") {
      setIsLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="w-40 h-10 rounded-md bg-foreground" />

        <div className="w-40 h-7 rounded-md bg-foreground" />

        <div>
          <div className="w-40 mb-2 h-7 rounded-md bg-foreground" />
          <div className="w-full h-10 rounded-md bg-foreground" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-2">
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="mb-8 text-xl">
        Olá, <span className="font-bold">{user.name}</span>
      </h3>

      {user.page.id ? (
        <>
          <h2 className="text-lg font-semibold">Minha página</h2>

          <div>
            <p className="font-semibold mb-2">Link</p>
            <input
              type="text"
              className="flex-1 h-10 w-full px-3 rounded-md bg-foreground"
              readOnly
              value={user.page.link || ""}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-2">
            <Link
              href={`/dashboard/new-publication`}
              className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
            >
              <Plus size={20} />
              <span>Nova publicação</span>
            </Link>
            <Link
              href={`/dashboard/edit`}
              className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
            >
              <PencilSimple size={20} />
              <span>Editar página</span>
            </Link>
            <Link
              href={`${user.page.link}`}
              target="_blank"
              className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
            >
              <Eye size={20} />
              <span>Visualizar</span>
            </Link>
            <button
              onClick={handleQrCode}
              className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
            >
              <QrCode size={20} />
              <span>Enviar QR Code</span>
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8">
          <h3 className="font-bold text-2xl">Você ainda não tem uma página!</h3>
          <Link
            href="/dashboard/create"
            className="px-8 py-3 rounded-md font-bold bg-gradient-to-r from-rose to-blue-clean"
          >
            Criar
          </Link>
        </div>
      )}
    </div>
  );
}
