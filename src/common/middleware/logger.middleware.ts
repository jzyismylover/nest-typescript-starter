import { Injectable, NestMiddleware } from '@nestjs/common';

export function LoggerMiddleware(req, res, next){
  console.log('...Logging...')
  next()
}