"use client";

import { Eye, PencilSimple, Plus, QrCode } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  if (!page) {
    router.push(`/dashboard/create?userId=${user.id}`);
  }

  return (
    <div className="space-y-8">
      <h3 className="mb-8 text-xl">
        Olá, <span className="font-bold">{user.name}</span>
      </h3>

      <h2 className="text-lg font-semibold">Minha página</h2>

      <div>
        <p className="font-semibold mb-2">Link</p>
        <input
          type="text"
          className="flex-1 h-10 w-full px-3 rounded-md bg-foreground"
          readOnly
          value={page?.link || ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-2">
        <Link
          href={`/dashboard/new-publication?userId=${user.id}`}
          className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
        >
          <Plus size={20} />
          <span>Nova publicação</span>
        </Link>
        <Link
          href={`/dashboard/edit?userId=${user.id}`}
          className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
        >
          <PencilSimple size={20} />
          <span>Editar página</span>
        </Link>
        <Link
          href={`/${page?.id}`}
          target="_blank"
          className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold"
        >
          <Eye size={20} />
          <span>Visualizar</span>
        </Link>
        <button className="flex items-center justify-center gap-4 h-10 px-6 rounded-md duration-100 hover:bg-foreground font-semibold">
          <QrCode size={20} />
          <span>Reenviar QR Code</span>
        </button>
      </div>
    </div>
  );
}
