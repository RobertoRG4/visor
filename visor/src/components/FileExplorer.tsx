"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import Collapse from "@mui/material/Collapse";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  useTreeItem,
  UseTreeItemParameters,
} from "@mui/x-tree-view/useTreeItem";
import {
  TreeItemCheckbox,
  TreeItemIconContainer,
  TreeItemLabel,
} from "@mui/x-tree-view/TreeItem";
import { TreeItemIcon } from "@mui/x-tree-view/TreeItemIcon";
import { TreeItemProvider } from "@mui/x-tree-view/TreeItemProvider";
import { TreeItemDragAndDropOverlay } from "@mui/x-tree-view/TreeItemDragAndDropOverlay";
import { useTreeItemModel } from "@mui/x-tree-view/hooks";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { GoArchive, GoFile, GoFileMedia, GoTrash } from "react-icons/go";
import {
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineFolderOpen,
} from "react-icons/hi2";
import { BsFiletypePdf, BsFileEarmarkPlay } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/index";
import { setSelectedFile } from "../redux/fileSlice";

type FileType =
  | "image"
  | "pdf"
  | "doc"
  | "video"
  | "folder"
  | "pinned"
  | "trash";

type ExtendedTreeItemProps = {
  fileType?: FileType;
  id: string;
  label: string;
  data?: any;
};

interface FileNode {
  name: string;
  files?: FileNode[];
  [key: string]: any;
}

interface FileExplorerProps {
  readonly darkMode?: boolean;
  readonly data?: FileNode[];
}

const detectFileType = (
  name: string,
  hasChildren: boolean | undefined
): FileType => {
  if (hasChildren) return "folder";

  const lowerName = name.toLowerCase();

  if (lowerName.includes("pdf") || lowerName.endsWith(".pdf")) return "pdf";
  if (
    lowerName.includes("doc") ||
    lowerName.endsWith(".doc") ||
    lowerName.endsWith(".docx")
  )
    return "doc";
  if (
    lowerName.includes("image") ||
    lowerName.includes("photo") ||
    lowerName.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)
  )
    return "image";
  if (
    lowerName.includes("video") ||
    lowerName.match(/\.(mp4|avi|mov|wmv|flv)$/)
  )
    return "video";
  if (lowerName.includes("trash") || lowerName.includes("papelera"))
    return "trash";
  if (lowerName.includes("bookmark") || lowerName.includes("favorito"))
    return "pinned";

  return "folder";
};

// Función para transformar los datos dinámicos a formato TreeViewBaseItem
const transformData = (
  nodes: FileNode[],
  parentId: string = ""
): TreeViewBaseItem<ExtendedTreeItemProps>[] => {
  return nodes.map((node, index) => {
    const id = parentId ? `${parentId}-${index}` : `${index}`;
    const hasChildren = node.files && node.files.length > 0;
    const fileType = detectFileType(node.name, hasChildren);

    const item: TreeViewBaseItem<ExtendedTreeItemProps> = {
      id,
      label: node.name,
      fileType,
      data: node,
    };

    if (hasChildren) {
      item.children = transformData(node.files!, id);
    }

    return item;
  });
};

const DEFAULT_ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: "1",
    label: "Documents",
    fileType: "folder",
    children: [
      {
        id: "1.1",
        label: "Company",
        fileType: "folder",
        children: [
          { id: "1.1.1", label: "Invoice.pdf", fileType: "pdf" },
          { id: "1.1.2", label: "Meeting notes.doc", fileType: "doc" },
          { id: "1.1.3", label: "Tasks list.doc", fileType: "doc" },
        ],
      },
      { id: "1.2", label: "Personal", fileType: "folder" },
      { id: "1.3", label: "Group photo.jpg", fileType: "image" },
    ],
  },
  {
    id: "2",
    label: "Bookmarked",
    fileType: "pinned",
    children: [
      { id: "2.1", label: "Learning materials", fileType: "folder" },
      { id: "2.2", label: "News", fileType: "folder" },
    ],
  },
];

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

const Container = styled("div")<{ darkMode: boolean }>(({ darkMode }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: darkMode ? "#1e293b" : "#ffffff",
  borderRight: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
  overflowX: "hidden",
  transition: "background 0.3s ease, border-color 0.3s ease",
}));

const Header = styled("div")<{ darkMode: boolean }>(({ darkMode }) => ({
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderBottom: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
  background: darkMode ? "#0f172a" : "#f9fafb",
  color: darkMode ? "#e2e8f0" : "#1e293b",
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "0.025em",
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: "1.25rem",
    color: darkMode ? "#60a5fa" : "#3b82f6",
  },
}));

const TreeItemRoot = styled("li")<{ darkMode: boolean }>(({ darkMode }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0,
  color: darkMode ? "#cbd5e1" : "#475569",
  transition: "color 0.3s ease",
}));

