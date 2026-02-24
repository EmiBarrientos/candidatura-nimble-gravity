import { useState } from "react";
import { sendPostulation } from "../services/Postulacion";
import type { ApplicationRequest } from "../types/IApplicationRequest";

interface FormularioProps {
  jobId: number;
  repoUrl: string;
  onCancel: () => void;
}


export default function Formulario({
    jobId,
    repoUrl,
    onCancel
    }: FormularioProps){
    const [candidateId, setCandidateId] = useState<number>(0);
    const [uuid, setUuid] = useState<string>("");
    const [applicationId, setapplicationId] = useState<string>("");
    

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
           

        try{ 
        
            const payload :ApplicationRequest = {
            uuid,
            jobId: String(jobId),
            candidateId: String(candidateId),
            repoUrl,
            applicationId

            };
            
            await sendPostulation(payload);
        }catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Error desconocido:", err);
            }
        }
 
};

     return (
        <div className="bg-blue-200 p-6 rounded-lg shadow-lg border border-black mt-4">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Postulacion a esta vacante </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Uuid</label>
                        <input
                            type="text"
                            name="uuid"
                            onChange={(e)=>setUuid(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
                        />
                    </div>
                    
                        
                    <div>
                            <label className="block text-sm font-bold text-gray-700 ">Candidate ID</label>
                            <input
                                type="number"
                                name="candidateId"
                                onChange={(e)=>setCandidateId(Number(e.target.value))}
                                required

                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
                            />
                    </div>
                    
                    
                    <div>
                            <label className="block text-sm font-bold text-gray-700 ">applicationId ID</label>
                            <input
                                type="text"
                                name="aplicationId"
                                onChange={(e)=>setapplicationId(e.target.value)}
                                required

                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
                            />
                    </div>
                    

                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md text-black"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
                    >
                        Postularse
                    </button>
                </div>
            </form>
        </div>
    );




}