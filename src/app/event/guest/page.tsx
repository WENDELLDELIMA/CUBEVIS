"use client";
import { useState } from "react";

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
];

export default function GuestsPage() {
  const [telefoneRemetente] = useState("5511986663003"); // Ajuste o número conforme necessário

  const enviarLinkWpp = (convidado: any) => {
    // Mensagem contendo o link com o ID do convidado
    const linkEvento = `https://save.cubevis.com.br/event/${btoa(
      convidado.id
    )}`;
    const wppMessage = `Olá, *${convidado.nome}*!
Estou compartilhando o link do evento da CUBEVIS com o seu Link de confirmação:
${linkEvento}

Confirmar sua presença neste link!`;

    const wppUrl = `https://api.whatsapp.com/send?phone=${
      convidado.contato.replace(/\D/g, "") // Remove caracteres não numéricos do contato
    }&text=${encodeURIComponent(wppMessage)}`;

    window.open(wppUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-4 font-sans bg-gray-800">
      <h1 className="text-xl font-bold mb-4 text-white">
        Lista de Convidados:{" "}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {convidados.map((convidado) => (
          <div
            key={convidado.id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800">
                {convidado.nome}
              </div>
              <div className="text-sm text-gray-500">{convidado.empresa}</div>
            </div>
            <div className="text-sm text-gray-700 mb-4">
              Contato: {convidado.contato}
            </div>
            <button
              onClick={() => enviarLinkWpp(convidado)}
              className="mt-auto bg-green-900 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Enviar no WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
