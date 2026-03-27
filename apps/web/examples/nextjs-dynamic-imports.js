"use strict";
/**
 * Next.js Dynamic Import Examples for BridgeWise Components
 *
 * These examples show how to properly import BridgeWise components
 * in Next.js applications to avoid SSR issues.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeBridgeCompare = exports.BridgePage = exports.BridgeQuotesHookExample = exports.TransactionHeartbeatDynamic = exports.BridgeCompareWithLoading = exports.BridgeCompareDynamic = void 0;
exports.default = BridgePageRoute;
const dynamic_1 = __importDefault(require("next/dynamic"));
// Example 1: Dynamic import with SSR disabled (Recommended)
exports.BridgeCompareDynamic = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../components/BridgeCompare'))).then(mod => mod.BridgeCompare), {
    ssr: false,
    loading: () => <div>Loading Bridge Compare...</div>
});
// Example 2: Dynamic import with custom loading component
exports.BridgeCompareWithLoading = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../components/BridgeCompare'))).then(mod => mod.BridgeCompare), {
    ssr: false,
    loading: () => (<div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>)
});
// Example 3: Transaction Heartbeat with SSR disabled
exports.TransactionHeartbeatDynamic = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../components/TransactionHeartbeat'))).then(mod => mod.TransactionHeartbeat), {
    ssr: false,
    loading: () => null // Don't show loading for heartbeat
});
// Example 4: Hook-only dynamic import (if needed)
exports.BridgeQuotesHookExample = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../components/ui-lib/hooks/useBridgeQuotes'))).then(mod => ({ default: mod.useBridgeQuotes })), { ssr: false });
const BridgePage = ({ initialParams }) => {
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bridge Assets</h1>
      
      <exports.BridgeCompareDynamic initialParams={initialParams} onQuoteSelect={(quoteId) => {
            console.log('Selected quote:', quoteId);
        }} refreshInterval={15000} autoRefresh={true}/>
      
      <exports.TransactionHeartbeatDynamic />
    </div>);
};
exports.BridgePage = BridgePage;
// Example 6: App Router usage (app/bridge/page.tsx)
function BridgePageRoute() {
    const initialParams = {
        amount: '100',
        sourceChain: 'ethereum',
        destinationChain: 'polygon',
        sourceToken: 'USDC',
        destinationToken: 'USDC',
        slippageTolerance: 1.0
    };
    return <exports.BridgePage initialParams={initialParams}/>;
}
// Example 8: With error boundary
const react_error_boundary_1 = require("react-error-boundary");
const SafeBridgeCompare = () => (<react_error_boundary_1.ErrorBoundary fallback={<div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <h3 className="text-red-800 font-semibold">Bridge Component Error</h3>
        <p className="text-red-600">Unable to load bridge comparison component.</p>
      </div>}>
    <exports.BridgeCompareDynamic initialParams={{
        amount: '100',
        sourceChain: 'ethereum',
        destinationChain: 'polygon',
        sourceToken: 'USDC',
        destinationToken: 'USDC'
    }}/>
  </react_error_boundary_1.ErrorBoundary>);
exports.SafeBridgeCompare = SafeBridgeCompare;
//# sourceMappingURL=nextjs-dynamic-imports.js.map