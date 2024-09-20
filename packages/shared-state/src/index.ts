import { SetStateAction, useLayoutEffect, useState } from "react";

type Listener<T> = (newState: T) => any;

export class SharedState<T> {
  private _listeners = new Set<Listener<T>>();
  private _emit(newState: T) {
    this._listeners.forEach(listener => listener(newState));
  }

  get state() {
    return this._state;
  }

  set state(v) {
    this._emit(this._state = v);
  }

  constructor(private _state: T) { }

  setState(dispatch: SetStateAction<T | undefined>) {
    if (dispatch instanceof Function)
      dispatch = dispatch(this._state);

    if (typeof dispatch !== 'undefined')
      this._emit(this._state = dispatch);
  }

  useState(): ReturnType<typeof useState<T>> {
    const [_, listener] = useState(this._state);

    useLayoutEffect(() => (
      this.subscribe(listener)
    ), []);

    return [
      this._state,
      (newState) => {
        this.setState(newState);
      }
    ];
  }

  onChange(listener: Listener<T>) {
    this._listeners.add(listener);
  }

  offChange(listener: Listener<T>) {
    this._listeners.delete(listener);
  }

  subscribe(listener: Listener<T>) {
    this.onChange(listener);

    return () => {
      this.offChange(listener);
    };
  }
}
