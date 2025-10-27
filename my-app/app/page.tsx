"use client";
import { DefaultStructureVisor, FileExplorer, RootState } from "@adea/visor-ui";
import { useSelector } from "react-redux";

const data1 = [
  {
    name: "fisicos",
    files: [
      {
        name: "curp",
        files: [
          { name: "v1.pdf", data: { version: 1, date: "2024-01-01" } },
          { name: "v2.pdf", data: { version: 2, date: "2024-02-01" } },
        ],
      },
    ],
  },
  {
    name: "digitales",
    files: [
      {
        name: "curp",
        files: [
          {
            name: "v1.pdf",
            data: { version: 1, date: "2024-01-01", basepath: "asds" },
          },
        ],
      },
    ],
  },
];

const data2 = [
  {
    name: "curp",
    files: [
      { name: "v1.pdf", data: { version: 1 } },
      { name: "v2.pdf", data: { version: 2 } },
    ],
  },
];

const data3 = [
  {
    name: "fisicos",
    files: [
      {
        name: "curp",
        files: [{ name: "v1.pdf", data: { version: 1, basepath: "" } }],
      },
    ],
  },
];

export default function Home() {
  const selectedFile = useSelector(
    (state: RootState) => state.file.selectedFile
  );
  console.log(selectedFile);
  return (
    <div>
      <DefaultStructureVisor
        darkMode={false}
        Attachments={<>adjuntosasd</>}
        RenderFile={<>render fileasd</>}
        FileExplorer={<FileExplorer darkMode={false} data={data1} />}
        InfoFile={<div>asdsa</div>}
      />
    </div>
  );
}
