import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
// import { ExpensesModule } from './modules/expenses/expenses.module';
import { WinstonLoggerService } from './modules/logger/winston-logger.service';
import { LoggerMiddleware } from './middlewares';
import { JwtStrategy } from './modules/auth/strategy';
import { CategoryModule } from './modules/category/category.module';
import { SourceModule } from './modules/source/source.module';
import { TransactionsModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CategoryModule,
    SourceModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService, JwtStrategy],
  exports: [WinstonLoggerService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
