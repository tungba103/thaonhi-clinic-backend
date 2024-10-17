import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

export function AuthClaims() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
}
