import { useState,useEffect } from "react";
import { getAllPositions } from "../services/Posiciones";
import Formulario from "./Formulario";

interface Pos {
    id: number;
    title: string;
  
}


export default function Posiciones(){
    const [posiciones, setPosiciones] = useState<Pos[]>([]);
    const [openFormId, setOpenFormId] = useState<number | null>(null);
    const [repoUrls, setRepoUrls] = useState<Record<number, string>>({});
   


   

    const loadPosiciones = async () => {

      try {
        const data = await getAllPositions();
        setPosiciones(data);
      
      } catch (err) {
        console.error(err);
        
      } 
    };
  
  useEffect(() => {
    loadPosiciones();
    }, []);


  
  return (
    <div className="p-6 text-white">

        <h1 className="text-2xl font-bold mb-4"> Posiciones Abiertas</h1>
        
        <div className="space-y-4">
            {posiciones.map((posicion) => (
            <div
                key={posicion.id}
                className="p-4 bg-slate-800 rounded-lg border border-slate-700"
            >
             
                <p>
                <span className="font-semibold">Posicion:</span>{" "}
                {posicion.title}
                </p>
                <input
                        type="text"
                        name="repoURL"
                        placeholder="ingrese repositorio de github"
                        value={repoUrls[posicion.id] || ""}
                        onChange={(e) =>
                          setRepoUrls(prev => ({
                            ...prev,
                            [posicion.id]: e.target.value
                            }))}
                  
                        required
                        className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
                    />
                <button
                    type="button"
                    onClick={() =>
                        setOpenFormId(prev =>
                          prev === posicion.id ? null : posicion.id
                        )
                      }
                    className=" mt-1 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-400 rounded-md text-white"
                >
                     {openFormId === posicion.id ? "Cerrar form" : "Abrir form"}
                </button>
                   {openFormId === posicion.id && (
                        <Formulario
                          jobId={posicion.id}
                          repoUrl={repoUrls[posicion.id] || ""}
                          onCancel={() => setOpenFormId(null)}
                        />
                      )}
                   
           
          </div> 
         ))}
        </div>

  </div>
);

}