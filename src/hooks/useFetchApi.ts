import { useContext, useState } from 'react';
import { respApi } from '../interfaces/GlobalInterfaces';
import { AuthContext } from '../context/AuthContext';

interface ConfigFetch {
    method: "POST" | "GET" | "PUT";
    body?: any;
    headers?: any;
}
//const PATH_SERVER = "https://dev.alquilapp.com.co"; //Dev
const PATH_SERVER = "http://192.168.0.9:9004"; // Local

const baseUrl = `${PATH_SERVER}/api`;

const useFetchApi = () => {
    const {token,logout} = useContext(AuthContext)

    
    const [respApi, setRespApi] = useState<respApi|undefined>();
    const [errorApi, setErrorApi] = useState<string | null>(null);
    const [loadingApi, setLoadingApi] = useState<boolean>(false);
    
    const fetchApi = async (path: string, config: ConfigFetch) => {
        try {
            setLoadingApi(true);
            
            config.headers = {
                'XMLHttpRequest': 'X-Requested-With',
                ...config.headers
            };
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }

            if (!(config.body instanceof FormData)) {
                config.headers = { ...config.headers, 'Content-Type': 'application/json' };
                config.body = JSON.stringify(config.body);
            }

            console.log('api', `${baseUrl}${path}`);

            let resp = await fetch(`${baseUrl}${path}`, config);
            if (resp.status === 401) {
                logout()
                // Hacer proceso para no autenticado
            }
            const jsonData = await resp.json()

            setRespApi(jsonData)
            return jsonData
        } catch (error:any) {
            // return error
            setErrorApi(error.message || 'Error desconocido');
        } finally {
            setLoadingApi(false);
        }
    };

    return { respApi, errorApi, loadingApi, fetchApi };
};

export default useFetchApi;
