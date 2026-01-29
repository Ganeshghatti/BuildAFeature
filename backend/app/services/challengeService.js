const fs = require('fs');
const path = require('path');
const config = require('../core/config');
const challengeRepository = require('../repositories/challengeRepository');

let cachedChallenges = null;

function readChallengesFromFile(forceRefresh = false) {
  if (!forceRefresh && cachedChallenges) return cachedChallenges;
  const filePath = config.challengesIndexPath;
  if (!fs.existsSync(filePath)) {
    cachedChallenges = [];
    return cachedChallenges;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
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
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
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
    thumbnailUrl: obj.thumbnailUrl ?? '',
    tags: obj.tags ?? [],
    compulsoryFeatures: obj.compulsoryFeatures ?? [],
    niceToHaveFeatures: obj.niceToHaveFeatures ?? [],
    templatePath: obj.templatePath,
    aiPromptPath: obj.aiPromptPath,
    scoringConfigPath: obj.scoringConfigPath,
    testPath: obj.testPath,
    version: obj.version ?? 1,
    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : new Date().toISOString(),
  };
}

class ChallengeService {
  listLive(filters = {}) {
    const all = readChallengesFromFile();
    let list = all.filter((c) => c.status === 'live');
    if (filters.difficulty) list = list.filter((c) => c.difficulty === filters.difficulty);
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
        (c.slug && (c.slug === id || String(c.slug) === id))
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
}

module.exports = new ChallengeService();
