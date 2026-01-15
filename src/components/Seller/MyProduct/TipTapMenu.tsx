"use client"

import type React from "react"

import type { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

interface TipTapMenuProps {
  editor: Editor | null
}

const TipTapMenu: React.FC<TipTapMenuProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-100 dark:bg-[#24292E] rounded-md">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Heading"
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded ${editor.isActive("highlight") ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Highlight"
      >
        <Highlighter size={18} />
      </button>

      <div className="border-l border-gray-300"></div>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-[#f56100] text-white" : "bg-white dark:bg-[#24292E]"}`}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
    </div>
  )
}

export default TipTapMenu
