import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import {
  Main,
  TituloPag,
  ConteudoCursos,
  Curso,
  ImgCurso,
  Botoes,
  CriarCurso,
  SemCursos,
} from './styled';

export default function Configuracoes() {
  // Instrutor
  const idInstrutorSalvo = useSelector((state) => state.auth.idDoInstrutor);

  // Cursos
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idInstrutorSalvo) return;

    // Acha os cursos do instrutor
    async function getCursos() {
      if (!idInstrutorSalvo) return;

      try {
        setIsLoading(true);
        const { data } = await axios.get('/cursos/');
        const cursosFiltrados = data.filter(
          (curso) => curso.Instrutor.id === idInstrutorSalvo
        );
        setCursos(cursosFiltrados);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
          history.push('/home');
        }
      }
    }

    getCursos();
  }, [idInstrutorSalvo]);

  // Confimar se quer mesmo deletar o curso
  function handleDeleteConfirme(e) {
    e.preventDefault();
    const confirmacao = e.currentTarget.nextSibling;
    confirmacao.style.display = 'block';
    e.currentTarget.remove();
  }

  // Delete o curso
  async function handleDeleteCurso(e, idCurso, index) {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/cursos/${idCurso}`);
      const novosCursos = [...cursos];
      novosCursos.splice(index, 1);
      setCursos(novosCursos);
      toast.success('Curso excluido');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao deletar o curso!');
      }
    }
  }

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Meus cursos</h2>
          </TituloPag>

          <CriarCurso>
            <Link to="/criarCurso">Criar um curso</Link>
          </CriarCurso>

          <ConteudoCursos>
            {cursos.length <= 0 ? (
              <SemCursos>
                <h3>Você não possui nenhum curso</h3>
              </SemCursos>
            ) : (
              cursos.map((curso, index) => (
                <Curso key={String(curso.id)}>
                  <ImgCurso>
                    {get(curso, 'FotoCursos[0].url', false) ? (
                      <Link to={`/cursos/${curso.id}`}>
                        <img
                          src={curso.FotoCursos[0].url}
                          alt="Imagem do curso"
                        />
                      </Link>
                    ) : (
                      <Link to={`/cursos/${curso.id}`}>
                        <img
                          src="https://source.unsplash.com/random/270x210?r=1?e=4"
                          alt="Imagem do curso"
                        />
                      </Link>
                    )}
                  </ImgCurso>
                  <h4>{curso.nome}</h4>
                  <Botoes>
                    <Link to={`/meusCursos/${curso.id}/editar`}>
                      Editar curso
                    </Link>

                    <button type="button" onClick={handleDeleteConfirme}>
                      <i className="bi bi-trash3" />
                    </button>

                    <button
                      style={{ display: 'none' }}
                      type="button"
                      onClick={(e) => handleDeleteCurso(e, curso.id, index)}
                    >
                      <i className="bi bi-check-lg" />
                    </button>
                  </Botoes>
                </Curso>
              ))
            )}
          </ConteudoCursos>
        </Main>
      </ContainerBack>
    </>
  );
}
