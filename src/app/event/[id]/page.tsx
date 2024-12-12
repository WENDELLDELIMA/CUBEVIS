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

function EventPage({ params }: PageProps) {
  const [convidados, setConvidados]: any = useState([]);
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
  useEffect(() => {
    const fetchConvidados = async () => {
      try {
        const convidadosCollection = collection(db, "convidados");
        const snapshot = await getDocs(convidadosCollection);
        const convidadosData = snapshot.docs.map((doc) => ({
          id: doc.id, // Usa o ID do documento como ID único
          ...doc.data(), // Inclui os dados do Firestore
        }));

        setConvidados(convidadosData); // Atualiza o estado com os dados dos convidados
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      } finally {
      }
    };
    fetchConvidados();
  }, []);
  // Função para gerar o link do Google Calendar personalizada com o convidado obtido pelo ID da URL
  const handleGoogleCalendarLink = async () => {
    // Converte o id para número
    const convidadoId = Number(id2);
    const convidado = convidados.find((c: any) => c.id === convidadoId);

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
    window.open(wppWebUrl, "_blank");

    // Tenta abrir diretamente no aplicativo, mas cai para o navegador se não funcionar
    try {
      location.href = wppAppUrl; // Tenta abrir diretamente no app do WhatsApp
    } catch {
      window.open(wppWebUrl, "_blank"); // Certifique-se de que wppWebUrl é uma string

      // Redireciona para o link web como fallback
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
