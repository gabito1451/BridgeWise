import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  RawBridgeQuote,
  BridgeProvider,
  QuoteRequestParams,
} from './interfaces';
import { BridgeStatus } from './enums';

interface MockQuoteTemplate {
  feesUsd: number;
  gasCostUsd: number;
  estimatedTimeSeconds: number;
  outputRatio: number; // how much of input the user gets
}

@Injectable()
export class AggregationService {
  private readonly logger = new Logger(AggregationService.name);

  private readonly MOCK_PROVIDERS: BridgeProvider[] = [
    {
      id: 'stargate',
      name: 'Stargate Finance',
      apiBaseUrl: 'https://api.stargate.finance',
      supportedChains: [
