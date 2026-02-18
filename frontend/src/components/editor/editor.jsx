import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Layers,
  BookOpen,
  HelpCircle,
  Code2,
  MoreVertical,
  X,
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
    console.log(challenge);
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
    const challenge = id.split("-");
    const challengeName = (challenge[1] + " " + challenge[2])
      .split(" ")
      .join("-");
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
  }, []);

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

  const getFileName = (path) => path?.split("\\").pop() || path;

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
    <div className="w-full min-h-screen flex bg-[#09090b] text-zinc-400 font-sans overflow-hidden rounded-xl">
      <aside className="w-14 flex flex-col items-center py-4 bg-[#09090b] border-r border-[#27272a] shrink-0 z-20">
        <div className="flex flex-col gap-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
            <Layers size={18} />
          </div>

          <button className="p-2 rounded-lg hover:bg-[#27272a]/50 text-zinc-500">
            <BookOpen size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#27272a]/50 text-zinc-500">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
          <img
            src="https://picsum.photos/40/40"
            alt="User"
            className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
          />
          <span className="text-[10px] font-medium text-zinc-500">Jon</span>
        </div>
      </aside>

      <aside className="w-64 bg-[#0c0c0e] flex flex-col border-r border-[#27272a] shrink-0">
        <div className="h-14 flex items-center justify-between px-5 border-b border-[#27272a]">
          <span className="text-sm font-medium text-zinc-200">Files</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <FileSidebar tree={FileStructureTree} onOpenFile={handleOpenFile} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b]">
        <header className="h-12 bg-[#09090b] border-b border-[#27272a] flex items-center justify-between pr-4 select-none">
          <div className="flex items-center h-full overflow-x-auto no-scrollbar">
            {activePath && viewfile && (
              <div className="h-full px-4 flex items-center gap-2 bg-[#1e1e20] border-r border-[#27272a] border-t-2 border-t-emerald-500 text-zinc-200 min-w-[140px] text-xs font-medium">
                <Code2 size={14} className="text-blue-400" />
                {getFileName(activePath)}
                <button className="ml-auto hover:bg-zinc-700 rounded p-0.5">
                  <X size={12} onClick={fileViewHandler} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 px-4">
            {endTime && !timeOver && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <Countdown
                  date={endTime}
                  onComplete={submitHandler}
                  renderer={({ minutes, seconds }) => (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                      <span>
                        {minutes}:{String(seconds).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                />
              </div>
            )}

            <button
              disabled={timeOver}
              onClick={submitHandler}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm
                ${
                  timeOver
                    ? "bg-zinc-700 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                }`}
            >
              {timeOver ? "Submitted" : "Submit"}
            </button>

            {/* MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-zinc-900 border-zinc-800 text-zinc-200"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => setimportfolder(true)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Import
                    </button>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <button
                      onClick={ExportHandler}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Export
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* EDITOR */}
        <div className="flex-1 relative bg-[#131315]">
          <Editor
            height="100%"
            path={activePath || "empty"}
            language={activeFile?.language}
            value={activeFile?.content || "// Select a file to view content"}
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
            <DialogContent className="sm:max-w-md text-white">
              <DialogHeader>
                <DialogTitle>Import Folder</DialogTitle>
                <DialogDescription>
                  Select or confirm importing your folder structure.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-200">
                    Upload Folder / Files
                  </label>

                  <input
                    type="file"
                    multiple
                    webkitdirectory="true"
                    directory="true"
                    className="block w-full text-sm text-zinc-300
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-medium
                 file:bg-emerald-600 file:text-white
                 hover:file:bg-emerald-500
                 cursor-pointer"
                    onChange={(e) => {
                      const files = e.target.files;
                      console.log("Selected files:", files);
                      setimportStructure(files);
                    }}
                  />

                  <p className="text-xs text-zinc-500">
                    You can select an entire folder or multiple files.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setimportfolder(false)}
                    className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={Importhandler}
                    className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-sm text-white"
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
