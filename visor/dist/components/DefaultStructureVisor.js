"use client";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  user-select: none;\n  background: ", ";\n  transition: background 0.3s ease;\n"], ["\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  user-select: none;\n  background: ", ";\n  transition: background 0.3s ease;\n"])), function (props) { return (props.darkMode ? "#0f172a" : "#fafafa"); });
var LeftPanel = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100vh;\n  width: ", "%;\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  border-right: 1px solid ", ";\n  transition: background 0.3s ease, border-color 0.3s ease;\n"], ["\n  height: 100vh;\n  width: ", "%;\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  border-right: 1px solid ", ";\n  transition: background 0.3s ease, border-color 0.3s ease;\n"])), function (props) { return props.width; }, function (props) { return (props.darkMode ? "#1e293b" : "#ffffff"); }, function (props) { return (props.darkMode ? "#334155" : "#e5e7eb"); });
var FileExplorerSection = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 65%;\n  width: 100%;\n  overflow: auto;\n  border-bottom: 1px solid\n    ", ";\n  background: ", ";\n  transition: background 0.3s ease, border-color 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"], ["\n  height: 65%;\n  width: 100%;\n  overflow: auto;\n  border-bottom: 1px solid\n    ", ";\n  background: ", ";\n  transition: background 0.3s ease, border-color 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), function (props) { return (props.darkMode ? "#334155" : "#e5e7eb"); }, function (props) { return (props.darkMode ? "#1e293b" : "#ffffff"); }, function (props) { return (props.darkMode ? "#0f172a" : "#f1f1f1"); }, function (props) { return (props.darkMode ? "#475569" : "#cbd5e1"); }, function (props) { return (props.darkMode ? "#64748b" : "#94a3b8"); });
var AttachmentsSection = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 35%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  transition: background 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"], ["\n  height: 35%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  transition: background 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), function (props) { return (props.darkMode ? "#0f172a" : "#f9fafb"); }, function (props) { return (props.darkMode ? "#020617" : "#f1f1f1"); }, function (props) { return (props.darkMode ? "#475569" : "#cbd5e1"); }, function (props) { return (props.darkMode ? "#64748b" : "#94a3b8"); });
var ResizeHandle = styled.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 5px;\n  background: ", ";\n  cursor: col-resize;\n  border: none;\n  position: relative;\n  transition: all 0.2s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 3px;\n    height: 40px;\n    background: ", ";\n    border-radius: 2px;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover {\n    background: ", ";\n\n    &::before {\n      opacity: 1;\n    }\n  }\n\n  &:active {\n    background: ", ";\n\n    &::before {\n      opacity: 1;\n      background: ", ";\n    }\n  }\n\n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  width: 5px;\n  background: ", ";\n  cursor: col-resize;\n  border: none;\n  position: relative;\n  transition: all 0.2s ease;\n\n  &::before {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 3px;\n    height: 40px;\n    background: ", ";\n    border-radius: 2px;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover {\n    background: ", ";\n\n    &::before {\n      opacity: 1;\n    }\n  }\n\n  &:active {\n    background: ", ";\n\n    &::before {\n      opacity: 1;\n      background: ", ";\n    }\n  }\n\n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"])), function (props) {
    return props.darkMode
        ? "linear-gradient(to right, #334155, #475569)"
        : "linear-gradient(to right, #e5e7eb, #d1d5db)";
}, function (props) { return (props.darkMode ? "#64748b" : "#9ca3af"); }, function (props) {
    return props.darkMode
        ? "linear-gradient(to right, #475569, #64748b)"
        : "linear-gradient(to right, #d1d5db, #9ca3af)";
}, function (props) {
    return props.darkMode
        ? "linear-gradient(to right, #64748b, #94a3b8)"
        : "linear-gradient(to right, #9ca3af, #6b7280)";
}, function (props) { return (props.darkMode ? "#cbd5e1" : "#fff"); }, function (props) { return (props.darkMode ? "#60a5fa" : "#3b82f6"); });
var RightPanel = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 100vh;\n  width: ", "%;\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  transition: background 0.3s ease;\n"], ["\n  height: 100vh;\n  width: ", "%;\n  display: flex;\n  flex-direction: column;\n  background: ", ";\n  transition: background 0.3s ease;\n"])), function (props) { return props.width; }, function (props) { return (props.darkMode ? "#0f172a" : "#f9fafb"); });
var RenderFileSection = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 65%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  border-bottom: 1px solid\n    ", ";\n  padding: 1rem;\n  transition: background 0.3s ease, border-color 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"], ["\n  height: 65%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  border-bottom: 1px solid\n    ", ";\n  padding: 1rem;\n  transition: background 0.3s ease, border-color 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), function (props) { return (props.darkMode ? "#1e293b" : "#ffffff"); }, function (props) { return (props.darkMode ? "#334155" : "#e5e7eb"); }, function (props) { return (props.darkMode ? "#0f172a" : "#f1f1f1"); }, function (props) { return (props.darkMode ? "#475569" : "#cbd5e1"); }, function (props) { return (props.darkMode ? "#64748b" : "#94a3b8"); });
var InfoFileSection = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  height: 35%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  padding: 1rem;\n  transition: background 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"], ["\n  height: 35%;\n  width: 100%;\n  overflow: auto;\n  background: ", ";\n  padding: 1rem;\n  transition: background 0.3s ease;\n\n  &::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  &::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 4px;\n\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), function (props) { return (props.darkMode ? "#0f172a" : "#f9fafb"); }, function (props) { return (props.darkMode ? "#020617" : "#f1f1f1"); }, function (props) { return (props.darkMode ? "#475569" : "#cbd5e1"); }, function (props) { return (props.darkMode ? "#64748b" : "#94a3b8"); });
export default function DefaultStructureVisor(_a) {
    var _b = _a.minWidth, minWidth = _b === void 0 ? 18 : _b, _c = _a.darkMode, darkMode = _c === void 0 ? false : _c, FileExplorer = _a.FileExplorer, Attachments = _a.Attachments, RenderFile = _a.RenderFile, InfoFile = _a.InfoFile;
    var _d = useState(25), leftWidth = _d[0], setLeftWidth = _d[1];
    var isResizing = useRef(false);
    var handleStartResize = function () {
        isResizing.current = true;
        document.body.style.cursor = "col-resize";
    };
    var handleMouseMove = useCallback(function (e) {
        if (!isResizing.current)
            return;
        var newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > minWidth && newWidth < 90)
            setLeftWidth(newWidth);
    }, [minWidth]);
    var handleMouseUp = function () {
        isResizing.current = false;
        document.body.style.cursor = "";
    };
    var handleKeyDown = function (e) {
        if (e.key === "ArrowLeft")
            setLeftWidth(function (w) { return Math.max(minWidth, w - 1); });
        if (e.key === "ArrowRight")
            setLeftWidth(function (w) { return Math.min(90, w + 1); });
    };
    useEffect(function () {
        globalThis.addEventListener("mousemove", handleMouseMove);
        globalThis.addEventListener("mouseup", handleMouseUp);
        return function () {
            globalThis.removeEventListener("mousemove", handleMouseMove);
            globalThis.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove]);
    return (React.createElement(Container, { darkMode: darkMode },
        React.createElement(LeftPanel, { width: leftWidth, darkMode: darkMode },
            React.createElement(FileExplorerSection, { darkMode: darkMode }, FileExplorer),
            React.createElement(AttachmentsSection, { darkMode: darkMode }, Attachments)),
        React.createElement(ResizeHandle, { darkMode: darkMode, "aria-label": "Ajustar tama\u00F1o del panel", onMouseDown: handleStartResize, onKeyDown: handleKeyDown }),
        React.createElement(RightPanel, { width: 100 - leftWidth, darkMode: darkMode },
            React.createElement(RenderFileSection, { darkMode: darkMode }, RenderFile),
            React.createElement(InfoFileSection, { darkMode: darkMode }, InfoFile))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
