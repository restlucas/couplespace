import { CouplePageProps } from "@/app/[couple_id]/page";
import { getCoupleDetails } from "@/services/couple";
import { CameraPlus } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function EditPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<CouplePageProps>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    console.log(name);
    console.log(value);
    console.log(type);
  };

  const handleSubmit = () => {
    console.log("fuuuuuuuu");
  };

  useEffect(() => {
    const fetchPage = async (userId: string) => {
      const response = (await getCoupleDetails({
        key: "userId",
        value: userId,
      })) as CouplePageProps;

      setForm(response);
    };

    if (session && session.user) {
      fetchPage(session.user.id);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="">Editando informações da página</h3>

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
            value={form?.name || ""}
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
            value={form?.date || ""}
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
            value={form?.about || ""}
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

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className="bg-gradient-to-r from-violet-500 to-blue-500 p-1 rounded-md h-10 w-24 font-bold"
        >
          <span className="w-full h-full bg-red-500">Voltar</span>
        </button>
        <button
          onClick={handleSubmit}
          formTarget="pageForm"
          className="bg-gradient-to-r from-violet-500 to-blue-500 rounded-md h-10 w-24 font-bold"
        >
          Create
        </button>
      </div>
    </div>
  );
}
