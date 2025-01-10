"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { PicturesGrid } from "@/components/pictures-grid";
import { Picture } from "@/components/picture";
import Link from "next/link";
import { createPage } from "@/services/couple";

export interface Form {
  name: string;
  date: string;
  about: string;
  picture: File | null | undefined;
  pictures: { id: string | null; file: File }[] | [];
}

export default function NewPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") as string;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    name: "",
    date: "",
    about: "",
    picture: null,
    pictures: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("name", form.name);
    formData.append("date", form.date);
    formData.append("about", form.about);

    if (form.picture) {
      formData.append("picture", form.picture);
    }

    if (form.pictures.length > 0) {
      form.pictures.forEach((file) => {
        formData.append(`pictures`, JSON.stringify(file));
      });
    }

    const response = await createPage(formData);

    if (response.type === "success") {
      alert("Sucesso ao gerar página, redirecionando!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="mb-8 text-xl">
        <span className="font-bold">Criar nova página</span>
      </h3>
      <h3 className="">Para criar sua página preencha o formulário</h3>

      <form
        id="pageForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome do casal</label>
          <input
            id="name"
            name="name"
            type="text"
            className="h-10 px-4 rounded-md bg-foreground"
            value={form.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Início de relacionamento</label>
          <input
            id="date"
            name="date"
            type="date"
            className="h-10 px-4 rounded-md bg-foreground"
            value={form.date || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label htmlFor="about">Sobre vocês</label>
          <textarea
            id="about"
            name="about"
            rows={8}
            className="px-4 py-2 rounded-md bg-foreground resize-none"
            value={form.about || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center gap-2 rounded-md border-dashed border-2 border-foreground p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-sm">Foto principal</span>
                <Picture setForm={setForm} />
              </div>
            </div>

            <div className="rounded-md border-dashed border-2 border-foreground p-4">
              <span className="text-xs mb-4">Fotos</span>
              <PicturesGrid setForm={setForm} />
            </div>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex-1 sm:flex-none h-10 w-32 font-bold rounded-md duration-100 hover:bg-foreground flex items-center justify-center"
        >
          Voltar
        </Link>
        <button
          form="pageForm"
          className="flex-1 sm:flex-none h-10 w-32 rounded-md bg-gradient-to-r from-violet-500 to-blue-500 font-bold"
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
