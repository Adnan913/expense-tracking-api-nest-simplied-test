import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseDto } from 'common/dtos';
import { Model } from 'mongoose';
import { Transaction } from 'src/schemas/transaction.schema';
import * as moment from 'moment';
import { CreateTransactionDto } from './dtos';

@Injectable()
export class TransactionService {
  constructor( @InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string){
    try{
          const newTransaction = await this.transactionModel.create({ ...createTransactionDto, userId });
          return new ResponseDto(true, newTransaction, {}, 'Successfully created transaction', HttpStatus.CREATED);
        }catch(error){
          return new ResponseDto(false, {}, error, 'Somethig bad happen', HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }

  async findAll(userId: string) {
    const transactions = await this.transactionModel.find({ userId });
    return new ResponseDto(true, transactions, {}, 'Successfully get all transactions', HttpStatus.OK);
  
  }

async getSummary(userId: string, period: ('day' | 'week' | 'month' | 'year'), role: string) {
    const startDate = moment().startOf(period).toDate();
    const endDate = moment().endOf(period).toDate();

    const matchPayload = {
      date: { $gte: startDate, $lte: endDate },
    }
    
    if(role == 'user'){
      matchPayload['userId'] = userId;
    }

    const summary = await this.transactionModel.aggregate([
      {
        $match: matchPayload,
      },
      // {
      //   $group: {
      //     _id: '$type',
      //     total: { $sum: '$amount' }, 
      //   },
      // },
    ]);

    return new ResponseDto(true,{summary}, {}, 'Successfully retrieved transactions summary', HttpStatus.OK);
}

}
