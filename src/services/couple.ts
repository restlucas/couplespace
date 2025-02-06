const baseUrl = typeof window === "undefined" ? process.env.NEXTAUTH_URL : "";

export const getPageLink = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getPageLink&userId=${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on fetch page:", error);
      return {
        type: "error",
        message: "Error on fetch page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const getPage = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getPage&userId=${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on fetch page:", error);
      return {
        type: "error",
        message: "Error on fetch page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const getPageDetails = async (
  pageRandomId: string,
  pageSlug: string
) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getPageDetails&pageRandomId=${pageRandomId}&pageSlug=${pageSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on fetch page:", error);
      return {
        type: "error",
        message: "Error on fetch page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const getPagePublications = async (
  pageRandomId: string,
  pageSlug: string
) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getPagePublications&pageRandomId=${pageRandomId}&pageSlug=${pageSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on fetch page:", error);
      return {
        type: "error",
        message: "Error on fetch page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const getPartnerEmail = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getPartnerEmail&userId=${encodeURIComponent(
        userId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on fetch partner email:", error);
      return {
        type: "error",
        message: "Error on fetch partner email",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const createPage = async (formData: FormData) => {
  try {
    const response = await fetch(`${baseUrl}/api/couple?action=createPage`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on generate new page:", error);
      return {
        type: "error",
        message: "Error on generate new page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const createPublication = async (data: {
  message: string;
  userId: string;
}) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=createPublication`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on create new publication:", error);
      return {
        type: "error",
        message: "Error on create new publication",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const updatePage = async (formData: FormData) => {
  try {
    const response = await fetch(`${baseUrl}/api/couple?action=updatePage`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on generate new page:", error);
      return {
        type: "error",
        message: "Error on generate new page",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const inviteUser = async (data: {
  locale: string;
  userEmail: string;
  userId: string;
}) => {
  const response = await fetch(`${baseUrl}/api/couple?action=inviteUser`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const acceptInvite = async (data: { token: string; pageId: string }) => {
  const response = await fetch(`${baseUrl}/api/couple?action=acceptInvite`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const sendQrCode = async (userId: string) => {
  try {
    const response = await fetch("/api/qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error on sending QrCode:", error);
      return {
        type: "error",
        message: "Error on sending QrCode",
      };
    } else {
      console.error("Unknown error", error);
    }
  }
};
