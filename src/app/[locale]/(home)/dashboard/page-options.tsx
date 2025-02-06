"use client";

import { UserContext } from "@/contexts/UserContext";
import { inviteUser, sendQrCode } from "@/services/couple";
import { Eye, PencilSimple, QrCode, UserPlus } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const InvitePartnerModal = ({
  userId,
  setIsShowingModal,
}: {
  userId: string;
  setIsShowingModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Dashboard");
  const divRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsShowingModal(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const locale = window.location.href.split("/")[3];
    setIsLoading(true);
    const response = await inviteUser({ locale, userEmail, userId });
    setIsLoading(false);

    if (response.type === "success") {
      setMessage(response.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.refresh();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute z-[100] top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black/70">
      <div
        ref={divRef}
        className="animate-fade-right space-y-8 rounded-md w-[400px] p-4 bg-foreground shadow-md"
      >
        <h3 className="mb-8 text-xl">
          <span className="font-bold">{t("invite.text")}</span>
        </h3>

        <form
          id="partnerForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <label htmlFor="partnerEmail">{t("invite.label")}</label>
          <input
            id="partnerEmail"
            name="partnerEmail"
            type="email"
            value={userEmail || ""}
            onChange={(e) => setUserEmail(e.target.value)}
            className="h-10 px-4 rounded-md bg-foreground-light"
            required
          />
        </form>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setIsShowingModal(false)}
            className="flex-1 sm:flex-none h-10 w-32 font-bold rounded-md duration-100 hover:bg-foreground flex items-center justify-center"
          >
            {t("button.back")}
          </button>
          <button
            form="partnerForm"
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

        {message && (
          <p className="font-semibold w-full text-center text-emerald-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export function PageOptions() {
  const { user, loading } = useContext(UserContext);
  const t = useTranslations("Dashboard");
  const [showingInvitePartnerModal, setShowingInvitePartnerModal] =
    useState<boolean>(false);

  const handleQrCode = async () => {
    await sendQrCode(user.id);
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="mb-8 w-40 h-10 rounded-md bg-foreground" />

        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-2">
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
          <div className="h-10 rounded-md bg-foreground" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {user.pageLink ? (
          <>
            <h3 className="mb-8 text-xl">
              {t("welcome")} <span className="font-bold">{user.name}</span>
            </h3>
            <div>
              <div className="flex-1 w-full grid auto-rows-[100px] grid-cols-1 sm:grid-cols-2 gap-2 rounded-md font-bold">
                <Link
                  href={`/dashboard/edit`}
                  className="flex items-center justify-center gap-2 w-full h-full shadow-md rounded-md border-4 border-foreground duration-200 hover:bg-foreground"
                >
                  <PencilSimple size={20} />
                  <span>{t("button.edit")}</span>
                </Link>
                <Link
                  href={`${user.pageLink}`}
                  className="flex items-center justify-center gap-2 w-full h-full shadow-md rounded-md border-4 border-foreground duration-200 hover:bg-foreground"
                >
                  <Eye size={20} />
                  <span>{t("button.show")}</span>
                </Link>
                <button
                  onClick={() => setShowingInvitePartnerModal(true)}
                  className="flex items-center justify-center gap-2 w-full h-full shadow-md rounded-md border-4 border-foreground duration-200 hover:bg-foreground"
                >
                  <UserPlus size={20} />
                  <span>{t("button.invite")}</span>
                </button>
                <button
                  onClick={handleQrCode}
                  className="flex items-center justify-center gap-2 w-full h-full shadow-md rounded-md border-4 border-foreground duration-200 hover:bg-foreground"
                >
                  <QrCode size={20} />
                  <span>{t("button.qrcode")}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 justify-center gap-2"></div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-8">
            <h3 className="font-bold text-2xl">{t("noPageFound")}</h3>
            <Link
              href="/dashboard/create"
              className="px-8 py-3 rounded-md font-bold bg-gradient-to-r from-rose to-blue-clean"
            >
              {t("button.create")}
            </Link>
          </div>
        )}
      </div>

      {showingInvitePartnerModal && (
        <InvitePartnerModal
          userId={user.id}
          setIsShowingModal={setShowingInvitePartnerModal}
        />
      )}
    </>
  );
}
