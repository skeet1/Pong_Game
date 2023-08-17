import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
// import { CorsModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // CorsModule.forRoot({
    //   // Adjust these options based on your requirements
    //   origin: 'http://localhost:3000', // The allowed origin(s)
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // The allowed HTTP methods
    //   credentials: true, // Allow sending cookies
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
