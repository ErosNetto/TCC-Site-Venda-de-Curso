import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

import "./database";

import express from "express";
// import cors from "cors";
// import helmet from 'helmet';

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import instrutorRoutes from "./routes/instrutorRoutes";
import fotoInstrutorRoutes from "./routes/fotoInstrutorRoutes";
import cursoRoutes from "./routes/cursoRoutes";
import meusCursoRoutes from "./routes/meusCursoRoutes";
import fotoCursoRoutes from "./routes/fotoCursoRoutes";
import videoCursoRoutes from "./routes/videoCursoRoutes";
import carrinhoDeComprasRoutes from "./routes/carrinhoDeComprasRoutes";
import favoritosRoutes from "./routes/favoritosRoutes";
import historicoDeComprasRoutes from "./routes/historicoDeComprasRoutes";
import perfilDoUsuarioRoutes from "./routes/perfilDoUsuarioRoutes";

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(cors(corsOptions));
    // this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
    this.app.use(
      "/videos/",
      express.static(resolve(__dirname, "..", "uploads", "videos"))
    );
  }

  routes() {
    this.app.use("/home", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/instrutor/", instrutorRoutes);
    this.app.use("/instrutorFoto/", fotoInstrutorRoutes);
    this.app.use("/cursos/", cursoRoutes);
    this.app.use("/meusCursos/", meusCursoRoutes);
    this.app.use("/fotosCurso/", fotoCursoRoutes);
    this.app.use("/videoCurso/", videoCursoRoutes);
    this.app.use("/carrinhoDeCompras/", carrinhoDeComprasRoutes);
    this.app.use("/favoritos/", favoritosRoutes);
    this.app.use("/historicoDeCompras/", historicoDeComprasRoutes);
    this.app.use("/perfil/", perfilDoUsuarioRoutes);
  }
}

export default new App().app;
