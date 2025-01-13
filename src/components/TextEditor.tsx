"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Youtube from "@tiptap/extension-youtube";
import { Dispatch, SetStateAction, useState } from "react";

import Spotify from "../extensions/Spotify";
import { TextB, TextItalic, YoutubeLogo } from "@phosphor-icons/react";

export const TextEditor = ({
  setContent,
}: {
  setContent: Dispatch<SetStateAction<string>>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "youtube"
  const [url, setUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Youtube.configure({
        controls: true,
      }),
      Spotify,
    ],
    content: "<p>Sua mensagem aqui...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const openModal = (type: "youtube") => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setUrl("");
  };

  const addEmbed = () => {
    if (modalType === "youtube") {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
          width: 440,
          height: 280,
        })
        .run();
    }
    closeModal();
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            editor.isActive("bold") ? "bg-foreground-light/50" : "bg-foreground"
          }`}
        >
          <TextB size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            editor.isActive("italic") ? "bg-foreground-light" : "bg-foreground"
          }`}
        >
          <TextItalic size={18} />
        </button>
        <button
          type="button"
          onClick={() => openModal("youtube")}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-foreground"
        >
          <YoutubeLogo size={18} />
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-foreground-light p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalType === "youtube"
                ? "Adicionar Vídeo do Youtube"
                : modalType === "spotify"
                ? "Adicionar Música do Spotify"
                : ""}
            </h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Insira a URL aqui"
              className="w-full px-3 py-2 border rounded-md mb-4 bg-foreground text-white"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-foreground rounded-md font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={addEmbed}
                className="px-4 py-2 bg-gradient-to-r from-rose to-blue-clean rounded-md font-bold"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="p-4 rounded-md bg-foreground outline-none">
        <EditorContent editor={editor} className="outline-none" />
      </div>
    </div>
  );
};
