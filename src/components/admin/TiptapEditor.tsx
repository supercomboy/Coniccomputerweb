"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Redo2,
  Undo2,
  Unlink,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "my-5 rounded-xl border border-slate-200 max-w-full h-auto",
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-red underline",
        },
      }),
      Placeholder.configure({
        placeholder: "Nhập nội dung bài viết tại đây... Dùng thanh công cụ phía trên để định dạng tiêu đề, danh sách hoặc chèn ảnh.",
      }),
    ],
    content: value,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[380px] px-5 py-4 text-base leading-relaxed text-ink focus:outline-none",
      },
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[430px] rounded-xl border border-border-subtle bg-surface-muted p-5 text-sm text-ink-muted">
        Đang khởi tạo trình soạn thảo...
      </div>
    );
  }

  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Nhập đường dẫn liên kết (URL):", previousUrl);
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload/", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? "Upload ảnh thất bại.");
      } else if (json.url) {
        const alt = window.prompt("Mô tả ngắn cho ảnh (Alt SEO):", file.name.replace(/\.[^.]+$/, "")) ?? "";
        editor.chain().focus().setImage({ src: json.url, alt: alt.trim() }).run();
      }
    } catch {
      setUploadError("Không thể kết nối máy chủ để upload ảnh.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const btnClass = (active?: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
      active
        ? "bg-brand-navy text-white"
        : "text-ink-muted hover:bg-slate-200/70 hover:text-ink"
    }`;

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border-subtle bg-surface-muted px-2.5 py-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title="Tiêu đề H2"
          aria-label="Tiêu đề H2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive("heading", { level: 3 }))}
          title="Tiêu đề H3"
          aria-label="Tiêu đề H3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <span className="mx-1 h-5 w-px bg-border-subtle" aria-hidden="true" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="In đậm"
          aria-label="In đậm"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="In nghiêng"
          aria-label="In nghiêng"
        >
          <Italic className="h-4 w-4" />
        </button>

        <span className="mx-1 h-5 w-px bg-border-subtle" aria-hidden="true" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Danh sách chấm tròn"
          aria-label="Danh sách chấm tròn"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Danh sách đánh số"
          aria-label="Danh sách đánh số"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Trích dẫn"
          aria-label="Trích dẫn"
        >
          <Quote className="h-4 w-4" />
        </button>

        <span className="mx-1 h-5 w-px bg-border-subtle" aria-hidden="true" />

        <button
          type="button"
          onClick={handleSetLink}
          className={btnClass(editor.isActive("link"))}
          title="Chèn / Sửa liên kết"
          aria-label="Chèn liên kết"
        >
          <Link2 className="h-4 w-4" />
        </button>
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={btnClass(false)}
            title="Gỡ liên kết"
            aria-label="Gỡ liên kết"
          >
            <Unlink className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-ink transition-colors hover:bg-slate-200/70 disabled:opacity-50"
          title="Upload và chèn ảnh vào bài viết"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4 text-brand-red" />
          )}
          <span>{uploading ? "Đang tải..." : "Chèn ảnh"}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
          className="hidden"
        />

        <span className="mx-1 h-5 w-px bg-border-subtle" aria-hidden="true" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${btnClass(false)} disabled:opacity-35`}
          title="Hoàn tác"
          aria-label="Hoàn tác"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${btnClass(false)} disabled:opacity-35`}
          title="Làm lại"
          aria-label="Làm lại"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>

      {uploadError && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-brand-red">
          {uploadError}
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
