import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../lib/firebase";

// Função para fazer upload da imagem
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `coupleImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progresso do upload, você pode adicionar isso se precisar mostrar progresso ao usuário
      },
      (error) => {
        reject(error);
      },
      async () => {
        // Quando o upload estiver completo
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // Retorna a URL da imagem
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
