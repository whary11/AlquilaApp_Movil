import React, { createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApi } from '../api/ApiService';
import { User } from '../interfaces/UserInterfaces';
import { DataSearchReserve } from '../interfaces/ReserveInterface';

type ReserveContextProps = {
    dataReserve:DataSearchReserve
    loadReserves:() => void
}


export const ReserveContext = createContext({} as ReserveContextProps);


export const  ReserveProvider = ({ children }:  any) =>{
    const [dataReserve, setDataReserve] = useState<DataSearchReserve>({
        limit:10,
        page:0,
        isLoading:false,
        isMorePage:true,
        reserves:[]
    })

    const loadReserves = async() => {
        try {
            if (dataReserve.isLoading || !dataReserve.isMorePage) {
                return
            }
            setDataReserve((prevData) => {
                return {...prevData, isLoading:true}
            })
            const params:any = {
              limit:dataReserve.limit,
              page:dataReserve.page + 1
            }
            const resp = await fetchApi(`/guest/reserves/history`,{
              method:'POST',
              body:params
            })
            
            if (resp.code == 200) {
                setDataReserve((prevData) => {
                    const uniqueNewData = resp.data.data.filter((newItem:any) => {
                        return !prevData.reserves.some(existingItem => existingItem.id === newItem.id);
                    });

                    return {
                        ...prevData, 
                        page: params.page,
                        reserves: [...prevData.reserves, ...uniqueNewData]
                    }
                })
                if (resp.data.data.length < dataReserve.limit) {
                    setDataReserve((prevData) => {
                        return {...prevData, isMorePage:false}
                    })
                }
            }
      
        } catch (error) {
            console.error(error);
        } finally {
            setDataReserve((prevData) => {
                return {...prevData, isLoading:false}
            })
        }
    }
    return (
        <ReserveContext.Provider value={{
            dataReserve,
            loadReserves
        }}>
            { children }
        </ReserveContext.Provider>
    )

}