export interface Utente {
    id?: string;
    email: string;
    nome?: string;
    cognome?: string;
    datanascita?: string;
    codice_fiscale?: string;
    sesso?: string;
    cittàNascita?: string;
    residenza?: string;
    indirizzo?: string;
    stato?: boolean;
    caricamenti?: boolean;
}