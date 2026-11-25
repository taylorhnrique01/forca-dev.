type MascaraProps = { mascara: string };

export function Mascara({ mascara }: MascaraProps) {
  return (
    <div className="palavra" aria-label="Palavra secreta parcialmente revelada">
      {[...mascara].map((letra, indice) => (
        <span key={indice} className={letra === '_' ? 'casinha vazia' : 'casinha'}>
          {letra === '_' ? '\u00a0' : letra}
        </span>
      ))}
    </div>
  );
}
