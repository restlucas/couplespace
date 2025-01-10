const baseUrl = typeof window === "undefined" ? process.env.NEXTAUTH_URL : "";

export const getCouple = async (userId: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getCouple&userId=${encodeURIComponent(
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

export const getCoupleDetails = async (identifier: {
  key: string;
  value: string;
}) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/couple?action=getCoupleDetails&${
        identifier.key
      }=${encodeURIComponent(identifier.value)}`,
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
