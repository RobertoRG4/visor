"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "@emotion/styled";

interface Props {
  readonly minWidth?: number;
  readonly darkMode?: boolean;
  readonly FileExplorer?: React.ReactNode;
  readonly Attachments?: React.ReactNode;
  readonly RenderFile?: React.ReactNode;
  readonly InfoFile?: React.ReactNode;
}

interface ThemedProps {
  darkMode: boolean;
}

const Container = styled.div<ThemedProps>`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  background: ${(props) => (props.darkMode ? "#0f172a" : "#fafafa")};
  transition: background 0.3s ease;
`;

const LeftPanel = styled.div<{ width: number; darkMode: boolean }>`
  height: 100vh;
  width: ${(props) => props.width}%;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.darkMode ? "#1e293b" : "#ffffff")};
  border-right: 1px solid ${(props) => (props.darkMode ? "#334155" : "#e5e7eb")};
  transition: background 0.3s ease, border-color 0.3s ease;
`;

const FileExplorerSection = styled.div<ThemedProps>`
  height: 65%;
  width: 100%;
  overflow: auto;
  border-bottom: 1px solid
    ${(props) => (props.darkMode ? "#334155" : "#e5e7eb")};
  background: ${(props) => (props.darkMode ? "#1e293b" : "#ffffff")};
  transition: background 0.3s ease, border-color 0.3s ease;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? "#0f172a" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? "#475569" : "#cbd5e1")};
    border-radius: 4px;

    &:hover {
      background: ${(props) => (props.darkMode ? "#64748b" : "#94a3b8")};
    }
  }
`;

const AttachmentsSection = styled.div<ThemedProps>`
  height: 35%;
  width: 100%;
  overflow: auto;
  background: ${(props) => (props.darkMode ? "#0f172a" : "#f9fafb")};
  transition: background 0.3s ease;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? "#020617" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? "#475569" : "#cbd5e1")};
    border-radius: 4px;

    &:hover {
      background: ${(props) => (props.darkMode ? "#64748b" : "#94a3b8")};
    }
  }
`;

const ResizeHandle = styled.button<ThemedProps>`
  width: 5px;
  background: ${(props) =>
    props.darkMode
      ? "linear-gradient(to right, #334155, #475569)"
      : "linear-gradient(to right, #e5e7eb, #d1d5db)"};
  cursor: col-resize;
  border: none;
  position: relative;
  transition: all 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
    height: 40px;
    background: ${(props) => (props.darkMode ? "#64748b" : "#9ca3af")};
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: ${(props) =>
      props.darkMode
        ? "linear-gradient(to right, #475569, #64748b)"
        : "linear-gradient(to right, #d1d5db, #9ca3af)"};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    background: ${(props) =>
      props.darkMode
        ? "linear-gradient(to right, #64748b, #94a3b8)"
        : "linear-gradient(to right, #9ca3af, #6b7280)"};

    &::before {
      opacity: 1;
      background: ${(props) => (props.darkMode ? "#cbd5e1" : "#fff")};
    }
  }

  &:focus-visible {
    outline: 2px solid ${(props) => (props.darkMode ? "#60a5fa" : "#3b82f6")};
    outline-offset: 2px;
  }
`;

const RightPanel = styled.div<{ width: number; darkMode: boolean }>`
  height: 100vh;
  width: ${(props) => props.width}%;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.darkMode ? "#0f172a" : "#f9fafb")};
  transition: background 0.3s ease;
`;

const RenderFileSection = styled.div<ThemedProps>`
  height: 65%;
  width: 100%;
  overflow: auto;
  background: ${(props) => (props.darkMode ? "#1e293b" : "#ffffff")};
  border-bottom: 1px solid
    ${(props) => (props.darkMode ? "#334155" : "#e5e7eb")};
  padding: 1rem;
  transition: background 0.3s ease, border-color 0.3s ease;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? "#0f172a" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? "#475569" : "#cbd5e1")};
    border-radius: 4px;

    &:hover {
      background: ${(props) => (props.darkMode ? "#64748b" : "#94a3b8")};
    }
  }
`;

const InfoFileSection = styled.div<ThemedProps>`
  height: 35%;
  width: 100%;
  overflow: auto;
  background: ${(props) => (props.darkMode ? "#0f172a" : "#f9fafb")};
  padding: 1rem;
  transition: background 0.3s ease;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? "#020617" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? "#475569" : "#cbd5e1")};
    border-radius: 4px;

    &:hover {
      background: ${(props) => (props.darkMode ? "#64748b" : "#94a3b8")};
    }
  }
`;

export default function DefaultStructureVisor({
  minWidth = 18,
  darkMode = false,
  FileExplorer,
  Attachments,
  RenderFile,
  InfoFile,
}: Props) {
  const [leftWidth, setLeftWidth] = useState(25);
  const isResizing = useRef(false);

  const handleStartResize = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > minWidth && newWidth < 90) setLeftWidth(newWidth);
    },
    [minWidth]
  );

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") setLeftWidth((w) => Math.max(minWidth, w - 1));
    if (e.key === "ArrowRight") setLeftWidth((w) => Math.min(90, w + 1));
  };

  useEffect(() => {
    globalThis.addEventListener("mousemove", handleMouseMove);
    globalThis.addEventListener("mouseup", handleMouseUp);
    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <Container darkMode={darkMode}>
      <LeftPanel width={leftWidth} darkMode={darkMode}>
        <FileExplorerSection darkMode={darkMode}>
          {FileExplorer}
        </FileExplorerSection>
        <AttachmentsSection darkMode={darkMode}>
          {Attachments}
        </AttachmentsSection>
      </LeftPanel>

      <ResizeHandle
        darkMode={darkMode}
        aria-label="Ajustar tamaño del panel"
        onMouseDown={handleStartResize}
        onKeyDown={handleKeyDown}
      />

      <RightPanel width={100 - leftWidth} darkMode={darkMode}>
        <RenderFileSection darkMode={darkMode}>{RenderFile}</RenderFileSection>
        <InfoFileSection darkMode={darkMode}>{InfoFile}</InfoFileSection>
      </RightPanel>
    </Container>
  );
}
