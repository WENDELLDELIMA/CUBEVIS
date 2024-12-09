"use client";
import { useState } from "react";
import { useEffect } from "react";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
// Lista de convidados (exemplo)
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
export default function GuestsPage() {
  const [statusEnviados, setStatusEnviados]: any = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  const buscarStatusAtualizado = async () => {
    try {
      const enviadosSnapshot = await getDocs(collection(db, "enviados"));
      const enviadosData = enviadosSnapshot.docs.map((doc) => ({
        id: doc.data().id,
        enviado: true,
        confirmado: doc.data().confirmado || false,
        dataEnvio: doc.data().dataEnvio || null,
        dataConfirmacao: doc.data().dataConfirmacao || null,
        docId: doc.id,
      }));
      setStatusEnviados(enviadosData as any);
    } catch (error) {
      console.error("Erro ao buscar status no Firebase:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarStatusAtualizado();
  }, []);

  const copiarLink = (id: any) => {
    const linkEvento = `https://save.cubevis.com.br/event/${btoa(id)}`;
    navigator.clipboard
      .writeText(linkEvento)
      .then(() => alert("Link copiado para a área de transferência!"))
      .catch((error) => console.error("Erro ao copiar o link:", error));
  };

  const enviarLinkWpp = async (convidado: any) => {
    try {
      const linkEvento = `https://save.cubevis.com.br/event/${btoa(
        convidado.id
      )}`;
      const wppMessage = `Olá *${convidado.nome}*! Estamos felizes em convidá-lo para nosso evento!
          
    Confirme sua presença clicando no link abaixo:
    ${linkEvento}
    
    Estamos ansiosos para vê-lo lá!`;

      await addDoc(collection(db, "enviados"), {
        id: convidado.id,
        nome: convidado.nome,
        enviado: true,
        confirmado: false,
        dataEnvio: new Date().toISOString(),
      });

      window.open(
        `https://api.whatsapp.com/send?phone=${convidado.contato.replace(
          /\D/g,
          ""
        )}&text=${encodeURIComponent(wppMessage)}`,
        "_blank"
      );

      buscarStatusAtualizado();
    } catch (error) {
      console.error("Erro ao enviar convite ou salvar no Firebase:", error);
    }
  };

  const marcarConfirmacao = async (docId: any) => {
    try {
      const docRef = doc(db, "enviados", docId);
      await updateDoc(docRef, {
        confirmado: true,
        dataConfirmacao: new Date().toISOString(),
      });

      buscarStatusAtualizado();
    } catch (error) {
      console.error("Erro ao registrar confirmação:", error);
    }
  };

  if (carregando) {
    return <p>Carregando...</p>;
  }

  // Aplica os filtros e a busca por nome
  const convidadosFiltrados = convidados.filter((convidado) => {
    const status = statusEnviados.find((e: any) => e.id === convidado.id);

    // Filtra por tipo
    if (filtro === "nao-enviados" && status?.enviado) return false;
    if (filtro === "enviados" && !status?.enviado) return false;
    if (filtro === "confirmados" && !status?.confirmado) return false;
    if (
      filtro === "nao-confirmados" &&
      (!status?.enviado || status?.confirmado)
    )
      return false;

    // Filtra por nome
    if (busca && !convidado.nome.toLowerCase().includes(busca.toLowerCase()))
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Convidados</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFiltro("todos")}
          className={`px-4 py-2 rounded-md ${
            filtro === "todos" ? "bg-gray-700" : "bg-gray-600"
          } hover:bg-gray-500`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro("nao-enviados")}
          className={`px-4 py-2 rounded-md ${
            filtro === "nao-enviados" ? "bg-green-600" : "bg-gray-600"
          } hover:bg-green-500`}
        >
          Não Enviados
        </button>
        <button
          onClick={() => setFiltro("enviados")}
          className={`px-4 py-2 rounded-md ${
            filtro === "enviados" ? "bg-blue-600" : "bg-gray-600"
          } hover:bg-blue-500`}
        >
          Enviados
        </button>
        <button
          onClick={() => setFiltro("confirmados")}
          className={`px-4 py-2 rounded-md ${
            filtro === "confirmados" ? "bg-green-700" : "bg-gray-600"
          } hover:bg-green-500`}
        >
          Confirmados
        </button>
        <button
          onClick={() => setFiltro("nao-confirmados")}
          className={`px-4 py-2 rounded-md ${
            filtro === "nao-confirmados" ? "bg-red-600" : "bg-gray-600"
          } hover:bg-red-500`}
        >
          Não Confirmados
        </button>
      </div>

      {/* Campo de Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Lista de convidados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {convidadosFiltrados.map((convidado) => {
          const status = statusEnviados.find((e: any) => e.id === convidado.id);

          const cardBorderClass = status?.confirmado
            ? status?.enviado
              ? "border-green-700"
              : "border-white"
            : "border-gray-800";

          return (
            <div
              key={convidado.id}
              className={`bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col p-4 border-2 ${cardBorderClass}`}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="text-lg font-semibold text-gray-100">
                  {convidado.nome}
                </div>
                <div className="text-sm text-gray-400">{convidado.empresa}</div>
              </div>
              <div className="text-sm text-gray-300 mb-6">
                Contato: {convidado.contato || "Não informado"}
              </div>
              <div className="mt-auto flex justify-between">
                <div className="flex flex-col items-start">
                  {status?.enviado && (
                    <div className="text-white font-semibold text-center mb-2">
                      Enviado em:{" "}
                      {status.dataEnvio
                        ? new Date(status.dataEnvio).toLocaleString()
                        : "N/A"}
                    </div>
                  )}
                  {status?.confirmado && (
                    <div className="text-green-600 text-center mb-2 font-semibold">
                      Confirmado em:{" "}
                      {status.dataConfirmacao
                        ? new Date(status.dataConfirmacao).toLocaleString()
                        : "N/A"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => copiarLink(convidado.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 p-3 rounded-md transition-colors shadow-md hover:shadow-lg"
                    title="Copiar Link"
                  >
                    <ClipboardIcon className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => enviarLinkWpp(convidado)}
                    className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-md transition-colors shadow-md hover:shadow-lg"
                    title="Reenviar Convite"
                  >
                    <PaperAirplaneIcon className="h-3 w-3" />
                  </button>
                  {status?.enviado && !status?.confirmado && (
                    <button
                      onClick={() => marcarConfirmacao(status.docId)}
                      className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-md transition-colors shadow-md hover:shadow-lg"
                      title="Marcar como Confirmado"
                    >
                      <CheckIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
