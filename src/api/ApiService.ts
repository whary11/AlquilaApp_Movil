import AsyncStorage from '@react-native-async-storage/async-storage';
interface configFetch {
    method:string|"POST"|"GET"|"PUT"
    body?:any
    headers?:any
}
const baseUrl = `${process.env.PATH_SERVER}/api`

export const fetchApi = async(path:string,config:configFetch)=>{
    try {
        const token = await AsyncStorage.getItem('token');
        config.headers = {
            'Authorization' : `Bearer ${token}`,
            'XMLHttpRequest':'X-Requested-With',
            ...config.headers
        }
        if (!(config.body instanceof FormData)) {
            config.headers = {...config.headers,'Content-Type' : 'application/json',}
            config.body = JSON.stringify(config.body)
        }
        console.log('api', `${baseUrl}${path}`);
        
        let resp = await fetch(`${baseUrl}${path}`,config)
        if (resp.status === 401) {
            //Hacer proceso para no autenticado
        }
        return await resp.json()
    } catch (error) {
        return error
    }
}