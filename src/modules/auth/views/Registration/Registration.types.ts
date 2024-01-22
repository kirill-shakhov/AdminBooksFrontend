export interface RegistrationData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    image: File | null;
    currentStep: number;
}