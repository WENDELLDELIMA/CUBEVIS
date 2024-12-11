"use client";
import { useState } from "react";
import { useEffect } from "react";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
// Lista de convidados (exemplo)

export default function GuestsPage() {
  const [convidados, setConvidados]: any = useState([]);
  const [statusEnviados, setStatusEnviados]: any = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConvidado, setNewConvidado] = useState({
    nome: "",
    empresa: "",
    contato: "",
    email: "",
  });
  const getLastId = async () => {
    const convidadosCollection = collection(db, "convidados");
    const q = query(convidadosCollection, orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0 ? snapshot.docs[0].data().id : 0;
  };

  const handleAddConvidado = async () => {
    try {
      const lastId = await getLastId();
      const newId = lastId + 1;

      const convidadosCollection = collection(db, "convidados");
      const newConvidadoData = { id: newId, ...newConvidado };

      await addDoc(convidadosCollection, newConvidadoData);

      setConvidados([...convidados, newConvidadoData]);
      setIsModalOpen(false);
      setNewConvidado({ nome: "", empresa: "", contato: "", email: "" });
    } catch (error) {
      console.error("Erro ao adicionar convidado:", error);
    }
  };

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
        setCarregando(false); // Conclui o carregamento
      }
    };
    fetchConvidados()
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

      window.location.href = `whatsapp://send?phone=${convidado.contato.replace(
        /\D/g,
        ""
      )}&text=${encodeURIComponent(wppMessage)}`;

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
  const convidadosFiltrados = convidados.filter((convidado:any) => {
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
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-6">Lista de Convidados</h1>
      <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded h-[3rem]"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Convidado
        </button>
      </div>
     

      {/* Filtros */}
      <div className="flex gap-1 mb-4  text-[.7rem] overflow-auto no-scrollbar">
        <button
          onClick={() => setFiltro("todos")}
          className={`px-2 rounded-md p-3 ${
            filtro === "todos" ? "bg-gray-700" : "bg-gray-600"
          } hover:bg-gray-500`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro("nao-enviados")}
          className={`px-2  rounded-md ${
            filtro === "nao-enviados" ? "bg-green-600" : "bg-gray-600"
          } hover:bg-green-500`}
        >
          Não Enviados
        </button>
        <button
          onClick={() => setFiltro("enviados")}
          className={`px-2 rounded-md p-3 ${
            filtro === "enviados" ? "bg-blue-600" : "bg-gray-600"
          } hover:bg-blue-500`}
        >
          Enviados
        </button>
        <button
          onClick={() => setFiltro("confirmados")}
          className={`px-2 rounded-md p-3 ${
            filtro === "confirmados" ? "bg-green-700" : "bg-gray-600"
          } hover:bg-green-500`}
        >
          Confirmados
        </button>
        <button
          onClick={() => setFiltro("nao-confirmados")}
          className={`px-2 rounded-md p-3 ${
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
        {convidadosFiltrados.map((convidado:any) => {
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Adicionar Convidado</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Nome</label>
              <input
                className="w-full p-2 bg-gray-800 text-white rounded"
                type="text"
                value={newConvidado.nome}
                onChange={(e) => setNewConvidado({ ...newConvidado, nome: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Empresa</label>
              <input
                className="w-full p-2 bg-gray-800 text-white rounded"
                type="text"
                value={newConvidado.empresa}
                onChange={(e) => setNewConvidado({ ...newConvidado, empresa: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Contato</label>
              <input
                className="w-full p-2 bg-gray-800 text-white rounded"
                type="text"
                value={newConvidado.contato}
                onChange={(e) => setNewConvidado({ ...newConvidado, contato: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <input
                className="w-full p-2 bg-gray-800 text-white rounded"
                type="email"
                value={newConvidado.email}
                onChange={(e) => setNewConvidado({ ...newConvidado, email: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddConvidado}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
