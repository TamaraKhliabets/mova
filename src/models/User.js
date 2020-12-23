const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
      // createIndexes: { unique: true }
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    // createdAt: {
    //   type: String,
    //   required: true,
    //   default: ""
    //   // created_at: Date! default=Date.now()
    // },
    // updatedAt: {
    //   type: String,
    //   required: true,
    //   default: ""
    //   // updated_at: Date! default=Date.now()
    // },
    bio: {
      type: String
    },
    image: {
      type: String
    },
    email_verified: {
      type: Boolean
    }
    // refresh_token: { type: String, default: "" },
    // access_token: { type: String, default: "" }
  },
  {
    timestamps: true
  }
);

const User = model("users", UserSchema);

module.exports = { User };
