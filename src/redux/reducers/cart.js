const initState = {
    items: {},
    totalCount: 0,
    totalCost: 0,
};

const getTotalCost = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split(".");
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};

const cart = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PIZZA_CART": {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalCost: getTotalCost(currentPizzaItems),
                },
            };

            const totalCount = getTotalSum(newItems, "items.length");
            const totalCost = getTotalSum(newItems, "totalCost");

            return {
                ...state,
                items: newItems,
                totalCount,
                totalCost,
            };
        }

        case "REMOVE_CART_ITEM": {
            const newItems = {
                ...state.items,
            };
            const currentTotalCost = newItems[action.payload].totalCost;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];
            return {
                ...state,
                items: newItems,
                totalCost: state.totalCost - currentTotalCost,
                totalCount: state.totalCount - currentTotalCount,
            };
        }

        case "PLUS_CART_ITEM": {
            const newObjItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0],
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalCost: getTotalCost(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, "items.length");
            const totalCost = getTotalSum(newItems, "totalCost");

            return {
                ...state,
                items: newItems,
                totalCount,
                totalCost,
            };
        }

        case "MINUS_CART_ITEM": {
            const oldItems = state.items[action.payload].items;
            const newObjItems =
                oldItems.length > 1
                    ? state.items[action.payload].items.slice(1)
                    : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalCost: getTotalCost(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, "items.length");
            const totalCost = getTotalSum(newItems, "totalCost");

            return {
                ...state,
                items: newItems,
                totalCount,
                totalCost,
            };
        }

        case "CLEAR_CART":
            return {
                items: {},
                totalCount: 0,
                totalCost: 0,
            };

        default:
            return state;
    }
};

export default cart;