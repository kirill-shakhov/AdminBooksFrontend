import $api from "../../../services/api/helpers/createAxiosInstance.ts";
import { UpdateProfileResponse } from "../types";

class ProfileService {
    async changeProfile(request): Promise<UpdateProfileResponse> {
        return $api.patch<UpdateProfileResponse>('/profile/update', request).then(response => response.data)
    }
}


const profileService = new ProfileService();

export { profileService };