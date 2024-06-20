export interface Token {
    token: string;
  }
  
  // Token JWT decodificado para acceder a sus datos
  export interface DecodedToken {
    photoUrl: string;
    sub: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }