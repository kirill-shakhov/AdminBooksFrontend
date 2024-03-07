import $api from "@/services/api/helpers/createAxiosInstance.ts";
import { UpdateProfileResponse } from "./profileApi.types.ts";
import { AxiosResponse } from "axios";

class ProfileApi {
    async changeProfile(request:FormData): Promise<UpdateProfileResponse> {
        return $api.patch<UpdateProfileResponse>('/profile/update', request).then((response:AxiosResponse<UpdateProfileResponse>) => response.data)
    }
}


export const profileApi = new ProfileApi();
