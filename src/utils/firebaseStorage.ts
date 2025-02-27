import { deleteObject, listAll } from "firebase/storage";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../lib/firebase";

// Função para fazer upload da imagem
export const uploadImage = async (
  pageId: string,
  type: string,
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `couple_images/${pageId}/${type}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      undefined,
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export const updateImage = async (
  pageId: string,
  type: string,
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `couple_images/${pageId}/${type}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      undefined,
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export const removeImage = async (pageId: string, type: string) => {
  const directoryRef = ref(storage, `couple_images/${pageId}/${type}`);
  const { items } = await listAll(directoryRef);

  const deletePromises = items.map((itemRef) => deleteObject(itemRef));
  await Promise.all(deletePromises);
};
