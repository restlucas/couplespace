"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TextB, TextItalic, YoutubeLogo } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

export const TextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [url, setUrl] = useState("");
  const t = useTranslations("Page");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t("placeholder"),
      }),
      Bold,
      Italic,
      Youtube.configure({
        controls: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  useEffect(() => {
    setContent(editorContent);
  }, [editorContent, setContent]);

  useEffect(() => {
    if (editor && content === "") {
      editor.commands.clearContent(true);
    }
  }, [content, editor]);

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
          className={`w-7 h-7 flex items-center justify-center rounded-md ${
            editor.isActive("bold") ? "bg-foreground-light/50" : "bg-foreground"
          }`}
        >
          <TextB size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-7 h-7 flex items-center justify-center rounded-md ${
            editor.isActive("italic") ? "bg-foreground-light" : "bg-foreground"
          }`}
        >
          <TextItalic size={18} />
        </button>
        <button
          type="button"
          onClick={() => openModal("youtube")}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-foreground"
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
      <div className="max-w-[448px] text-white placeholder-white">
        <EditorContent editor={editor} className="outline-none" />
      </div>
    </div>
  );
};
