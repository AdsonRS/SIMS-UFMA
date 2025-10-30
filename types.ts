
export enum Screen {
  Map = 'Mapa',
  Trips = 'Viagens',
  Wallet = 'Carteira',
  Settings = 'Configurações',
}

export interface Station {
  id: number;
  name: string;
  availableBikes: number;
  totalDocks: number;
  position: {
    top: string;
    left: string;
  };
}

export interface Trip {
  id: string;
  date: string;
  duration: string;
  distance: string;
  cost: string;
}

export interface UserProfile {
  name: string;
  email: string;
  matricula: string;
  balance: number;
}
