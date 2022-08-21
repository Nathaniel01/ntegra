import axios from "axios";
import { LaunchData } from "../interfaces";


const baseUrl = "https://api.spacexdata.com/v5/launches/";
export default async function fetchData(): Promise<LaunchData[]> {
     try {
          const res: { data: LaunchData[] } = await axios.get(baseUrl)
          return res.data;
     } catch(e){
          console.log(e) // in real project this would be proper error logging, depending on severity.
          throw e;
     }
}

