import { TextEditor } from "@/components/TextEditor";
import { PageContext } from "@/contexts/PageContext";
import { UserContext } from "@/contexts/UserContext";
import { createPublication } from "@/services/couple";
import { useTranslations } from "next-intl";
import { FormEvent, useContext, useState } from "react";

export function CreatePublication() {
  const t = useTranslations("Page");
  const { user } = useContext(UserContext);
  const { fetchPublications } = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await createPublication({ message, userId: user.id });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setMessage("");
    fetchPublications();
  };

  return (
    <div className="mb-12 bg-foreground w-full p-4 rounded-xl">
      <form
        id="newPublicationForm"
        onSubmit={handleSubmit}
        className="mb-2 space-y-4"
      >
        <TextEditor content={message} setContent={setMessage} />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="w-32 h-10 bg-gradient-to-r from-rose to-blue-clean rounded-md font-bold"
          >
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            ) : (
              <span>{t("post")}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
