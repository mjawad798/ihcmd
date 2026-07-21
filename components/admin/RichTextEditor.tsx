"use client";
import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { CKEDITOR_CONFIG } from "@/lib/ckeditorConfig";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
    // Only used as the editor's initial content. Feeding `value` back in as a
    // reactive `data` prop makes CKEditor call setData() on every keystroke,
    // which resets the selection and breaks toggle commands like lists.
    const initialValue = useRef(value);

    return (
        <div className="rich-text-editor">
            <CKEditor
                editor={ClassicEditor}
                config={CKEDITOR_CONFIG}
                data={initialValue.current}
                onChange={(_, editor) => onChange(editor.getData())}
            />
        </div>
    );
}
