import $api from "../../../services/api/helpers/createAxiosInstance.ts";
import { UpdateProfileResponse } from "../types";
import { AxiosResponse } from "axios";

class ProfileService {
    async changeProfile(request:FormData): Promise<UpdateProfileResponse> {
        return $api.patch<UpdateProfileResponse>('/profile/update', request).then((response:AxiosResponse<UpdateProfileResponse>) => response.data)
    }
}


const profileService = new ProfileService();

export { profileService };