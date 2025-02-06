"use client";

import { useContext, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { createPage } from "@/services/couple";
import { UserContext } from "@/contexts/UserContext";
import { useLocale } from "next-intl";
import { Form, FormAction, PageForm } from "@/components/pageForm";

export default function NewPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const locale = useLocale();

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
    const response = await createPage(formData);

    if (response.type === "success") {
      alert("Sucesso ao criar página, redirecionando!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/${locale}/${response.link}`);
    }
  };

  return (
    <PageForm
      errors={errors}
      form={form}
      dispatchForm={dispatchForm}
      setErrors={setErrors}
      onSubmit={handleSubmit}
    />
  );
}
