import { CameraPlus } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import { FormAction } from "./pageForm";

interface PictureProps {
  picture: File | null | undefined;
  dispatchForm: Dispatch<FormAction>;
}

export function Picture({ picture, dispatchForm }: PictureProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    dispatchForm({
      type: "UPDATE_FIELD",
      field: "picture",
      value: file || null,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;

        setImagePreview(preview);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;

        setImagePreview(preview);
      };
      reader.readAsDataURL(picture);
    } else {
      setImagePreview(null);
    }
  }, [picture]);

  return (
    <>
      <input
        id="picture"
        name="picture"
        type="file"
        onChange={handleChange}
        hidden
      />
      <label
        htmlFor="picture"
        className="w-20 h-20 sm:w-36 sm:h-36 rounded-full bg-foreground flex items-center justify-center cursor-pointer relative overflow-hidden group"
      >
        {imagePreview ? (
          <>
            <div className="h-full w-full z-50 hidden duration-150 group-hover:flex">
              <div className="w-full h-full flex items-center justify-center bg-foreground-light/90">
                <CameraPlus size={24} />
              </div>
            </div>
            <Image
              src={imagePreview}
              alt="Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-md z-30"
            />
          </>
        ) : (
          <CameraPlus size={24} className="fill-white/35" />
        )}
      </label>
    </>
  );
}
