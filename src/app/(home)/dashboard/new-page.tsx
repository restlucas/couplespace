import { useState } from "react";

import { CameraPlus } from "@phosphor-icons/react";
import { generatePage } from "@/services/couple";
import { useRouter } from "next/navigation";

interface CoupleForm {
  name: string;
  date: string;
  about: string;
  picture: File | null;
}

export function NewPage({ userId }: { userId: string }) {
  const router = useRouter();

  const [form, setForm] = useState<CoupleForm>({
    name: "",
    date: "",
    about: "",
    picture: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files ? input.files[0] : null;

      setForm((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("name", form.name);
    formData.append("date", form.date);
    formData.append("about", form.about);

    if (form.picture) {
      formData.append("picture", form.picture);
    }

    const response = await generatePage(formData);

    if (response.type === "success") {
      alert("Sucesso ao gerar página, redirecionando!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.refresh();
    }
  };

  return (
    <div className="space-y-8">
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
            rows={5}
            className="px-4 py-2 rounded-md bg-foreground resize-none"
            value={form.about || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-center gap-2 col-span-full rounded-md border-dashed border-2 border-foreground p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-sm">Foto do casal</span>

            <input
              id="picture"
              name="picture"
              type="file"
              onChange={handleChange}
              hidden
            />
            <label
              htmlFor="picture"
              className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center cursor-pointer"
            >
              <CameraPlus size={24} className="fill-white/35" />
            </label>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-end">
        <button
          onClick={handleSubmit}
          formTarget="pageForm"
          className="bg-gradient-to-r from-violet-500 to-blue-500 p-1 rounded-md px-6 py-2 font-bold"
        >
          Create
        </button>
      </div>
    </div>
  );
}
