import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Couplespace | FAQ",
  description: "Descubra como aproveitar ao máximo o Couplespace!",
};

export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] animate-fade-right p-8 bg-foreground-light rounded-md shadow-md space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">{t("purpose.title")}</h3>
          <p>{t("purpose.description")}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            {t("howDoesItWork.title")}
          </h3>
          <div className="flex flex-col gap-4 items-start justify-center">
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 1"
              >
                1
              </span>
              <span>{t("howDoesItWork.firstStep")}</span>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 2"
              >
                2
              </span>
              <span>{t("howDoesItWork.secondStep")}</span>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 3"
              >
                3
              </span>
              <span>{t("howDoesItWork.thirdStep")}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">{t("fileStorage.title")}</h3>
          <p>{t("fileStorage.description")}</p>
        </div>
      </div>
    </section>
  );
}
