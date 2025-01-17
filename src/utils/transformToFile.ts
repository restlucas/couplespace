export const transformToFile = async (
  imageSrc: string | { url: string; name: string }[]
): Promise<File | File[]> => {
  let file: File | File[];

  if (typeof imageSrc === "string") {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    file = new File([blob], "couple-picture", { type: blob.type });
  } else {
    const files: File[] = [];

    for (const image of imageSrc) {
      const response = await fetch(image.url);
      const blob = await response.blob();
      files.push(new File([blob], image.name, { type: blob.type }));
    }

    file = files;
  }

  return file;
};
