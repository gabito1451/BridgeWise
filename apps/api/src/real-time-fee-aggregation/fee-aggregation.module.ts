import { Module, OnModuleInit } from '@nestjs/common';
import { BridgeRegistryService } from './bridge-registry.service';
import { FeeAggregationService } from './fee-aggregation.service';
import { QuoteScoringService } from './quote-scoring.service';
import { QuotesController } from './quotes.controller';
<<<<<<< HEAD:src/real-time-fee-aggregation/fee-aggregation.module.ts
import {
  AcrossAdapter,
  HopAdapter,
  StargateAdapter,
} from './adapters/bridge.adapters';
=======
import { AcrossAdapter, HopAdapter, StargateAdapter } from './bridge.adapters';
>>>>>>> 902330b94c4294029cf45eb84c6121443fbb0427:apps/api/src/real-time-fee-aggregation/fee-aggregation.module.ts

@Module({
  controllers: [QuotesController],
  providers: [
    BridgeRegistryService,
    FeeAggregationService,
    QuoteScoringService,
    // Bridge adapters
    AcrossAdapter,
    HopAdapter,
    StargateAdapter,
  ],
  exports: [FeeAggregationService, BridgeRegistryService],
})
export class FeeAggregationModule implements OnModuleInit {
  constructor(
    private readonly registry: BridgeRegistryService,
    private readonly across: AcrossAdapter,
    private readonly hop: HopAdapter,
    private readonly stargate: StargateAdapter,
  ) {}

  onModuleInit() {
    this.registry.register(this.across);
    this.registry.register(this.hop);
    this.registry.register(this.stargate);
  }
}
