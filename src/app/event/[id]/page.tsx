"use client";
import { saveAs } from "file-saver";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import dynamic from "next/dynamic";
import save from "../../../../public/animations/save.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageProps } from "../../../../.next/types/app/event/[id]/page";

// Importa o componente Lottie dinamicamente sem suporte a SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const convidados = [
  {
    id: 1,
    nome: "Ricardo Oliveira",
    empresa: "ABB",
    contato: "(15)98169-6868",
    email: "ricardo-fernando.oliveira@br.abb.com",
  },
  {
    id: 2,
    nome: "Julio Massa",
    empresa: "ABB",
    contato: "(11)98354-6334",
    email: "julio.massa@br.abb.com",
  },
  {
    id: 3,
    nome: "Marcelo Palavani",
    empresa: "ABB",
    contato: "(11)98641-9677",
    email: "marcelo.palavani@br.abb.com",
  },
  {
    id: 4,
    nome: "Thiago Lemos",
    empresa: "ABB",
    contato: "(11)98684-4407",
    email: "thiago.lemos@br.abb.com",
  },
  {
    id: 5,
    nome: "Georges Hanasi",
    empresa: "ABB",
    contato: "(11)96868-3010",
    email: "georges.hanasi@br.abb.com",
  },
  {
    id: 6,
    nome: "Sidnei Coimbra",
    empresa: "HONEYWELL",
    contato: "(41)99222-4344",
    email: "sidnei.coimbra@honeywell.com",
  },
  {
    id: 7,
    nome: "Carlos Gury",
    empresa: "HONEYWELL",
    contato: "(11)99380-2437",
    email: "carlos.gury@honeywell.com",
  },
  {
    id: 8,
    nome: "Aguinaldo Santos",
    empresa: "HONEYWELL",
    contato: "(11)99257-0326",
    email: "aguinaldo.dossantos@honeywell.com",
  },
  {
    id: 9,
    nome: "Marco Antonio",
    empresa: "TAG AUTOMAÇÃO",
    contato: "(11)98145-3557",
    email: "marco.fagundes@tagautmation.com.br",
  },
  {
    id: 10,
    nome: "Daniel Navas",
    empresa: "TAG AUTOMAÇÃO",
    contato: "(11)98190-0375",
    email: "daniel.navas@tagautmation.com.br",
  },
  {
    id: 11,
    nome: "Gustavo M. Mulatinho",
    empresa: "TAG AUTOMAÇÃO",
    contato: "(11)99414-2699",
    email: "gustavo.mulatinho@tagautmation.com.br",
  },
  {
    id: 12,
    nome: "Marco Antonio (Tony)",
    empresa: "SR AUTOMAÇÃO",
    contato: "(47)99901-1127",
    email: "tony@srautmacao.ind.br",
  },
  {
    id: 13,
    nome: "Paola Beatriz Sarda",
    empresa: "SR AUTOMAÇÃO",
    contato: "(47)99937-6419",
    email: "paola@srautmacao.ind.br",
  },
  {
    id: 14,
    nome: "Juliano Will",
    empresa: "ICAVI",
    contato: "(47)98839-1703",
    email: "juliano@icavi.ind.br",
  },
  {
    id: 15,
    nome: "Guilherme Ritcher",
    empresa: "CHP Brasil",
    contato: "(21)99431-7528",
    email: "guilherme@chpbrasil.com.br",
  },
  {
    id: 16,
    nome: "Israel Ramos",
    empresa: "Weg",
    contato: "(22)99244-5353",
    email: "israel@israelr.com.br",
  },
  {
    id: 17,
    nome: "Claudio Gava",
    empresa: "Andritz",
    contato: "(11)98606-0041",
    email: "claudio.gava@andritz.com",
  },
  {
    id: 18,
    nome: "Willian Hergen",
    empresa: "Hergen",
    contato: "(47)99988-8646",
    email: "william@hergen.com.br",
  },
  {
    id: 19,
    nome: "Emilio Purnhagen",
    empresa: "Hergen",
    contato: "(47)99988-4040",
    email: "emiliopurnhagen@gmail.com",
  },
  {
    id: 20,
    nome: "Vilmar Sasse",
    empresa: "Hergen",
    contato: "(47)99988-9119",
    email: "vilmar@hergen.com.br",
  },
  {
    id: 21,
    nome: "Marco Aurélio Pagliarini",
    empresa: "CHP Brasil",
    contato: "(11)95220-2060",
    email: "marco.aurelio@chpbrasil.com.br",
  },
  {
    id: 22,
    nome: "Vinicius Pineda",
    empresa: "Smurfitwestrock",
    contato: "(11)99600-2111",
    email: "vinicius.pineda@smurfitwestrock.com",
  },
  {
    id: 23,
    nome: "Rafaella Rufino",
    empresa: "Smurfitwestrock",
    contato: "(11)99600-2111",
    email: "rafaella.rufino@smurfitwestrock.com.br",
  },
  {
    id: 24,
    nome: "Daniela Prieto",
    empresa: "Smurfitwestrock",
    contato: "(11)99600-2111",
    email: "daniela.prieto@smurfitwestrock.com",
  },
  {
    id: 25,
    nome: "Mateus Godinho",
    empresa: "Smurfitwestrock",
    contato: "(11)99600-2111",
    email: "mateus.godinho@smurfitwestrock.com",
  },
  {
    id: 26,
    nome: "Hideo",
    empresa: "ADAMI",
    contato: null,
    email: "hideo@adami.com.br",
  },
  {
    id: 27,
    nome: "Mauricio Telck",
    empresa: "ADAMI",
    contato: null,
    email: "Maurício.telck@adami.com.br",
  },
  {
    id: 28,
    nome: "Osiel Paulino",
    empresa: "ADAMI",
    contato: null,
    email: "osiel.paulino@adami.com.br",
  },
  {
    id: 29,
    nome: "Henrique Yamamoto",
    empresa: "Febrabam",
    contato: "(11)98213-3308",
    email: null,
  },
  {
    id: 30,
    nome: "Marcelo Nakagawa",
    empresa: "INSPER",
    contato: "(11)99258-0808",
    email: null,
  },
  {
    id: 31,
    nome: "Leonardo Tavares",
    empresa: "INSPER",
    contato: "(11)9106-7627",
    email: null,
  },
  {
    id: 32,
    nome: "Adriana Tambosi Adami",
    empresa: "BOTICARIO",
    contato: "(11)99202-5332",
    email: null,
  },
  {
    id: 33,
    nome: "Rychards Guedes",
    empresa: "NUBANK",
    contato: "(83)9672-7223",
    email: null,
  },
  {
    id: 34,
    nome: "Victor",
    empresa: "ACCENTURE",
    contato: "(21)99908-1257",
    email: null,
  },
  {
    id: 35,
    nome: "João Barra",
    empresa: "ITAÚ",
    contato: "(12)99733-2853",
    email: null,
  },
  {
    id: 36,
    nome: "Carlos Caldeira",
    empresa: "INSPER",
    contato: "(11)98141-2474",
    email: null,
  },
  {
    id: 37,
    nome: "Leo",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(19)99777-8914",
    email: null,
  },
  {
    id: 38,
    nome: "George",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(11)98162-6004",
    email: null,
  },
  {
    id: 39,
    nome: "Ricardo Galan",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(62)9679-6058",
    email: null,
  },
  {
    id: 40,
    nome: "Henrique Risso",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(81)8298-6262",
    email: null,
  },
  {
    id: 41,
    nome: "Suelen",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(11)97205-4517",
    email: null,
  },
  {
    id: 42,
    nome: "Gustavo Dantas",
    empresa: "RIHAPPY",
    contato: "(11)97066-3838",
    email: null,
  },
  {
    id: 43,
    nome: "Andre Fazzorali",
    empresa: "REPRESENTANTE GUAPI",
    contato: "(11)99166-9883",
    email: null,
  },
  {
    id: 44,
    nome: "Alex Camilli Bottene",
    empresa: "INSPER",
    contato: "(19)98177-9033",
    email: null,
  },
  {
    id: 45,
    nome: "Nicholas lemann",
    empresa: "SAP",
    contato: "(11)97680-8867",
    email: null,
  },
  {
    id: 46,
    nome: "Gilson Luckmann",
    empresa: "CUBEVIS",
    contato: "+551194521-3801",
    email: null,
  },
];

