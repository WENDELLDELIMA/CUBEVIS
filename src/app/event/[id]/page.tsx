"use client";
import { saveAs } from "file-saver";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../../../../firebase";
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
  {
    id: 47,
    nome: "RAFAEL",
    empresa: null,
    contato: "48988063555",
    email: null,
  },
  {
    id: 48,
    nome: "INGRID LUCKMANN",
    empresa: null,
    contato: "48991552881",
    email: null,
  },
  {
    id: 49,
    nome: "GERALDO",
    empresa: null,
    contato: "47992272113",
    email: null,
  },
  {
    id: 50,
    nome: "THIAGO",
    empresa: null,
    contato: "47992834060",
    email: null,
  },
  {
    id: 51,
    nome: "CESAR BERTINI",
    empresa: null,
    contato: "11994541015",
    email: null,
  },
  {
    id: 52,
    nome: "GUSTAVO LUCKMANN",
    empresa: null,
    contato: "11987590105",
    email: null,
  },
  {
    id: 53,
    nome: "GABRIEL LUCKMANN",
    empresa: null,
    contato: "11987010804",
    email: null,
  },
  {
    id: 54,
    nome: "DANIEL",
    empresa: null,
    contato: "11964771985",
    email: null,
  },
  {
    id: 55,
    nome: "FABIO",
    empresa: null,
    contato: "11991162491",
    email: null,
  },
  {
    id: 56,
    nome: "SANDRO",
    empresa: null,
    contato: "11991156617",
    email: null,
  },
  {
    id: 57,
    nome: "HAROLDO RODRIGUES",
    empresa: null,
    contato: "85988989697",
    email: null,
  },
  {
    id: 58,
    nome: "THIAGO",
    empresa: null,
    contato: "11999580632",
    email: null,
  },
  {
    id: 59,
    nome: "PAULO LEITAO",
    empresa: null,
    contato: "11991900022",
    email: null,
  },
  {
    id: 60,
    nome: "LEONARDO GONCALVES",
    empresa: null,
    contato: "19997778914",
    email: null,
  },
  {
    id: 61,
    nome: "LEURY",
    empresa: null,
    contato: "21999897753",
    email: null,
  },
  {
    id: 62,
    nome: "SERGIO",
    empresa: null,
    contato: "11984291742",
    email: null,
  },
  {
    id: 63,
    nome: "VAGNER",
    empresa: null,
    contato: "11989947169",
    email: null,
  },
  {
    id: 64,
    nome: "EMERSON",
    empresa: null,
    contato: "41998550143",
    email: null,
  },
  {
    id: 65,
    nome: "ROGERIO OLIVEIRA",
    empresa: null,
    contato: "21999857712",
    email: null,
  },
  {
    id: 66,
    nome: "KULIE",
    empresa: null,
    contato: "15981645877",
    email: null,
  },
  {
    id: 67,
    nome: "FELIPE RODRIGUES",
    empresa: null,
    contato: "15981678600",
    email: null,
  },
  {
    id: 68,
    nome: "ANDERSON",
    empresa: null,
    contato: "11986522018",
    email: null,
  },
  {
    id: 69,
    nome: "PEDRO CONTI",
    empresa: null,
    contato: "11976884858",
    email: null,
  },
  {
    id: 70,
    nome: "CAMILA LUCKMANN",
    empresa: null,
    contato: "11999147484",
    email: null,
  },
  {
    id: 71,
    nome: "CARLA KLOCKNER",
    empresa: null,
    contato: "11991166605",
    email: null,
  },
  {
    id: 72,
    nome: "RICARDO FARHAT",
    empresa: null,
    contato: "21995923574",
    email: null,
  },
  {
    id: 73,
    nome: "OSEIEL",
    empresa: null,
    contato: "49999910746",
    email: null,
  },
  {
    id: 74,
    nome: "RINALDO",
    empresa: null,
    contato: "11947797253",
    email: null,
  },
  {
    id: 75,
    nome: "FLAVIO",
    empresa: null,
    contato: "11983355350",
    email: null,
  },
  {
    id: 76,
    nome: "MARCIO",
    empresa: null,
    contato: "11996466894",
    email: null,
  },
  {
    id: 77,
    nome: "ANTONIO",
    empresa: null,
    contato: "11983705653",
    email: null,
  },
  {
    id: 78,
    nome: "LEANDRO",
    empresa: null,
    contato: "11985223339",
    email: null,
  },
  {
    id: 79,
    nome: "SERGIO RIBAS",
    empresa: null,
    contato: "11996588311",
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
  const { id } = params;

  // Decodifica a URI primeiro (para tratar caracteres %3D, %2B, etc.)
  let decodedUri = decodeURIComponent(id);

  // Substitui caracteres URL-safe para o formato Base64 tradicional
  let base64 = decodedUri.replace(/-/g, "+").replace(/_/g, "/");

  // Exibe no console o Base64 decodificado

  const id2 = atob(base64);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Função para gerar o link do Google Calendar personalizada com o convidado obtido pelo ID da URL
  const handleGoogleCalendarLink = async () => {
    // Converte o id para número
    const convidadoId = Number(id2);
    const convidado = convidados.find((c) => c.id === convidadoId);

    let wppMessage =
      "CONFIRMANDO PARTICIPAÇÃO NO EVENTO DE INAUGURAÇÃO DA CUBEVIS";

    if (convidado) {
      wppMessage = `CONVIDADO: *${
        convidado.nome
      }*!\nPARTICIPAÇÃO NO EVENTO DE INAUGURAÇÃO DA CUBEVIS.\nEmpresa: ${
        convidado.empresa || "Não informada"
      }\n${
        convidado.email ? "E-mail: " + convidado.email : ""
      }\nMensagem de Confirmação`;

      try {
        // Verifica se o id já está na coleção "enviados"
        const querySnapshot = await getDocs(collection(db, "enviados"));
        const enviadoDoc = querySnapshot.docs.find(
          (doc) => doc.data().id === convidadoId
        );

        if (enviadoDoc) {
          // Obtém a referência do documento para atualização
          const docRef = doc(db, "enviados", enviadoDoc.id);
          await updateDoc(docRef, {
            confirmado: true,
            dataConfirmacao: new Date().toISOString(),
          });
          console.log(`Convidado ${convidado.nome} marcado como confirmado.`);
        } else {
          // Adiciona o convidado à coleção "enviados" com confirmação
          await addDoc(collection(db, "enviados"), {
            id: convidadoId, // ID do convidado
            nome: convidado.nome, // Nome do convidado
            dataEnvio: new Date().toISOString(), // Data e hora do envio
            confirmado: true, // Marca como confirmado
            dataConfirmacao: new Date().toISOString(), // Data e hora da confirmação
          });

          console.log(
            `Convite enviado e registrado como confirmado para ${convidado.nome}.`
          );
        }
      } catch (error) {
        console.error("Erro ao verificar ou salvar no Firebase:", error);
      }
    }

    const wppNumber = "5511986663003";

    // Gera a URL para abrir diretamente no WhatsApp (se disponível)
    const wppAppUrl = `whatsapp://send?phone=${wppNumber}&text=${encodeURIComponent(
      wppMessage
    )}`;

    // Fallback para o link web do WhatsApp (caso o app não esteja disponível)
    const wppWebUrl = `https://api.whatsapp.com/send?phone=${wppNumber}&text=${encodeURIComponent(
      wppMessage
    )}`;

    // Tenta abrir diretamente no aplicativo, mas cai para o navegador se não funcionar
    try {
      location.href = wppAppUrl; // Tenta abrir diretamente no app do WhatsApp
    } catch {
      location.href = wppWebUrl; // Redireciona para o link web como fallback
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
