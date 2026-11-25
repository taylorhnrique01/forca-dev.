type VidasProps = { restantes: number };

export function Vidas({ restantes }: VidasProps) {
  return (
    <div className="contador-vidas">
      <span>VIDAS</span>
      <strong>{restantes} / 6</strong>
      <div className="pontos-vida" aria-label={`${restantes} vidas restantes`}>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} className={i < restantes ? 'ativo' : 'perdido'} />
        ))}
      </div>
    </div>
  );
}
