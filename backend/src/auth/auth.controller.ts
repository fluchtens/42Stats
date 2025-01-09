import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42')
  @UseGuards(AuthGuard('42'))
  async loginWith42() {
    console.log('loginWith42');
    // La redirection vers la page de connexion 42 se fait automatiquement ici.
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async handle42Callback() {
    console.log('handle42Callback');
    // Après une connexion réussie, l'utilisateur sera redirigé ici.
    // Tu peux ici envoyer une réponse ou rediriger l'utilisateur vers une page protégée.
  }
}
