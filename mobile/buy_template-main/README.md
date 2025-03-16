## Banco de dados offline no React Native com TinyBase + SQLite

- instalar as dependências deles:

```console
npx expo install expo-sqlite tinybase
```

- no arquivo que será usado o TinyBase importar o "createStore";

- criar as constantes TABLE_NAME e store;

- criar a função "get", para buscar os dados no banco; (chamar no useEffect)

- criar a função "add" para adicionar os dados no banco;

- importar o expo-SQLite e a Persister do SQLite no Tinybase;

- configurar o SQLite usando o "useCreatePersister";

- no método "remove" é executado um delete. E no método "toggleStatus" é executado um get e um update;
