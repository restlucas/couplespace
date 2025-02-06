import React, {
  ActionDispatch,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { PicturesGrid } from "./pictures-grid";
import { useTranslations } from "next-intl";
import { Picture } from "./picture";
import { Link } from "@/i18n/routing";
import { z } from "zod";

export type FormAction =
  | { type: "SET_FORM"; payload: Form }
  | {
      type: "UPDATE_FIELD";
      field: keyof Form;
      value: string | File | File[] | null;
    };

export interface Form {
  name: string;
  date: string;
  about: string;
  picture: File | null | undefined;
  pictures: File[] | [];
}

interface FormProps {
  form: Form;
  errors: Record<string, string>;
  // setForm: Dispatch<SetStateAction<Form>>;
  dispatchForm: ActionDispatch<[action: FormAction]>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  onSubmit: (formData: FormData) => void;
}

export const formSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, { message: t("error.coupleName") }),
    date: z.string().min(1, { message: t("error.startDate") }),
    about: z.string().min(10, { message: t("error.aboutYou") }),
    picture: z.instanceof(File, { message: t("error.mainPhoto") }),
    pictures: z.array(z.instanceof(File)),
  });

const MemoizedPicturesGrid = React.memo(PicturesGrid);
const MemoizedPicture = React.memo(Picture);

export function PageForm({
  form,
  errors,
  dispatchForm,
  setErrors,
  onSubmit,
}: FormProps) {
  const t = useTranslations("Form");
  const schema = formSchema(t);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: e.target.name as "name" | "date" | "about",
      value: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const validation = schema.safeParse(form);

    if (!validation.success) {
      setErrors(
        validation.error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>)
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("date", form.date);
    formData.append("about", form.about);

    if (form.picture) {
      formData.append("picture", form.picture);
    }

    if (form.pictures.length > 0) {
      form.pictures.forEach((file) => {
        formData.append("pictures", file);
      });
    }

    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <h3 className="mb-8 text-xl">
        <span className="font-bold">{t("title")}</span>
      </h3>
      <h3 className="">{t("assistantText")}</h3>

      <form
        id="pageForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">{t("field.coupleName")}</label>
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
          <label htmlFor="date">{t("field.startDate")}</label>
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
          <label htmlFor="about">{t("field.aboutYou")}</label>
          <textarea
            id="about"
            name="about"
            rows={8}
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
                <span className="text-sm">{t("field.mainPhoto")}</span>
                <MemoizedPicture
                  picture={form.picture}
                  dispatchForm={dispatchForm}
                />
                {errors.picture && (
                  <span className="text-red-500 text-sm">{errors.picture}</span>
                )}
              </div>
            </div>

            <div className="rounded-md border-dashed border-2 border-foreground p-4">
              <span className="text-xs mb-4">{t("field.secondaryPhotos")}</span>
              <MemoizedPicturesGrid
                pictures={form.pictures}
                dispatchForm={dispatchForm}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex-1 sm:flex-none h-10 w-32 font-bold rounded-md duration-100 hover:bg-foreground flex items-center justify-center"
        >
          {t("button.back")}
        </Link>
        <button
          form="pageForm"
          className="flex-1 sm:flex-none h-10 w-32 rounded-md bg-gradient-to-r from-rose to-blue-clean font-bold"
        >
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            <span>{t("button.save")}</span>
          )}
        </button>
      </div>
    </div>
  );
}
