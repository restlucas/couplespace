"use client";

import { PicturesGrid } from "@/components/pictures-grid";
import { getPageDetails, updatePage } from "@/services/couple";
import { Suspense, useContext, useEffect, useState } from "react";
import { transformToFile } from "@/utils/transformToFile";
import { Picture } from "@/components/picture";
import { Form } from "../create/page";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { PageProps } from "@/app/[page_id]/page";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  date: z.string().min(1, "A data é obrigatória"),
  about: z
    .string()
    .min(10, "O campo 'sobre vocês' deve ter pelo menos 10 caracteres"),
  picture: z.instanceof(File, { message: "A imagem principal é obrigatória" }),
  pictures: z.array(z.instanceof(File)),
});

export default function EditPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    setIsSubmitting(true);

    const validation = formSchema.safeParse(form);

    if (!validation.success) {
      setErrors(
        validation.error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>)
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("name", form.name);
    formData.append("date", form.date);
    formData.append("about", form.about);

    if (form.picture) {
      formData.append("picture", form.picture);
    }

    if (form.pictures.length > 0) {
      form.pictures.forEach((file) => {
        formData.append(`pictures`, file);
      });
    }

    const response = await updatePage(formData);

    if (response.type === "success") {
      alert("Sucesso ao atualizar página, redirecionando!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const fetchPage = async (userId: string) => {
      const response = (await getPageDetails({
        key: "userId",
        value: userId,
      })) as PageProps;

      const pictureConverted = (await transformToFile(
        response.picture
      )) as File;
      const picturesConverted = (await transformToFile(
        response.pictures
      )) as File[];

      const editForm = {
        ...response,
        picture: pictureConverted,
        pictures: picturesConverted,
      };

      setForm(editForm);
      setIsLoading(false);
    };

    if (user.id !== "") {
      fetchPage(user.id);
    }
  }, [user.id]);

  return (
    <Suspense>
      <div className="space-y-8">
        <h3 className="font-bold">Editando informações da página</h3>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
            <div className="flex flex-col gap-2">
              <div className="h-10 w-32 bg-foreground rounded-md" />
              <div className="h-10 px-4 rounded-md bg-foreground" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-10 w-32 bg-foreground rounded-md" />
              <div className="h-10 px-4 rounded-md bg-foreground" />
            </div>

            <div className="flex flex-col gap-2 col-span-full">
              <div className="h-10 w-32 rounded-md bg-foreground" />
              <div className="px-4 py-2 h-32 rounded-md bg-foreground" />
            </div>

            <div className="col-span-full">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex items-center justify-center gap-2 rounded-md border-dashed border-2 border-foreground p-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="h-10 w-28 rounded-md bg-foreground" />
                    <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full bg-foreground flex items-center justify-center cursor-pointer relative" />
                  </div>
                </div>

                <div className="rounded-md border-dashed border-2 border-foreground p-4">
                  <div className="h-10 w-20 mb-4 rounded-md bg-foreground" />
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center rounded-md bg-foreground duration-100"
                          style={{ aspectRatio: "1" }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
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
                {errors.date && (
                  <span className="text-red-500 text-sm">{errors.date}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 col-span-full">
                <label htmlFor="about">Sobre vocês</label>
                <textarea
                  id="about"
                  name="about"
                  rows={5}
                  className="px-4 py-2 rounded-md bg-foreground resize-none"
                  value={form.about || ""}
                  onChange={handleChange}
                />
                {errors.about && (
                  <span className="text-red-500 text-sm">{errors.about}</span>
                )}
              </div>

              <div className="col-span-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center gap-2 rounded-md border-dashed border-2 border-foreground p-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <span className="text-sm">Foto principal</span>
                      <Picture picture={form.picture} setForm={setForm} />
                      {errors.picture && (
                        <span className="text-red-500 text-sm">
                          {errors.picture}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border-dashed border-2 border-foreground p-4">
                    <span className="text-xs mb-4">Fotos</span>
                    <PicturesGrid pictures={form.pictures} setForm={setForm} />
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
                className="flex-1 sm:flex-none h-10 w-32 rounded-md bg-gradient-to-r from-rose to-blue-clean font-bold"
              >
                {isSubmitting ? (
                  <div className="flex w-full items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                ) : (
                  <span>Salvar</span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}
