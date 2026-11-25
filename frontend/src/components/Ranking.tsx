import type { ItemRanking } from '../types';

type RankingProps = { itens: ItemRanking[] };

export function Ranking({ itens }: RankingProps) {
  return (
    <section className="ranking">
      <div className="titulo-ranking"><h2>Ranking dos jogadores</h2><span>TOP 10</span></div>
      {itens.length === 0 ? (
        <p className="ranking-vazio">Ainda não existem vitórias. Que tal ser o primeiro?</p>
      ) : (
        <table>
          <thead><tr><th>Posição</th><th>Apelido</th><th>Palavra</th><th>Pontos</th></tr></thead>
          <tbody>{itens.map((item, indice) => (
            <tr key={`${item.finalizadaEm}-${indice}`}>
              <td>{indice + 1}º</td>
              <td>{item.jogador}</td>
              <td>{item.palavra}</td>
              <td>{item.pontos}</td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </section>
  );
}
