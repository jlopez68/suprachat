/*import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);*/

import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {      type: String,      required: true,    },
    description: {      type: String,      required: true,    },
    user: {      type: String,      required: true,    },
    direccion: {      type: String,      required: true,    },
    calle: {      type: String,      required: true,    },
    barrio: {      type: String,      required: true,    },
    celular: {      type: String,    },
    email: {      type: String,    },
    registro: { type: String,    },
    visitador: {type: String, },
    num_doc:{ type: String, trim: true },
    horario_ent:{ type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);
