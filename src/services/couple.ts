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

export const generatePage = async (formData: FormData) => {
  try {
    const response = await fetch(`${baseUrl}/api/couple`, {
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
