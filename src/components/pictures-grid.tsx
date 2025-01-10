import { Form } from "@/app/(home)/dashboard/create/page";
import { CameraPlus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PictureGridProps {
  pictures?: File[];
  setForm: Dispatch<SetStateAction<Form>>;
}

type Preview = { name: string; url: string };
type ImagePreviewProps = {
  preview: Preview;
  onRemove: (name: string) => void;
};
type EmptyPreviewProps = { htmlFor: string };

const ImagePreview = ({ preview, onRemove }: ImagePreviewProps) => (
  <label
    onClick={() => onRemove(preview.name)}
    className="flex items-center justify-center rounded-md relative cursor-pointer group overflow-hidden"
    style={{ aspectRatio: "1" }}
  >
    <div className="h-full w-full z-50 hidden duration-150 group-hover:flex">
      <div className="w-full h-full flex items-center justify-center bg-foreground-light/90">
        <Trash size={24} />
      </div>
    </div>
    <Image
      src={preview.url}
      alt="Picture"
      layout="fill"
      objectFit="cover"
      className="rounded-md z-30"
    />
  </label>
);

const EmptyPreview = ({ htmlFor }: EmptyPreviewProps) => (
  <label
    className="flex items-center justify-center rounded-md bg-foreground duration-100 hover:bg-foreground-light cursor-pointer"
    htmlFor={htmlFor}
    style={{ aspectRatio: "1" }}
  >
    <CameraPlus size={24} />
  </label>
);

export function PicturesGrid({ pictures, setForm }: PictureGridProps) {
  const [imagesPreview, setImagesPreview] = useState<(Preview | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;

        setImagesPreview((prevState) => {
          // Verificar se a imagem já foi adicionada
          const exists = prevState.some((item) => item?.name === file.name);
          if (exists) return prevState;

          const index = prevState.findIndex((item) => item === null);
          if (index !== -1) {
            const updatedPreviews = [...prevState];
            updatedPreviews[index] = { url: preview, name: file.name };
            return updatedPreviews;
          }
          return prevState;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setForm((prevState) => ({
      ...prevState,
      pictures: [
        ...prevState.pictures,
        ...files.map((file) => ({
          id: null,
          file,
        })),
      ],
    }));

    processFiles(files);
  };

  const removeImage = (imageName: string) => {
    setForm((prevState) => ({
      ...prevState,
      pictures: prevState.pictures.filter(
        (image) => image.file.name !== imageName
      ),
    }));

    const filteredImages = imagesPreview.filter(
      (image) => image && image.name !== imageName
    );

    while (filteredImages.length < 6) {
      filteredImages.push(null);
    }

    setImagesPreview(filteredImages);
  };
  useEffect(() => {
    if (pictures && pictures.length > 0) {
      processFiles(pictures);
    }
  }, [pictures]);

  return (
    <>
      <input
        id="pictures"
        type="file"
        name="fileInput"
        accept="image/*"
        onChange={handleChange}
        multiple
        hidden
      />
      <div className="grid grid-cols-3 gap-2">
        {imagesPreview.map((preview, index) =>
          preview ? (
            <div key={index}>
              <ImagePreview preview={preview} onRemove={removeImage} />
            </div>
          ) : (
            <div key={index}>
              <EmptyPreview htmlFor="pictures" />
            </div>
          )
        )}
      </div>
    </>
  );
}
