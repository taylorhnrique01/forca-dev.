import { useEffect, useState } from 'react';
import { api } from './api/cliente';
import { Mascara } from './components/Mascara';
import { Teclado } from './components/Teclado';
import { Vidas } from './components/Vidas';
import { Ranking } from './components/Ranking';
import type { EstadoPartida, ItemRanking } from './types';

export default function App() {
  const [nome, setNome] = useState('');
  const [partida, setPartida] = useState<EstadoPartida | null>(null);
  const [melhores, setMelhores] = useState<ItemRanking[]>([]);
  const [esperando, setEsperando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function carregarRanking() {
    try {
      const dados = await api.ranking();
      setMelhores(dados);
    } catch (erro: unknown) {
      setMensagem(erro instanceof Error ? erro.message : 'Ranking indisponível.');
    }
  }

  useEffect(() => { void carregarRanking(); }, []);

  async function iniciar() {
    setEsperando(true);
    setMensagem('');
    try {
      const nova = await api.novaPartida(nome.trim());
      setPartida(nova);
    } catch (erro: unknown) {
      setMensagem(erro instanceof Error ? erro.message : 'Não foi possível iniciar.');
    } finally {
      setEsperando(false);
    }
  }

  async function escolherLetra(letra: string) {
    if (!partida || esperando || partida.status !== 'em_andamento') return;
    setEsperando(true);
    setMensagem('');
    try {
      const atualizada = await api.palpitar(partida.id, letra);
      setPartida(atualizada);
      if (atualizada.status !== 'em_andamento') await carregarRanking();
    } catch (erro: unknown) {
      setMensagem(erro instanceof Error ? erro.message : 'Erro ao enviar a letra.');
    } finally {
      setEsperando(false);
    }
  }

  function reiniciar() {
    setPartida(null);
    setMensagem('');
    void carregarRanking();
  }

  const nomeValido = nome.trim().length >= 3 && nome.trim().length <= 20;
  const terminou = partida !== null && partida.status !== 'em_andamento';

  return (
    <div className="pagina">
      <header className="cabecalho">
        <div className="assinatura"><span className="simbolo">#</span><div>
          <h1>FORCA DEV</h1><p>Desafio de palavras da programação</p>
        </div></div>
        <span className="etiqueta">JOGO 01</span>
      </header>

      {mensagem && <p className="aviso" role="alert">{mensagem}</p>}

      {!partida ? (
        <>
          <section className="folha">
            <p className="pequeno">01 / COMEÇAR</p>
            <h2>Qual é o seu apelido?</h2>
            <p className="texto">Você tem 6 vidas para descobrir uma palavra de programação. Cada erro tira uma vida.</p>
            <label htmlFor="jogador">Apelido do jogador</label>
            <div className="campo-acao">
              <input id="jogador" type="text" autoComplete="off" placeholder="Digite seu apelido"
                value={nome} maxLength={20} onChange={(e) => setNome(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && nomeValido && !esperando) void iniciar(); }}/>
              <button className="botao" disabled={!nomeValido || esperando} onClick={() => void iniciar()}>
                {esperando ? 'Abrindo...' : 'Jogar agora'}
              </button>
            </div>
            <p className="dica">O apelido precisa ter entre 3 e 20 caracteres.</p>
          </section>
          <Ranking itens={melhores} />
        </>
      ) : (
        <>
          <section className="placar">
            <div><span>JOGADOR</span><strong>{partida.jogador}</strong></div>
            <div><span>CATEGORIA</span><strong>{partida.categoria}</strong></div>
            <Vidas restantes={partida.vidasRestantes} />
          </section>

          <section className="folha area-palavra">
            <p className="pequeno">02 / DESCUBRA A PALAVRA</p>
            <h2>{terminou ? partida.status === 'vitoria' ? 'Você conseguiu!' : 'Fim de jogo!' : 'Qual é a palavra?'}</h2>
            <Mascara mascara={partida.mascara} />
            <p className="dica">Letras usadas: {partida.letrasTentadas.join(' · ') || 'nenhuma até agora'}</p>
          </section>

          {terminou ? (
            <section className="faixa-final">
              <p>{partida.status === 'vitoria' ? 'Parabéns, você venceu!' : 'Não foi dessa vez.'}</p>
              <strong>Palavra: {partida.palavra}</strong>
              <strong>Pontos: {partida.pontos}</strong>
              <button className="botao" onClick={reiniciar}>Jogar de novo</button>
            </section>
          ) : (
            <section className="painel-teclado">
              <h3>Escolha uma letra</h3>
              <Teclado tentadas={partida.letrasTentadas} mascara={partida.mascara}
                desabilitado={esperando} onLetra={(letra) => void escolherLetra(letra)} />
              {esperando && <p className="carregando">Verificando letra...</p>}
            </section>
          )}
          <button className="voltar" onClick={reiniciar}>← Voltar ao início</button>
          {terminou && <Ranking itens={melhores} />}
        </>
      )}
      <footer>Trabalho de programação • TypeScript, React e Fastify</footer>
    </div>
  );
}
