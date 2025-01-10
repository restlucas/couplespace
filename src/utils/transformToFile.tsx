export const transformToFile = async (
  imageSrc: string | { url: string }[]
): Promise<File | File[]> => {
  let file: File | File[];

  if (typeof imageSrc === "string") {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    file = new File([blob], "couple-picture", { type: blob.type });
  } else {
    let index = 1;
    const files: File[] = [];

    for (const image of imageSrc) {
      const response = await fetch(image.url);
      const blob = await response.blob();
      files.push(new File([blob], `image-${index}`, { type: blob.type }));
      index++;
    }

    file = files;
  }

  return file;
};
