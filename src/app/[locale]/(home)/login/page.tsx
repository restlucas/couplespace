import { Metadata } from "next";
import { LoginOptions } from "./options";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Couplespace | Login",
  description: "Guarde seu amor!",
};

export default function Login() {
  const t = useTranslations("Login");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full lg:w-[500px] h-auto p-8 rounded-md bg-[#232323] shadow-lg">
        <h3 className="font-bold text-2xl  mb-2">{t("title")}</h3>
        <p className="text-sm mb-8">{t("assistantText")}</p>

        <LoginOptions />
      </div>
    </div>
  );
}
