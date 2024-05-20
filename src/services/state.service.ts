import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserBalance } from "../models/user.model";

interface AppState {
    sortedOrder: string;
    userData: UserBalance[];
}

@Injectable({
    providedIn: 'root',
})
export class GlobalStateService {
    private stateSubject = new BehaviorSubject<AppState>({
        sortedOrder: '',
        userData: [],
    });

    public state: Observable<AppState> = this.stateSubject.asObservable();

    setState(newState: Partial<AppState>): void {
        this.stateSubject.next({ ...this.stateSubject.value, ...newState });
    }

    getState(): AppState {
        return this.stateSubject.value;
    }

    resetState(): void {
        this.stateSubject.next({sortedOrder: '', userData: []});
    }
}