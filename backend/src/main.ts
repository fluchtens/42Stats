import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisClient = createClient({
    socket: { host: 'redis', port: 6379 },
  });
  await redisClient.connect();
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'my-secret',
      rolling: true,
      unset: 'destroy',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
