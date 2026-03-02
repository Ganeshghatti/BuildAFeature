import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";

export default function FileSidebar({ tree, onOpenFile, level = 0 }) {
  return (
    <div className="space-y-0.5">
      {tree.map((node) => (
        <SidebarNode
          key={node.path}
          node={node}
          onOpenFile={onOpenFile}
          level={level}
        />
      ))}
    </div>
  );
}

function SidebarNode({ node, onOpenFile, level }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";

  const indent = { paddingLeft: `${level * 14 + 10}px` };

  if (isFolder) {
    return (
      <div className="flex flex-col">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            group flex items-center gap-2 py-1.5
            cursor-pointer select-none
            text-white/50 hover:text-white/80
            hover:bg-white/5 transition-colors
          "
          style={indent}
        >
          <span className="w-3 text-white/25 shrink-0">
            {isOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
          </span>
          {isOpen ? (
            <FolderOpen size={14} className="text-[#f75d31]/60 shrink-0" />
          ) : (
            <Folder size={14} className="text-[#f75d31]/40 shrink-0" />
          )}
          <span className="truncate text-xs font-medium group-hover:text-white/90">
            {node.name}
          </span>
        </div>

        {isOpen && node.children && (
          <div className="border-l border-white/6 ml-3">
            <FileSidebar
              tree={node.children}
              onOpenFile={onOpenFile}
              level={level + 1}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpenFile(node.path)}
      className="
        group flex items-center gap-2 py-1.5
        cursor-pointer select-none
        text-white/35 hover:text-white/70
        hover:bg-white/5 transition-colors
      "
      style={{ paddingLeft: `${level * 14 + 28}px` }}
    >
      <FileText size={13} className="text-white/20 shrink-0" />
      <span className="truncate text-xs">{node.name}</span>
    </div>
  );
}
