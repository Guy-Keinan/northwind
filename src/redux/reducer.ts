import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";

export function reduce(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.GetAllProducts:
            newAppState.products = action.payload;
            break;

        case ActionType.AddProduct:
            newAppState.products.push(action.payload);
            break;

        default: break;
    }

    return newAppState;
}