function EventPage({ params }: PageProps) {
  const [loading, setLoading] = useState(true);
  const eventName = "CUBEVIS - SAVE THE DATE";
  const eventDate = new Date("2024-12-17T13:00:00");
  const eventEndDate = new Date("2024-12-17T18:00:00");
  const eventLocation =
    "Av. Engenheiro Luís Carlos Berrini, 105, Cidade Monções, São Paulo - SP";
  const eventDescription =
    "Venha participar de um evento exclusivo e conheça a CUBEVIS, uma incubadora que está moldando o futuro da indústria. Com foco em tecnologia de ponta, impulsionamos ideias promissoras em soluções GreenTech, transformando desafios em oportunidades.";

  // Hook do Next.js para acessar parâmetros da URL
  const router = useRouter();
  const { id } = params; // id vem da URL, por exemplo /event/1

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Função para gerar o link do Google Calendar personalizada com o convidado obtido pelo ID da URL
  const handleGoogleCalendarLink = () => {
    // Converte o id para número, já que router.query retorna string
    const convidadoId = Number(id);
    const convidado = convidados.find((c) => c.id === convidadoId);

    let wppMessage =
      "CONFIRMANDO PARTICIPAÇÃO NO EVENTO DE INAUGURAÇÃO DA CUBEVIS";

    if (convidado) {
      wppMessage = `CONVIDADO :, ${
        convidado.nome
      }!\nPARTICIPAÇÃO NO EVENTO DE INAUGURAÇÃO DA CUBEVIS.\n\nEmpresa: ${
        convidado.empresa || "Não informada"
      }\n${
        convidado.email ? "E-mail: " + convidado.email : ""
      }\n\nMensagem de Confirmação`;
    }

    const wppNumber = "5511986663003";
    const wppUrl = `https://api.whatsapp.com/send?phone=${wppNumber}&text=${encodeURIComponent(
      wppMessage
    )}`;

    // Abre o WhatsApp em uma nova aba
    window.open(wppUrl, "_blank");

    const userConfirmed = confirm(
      "Você já confirmou a participação no evento via WhatsApp?"
    );

    if (userConfirmed) {
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventName
      )}&dates=${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}/${
        eventEndDate.toISOString().replace(/[-:]/g, "").split(".")[0]
      }&details=${encodeURIComponent(
        eventDescription
      )}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

      window.open(googleCalendarUrl, "_blank");
    }
  };

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#008644] to-[#1E1E1E] absolute w-full z-50">
          <Lottie animationData={save} loop={true} />
        </div>
      )}
      <div
        style={{
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          backgroundImage: "url('/background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-screen w-full bg-black"
      >
        <div className="flex flex-col text-white">
          <div className="flex items-center justify-center pb-4">
            <div className="flex flex-col gap-8 w-full">
              <Image
                src="/logo.svg"
                width={250}
                height={100}
                alt="logo da maior greentech da historia CUBEVIS"
                className="w-auto h-auto max-w-[250px] max-h-[100px] m-auto"
              />
            </div>
          </div>

          <p className="text-center">
            <strong className="uppercase">
              Temos um Convite especial para você
            </strong>
          </p>
          <p
            className={`py-4 text-md font-thin text-center ${ubuntu.className}`}
          >
            Venha participar de um evento exclusivo e conheça a <b>CUBEVIS</b>,
            uma incubadora que está moldando o futuro da indústria. Com foco em
            tecnologia de ponta, impulsionamos ideias promissoras em soluções
            GreenTech, transformando desafios em oportunidades.
          </p>

          <div className="p-2 flex flex-row gap-4 justify-center mt-4">
            <div className="flex flex-col items-center">
              <span className={`font-thin ${ubuntu.className} text-sm`}>
                TERÇA-FEIRA
              </span>
              <b>17 DEZ</b>
            </div>
            <div className="flex flex-col items-center border-l-2 pl-4">
              <span className={`font-thin ${ubuntu.className} text-sm`}>
                A PARTIR DAS
              </span>
              <b>16 HS</b>
            </div>
          </div>

          <p
            className={`text-center mt-4 ${ubuntu.className} fixed bottom-0 -ml-5 p-4`}
          >
            <strong>Local: </strong> <span>{eventLocation}</span>
          </p>
        </div>
        <div className="flex flex-row gap-0 w-full max-w-xs mx-auto mt-8 m-auto justify-center">
          {/* Botão que chama a função handleGoogleCalendarLink para o convidado cujo id está na URL */}
          <button
            onClick={handleGoogleCalendarLink}
            className="px-4 py-2 text-white font-bold bg-gradient-to-r to-green-400 from-green-600 rounded-lg shadow-lg hover:shadow-green-400 hover:scale-105 transition-transform text-sm w-full h-[3rem]"
          >
            Confirmar Presença
          </button>
        </div>
      </div>
    </>
  );
}

export default EventPage;
