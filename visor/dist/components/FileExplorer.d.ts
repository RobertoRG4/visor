import * as React from "react";
interface FileNode {
    name: string;
    files?: FileNode[];
    [key: string]: any;
}
interface FileExplorerProps {
    readonly darkMode?: boolean;
    readonly data?: FileNode[];
}
declare module "react" {
    interface CSSProperties {
        "--tree-view-color"?: string;
        "--tree-view-bg-color"?: string;
    }
}
export default function FileExplorer({ darkMode, data, }: FileExplorerProps): React.JSX.Element;
export {};
