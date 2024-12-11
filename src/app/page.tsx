"use client";
import { saveAs } from "file-saver";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import dynamic from "next/dynamic";
import save from "../../public/animations/save.json";
import { useEffect, useState } from "react";

// Importa o componente Lottie dinamicamente sem suporte a SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Inclua os pesos que você usará
});


function EventPage() {

  const [loading, setLoading] = useState(true);
  const eventName = "CUBEVIS - SAVE THE DATE";
  const eventDate = new Date("2024-12-17T13:00:00");
  const eventEndDate = new Date("2024-12-17T18:00:00");
  const eventLocation =
    "Av. Engenheiro Luís Carlos Berrini, 105, Cidade Monções, São Paulo - SP";
  const eventDescription =
    "Venha participar de um evento exclusivo e conheça a CUBEVIS, uma incubadora que está moldando o futuro da indústria. Com foco em tecnologia de ponta, impulsionamos ideias promissoras em soluções GreenTech, transformando desafios em oportunidades.";
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timeout ao desmontar o componente
  }, []);
  // Gera o arquivo .ics
  const handleGenerateICS = () => {
    const eventDetails = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cubevis//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${new Date().getTime()}@cubevis.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=America/Sao_Paulo:${
      eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]
    }
DTEND;TZID=America/Sao_Paulo:${
      eventEndDate.toISOString().replace(/[-:]/g, "").split(".")[0]
    }
SUMMARY:${eventName}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([eventDetails], {
      type: "text/calendar;charset=utf-8",
    });

    saveAs(blob, `${eventName.replace(/ /g, "_")}.ics`);
  };

  // Gera o link para o Google Calendar
  const handleGoogleCalendarLink = () => {
    // Mensagem a ser enviada no WhatsApp
    const wppMessage =
      "CONFIRMANDO PARTICIPAÇÃO NO EVENTO DE INAUGURAÇÃO DA CUBEVIS";
    // Número de telefone no formato internacional sem o "+"
    // Ex: Para o Brasil, DDI 55, DDD 11, número 912345678 => "5511912345678"
    const wppNumber = "5511986663003";

    // Monta a URL para abrir o WhatsApp com a mensagem
    const wppUrl = `https://api.whatsapp.com/send?phone=${wppNumber}&text=${encodeURIComponent(
      wppMessage
    )}`;

    // Abre o WhatsApp em uma nova aba
    window.open(wppUrl, "_blank");

    // Depois de abrir o WhatsApp, pode-se perguntar ao usuário se ele já enviou a mensagem
    const userConfirmed = confirm(
      "Você já confirmou a participação no evento via WhatsApp?"
    );

    if (userConfirmed) {
      // Agora abre o Google Calendar
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
    // Renderiza o restante do conteúdo quando o loading for falso
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
              <div className="flex justify-center hidden">
                <Image
                  src="/save.svg"
                  width={350}
                  height={100}
                  alt="Imagem adicional"
                  className="w-auto h-auto max-w-[350px] max-h-[100px]"
                />
              </div>
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
