// Aba "Diretório"
import TextoCoroaResiste from "./artigos/TextoCoroaResiste";

export default function AbaDiretorio() {
  return (
    <>
      <h1>A COROA RESISTE: O DIRETÓRIO MONARQUISTA</h1>

      <figure className="retrato">
        <img
          className="foto"
          src="/Visconde-de-Ouro-Preto.jpeg"
          alt="Visconde de Ouro Preto, fundador do Diretório Monárquico do Brasil"
          width="3000"
          height="3000"
        />
        <figcaption>
          Visconde de Ouro Preto, fundador do Diretório Monárquico do
          Brasil
        </figcaption>
      </figure>

      <figure className="retrato">
        <img
          className="foto"
          src="/João-Alfredo-Correia-De-Oliveira.jpeg"
          alt="João Alfredo Correia de Oliveira"
        />
        <figcaption>João Alfredo Correia de Oliveira</figcaption>
      </figure>

      <figure className="retrato">
        <img
          className="foto"
          src="/Carlos-De-Laet.jpeg"
          alt="Carlos de Laet, membro do Diretório Monárquico e jornalista da causa restauradora"
        />
        <figcaption>
          Carlos de Laet, membro do Diretório Monárquico e jornalista da
          causa restauradora
        </figcaption>
      </figure>

      <figure className="retrato">
        <img
          className="foto"
          src="/Conselheiro-Lafaiate.jpeg"
          alt="Conselheiro Lafayette"
        />
        <figcaption>Conselheiro Lafayette</figcaption>
      </figure>

      <figure className="retrato">
        <img
          className="foto"
          src="/Carlos-Egert.jpeg"
          alt="Carlos Egert, refundador do Diretório Monárquico"
        />
        <figcaption>
          Carlos Egert, refundador do Diretório Monárquico
        </figcaption>
      </figure>

      <TextoCoroaResiste />
    </>
  );
}
