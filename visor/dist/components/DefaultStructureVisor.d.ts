import React from "react";
interface Props {
    readonly minWidth?: number;
    readonly darkMode?: boolean;
    readonly FileExplorer?: React.ReactNode;
    readonly Attachments?: React.ReactNode;
    readonly RenderFile?: React.ReactNode;
    readonly InfoFile?: React.ReactNode;
}
export default function DefaultStructureVisor({ minWidth, darkMode, FileExplorer, Attachments, RenderFile, InfoFile, }: Props): React.JSX.Element;
export {};
