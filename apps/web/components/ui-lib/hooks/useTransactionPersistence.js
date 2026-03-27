"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionPersistence = void 0;
const react_1 = require("react");
const ssr_1 = require("../utils/ssr");
const STORAGE_KEY = 'bridgewise_tx_state';
const useTransactionPersistence = () => {
    const [state, setState] = (0, react_1.useState)({
        id: '',
        status: 'idle',
        progress: 0,
        step: '',
        timestamp: 0,
    });
    // Load from storage on mount
    (0, react_1.useEffect)(() => {
        const stored = ssr_1.ssrLocalStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Optional: Expiry check (e.g. 24h)
                if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                    setState(parsed);
                }
                else {
                    ssr_1.ssrLocalStorage.removeItem(STORAGE_KEY);
                }
            }
            catch (e) {
                console.error('Failed to load transaction state', e);
            }
        }
    }, []);
    // Save to storage whenever state changes
    (0, react_1.useEffect)(() => {
        if (state.status === 'idle') {
            // We might want to clear it if it's explicitly idle, or keep it if it's "history"
            // For now, let's only clear if we explicitly want to reset.
            // But if the user starts a new one, it overwrites.
            return;
        }
        // If completed/failed, we might want to keep it generic for a bit
        // But persistence is key.
        ssr_1.ssrLocalStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);
    const updateState = (0, react_1.useCallback)((updates) => {
        setState((prev) => ({ ...prev, ...updates, timestamp: Date.now() }));
    }, []);
    const clearState = (0, react_1.useCallback)(() => {
        setState({
            id: '',
            status: 'idle',
            progress: 0,
            step: '',
            timestamp: 0,
        });
        ssr_1.ssrLocalStorage.removeItem(STORAGE_KEY);
    }, []);
    const startTransaction = (0, react_1.useCallback)((id) => {
        setState({
            id,
            status: 'pending',
            progress: 0,
            step: 'Initializing...',
            timestamp: Date.now(),
        });
    }, []);
    return {
        state,
        updateState,
        clearState,
        startTransaction,
    };
};
exports.useTransactionPersistence = useTransactionPersistence;
//# sourceMappingURL=useTransactionPersistence.js.map