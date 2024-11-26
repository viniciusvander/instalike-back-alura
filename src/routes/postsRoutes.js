import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para lidar com o upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções para listar posts, criar novos posts e fazer upload de imagens, que estão localizadas no arquivo postsController.js
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura as opções de armazenamento para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão salvos 1  (no caso, a pasta 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo, mantendo o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com as configurações de armazenamento
const upload = multer({ storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o Express interprete dados JSON enviados nas requisições
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem); // 'imagem' é o nome do campo no formulário HTML que contém o arquivo a ser enviado

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;