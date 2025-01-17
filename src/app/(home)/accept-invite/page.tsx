"use client";

import { acceptInvite } from "@/services/couple";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleInvite = async (token: string, pageId: string) => {
      const response = await acceptInvite({ token, pageId });

      setLoading(false);
      setMessage(response.message);
      if (response.type === "success") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/login");
      }
    };

    if (searchParams) {
      const token = searchParams.get("token");
      const pageId = searchParams.get("pageId");

      handleInvite(token as string, pageId as string);
    }
  }, [searchParams, router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 h-[200px] p-8 rounded-md shadow-mg bg-foreground-light flex items-center justify-center">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : (
          <h3 className="font-bold text-xl text-center">{message}</h3>
        )}
      </div>
    </div>
  );
}
