"use client";

import { Eye, PencilSimple, QrCode, Trash } from "@phosphor-icons/react";
import { NewPage } from "./new-page";
import Link from "next/link";
import { useState } from "react";
import { EditPage } from "./edit-page";

interface PageOptionsProps {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  page: {
    id: string;
    link: string;
    date: string;
    about: string;
    name: string;
    picture: string;
    pictures: [] | null;
    songs: [] | null;
    publications: [] | null;
  } | null;
}

export function PageOptions({ user, page }: PageOptionsProps) {
  const [isEditingPage, setIsEditingPage] = useState(false);

  if (!page) {
    return <NewPage userId={user.id} />;
  }

  if (isEditingPage) {
    return <EditPage />;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold mb-4">Minha página</h2>

      <div>
        <p className="font-semibold mb-2">Link</p>
        <input
          type="text"
          className="flex-1 h-10 w-full px-3 rounded-md bg-foreground"
          readOnly
          value={page.link || ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-2">
        <button
          onClick={() => setIsEditingPage(true)}
          className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground"
        >
          <PencilSimple size={20} />
          <span>Editar</span>
        </button>
        <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground">
          <Trash size={20} />
          <span>Excluir</span>
        </button>
        <Link
          href={`/${page.id}`}
          target="_blank"
          className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground"
        >
          <Eye size={20} />
          <span>Visualizar</span>
        </Link>
        <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md bg-foreground">
          <QrCode size={20} />
          <span>Reenviar QR Code</span>
        </button>
      </div>
    </div>
  );
}
