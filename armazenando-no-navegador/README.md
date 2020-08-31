# localStorage

- Armazenamento de dados chave e valor
- Ao fechar ou atualizar a página, os dados persistidos não serão excluídos
- Dados ficam salvos no navegador do usuário

## Bora codar!!

- [x] Guardar um item no localStorage
    -setItem()
- [x] Pegar um item do localStorage
    -getItem()
- [x] Remover o item do localStorage
    -removeItem()

## Desafio

- Criar um sistema de imagens favoritas

## Revisão

- Chave: Valor
- Formato de String
- Precisamos fazer ajustes em estruturas de dados mais complexas
- Os dados não são excluídos automaticamente, temos que cuidar disso.

## Next Level

- Neste mesmo projeto:

  - Faça uma página para listar todas as imagens favoritadas.
  - Para cada imagem, crie um botão `Deletar` para remover a imagem dos favoritos.
  - Crie um botão de nome `Remover Todas` que irá apagar a chave `favorites` do localStorage,  assim, deletando todas as imagens favoritadas.
    - Dica: use o removeItem() para isso.

- Faça a implementação dessa aula em um dos projetos

  - CodeDrop #41 (navegação em tab)
    - salve a tab que o usuário está
    - quando o usuário atualizar a página, ele deverá ver a última tab que ele selecionou
