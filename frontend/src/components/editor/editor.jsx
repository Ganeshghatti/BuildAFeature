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

import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClient } from "@/api/client";
import FileSidebar from "./fileExplorer/fileSidebar";
import Button from "../ui/Button";
import Countdown from "react-countdown";
import { challengeEndpoints } from "@/api/endpoints/challenges";

export default function MonacoEditor() {
  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("challengeId");
  const submissionId = searchParams.get("submissionId");

  const [challenge, setChallenge] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeOver, setTimeOver] = useState(false);

  const [viewfile, setviewfile] = useState(true);
  const [backendTree, setBackendTree] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [activePath, setActivePath] = useState(null);

  const editorRef = useRef(null);
  const submitRef = useRef(false);
  const navigate = useNavigate();


  
  useEffect(() => {
    if (!challengeId) return;

    challengeEndpoints
      .getById(challengeId)
      .then((res) => {
        if (res.data?.challenge) {
          setChallenge(res.data.challenge);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch challenge:", err);
      });
  }, [challengeId]);


  useEffect(() => {
    if (!challenge?.timeAllowed) return;

    const stored = localStorage.getItem("ChallengeEndtime");

    if (stored) {
      setEndTime(Number(stored));
    } else {
      const newEnd = Date.now() + challenge.timeAllowed * 60 * 1000;
      localStorage.setItem("ChallengeEndtime", newEnd);
      setEndTime(newEnd);
    }
  }, [challenge]);

 
  useEffect(() => {
    apiClient
      .post("/folderstructure/get_structure", {
        path: "challenges/infinite-scroll",
      })
      .then((res) => {
        const structure = res.structure || res.data?.structure || [];
        setBackendTree(structure);
      })
      .catch((err) => {
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

  const handleOpenFile = (path) => {
    const file = findFileByPath(backendTree, path);
    if (!file) return;

    if (activeFile && editorRef.current) {
      const currentContent = editorRef.current.getValue();
      setBackendTree((prev) =>
        updateFileTree(prev, currentContent, activePath),
      );
    }

    setActiveFile(file);
    setviewfile(true);
    setActivePath(file.path);
  };

  const getFileName = (path) => path?.split("\\").pop() || path;

  const submitHandler = () => {
    if (submitRef.current) return;
    submitRef.current = true;

    setTimeOver(true);
    localStorage.removeItem("ChallengeEndtime");

    console.log("Redirecting to:", `/challenge_submitted/${challengeId}`);

    navigate(`/challenge_submitted/${challengeId}`);
  };

  const fileViewHandler = () => {
    if (activeFile) {
      setActiveFile(null);
      setviewfile(false);
    }
  };

  const ExportHandler = async () => {};
  const Importhandler = async () => {};
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
          <FileSidebar tree={backendTree} onOpenFile={handleOpenFile} />
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
            {endTime && (
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
                      onClick={Importhandler}
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
            }}
          />
        </div>
      </main>
    </div>
  );
}
