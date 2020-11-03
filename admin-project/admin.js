//Database
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("project", ProjectSchema)


// AdminBro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')


AdminBro.registerAdapter(AdminBroMongoose)

const adminBroOptions = new AdminBro({
  //resources: [Project],
  resources: [
    {
      resource: Project,
      options: {
        properties: {
          description: { type: 'richtext' },
          created_at: {
            isVisible: { edit: false, list: true, show: true, filter: true }
          },
        },
      },
    },
  ],

  locale: {
    translations: {
      labels: { 
        project: 'Meus Projetos', 
      },
    },
  }, 
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBroOptions);


// Server
const express = require('express');
const server = express();

server.use(adminBroOptions.options.rootPath, router);


// RunApp
const run = async () => {
  await mongoose.connect("mongodb+srv://guilherme:guilherme@cluster0.welac.mongodb.net/adminbroapp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await server.listen(5500, () => console.log('Server started'))
}
 
run();

