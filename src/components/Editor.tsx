
"use client";

import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ImageIcon from "@mui/icons-material/Image";
import TitleIcon from "@mui/icons-material/Title";
import { useRef, useState, useEffect } from "react";
import SubscriptIcon from "@mui/icons-material/Subscript";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SuperscriptIcon from "@mui/icons-material/Superscript";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import {
  Box,
  Select,
  Tooltip,
  MenuItem,
  IconButton,
  SelectChangeEvent, // ✅ Correct import
} from "@mui/material";
type Props = {
  value: string;
  onChange: (value: string) => void;
};

const FONT_FAMILIES = [
  { label: "Font", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: '"Times New Roman", serif' },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Courier New", value: '"Courier New", monospace' },
];

const FONT_SIZES = [
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
];

const BLOCK_STYLES = [
  { label: "Normal", value: "paragraph" },
  { label: "Heading 1", value: "heading-1" },
  { label: "Heading 2", value: "heading-2" },
  { label: "Quote", value: "blockquote" },
  { label: "Code block", value: "code-block" },
];

function getSelectionElement(): HTMLElement | null {
  const selection = window.getSelection();
  const node = selection?.anchorNode;

  if (!node) {
    return null;
  }

  return node.nodeType === Node.ELEMENT_NODE
    ? (node as HTMLElement)
    : node.parentElement;
}

function closestTagName(element: HTMLElement | null, tags: string[]): string | null {
  let current: HTMLElement | null = element;

  while (current) {
    if (tags.includes(current.tagName.toLowerCase())) {
      return current.tagName.toLowerCase();
    }
    current = current.parentElement;
  }

  return null;
}

function normalizeFontElements(root: HTMLElement, family?: string, size?: string) {
  const fonts = Array.from(root.querySelectorAll("font"));

  fonts.forEach((fontElement) => {
    const font = fontElement as HTMLFontElement;
    const span = document.createElement("span");
    const styleParts: string[] = [];

    const face = family || font.face;
    const fontSize = size || font.size;

    if (face) {
      styleParts.push(`font-family: ${face}`);
    }

    if (fontSize) {
      styleParts.push(`font-size: ${fontSize}`);
    }

    if (font.color) {
      styleParts.push(`color: ${font.color}`);
    }

    span.setAttribute("style", styleParts.join("; "));
    span.innerHTML = font.innerHTML;
    font.replaceWith(span);
  });
}

function getStyleValue(property: "fontFamily" | "fontSize" | "color" | "backgroundColor") {
  const element = getSelectionElement();
  if (!element) {
    return "";
  }

  return window.getComputedStyle(element).getPropertyValue(
    property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
  );
}

function normalizeColorInput(value: string) {
  return value.trim();
}

