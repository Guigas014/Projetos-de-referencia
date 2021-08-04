import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";

import multer from "multer";
import { client } from "./database/client";


const multerConfig = multer();

const router = Router();

interface Product {
  code_bar: string;
  description: string;
  price: number;
  amount: number;
}

router.post("/products", multerConfig.single("file"), async (request: Request, response: Response) => {
  
  //console.log(request.file);
  //console.log(request.file?.buffer.toString("utf-8"));
  const data = request.file?.buffer;

  const readableFile = new Readable();
  readableFile.push(data);
  readableFile.push(null);
  
  const productsLine = readline.createInterface({
    input: readableFile
  })

  const products: Product[] = [];

  for await (let line of productsLine) {
    const productsLineSplit = line.split(",");
    //console.log(productsLineSplit[0]);
    
    products.push({
      code_bar: productsLineSplit[0],
      description: productsLineSplit[1],
      price: Number(productsLineSplit[2]),
      amount: Number(productsLineSplit[3]),
    })
  }

  //Inseri no DB
  for await (let {code_bar, description, price, amount} of products) {
    await client.products.create({
      data: {
        code_bar,
        description,
        price,
        amount,
      },
    });
  }


  return response.json(products);
  //return response.send();
});

export { router };

