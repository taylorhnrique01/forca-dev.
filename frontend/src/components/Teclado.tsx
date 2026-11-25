type TecladoProps = {
  tentadas: string[];
  mascara: string;
  desabilitado: boolean;
  onLetra: (letra: string) => void;
};

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function Teclado({ tentadas, mascara, desabilitado, onLetra }: TecladoProps) {
  return (
    <div className="letras">
      {ALFABETO.map((letra) => {
        const usada = tentadas.includes(letra);
        const resultado = usada ? (mascara.includes(letra) ? 'certa' : 'errada') : '';
        return (
          <button type="button" key={letra} className={`letra ${resultado}`}
            disabled={desabilitado || usada} onClick={() => onLetra(letra)}>
            {letra}
          </button>
        );
      })}
    </div>
  );
}
