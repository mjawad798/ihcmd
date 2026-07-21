import {
    Essentials,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Link,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageInsertViaUrl,
    Table,
    TableToolbar,
    BlockQuote,
    MediaEmbed,
    List,
    Indent,
    IndentBlock,
} from "ckeditor5";

// Self-hosted (manual plugin composition) instead of @ckeditor/ckeditor5-build-classic:
// the prebuilt "classic" bundle only compiles in the "upload" and "assetManager"
// image-insert integrations, not "url" — so ImageInsertViaUrl has to be pulled in
// explicitly here rather than toggled on through config alone.
export const CKEDITOR_PLUGINS = [
    Essentials,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Link,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageInsertViaUrl,
    Table,
    TableToolbar,
    BlockQuote,
    MediaEmbed,
    List,
    Indent,
    IndentBlock,
];

// Central place for CKEditor configuration shared by every admin rich-text
// field (academic programs, faculty details, news, about page). Change it
// here once instead of per-form.
export const CKEDITOR_CONFIG = {
    licenseKey: "GPL",
    plugins: CKEDITOR_PLUGINS,
    toolbar: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "blockQuote",
        "mediaEmbed",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
    ],
    // Only the "url" integration is registered, so the toolbar button opens
    // straight to a URL field instead of a file-upload picker.
    image: {
        toolbar: ["imageStyle:inline", "imageStyle:block", "imageStyle:side", "|", "toggleImageCaption"],
        insert: {
            integrations: ["url"],
        },
    },
    table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
};