export default function Editor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [, forceUpdate] = useState(0);

  const syncValue = () => {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (editor.innerHTML !== value) {
      editor.innerHTML = value || "";
    }
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => {
      forceUpdate((current) => current + 1);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const toolbarButtonSx = (active: boolean) => ({
    width: 36,
    height: 36,
    borderRadius: 1.5,
    border: "1px solid",
    borderColor: active ? "primary.main" : "divider",
    color: active ? "primary.main" : "text.secondary",
    bgcolor: active ? "action.selected" : "background.paper",
    "&:hover": {
      bgcolor: active ? "action.selected" : "action.hover",
    },
  });

  const selectSx = {
    minWidth: 88,
    height: 36,
    bgcolor: "background.paper",
    "& .MuiSelect-select": {
      py: 0.8,
      fontSize: 13,
    },
  };

  const currentFontFamily = (() => {
    const value = getStyleValue("fontFamily");
    return value ? value.replace(/["']/g, "") : "";
  })();

  const currentFontSize = (() => {
    const value = getStyleValue("fontSize");
    return value || "16px";
  })();

  const currentTextColor = getStyleValue("color");
  const currentHighlightColor = getStyleValue("backgroundColor");

  const currentBlockStyle = (() => {
    const element = getSelectionElement();
    const tag = closestTagName(element, ["h1", "h2", "blockquote", "pre"]);

    if (tag === "h1") return "heading-1";
    if (tag === "h2") return "heading-2";
    if (tag === "blockquote") return "blockquote";
    if (tag === "pre") return "code-block";
    return "paragraph";
  })();

  const run = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) {
      normalizeFontElements(editorRef.current);
    }
    syncValue();
    forceUpdate((current) => current + 1);
  };

  const handleLink = () => {
    const existingSelection = window.getSelection();
    const selectionText = existingSelection?.toString() ?? "";
    if (!selectionText) {
      return;
    }

    const currentLink = closestTagName(getSelectionElement(), ["a"]);
    if (currentLink) {
      run("unlink");
      return;
    }

    const url = window.prompt("Enter URL");
    if (url) {
      run("createLink", url);
    }
  };

  const handleImage = () => {
    const src = window.prompt("Enter image URL");
    if (!src) {
      return;
    }

    const alt = window.prompt("Alt text", "") || "";
    editorRef.current?.focus();
    document.execCommand(
      "insertHTML",
      false,
      `<img src="${src.replace(/"/g, "&quot;")}" alt="${alt.replace(/"/g, "&quot;")}" style="max-width:100%;height:auto;display:block;" />`,
    );
    syncValue();
  };

  const handleFontFamily = (event: SelectChangeEvent<string>) => {
    const nextValue = event.target.value;
    editorRef.current?.focus();
    document.execCommand("fontName", false, nextValue || "inherit");
    if (editorRef.current) {
      normalizeFontElements(editorRef.current, nextValue || undefined);
    }
    syncValue();
    forceUpdate((current) => current + 1);
  };

  const handleFontSize = (event: SelectChangeEvent<string>) => {
    const nextValue = event.target.value;
    editorRef.current?.focus();
    document.execCommand("fontSize", false, "7");
    if (editorRef.current) {
      normalizeFontElements(editorRef.current, undefined, nextValue || undefined);
    }
    syncValue();
    forceUpdate((current) => current + 1);
  };

  const handleBlockStyle = (event: SelectChangeEvent<string>) => {
    const nextValue = event.target.value;

    if (nextValue === "paragraph") {
      run("formatBlock", "p");
      return;
    }

    if (nextValue === "heading-1") {
      run("formatBlock", "h1");
      return;
    }

    if (nextValue === "heading-2") {
      run("formatBlock", "h2");
      return;
    }

    if (nextValue === "blockquote") {
      run("formatBlock", "blockquote");
      return;
    }

    if (nextValue === "code-block") {
      run("formatBlock", "pre");
    }
  };

  const handleTextColor = () => {
    const color = window.prompt("Enter a text color (hex or CSS color)", currentTextColor || "#111827");
    if (!color) return;
    run("foreColor", normalizeColorInput(color));
  };

  const handleHighlightColor = () => {
    const color = window.prompt(
      "Enter a highlight color (hex or CSS color)",
      currentHighlightColor || "#FEF3C7",
    );
    if (!color) return;
    run("hiliteColor", normalizeColorInput(color));
  };

  const canUndo = document.queryCommandEnabled("undo");
  const canRedo = document.queryCommandEnabled("redo");
  const linkActive = Boolean(closestTagName(getSelectionElement(), ["a"]));

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          p: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Select value={currentFontFamily} onChange={handleFontFamily} size="small" sx={selectSx}>
          {FONT_FAMILIES.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Select value={currentFontSize} onChange={handleFontSize} size="small" sx={selectSx}>
          {FONT_SIZES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Select value={currentBlockStyle} onChange={handleBlockStyle} size="small" sx={selectSx}>
          {BLOCK_STYLES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Tooltip title="Bold">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("bold")} aria-pressed={document.queryCommandState("bold")} sx={toolbarButtonSx(document.queryCommandState("bold"))}>
            <FormatBoldIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("italic")} aria-pressed={document.queryCommandState("italic")} sx={toolbarButtonSx(document.queryCommandState("italic"))}>
            <FormatItalicIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("underline")} aria-pressed={document.queryCommandState("underline")} sx={toolbarButtonSx(document.queryCommandState("underline"))}>
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Strikethrough">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("strikeThrough")} aria-pressed={document.queryCommandState("strikeThrough")} sx={toolbarButtonSx(document.queryCommandState("strikeThrough"))}>
            <FormatStrikethroughIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Text color">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleTextColor} aria-pressed={Boolean(currentTextColor)} sx={toolbarButtonSx(Boolean(currentTextColor))}>
            <FormatColorTextIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Highlight">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleHighlightColor} aria-pressed={Boolean(currentHighlightColor)} sx={toolbarButtonSx(Boolean(currentHighlightColor))}>
            <FormatColorFillIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet list">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("insertUnorderedList")} aria-pressed={document.queryCommandState("insertUnorderedList")} sx={toolbarButtonSx(document.queryCommandState("insertUnorderedList"))}>
            <FormatListBulletedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered list">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("insertOrderedList")} aria-pressed={document.queryCommandState("insertOrderedList")} sx={toolbarButtonSx(document.queryCommandState("insertOrderedList"))}>
            <FormatListNumberedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align left">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("justifyLeft")} aria-pressed={document.queryCommandState("justifyLeft")} sx={toolbarButtonSx(document.queryCommandState("justifyLeft"))}>
            <FormatAlignLeftIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align center">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("justifyCenter")} aria-pressed={document.queryCommandState("justifyCenter")} sx={toolbarButtonSx(document.queryCommandState("justifyCenter"))}>
            <FormatAlignCenterIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align right">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("justifyRight")} aria-pressed={document.queryCommandState("justifyRight")} sx={toolbarButtonSx(document.queryCommandState("justifyRight"))}>
            <FormatAlignRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Justify">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("justifyFull")} aria-pressed={document.queryCommandState("justifyFull")} sx={toolbarButtonSx(document.queryCommandState("justifyFull"))}>
            <FormatAlignJustifyIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Superscript">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("superscript")} aria-pressed={document.queryCommandState("superscript")} sx={toolbarButtonSx(document.queryCommandState("superscript"))}>
            <SuperscriptIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Subscript">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("subscript")} aria-pressed={document.queryCommandState("subscript")} sx={toolbarButtonSx(document.queryCommandState("subscript"))}>
            <SubscriptIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Inline code">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "pre")} aria-pressed={currentBlockStyle === "code-block"} sx={toolbarButtonSx(currentBlockStyle === "code-block")}>
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "blockquote")} aria-pressed={currentBlockStyle === "blockquote"} sx={toolbarButtonSx(currentBlockStyle === "blockquote")}>
            <FormatQuoteIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert image">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleImage} sx={toolbarButtonSx(false)}>
            <ImageIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Link">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleLink} aria-pressed={linkActive} sx={toolbarButtonSx(linkActive)}>
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Undo">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => document.execCommand("undo")} disabled={!canUndo} sx={toolbarButtonSx(false)}>
            <UndoIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => document.execCommand("redo")} disabled={!canRedo} sx={toolbarButtonSx(false)}>
            <RedoIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Paragraph">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "p")} aria-pressed={currentBlockStyle === "paragraph"} sx={toolbarButtonSx(currentBlockStyle === "paragraph")}>
            <TextFieldsIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Heading 2">
          <IconButton type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run("formatBlock", "h2")} aria-pressed={currentBlockStyle === "heading-2"} sx={toolbarButtonSx(currentBlockStyle === "heading-2")}>
            <TitleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          p: 1.5,
          minHeight: 250,
          "& .editor-surface": {
            outline: "none",
            minHeight: 220,
            lineHeight: 1.8,
            cursor: "text",
            "& p": { m: 0 },
            "& img": {
              maxWidth: "100%",
              borderRadius: 1,
              my: 1,
              display: "block",
            },
          },
        }}
      >
        <Box
          ref={editorRef}
          className="editor-surface"
          contentEditable
          suppressContentEditableWarning
          onInput={syncValue}
          onBlur={syncValue}
          onKeyUp={() => forceUpdate((current) => current + 1)}
          onMouseUp={() => forceUpdate((current) => current + 1)}
          sx={{
            fontSize: 14,
          }}
        />
      </Box>
    </Box>
  );
}