const TreeItemContent = styled("div")<{ darkMode: boolean }>(
  ({ darkMode }) => ({
    padding: "6px 12px",
    paddingLeft: `calc(12px + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
    width: "100%",
    minWidth: "fit-content",
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    flexDirection: "row-reverse",
    borderRadius: "8px",
    margin: "2px 8px",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",

    "&[data-expanded]:not([data-focused], [data-selected]) .labelIcon": {
      color: darkMode ? "#60a5fa" : "#3b82f6",
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        left: "16px",
        top: "44px",
        height: "calc(100% - 48px)",
        width: "2px",
        backgroundColor: darkMode ? "#334155" : "#e5e7eb",
        borderRadius: "1px",
      },
    },

    [`&[data-focused], &[data-selected]`]: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      boxShadow: darkMode
        ? "0 2px 8px rgba(59, 130, 246, 0.3)"
        : "0 2px 8px rgba(59, 130, 246, 0.2)",
      "& svg": {
        color: "#ffffff",
      },
    },

    "&:not([data-focused], [data-selected]):hover": {
      backgroundColor: darkMode
        ? alpha("#3b82f6", 0.15)
        : alpha("#3b82f6", 0.08),
      color: darkMode ? "#e2e8f0" : "#1e293b",
      transform: "translateX(2px)",
      "& svg": {
        color: darkMode ? "#60a5fa" : "#3b82f6",
      },
    },

    "& svg": {
      fontSize: "1.1rem",
      transition: "color 0.2s ease",
      color: darkMode ? "#94a3b8" : "#64748b",
      flexShrink: 0,
    },
  })
);

const CustomCollapse = styled(Collapse)({
  padding: 0,
});

const AnimatedCollapse = animated(CustomCollapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
    config: { tension: 280, friction: 26 },
  });

  return <AnimatedCollapse style={style} {...props} />;
}
interface CustomLabelProps {
  readonly children: React.ReactNode;
  readonly icon?: React.ComponentType<{ style?: React.CSSProperties }>;
  readonly expandable?: boolean;
}

function CustomLabel({
  icon: Icon,
  children,
  expandable,
  data,
  ...other
}: CustomLabelProps & { data?: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    if (data) {
      dispatch(setSelectedFile(data));
    }
  };
  return (
    <TreeItemLabel
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        fontWeight: 500,
      }}
      onClick={handleClick}
    >
      {Icon && <Icon style={{ marginRight: 0, fontSize: "inherit" }} />}
      {children}
    </TreeItemLabel>
  );
}

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case "image":
      return GoFileMedia;
    case "pdf":
      return BsFiletypePdf;
    case "doc":
      return HiOutlineDocumentText;
    case "video":
      return BsFileEarmarkPlay;
    case "folder":
      return HiOutlineFolder;
    case "pinned":
      return HiOutlineFolderOpen;
    case "trash":
      return GoTrash;
    default:
      return GoFile;
  }
};

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {
  darkMode: boolean;
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, darkMode, ...other } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const item = useTreeItemModel<ExtendedTreeItemProps>(itemId)!;

  let icon;
  if (status.expandable) {
    icon = HiOutlineFolder;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps(other)} darkMode={darkMode}>
        <TreeItemContent {...getContentProps()} darkMode={darkMode}>
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              expandable: status.expandable && status.expanded,
            })}
            data={item.data}
          />
          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default function FileExplorer({
  darkMode = false,
  data,
}: FileExplorerProps) {
  // Transformar los datos proporcionados o usar los datos por defecto
  const items = React.useMemo(() => {
    if (!data || data.length === 0) {
      return DEFAULT_ITEMS;
    }
    return transformData(data);
  }, [data]);

  // Obtener los IDs de los primeros dos niveles para expandir por defecto
  const defaultExpandedItems = React.useMemo(() => {
    const expanded: string[] = [];
    if (items.length > 0) {
      expanded.push(items[0].id);
      if (items[0].children && items[0].children.length > 0) {
        expanded.push(items[0].children[0].id);
      }
    }
    return expanded;
  }, [items]);

  const defaultSelectedItem = React.useMemo(() => {
    if (items.length > 0 && items[0].children && items[0].children.length > 0) {
      return items[0].children[0].id;
    }
    return items.length > 0 ? items[0].id : undefined;
  }, [items]);

  return (
    <Container darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <GoArchive />
        Archivos
      </Header>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "8px 0",
        }}
      >
        <RichTreeView
          items={items}
          defaultExpandedItems={defaultExpandedItems}
          defaultSelectedItems={defaultSelectedItem}
          sx={{
            height: "100%",
            flexGrow: 1,
            width: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
            scrollbarColor: darkMode
              ? "#475569 transparent"
              : "#cbd5e1 transparent",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: darkMode ? "#475569" : "#cbd5e1",
              borderRadius: "4px",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: darkMode ? "#64748b" : "#94a3b8",
              },
            },
          }}
          slots={{
            item: (props: any) => (
              <CustomTreeItem {...props} darkMode={darkMode} />
            ),
          }}
          itemChildrenIndentation={24}
        />
      </div>
    </Container>
  );
}
