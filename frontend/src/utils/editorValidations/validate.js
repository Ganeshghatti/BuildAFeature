export async function buildTree(importedFiles) {
  if (!importedFiles) return [];

  const root = [];

  for (const file of importedFiles) {
    const parts = file.webkitRelativePath.split("/");
    const content = await file.text();

    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      const hiddenfiles = part.startsWith(".");
      if (hiddenfiles) continue;

      if (isFile) {
        currentLevel.push({
          name: part,
          type: "file",
          content,
        });
      } else {
        let folder = currentLevel.find(
          (node) => node.type === "folder" && node.name === part,
        );

        if (!folder) {
          folder = {
            name: part,
            type: "folder",
            children: [],
          };
          currentLevel.push(folder);
        }

        // MOVE pointer into folder
        currentLevel = folder.children;
      }
    }
  }

  return root;
}

export function flattenTree(tree, map = {}, base = "") {
  for (const node of tree) {
    const fullpath = base ? `${base}/${node.name}` : node.name;

    if (node.type == "file") {
      map[fullpath] = node.content || [];
    } else if (node.type == "folder") {
      flattenTree(node.children || [], map, fullpath);
    }
  }

  return map;
}

export async function CheckStructure(importedTreeMap, FileTreeMap) {
  if (!importedTreeMap || !FileTreeMap) return false;

  const result = {
    missing: [],
    same: [],
    extra: [],
  };

  for (const path in importedTreeMap) {
    if (!FileTreeMap[path]) {
      result.missing.push(path);
    } else if (!FileTreeMap[path] & importedTreeMap[path]) {
      result.extra.push(path);
    } else {
      result.same.push(path);
    }
  }

  return result;
}
