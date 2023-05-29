import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
// import { FaEdit } from 'react-icons/fa';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import {
  Main,
  TituloTexto,
  GridConteudo,
  Form,
  LadoDireito,
  MainEspaco,
  FotoDePerfil,
  LadoDireitoIntrutor,
} from './styled';
import SemFoto from '../../img/Group 5.png';

export default function Configuracoes() {
  const dispatch = useDispatch();

  // Usuario Salvo
  const id = useSelector((state) => state.auth.user.id);
  const nomeSalvo = useSelector((state) => state.auth.user.nome);
  const emailSalvo = useSelector((state) => state.auth.user.email);
  const istrutorSalvo = useSelector((state) => state.auth.user.istrutor);
  const isLoadingSalvo = useSelector((state) => state.auth.isLoading);

  // Usuario
  const [nome, setNomeUser] = useState('');
  const [email, setEmailUser] = useState('');
  const [password, setPasswordUser] = useState('');
  const [istrutor, setIstrutor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Instrutor
  const [idInstrutor, setIdInstrutor] = useState('');
  const [nomeInstrutor, setNomeInstrutor] = useState('');
  const [sobrenomeInstrutor, setSobrenomeInstrutor] = useState('');
  const [profissao, setProfissao] = useState('');
  const [biografia, setBiografia] = useState('');
  const [idioma, setIdioma] = useState('Portugues(BR)');
  const [fotoInstrutor, setFotoInstrutor] = useState('');
  const [intrutorPUT, setIntrutorPUT] = useState('');

  // Instrutor

  useEffect(() => {
    if (!id) return;

    setNomeUser(nomeSalvo);
    setEmailUser(emailSalvo);
    setIstrutor(true);
  }, [id, nomeSalvo, emailSalvo]);

  useEffect(() => {
    if (!istrutorSalvo) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/instrutor/');
        const instrutorEncontrado = data.find(
          (instrutor) => instrutor.user_id === id
        );
        const FotoInstrutor = get(
          instrutorEncontrado,
          'FotoInstrutors[0].url',
          ''
        );

        if (instrutorEncontrado) {
          // const { nome, sobrenome, profissao, biografia } = instrutorEncontrado;
          setIdInstrutor(instrutorEncontrado.id);
          setNomeInstrutor(instrutorEncontrado.nome);
          setSobrenomeInstrutor(instrutorEncontrado.sobrenome);
          setProfissao(instrutorEncontrado.profissao);
          setBiografia(instrutorEncontrado.biografia);
          setIdioma(instrutorEncontrado.idioma);
          setFotoInstrutor(FotoInstrutor);
          setIntrutorPUT(true);
        } else {
          setNomeInstrutor('');
          setSobrenomeInstrutor('');
          setProfissao('');
          setBiografia('');
          setIdioma('Portugues(BR)');
          setFotoInstrutor('');
          setIntrutorPUT('');
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }
    }

    getData();
  }, [istrutorSalvo, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) return;

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, emailSalvo }));
  }

  async function handleViraInstrutor(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.put('/users', {
        istrutor,
      });
      dispatch(actions.intrutorUpdatedSuccess({ istrutor }));

      setIsLoading(false);
      toast.success('Você virou um intrutor!');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (!id) return;

    try {
      setIsLoading(true);

      await axios.delete(`/users`);
      dispatch(actions.loginFailure());
      toast.success('Usuário deletado com sucesso.');
      setIsLoading(false);
      history.push('/');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  async function handleConfigInstrutor(e) {
    e.preventDefault();
    let formErrors = false;

    if (nomeInstrutor.length < 3 || nomeInstrutor.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (sobrenomeInstrutor.length < 3 || sobrenomeInstrutor.length > 255) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
    }

    if (profissao.length < 3 || profissao.length > 255) {
      formErrors = true;
      toast.error('Campo profissão precisa ter entre 3 e 255 caracteres');
    }

    if (biografia.length < 50 || biografia.length > 500) {
      formErrors = true;
      toast.error('A biografia precisa ter no minimo 50 caracteres');
    }

    if (idioma.length <= 0) {
      formErrors = true;
      toast.error('O campo idioma é obrigatorio');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      if (intrutorPUT) {
        // UPDATE
        await axios.put(`/instrutor/${idInstrutor}`, {
          nome: nomeInstrutor,
          sobrenome: sobrenomeInstrutor,
          profissao,
          biografia,
          idioma,
        });
        toast.success('Instrutor alterado com sucesso');
        setIsLoading(false);
      } else {
        // CREATE
        await axios.post('/instrutor/', {
          nome: nomeInstrutor,
          sobrenome: sobrenomeInstrutor,
          profissao,
          biografia,
          idioma,
          user_id: id,
        });
        toast.success('Instrutor criado com sucesso');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  const handleFotoInstrutor = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFotoInstrutor(fotoURL);

    const formData = new FormData();
    formData.append('instrutor_id', idInstrutor);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/instrutorFoto/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso!');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />
      <Loading isLoading={isLoadingSalvo} />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <h1>Configurações da conta</h1>
          </TituloTexto>

          <GridConteudo>
            <Form onSubmit={handleSubmit}>
              <div className="grupo-form">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNomeUser(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmailUser(e.target.value)}
                  placeholder="Seu e-mail"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPasswordUser(e.target.value)}
                  placeholder="Sua senha"
                />
              </div>

              <button type="submit">Salvar</button>
            </Form>

            <LadoDireito>
              <div>
                {istrutorSalvo ? (
                  <h3>Você já é um instrutor.</h3>
                ) : (
                  <>
                    <h3>Deseja ser um instrutor?</h3>
                    <button type="submit" onClick={handleViraInstrutor}>
                      Virar instrutor
                    </button>
                  </>
                )}
              </div>

              <div>
                <h3>Encerre sua conta permanentemente</h3>
                <p>
                  <span>Aviso:</span> Se encerrar sua conta, você será
                  descadastrado de todos os seus cursos e perderá o acesso para
                  sempre.
                </p>
                <button type="submit" onClick={handleDelete}>
                  Encerrar conta
                </button>
              </div>
            </LadoDireito>
          </GridConteudo>
        </Main>

        <MainEspaco />
        <Loading isLoading={isLoading} />

        {istrutorSalvo ? (
          <Main>
            <TituloTexto>
              <h1>Configurações do instrutor</h1>
            </TituloTexto>

            <GridConteudo>
              <Form /* onSubmit={handleSubmit} */>
                <div className="grupo-form">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    value={nomeInstrutor}
                    onChange={(e) => setNomeInstrutor(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grupo-form">
                  <label htmlFor="Sobrenome">Sobrenome</label>
                  <input
                    type="text"
                    value={sobrenomeInstrutor}
                    onChange={(e) => setSobrenomeInstrutor(e.target.value)}
                    placeholder="Seu sobrenome"
                  />
                </div>

                <div className="grupo-form">
                  <label htmlFor="profissao">Profissão</label>
                  <input
                    type="text"
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                    placeholder="Digite sua profissão"
                  />
                </div>
              </Form>

              <LadoDireitoIntrutor>
                <label htmlFor="foto">Foto de perfil</label>

                <form>
                  <FotoDePerfil>
                    {fotoInstrutor ? (
                      <img
                        className="imgfoto"
                        src={fotoInstrutor}
                        alt="Foto de perfil do instrutor"
                      />
                    ) : (
                      <img
                        className="imgfoto"
                        src={SemFoto}
                        alt="Imagem do curso"
                      />
                    )}
                    <label htmlFor="foto">
                      <input
                        type="file"
                        id="foto"
                        onChange={handleFotoInstrutor}
                      />
                      <i className="bi bi-pencil-square" />
                    </label>
                  </FotoDePerfil>
                </form>
              </LadoDireitoIntrutor>
            </GridConteudo>

            <Form>
              <div className="grupo-form">
                <label htmlFor="biografia">Biografia</label>
                <textarea
                  name="message"
                  value={biografia}
                  onChange={(e) => setBiografia(e.target.value)}
                  placeholder="Sua biografia"
                />
              </div>
            </Form>

            <button
              type="submit"
              className="btn-instrutor"
              onClick={handleConfigInstrutor}
            >
              Salvar
            </button>
          </Main>
        ) : (
          <> </>
        )}
      </ContainerBack>
    </>
  );
}
