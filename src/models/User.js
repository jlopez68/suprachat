import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, trim: true },
    usuario:{ type: String, trim: true },
    password: { type: String, required: true },
    cambio_password: {type: String, trim: true},
    apellido: { type: String, trim: true },
    segundo_apellido: { type: String, trim: true }, 
    tip_doc:{ type: String, trim: true },
    num_doc:{ type: String, trim: true },
    registro:{ type: String, trim: true },
    celular: { type: String, trim: true },
    tipo_usuario:{ type: String, trim: true },
    user_status: { type: String, trim: true } ,
    direccion:{ type: String, trim: true },
    calle :{ type: String, trim: true },
    ciudad_barrio :{ type: String, trim: true },
    ubica:{ type: String, trim: true },
    horario_ent:{ type: String, trim: true },
    user_status_motivo: { type: String, trim: true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
