const fs = require("fs");
const path = require("path");

class FolderStructureController {
  
  getLanguageFromExtension = (filename) => {
    const ext = path.extname(filename).toLowerCase();

    switch (ext) {
      case ".js":
        return "javascript";
      case ".jsx":
        return "javascript";
      case ".ts":
        return "typescript";
      case ".tsx":
        return "typescript";
      case ".json":
        return "json";
      case ".css":
        return "css";
      case ".scss":
        return "scss";
      case ".html":
        return "html";
      case ".md":
        return "markdown";
      case ".py":
        return "python";
      case ".java":
        return "java";
      case ".c":
        return "c";
      case ".cpp":
        return "cpp";
      case ".txt":
        return "plaintext";
      default:
        return "plaintext";
    }
  };

  readDirRecursive = (dirPath) => {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    return items.map((item) => {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        return {
          name: item.name,
          type: "folder",
          path: fullPath,
          children: this.readDirRecursive(fullPath),
        };
      }

      let content = "";
      try {
        content = fs.readFileSync(fullPath, "utf-8");
      } catch (err) {
        content = ""; 
      }

      const language = this.getLanguageFromExtension(item.name);

      return {
        name: item.name,
        type: "file",
        path: fullPath,
        content,
        language,
      };
    });
  };

  read = async (req, res) => {
    try {
      const currentdirectory = process.cwd();
      const projectRoot = path.resolve(currentdirectory, "..");
      const fullpath = path.join(projectRoot, req.body.path);

      const structure = this.readDirRecursive(fullpath);

      return res.json({ success: true, structure });
    } catch (error) {
      console.error("Read folder error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to read folder structure",
      });
    }
  };
}

module.exports = new FolderStructureController();
