interface UserProfile {
    fullName: string;
    email: string;
    image: string;
}

interface Links {
    name: string,
    link: string
}

export interface HeaderProfileData {
    user: UserProfile;
    pages: Array<Links>
}