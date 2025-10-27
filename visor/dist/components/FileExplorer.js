"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeItem, } from "@mui/x-tree-view/useTreeItem";
import { TreeItemCheckbox, TreeItemIconContainer, TreeItemLabel, } from "@mui/x-tree-view/TreeItem";
import { TreeItemIcon } from "@mui/x-tree-view/TreeItemIcon";
import { TreeItemProvider } from "@mui/x-tree-view/TreeItemProvider";
import { TreeItemDragAndDropOverlay } from "@mui/x-tree-view/TreeItemDragAndDropOverlay";
import { useTreeItemModel } from "@mui/x-tree-view/hooks";
import { GoArchive, GoFile, GoFileMedia, GoTrash } from "react-icons/go";
import { HiOutlineDocumentText, HiOutlineFolder, HiOutlineFolderOpen, } from "react-icons/hi2";
import { BsFiletypePdf, BsFileEarmarkPlay } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setSelectedFile } from "../redux/fileSlice";
var detectFileType = function (name, hasChildren) {
    if (hasChildren)
        return "folder";
    var lowerName = name.toLowerCase();
    if (lowerName.includes("pdf") || lowerName.endsWith(".pdf"))
        return "pdf";
    if (lowerName.includes("doc") ||
        lowerName.endsWith(".doc") ||
        lowerName.endsWith(".docx"))
        return "doc";
    if (lowerName.includes("image") ||
        lowerName.includes("photo") ||
        lowerName.match(/\.(jpg|jpeg|png|gif|svg|webp)$/))
        return "image";
    if (lowerName.includes("video") ||
        lowerName.match(/\.(mp4|avi|mov|wmv|flv)$/))
        return "video";
    if (lowerName.includes("trash") || lowerName.includes("papelera"))
        return "trash";
    if (lowerName.includes("bookmark") || lowerName.includes("favorito"))
        return "pinned";
    return "folder";
};
// Función para transformar los datos dinámicos a formato TreeViewBaseItem
var transformData = function (nodes, parentId) {
    if (parentId === void 0) { parentId = ""; }
    return nodes.map(function (node, index) {
        var id = parentId ? "".concat(parentId, "-").concat(index) : "".concat(index);
        var hasChildren = node.files && node.files.length > 0;
        var fileType = detectFileType(node.name, hasChildren);
        var item = {
            id: id,
            label: node.name,
            fileType: fileType,
            data: node,
        };
        if (hasChildren) {
            item.children = transformData(node.files, id);
        }
        return item;
    });
};
var DEFAULT_ITEMS = [
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
var Container = styled("div")(function (_a) {
    var darkMode = _a.darkMode;
    return ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: darkMode ? "#1e293b" : "#ffffff",
        borderRight: "1px solid ".concat(darkMode ? "#334155" : "#e5e7eb"),
        overflowX: "hidden",
        transition: "background 0.3s ease, border-color 0.3s ease",
    });
});
var Header = styled("div")(function (_a) {
    var darkMode = _a.darkMode;
    return ({
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderBottom: "1px solid ".concat(darkMode ? "#334155" : "#e5e7eb"),
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
    });
});
var TreeItemRoot = styled("li")(function (_a) {
    var darkMode = _a.darkMode;
    return ({
        listStyle: "none",
        margin: 0,
        padding: 0,
        outline: 0,
        color: darkMode ? "#cbd5e1" : "#475569",
        transition: "color 0.3s ease",
    });
});
var TreeItemContent = styled("div")(function (_a) {
    var _b;
    var darkMode = _a.darkMode;
    return (_b = {
            padding: "6px 12px",
            paddingLeft: "calc(12px + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))",
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
            }
        },
        _b["&[data-focused], &[data-selected]"] = {
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            boxShadow: darkMode
                ? "0 2px 8px rgba(59, 130, 246, 0.3)"
                : "0 2px 8px rgba(59, 130, 246, 0.2)",
            "& svg": {
                color: "#ffffff",
            },
        },
        _b["&:not([data-focused], [data-selected]):hover"] = {
            backgroundColor: darkMode
                ? alpha("#3b82f6", 0.15)
                : alpha("#3b82f6", 0.08),
            color: darkMode ? "#e2e8f0" : "#1e293b",
            transform: "translateX(2px)",
            "& svg": {
                color: darkMode ? "#60a5fa" : "#3b82f6",
            },
        },
        _b["& svg"] = {
            fontSize: "1.1rem",
            transition: "color 0.2s ease",
            color: darkMode ? "#94a3b8" : "#64748b",
            flexShrink: 0,
        },
        _b);
});
var CustomCollapse = styled(Collapse)({
    padding: 0,
});
var AnimatedCollapse = animated(CustomCollapse);
function TransitionComponent(props) {
    var style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: "translate3d(0,".concat(props.in ? 0 : 20, "px,0)"),
        },
        config: { tension: 280, friction: 26 },
    });
    return React.createElement(AnimatedCollapse, __assign({ style: style }, props));
}
function CustomLabel(_a) {
    var Icon = _a.icon, children = _a.children, expandable = _a.expandable, data = _a.data, other = __rest(_a, ["icon", "children", "expandable", "data"]);
    var dispatch = useDispatch();
    var handleClick = function () {
        if (data) {
            dispatch(setSelectedFile(data));
        }
    };
    return (React.createElement(TreeItemLabel, __assign({}, other, { sx: {
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            fontWeight: 500,
        }, onClick: handleClick }),
        Icon && React.createElement(Icon, { style: { marginRight: 0, fontSize: "inherit" } }),
        children));
}
var getIconFromFileType = function (fileType) {
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
var CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    var id = props.id, itemId = props.itemId, label = props.label, disabled = props.disabled, children = props.children, darkMode = props.darkMode, other = __rest(props, ["id", "itemId", "label", "disabled", "children", "darkMode"]);
    var _a = useTreeItem({ id: id, itemId: itemId, children: children, label: label, disabled: disabled, rootRef: ref }), getContextProviderProps = _a.getContextProviderProps, getRootProps = _a.getRootProps, getContentProps = _a.getContentProps, getIconContainerProps = _a.getIconContainerProps, getCheckboxProps = _a.getCheckboxProps, getLabelProps = _a.getLabelProps, getGroupTransitionProps = _a.getGroupTransitionProps, getDragAndDropOverlayProps = _a.getDragAndDropOverlayProps, status = _a.status;
    var item = useTreeItemModel(itemId);
    var icon;
    if (status.expandable) {
        icon = HiOutlineFolder;
    }
    else if (item.fileType) {
        icon = getIconFromFileType(item.fileType);
    }
    return (React.createElement(TreeItemProvider, __assign({}, getContextProviderProps()),
        React.createElement(TreeItemRoot, __assign({}, getRootProps(other), { darkMode: darkMode }),
            React.createElement(TreeItemContent, __assign({}, getContentProps(), { darkMode: darkMode }),
                React.createElement(TreeItemIconContainer, __assign({}, getIconContainerProps()),
                    React.createElement(TreeItemIcon, { status: status })),
                React.createElement(TreeItemCheckbox, __assign({}, getCheckboxProps())),
                React.createElement(CustomLabel, __assign({}, getLabelProps({
                    icon: icon,
                    expandable: status.expandable && status.expanded,
                }), { data: item.data })),
                React.createElement(TreeItemDragAndDropOverlay, __assign({}, getDragAndDropOverlayProps()))),
            children && React.createElement(TransitionComponent, __assign({}, getGroupTransitionProps())))));
});
export default function FileExplorer(_a) {
    var _b = _a.darkMode, darkMode = _b === void 0 ? false : _b, data = _a.data;
    // Transformar los datos proporcionados o usar los datos por defecto
    var items = React.useMemo(function () {
        if (!data || data.length === 0) {
            return DEFAULT_ITEMS;
        }
        return transformData(data);
    }, [data]);
    // Obtener los IDs de los primeros dos niveles para expandir por defecto
    var defaultExpandedItems = React.useMemo(function () {
        var expanded = [];
        if (items.length > 0) {
            expanded.push(items[0].id);
            if (items[0].children && items[0].children.length > 0) {
                expanded.push(items[0].children[0].id);
            }
        }
        return expanded;
    }, [items]);
    var defaultSelectedItem = React.useMemo(function () {
        if (items.length > 0 && items[0].children && items[0].children.length > 0) {
            return items[0].children[0].id;
        }
        return items.length > 0 ? items[0].id : undefined;
    }, [items]);
    return (React.createElement(Container, { darkMode: darkMode },
        React.createElement(Header, { darkMode: darkMode },
            React.createElement(GoArchive, null),
            "Archivos"),
        React.createElement("div", { style: {
                flex: 1,
                overflow: "hidden",
                padding: "8px 0",
            } },
            React.createElement(RichTreeView, { items: items, defaultExpandedItems: defaultExpandedItems, defaultSelectedItems: defaultSelectedItem, sx: {
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
                }, slots: {
                    item: function (props) { return (React.createElement(CustomTreeItem, __assign({}, props, { darkMode: darkMode }))); },
                }, itemChildrenIndentation: 24 }))));
}
