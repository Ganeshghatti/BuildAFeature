import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { useState } from "react";

export default function FileSidebar({
  tree,          
  onOpenFile,
  level = 0,
}) {
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
            group flex items-center gap-2 px-2 py-1.5 rounded
            cursor-pointer select-none
            text-gray-200 font-medium
            hover:bg-gray-800/70
          "
          style={indent}
        >
          <span className="w-3 text-xs text-gray-400">
            {isOpen ? <ChevronDown size={12}/> : <ChevronRight size={14}/>}
          </span>
          <span className="text-yellow-400">📁</span>

          <span className="truncate group-hover:text-white">
            {node.name}
          </span>
        </div>

        {isOpen && node.children && (
          <div className="border-l border-gray-800 ml-2">
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
        group flex items-center gap-2 px-2 py-1.5 rounded
        cursor-pointer select-none
        text-gray-400
        hover:bg-gray-800/70 hover:text-white
      "
      style={{ paddingLeft: `${level * 14 + 28}px` }}
    >
      <span className="text-gray-500"><FileText size={20}/></span>

      <span className="truncate">
        {node.name}
      </span>
    </div>
  );
}
