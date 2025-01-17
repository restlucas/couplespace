import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Couplespace | FAQ",
  description: "Descubra como aproveitar ao máximo o Couplespace!",
};

export default function Faq() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-[1024px] animate-fade-right p-8 bg-foreground-light rounded-md shadow-md space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Qual é o objetivo do Couplespace?
          </h3>
          <p>
            O Couplespace foi criado para ser um espaço virtual para casais,
            permitindo que você demonstre seu amor pelo(a) companheiro(a) de
            forma única.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Como funciona o Couplespace?
          </h3>
          <div className="flex flex-col gap-4 items-start justify-center">
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 1"
              >
                1
              </span>
              <span>Faça login usando sua conta Google.</span>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 2"
              >
                2
              </span>
              <span>
                Após o login, você será redirecionado ao seu painel (dashboard).
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="bg-foreground min-w-8 min-h-8 rounded-full text-sm font-bold flex items-center justify-center"
                aria-label="Passo 3"
              >
                3
              </span>
              <span>
                No painel, você pode criar, editar e visualizar sua página,
                receber o QR Code por e-mail e adicionar o email de seu
                parceiro(a) para que ele(a) também possa realizar publicações.
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Como funciona o armazenamento de imagens?
          </h3>
          <p>
            Utilizamos o Firebase Storage gratuito, e para evitar custos, cada
            página tem um limite de 6 imagens em uma galeria. Publicações não
            suportam imagens.
          </p>
        </div>
      </div>
    </section>
  );
}
