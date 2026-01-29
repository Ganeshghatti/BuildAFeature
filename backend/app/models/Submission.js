const mongoose = require('mongoose');

const testCaseResultSchema = new mongoose.Schema(
  {
    filePath: { type: String, required: true },
    result: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    anonymousId: {
      type: String,
      trim: true,
      maxlength: 1024,
      default: null,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    status: {
      type: String,
      enum: ['in_progress', 'under_review', 'completed'],
      default: 'in_progress',
    },
    challengeVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    vfsSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    aiScores: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    totalScore: {
      type: Number,
      default: null,
    },
    testCaseResults: {
      type: [testCaseResultSchema],
      default: [],
    },
    timeTaken: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

submissionSchema.index({ userId: 1, challengeId: 1 });
submissionSchema.index({ anonymousId: 1, challengeId: 1 });
submissionSchema.index({ status: 1 });

module.exports = mongoose.model('Submission', submissionSchema);
