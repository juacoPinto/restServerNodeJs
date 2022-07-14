const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
	nombre: { type: String, required: true, unique: true },
	estado: { type: Boolean, default: true },
	precio: { type: Number, default: 0 },
	descripcion: { type: String },
	imagen: { type: String },
	usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
	categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
	disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function () {
	const { __v, estado, ...resto } = this.toObject();
	return resto;
};

module.exports = model("Producto", ProductoSchema);
