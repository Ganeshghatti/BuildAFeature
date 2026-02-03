const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const config = require("../core/config");
const challengeRepository = require("../repositories/challengeRepository");
const { arch } = require("os");

let cachedChallenges = null;

function readChallengesFromFile(forceRefresh = false) {
  if (!forceRefresh && cachedChallenges) return cachedChallenges;
  const filePath = config.challengesIndexPath;
  if (!fs.existsSync(filePath)) {
    cachedChallenges = [];
    return cachedChallenges;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const list = JSON.parse(raw);
  cachedChallenges = Array.isArray(list) ? list : [];
  return cachedChallenges;
}

function writeChallengesToList(list) {
  const filePath = config.challengesIndexPath;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
  cachedChallenges = list;
}

function toJsonShape(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id: String(obj._id),
    slug: obj.slug ?? null,
    status: obj.status,
    name: obj.name,
    description: obj.description,
    difficulty: obj.difficulty,
    timeAllowed: obj.timeAllowed,
    type: obj.type,
    thumbnailUrl: obj.thumbnailUrl ?? "",
    tags: obj.tags ?? [],
    compulsoryFeatures: obj.compulsoryFeatures ?? [],
    niceToHaveFeatures: obj.niceToHaveFeatures ?? [],
    templatePath: obj.templatePath,
    aiPromptPath: obj.aiPromptPath,
    scoringConfigPath: obj.scoringConfigPath,
    testPath: obj.testPath,
    version: obj.version ?? 1,
    createdAt: obj.createdAt
      ? new Date(obj.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: obj.updatedAt
      ? new Date(obj.updatedAt).toISOString()
      : new Date().toISOString(),
  };
}

function addTreeToArchive(archive, tree, basePath = "") {
  for (const node of tree) {
    const entryPath = basePath ? `${basePath}/${node.name}` : node.name;

    if (node.type === "folder") {
      addTreeToArchive(archive, node.children || [], entryPath);
    } else if (node.type === "file") {
      archive.append(node.content || "", {
        name: entryPath.replace(/\\/g, "/"), // safety for Windows
      });
    }
  }
}



class ChallengeService {
  listLive(filters = {}) {
    const all = readChallengesFromFile();
    let list = all.filter((c) => c.status === "live");
    if (filters.difficulty)
      list = list.filter((c) => c.difficulty === filters.difficulty);
    if (filters.type) list = list.filter((c) => c.type === filters.type);
    return list;
  }

  getById(idOrSlug) {
    const all = readChallengesFromFile();
    const id = String(idOrSlug);
    const challenge = all.find(
      (c) =>
        c._id === id ||
        String(c._id) === id ||
        (c.slug && (c.slug === id || String(c.slug) === id)),
    );
    return challenge || null;
  }

  async listAll(filters = {}, options = {}) {
    return await challengeRepository.findAll(filters, options);
  }

  async getByIdFromDb(id) {
    return await challengeRepository.findById(id);
  }

  async create(data) {
    const challenge = await challengeRepository.create(data);
    const list = readChallengesFromFile(true);
    list.push(toJsonShape(challenge));
    writeChallengesToList(list);
    return challenge;
  }

  async update(id, data) {
    return await challengeRepository.update(id, data);
  }

  async delete(id) {
    return await challengeRepository.delete(id);
  }

  async zipdownload(req, res, data) {
    try {
      const fileStructure = data;

      res.setHeader("Content-Type", "application/zip");


      // it tells the browser that files has to be download and its name is project.zip
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="project.zip"',
      );
      
      // here simply i add the compression level of zip 
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.on("error", (err) => {
        console.error("ZIP error:", err);
        if (!res.headersSent) {
          res.status(500).end();
        }
      });

      // stream zip to response directly 
      archive.pipe(res);

      // Add virtual tree
      addTreeToArchive(archive, fileStructure, "project");

      // Finalize zip
      archive.finalize();
    } catch (err) {
      console.error("Direct ZIP error:", err);
      res.status(500).json({ success: false });
    }
  }
}

module.exports = new ChallengeService();
