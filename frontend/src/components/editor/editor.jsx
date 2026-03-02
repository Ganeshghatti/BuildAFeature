import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Layers,
  BookOpen,
  HelpCircle,
  Code2,
  MoreVertical,
  X,
  Import,
  ArrowUpToLine,
  ArrowDownToLine,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useParams } from "react-router-dom";
import { apiClient } from "@/api/client";
import FileSidebar from "./fileExplorer/fileSidebar";
import Button from "../ui/Button";
import Countdown from "react-countdown";
import { challengeEndpoints } from "@/api/endpoints/challenges";
import {
  buildTree,
  CheckStructure,
  flattenTree,
} from "@/utils/editorValidations/validate";
import toast from "react-hot-toast";

export default function MonacoEditor() {
  // const [searchParams] = useSearchParams();
  // const submissionId = searchParams.get("submissionId");
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeOver, setTimeOver] = useState(false);
  const [importfolder, setimportfolder] = useState(false);
  const [importStructure, setimportStructure] = useState([]);

  const [viewfile, setviewfile] = useState(true);
  const [FileStructureTree, setFileStructureTree] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [activePath, setActivePath] = useState(null);

  const editorRef = useRef(null);
  const submitRef = useRef(false);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    challengeEndpoints
      .getById(id)
      .then((res) => {
        console.log("response", res);
        if (res.data?.challenge) {
          setChallenge(res.data.challenge);
        }
      })
      .catch((err) => {
        toast.error("Failed to Load Challenge");
        console.error("Failed to fetch challenge:", err);
      });
  }, [id]);

  useEffect(() => {
    if (!challenge?.timeAllowed) return;

    const stored = localStorage.getItem("ChallengeEndtime");

    // challemgs -- all challenges
    // /challenge/:slug -- challenge info
    // /challenge/:slug/editor?submissionid=submissionid - editor open

    if (stored) {
      setEndTime(Number(stored));
    } else {
      const newEnd = Date.now() + challenge.timeAllowed * 60 * 1000;
      localStorage.setItem("ChallengeEndtime", newEnd);
      setEndTime(newEnd);
    }
  }, [challenge]);

  useEffect(() => {
    if (!challenge?.filename) return;
    const challengeName = challenge?.filename;
    apiClient
      .post("/folderstructure/get_structure", {
        path: `challenges/${challengeName}`,
      })
      .then((res) => {
        const structure = res.structure || res.data?.structure || [];
        console.log("strcture", structure);
        const get_structure = structure.filter((st) => st.name === "template");
        setFileStructureTree(get_structure);
      })
      .catch((err) => {
        toast.error("Failed to load Folder structure");
        console.error("Failed to load folder structure:", err);
      });
  }, [challenge]);

  const findFileByPath = (nodes, path) => {
    for (const node of nodes) {
      if (node.path === path && node.type === "file") return node;
      if (node.children) {
        const found = findFileByPath(node.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFileTree = (tree, content, path) => {
    return tree.map((node) => {
      if (node.type === "folder") {
        return {
          ...node,
          children: updateFileTree(node.children, content, path),
        };
      }

      if (node.type === "file" && node.path === path) {
        return { ...node, content };
      }

      return node;
    });
  };

  const saveCurrentFile = () => {
    if (activeFile && editorRef.current) {
      const content = editorRef.current.getValue();

      setFileStructureTree((prev) => updateFileTree(prev, content, activePath));
    }
  };

  const handleOpenFile = (path) => {
    saveCurrentFile();
    console.log(path);

    const file = findFileByPath(FileStructureTree, path);
    if (!file) return;
    setActiveFile(file);
    setviewfile(true);
    setActivePath(file.path);
  };

  const getFileName = (path) => {
    const pathx = path?.split("/").pop();
    return pathx?.split("\\").pop();
  };

  const submitHandler = () => {
    if (submitRef.current) return;
    submitRef.current = true;

    saveCurrentFile();

    setTimeOver(true);
    localStorage.removeItem("ChallengeEndtime");
    // navigate(`/challenge_submitted/${challengeId}` , {replace : true});
  };

  useEffect(() => {
    console.log("updated", FileStructureTree);
  }, [FileStructureTree]);

  const fileViewHandler = () => {
    if (activeFile) {
      setActiveFile(null);
      setviewfile(false);
    }
  };

  const getLatestTreeForExport = () => {
    if (!activeFile || !editorRef.current) return FileStructureTree;

    const latestContent = editorRef.current.getValue();

    return updateFileTree(FileStructureTree, latestContent, activePath);
  };

  const ExportHandler = async () => {
    try {
      const latestTree = getLatestTreeForExport();
      setFileStructureTree(latestTree);

      const blob = await challengeEndpoints.convertToZip(latestTree);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "project.zip";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      console.log("zip downloaded successfully");
    } catch (err) {
      console.error("zip export failed:", err);
    } finally {
      console.log("finally");
    }
  };

  async function buildTreeFromFileList(fileList) {
    const root = [];

    for (const file of fileList) {
      const parts = file.webkitRelativePath.split("/");
      let current = root;

      const fileContent = await file.text();

      parts.forEach((part, index) => {
        let existing = current.find((n) => n.name === part);
        const isFile = index === parts.length - 1;

        if (!existing) {
          existing = {
            name: part,
            type: isFile ? "file" : "folder",
            path: parts.slice(0, index + 1).join("/"),
            children: isFile ? undefined : [],
            content: isFile ? fileContent : undefined,
          };

          current.push(existing);
        }

        if (!isFile) {
          current = existing.children;
        }
      });
    }

    return root;
  }

  const Importhandler = async () => {
    const tree = await buildTree(importStructure);

    const importTreeMap = flattenTree(tree);
    const mainTreeMap = flattenTree(FileStructureTree);
    const result = await CheckStructure(importTreeMap, mainTreeMap);
    console.log(mainTreeMap, importTreeMap);
    setimportfolder(false);

    if (result.missing.length > 0)
      return alert("file structured should have to be same !!");
    else if (result.extra.length > 0)
      return alert("file content should be same as InitialFiles in editor");
    else {
      alert("files loads successfully");
      const tree = await buildTreeFromFileList(importStructure);
      setFileStructureTree(tree);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#09090b] text-zinc-400 font-sans overflow-hidden">
      {/* <aside className="w-14 flex flex-col items-center py-4 bg-[#09090b] border-r border-[#27272a] shrink-0 z-20">
        <div className="flex flex-col gap-6">
          <div className="w-8 h-8 bg-[#f75d31]/10 text-[#f75d31] flex items-center justify-center mb-2">
            <Layers size={16} />
          </div>

          <button className="p-2 hover:bg-white/5 text-white/30 hover:text-white/70 transition-colors">
            <BookOpen size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 text-white/30 hover:text-white/70 transition-colors">
            <HelpCircle size={18} />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="w-7 h-7 bg-[#302630] border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/50">
            U
          </div>
        </div>
      </aside> */}

      {/* ── File sidebar ── */}
      <aside className="w-64 bg-[#100e10] flex flex-col border-r border-white/8 shrink-0">
        <div className="h-14 flex items-center justify-between px-5 border-b border-white/8">
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-white/25 mb-0.5">
              Files
            </p>
            {challenge?.name && (
              <p className="text-xs font-medium text-white/60 truncate max-w-45">
                {challenge.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <FileSidebar tree={FileStructureTree} onOpenFile={handleOpenFile} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#0d0b0d]">
        {/* ── Top tab bar ── */}
        <header className="h-12 bg-[#0d0b0d] border-b border-white/8 flex items-center justify-between pr-4 select-none">
          <div className="flex items-center h-full overflow-x-auto no-scrollbar">
            {activePath && viewfile && (
              <div className="h-full px-4 flex items-center gap-2 bg-[#1a171a] border-r border-white/8 border-t-2 border-t-[#f75d31] text-white/80 min-w-35 text-xs font-medium">
                <Code2 size={13} className="text-[#f75d31]/70" />
                {getFileName(activePath)}
                <button className="ml-auto hover:bg-white/8 p-0.5 transition-colors">
                  <X size={12} onClick={fileViewHandler} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-4">
            {endTime && !timeOver && (
              <Countdown
                date={endTime}
                onComplete={submitHandler}
                renderer={({ minutes, seconds }) => (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#f75d31]/20 bg-[#f75d31]/5 text-[#f75d31] text-xs font-mono">
                    <span>
                      {minutes}:{String(seconds).padStart(2, "0")}
                    </span>
                  </div>
                )}
              />
            )}

            <button
              disabled={timeOver}
              onClick={submitHandler}
              className={`px-5 py-1.5 text-xs font-medium tracking-widest uppercase transition-colors
                ${
                  timeOver
                    ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/8"
                    : "bg-[#f75d31] text-white hover:bg-[#e04f27] border border-[#f75d31]"
                }`}
            >
              {timeOver ? "Submitted" : "Submit"}
            </button>

            <button
              onClick={() => setimportfolder(true)}
              className="w-full text-left px-3 flex gap-1 items-center justify-center py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Import <ArrowDownToLine size={20} className="text-blue-500" />
            </button>
            <button
              onClick={ExportHandler}
              className="w-full text-left px-3 flex gap-1 items-center justify-center py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Export <ArrowUpToLine size={20} className="text-blue-500"/>
            </button>
          </div>
        </header>

        {/* EDITOR */}
        <div className="flex-1 relative bg-[#110f11]">
          <Editor
            height="100%"
            path={activePath || "empty"}
            language={activeFile?.language}
            value={activeFile?.content || "// Select a file from the sidebar"}
            onMount={(editor) => (editorRef.current = editor)}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 24, bottom: 24 },
              readOnly: timeOver,
              contextmenu: false,
              autoClosingBrackets: true,
              autoClosingComments: true,
              autoClosingQuotes: true,
              autoIndent: true,
              inlineSuggest: true,
              quickSuggestions: true,
              autoClosingOvertype: true,
              autoSurround: true,
            }}
          />
        </div>

        <div>
          <Dialog open={importfolder} onOpenChange={setimportfolder}>
            <DialogContent className="bg-[#100e10] border border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-white font-medium text-base">
                  Import Folder
                </DialogTitle>
                <DialogDescription className="text-white/40 text-sm">
                  Select or confirm importing your folder structure.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-widest uppercase text-white/30">
                    Upload Folder / Files
                  </label>

                  <input
                    type="file"
                    multiple
                    webkitdirectory="true"
                    directory="true"
                    className="block w-full text-sm text-white/50
                 file:mr-4 file:py-2 file:px-4
                 file:border-0
                 file:text-xs file:font-medium file:uppercase file:tracking-widest
                 file:bg-[#f75d31] file:text-white
                 hover:file:bg-[#e04f27]
                 cursor-pointer"
                    onChange={(e) => {
                      const files = e.target.files;
                      console.log("Selected files:", files);
                      setimportStructure(files);
                    }}
                  />

                  <p className="text-xs text-white/25">
                    You can select an entire folder or multiple files.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setimportfolder(false)}
                    className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={Importhandler}
                    className="px-4 py-2 bg-[#f75d31] hover:bg-[#e04f27] text-sm text-white transition-colors"
                  >
                    Import
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
