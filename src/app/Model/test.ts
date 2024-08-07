export interface Country {
    name?: string;
    code?: string;
  }
  
  export interface Representative {
    name?: string;
  }
  
  export interface Customer {
    role: string;
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: boolean;
  }
  export interface UserProfile {
    id: number;
    name: string;
    email: string;
    password: string;
    date: Date; // Assurez-vous que le champ correspond au format de votre backend
    number: string;
    token: string;
    isOnline: boolean;
    role: string;
    chefHierarchique?: UserProfile; // Propriété optionnelle pour éviter les erreurs si elle est absente
  }
  export interface LoanRequest {
    montant: number;
    type: string;
    utilisateurId: number;
  }
  export interface Autorisation {
    type: string;
    utilisateurId: number;
    dateDebut:Date;
    dateFin:Date;
  }