const mongoose = require('mongoose');

function slugFromTitle(title) {
  if (!title || typeof title !== 'string') return '';
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const challengeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    status: {
      type: String,
      enum: ['draft', 'live', 'archived'],
      default: 'draft',
    },
    name: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'expert', 'master'],
      required: true,
    },
    timeAllowed: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    compulsoryFeatures: {
      type: [String],
      default: [],
    },
    niceToHaveFeatures: {
      type: [String],
      default: [],
    },
    templatePath: {
      type: String,
      required: true,
      trim: true,
    },
    aiPromptPath: {
      type: String,
      required: true,
      trim: true,
    },
    scoringConfigPath: {
      type: String,
      required: true,
      trim: true,
    },
    testPath: {
      type: String,
      required: true,
      trim: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

challengeSchema.pre('save', function (next) {
  if (!this.slug || this.slug.trim() === '') {
    this.slug = slugFromTitle(this.name) || undefined;
  }
  if (this.slug) {
    this.slug = this.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

challengeSchema.index({ status: 1 });
challengeSchema.index({ difficulty: 1 });
challengeSchema.index({ type: 1 });
challengeSchema.index({ tags: 1 });
challengeSchema.index({ slug: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Challenge', challengeSchema);
module.exports.slugFromTitle = slugFromTitle;
