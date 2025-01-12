import React, { useEffect } from 'react';
import CardVazio from "./CardVazio";
import blogFetch from "../axios/config";
import { useState } from "react";

function CadastroItem(props) {
  const [key, setKey] = useState("");
  const [imagem, setImagem] = useState("../../public/assets/imagem-vazia.png");
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precoCompra, setPrecoCompra] = useState();
  const [preco, setPreco] = useState();
  const [estoque, setEstoque] = useState("");

  const form = {
    nome: nome,
    descricao: descricao,
    id_produto: codigo,
    preco: preco,
    estoque: 0,
    categoria: categoria,
    imagem: imagem,
    precoCompra: precoCompra
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (codigo == null) {
      try {
        console.log(form);
        await blogFetch.post(
          "/produto",
          form
        );
        console.log(form);
        alert("Item adicionado!");
        props.closeCadastroItem();
      } catch (error) {
        console.error(error);
        console.log(form);
        alert("Não foi possível conectar!!");
      }
    }
    else {
      try {
        console.log(form);
        await blogFetch.put(
          "/produto",
          form
        );
        console.log(form);
        alert("Item atualizado!");
        props.closeCadastroItem();

      } catch (error) {
        console.error(error);
        console.log(form);
        alert("Não foi possível conectar!!");
      }
    }  
  };


  useEffect(() => {
    setImagem(props.imagem)
    setNome(props.nome)
    setCodigo(props.codigo)
    setDescricao(props.descricao)
    setCategoria(props.categoria)
    setPreco(props.preco)
    setEstoque(props.estoque)
  }, []);


  const limparDados = async (e) => {
    if (codigo != null) {
      e.preventDefault();
      try {
        let resultado = confirm("Deseja excluir o item?");
        if (resultado == true) {
          console.log(form);
          await blogFetch.delete(
            "/produto/" + codigo,
          );
          console.log(form)

          props.closeCadastroItem();

        }

      } catch (error) {
        console.error(error);
        console.log(form)
        alert("Não foi possível conectar!!");
      }
    }

    else {
      setNome(null);
      setDescricao(null);
      setPreco(null);
      setPrecoCompra(null)
      setCategoria(null);
    }


  };

  //////////////////////////////

  const receberImagem = (imagem) => {
    setImagem(imagem);
  };

  return (
    <div className="bg-white rounded-3xl p-12  gap-36 mb-4 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex  gap-8 justify-center mt-4"
      >
        <div className="ml-16">
          <CardVazio
            nome={nome}
            valorTotal={preco}
            imagem={imagem}
            enviarVariavelImg={receberImagem}
          />
        </div>
        <div>
          <div className="flex-col ">
            <div className="mb-8 mt-2">
              <label className="hidden" htmlFor="nome">
                Nome
              </label>
              <input
                className="nome outline-none p-2 rounded-lg w-96 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Nome"
                type="text"
                name="nome"
                id="nome"
                required
                value={nome}
                key="nome"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="hidden" htmlFor="descricao">
                Descrição
              </label>
              <input
                className="descricao outline-none rounded-lg w-96 h-28 p-2 pb-20 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] placeholder:text-cinza-claro"
                placeholder="Descrição"
                type="text"
                name="descricao"
                id="descricao"
                required
                value={descricao}
                key="descricao"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="categoria flex gap-10 mb-12">
            <select
              id="categoria"
              name="Categoria"
              required
              value={categoria}
              className=" outline-none drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] rounded-lg h-10 w-44 p-2 bg-white text-cinza-claro"
              key="categoria"
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option className="text-zinc-800" value="CAMISA">
                CAMISA
              </option>
              <option className="text-zinc-800" value="ACTIONFIGURE" selected>
                ACTIONFIGURE
              </option>
              <option className="text-zinc-800" value="DECORACAO">
                DECORACAO
              </option>
              <option className="text-zinc-800" value="ACESSORIOS">
                ACESSORIOS
              </option>
            </select>
            <label className="hidden" htmlFor="preco">
              Preço R$
            </label>
            <input
              className="preco outline-none rounded-lg w-40 h-10 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)] p-2 placeholder:text-cinza-claro no-arrows"
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              placeholder="Preço"
              min="0"
              required
              value={preco}
              key="preco"
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <div className="flex justify-around">
            <button
              onClick={(e) => limparDados(e)}
              type="reset"
              className=" hover:scale-105 duration-150 bg-vermelho-pessego rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
            >
              Excluir
            </button>
            <button
              type="submit"
              className=" hover:scale-105 duration-150 bg-verde-caqui rounded-lg h-10 w-44 drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastroItem;
