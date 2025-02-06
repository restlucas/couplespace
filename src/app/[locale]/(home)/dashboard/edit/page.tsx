"use client";

import { Suspense, useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Form, FormAction, PageForm } from "@/components/pageForm";
import { getPage, updatePage } from "@/services/couple";
import { useRouter } from "next/navigation";
import { transformToFile } from "@/utils/transformToFile";
import { useLocale } from "next-intl";

export default function EditPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const locale = useLocale();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formReducer = (state: Form, action: FormAction): Form => {
    if (action.type === "SET_FORM") {
      return action.payload;
    }

    return {
      ...state,
      [action.field]: action.value,
    };
  };

  const [form, dispatchForm] = useReducer(formReducer, {
    name: "",
    date: "",
    about: "",
    picture: null,
    pictures: [],
  });

  const handleSubmit = async (formData: FormData) => {
    formData.append("userId", user.id);
    const response = await updatePage(formData);

    if (response.type === "success") {
      alert("Sucesso ao atualizar página, redirecionando!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/${locale}/${user.pageLink}`);
    }
  };

  useEffect(() => {
    const fetchPage = async (userId: string) => {
      const response = await getPage(userId);

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

      dispatchForm({ type: "SET_FORM", payload: editForm });

      setIsLoading(false);
    };

    if (user.id !== "") {
      fetchPage(user.id);
    }
  }, [user.id]);

  return (
    <Suspense>
      <div className="space-y-8">
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
          <PageForm
            errors={errors}
            form={form}
            dispatchForm={dispatchForm}
            setErrors={setErrors}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Suspense>
  );
}
