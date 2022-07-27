import { Web3Provider } from '@ethersproject/providers';
import { Actions } from './actions';
import { Configure } from './configure';
import { Store, StoreData } from './store';

export type Bytes = ArrayLike<number>;

export abstract class BaseConnector<T = any> {
  private unsubscribeFun?: () => void;

  public constructor(
    protected actions: Actions,
    protected store: Store,
    protected configure: Configure,
  ) {}

  private _onlyProvider?: T;

  public get provider(): T {
    if (!this._onlyProvider) {
      this._onlyProvider = this.getProvider();
      this.init();
    }
    return this._onlyProvider;
  }

  private init() {
    this.unsubscribeFun = this.store.subscribe(state => this.onChange(state));
    this.initialization();
  }

  protected get anyWindow(): any {
    return window as any;
  }

  protected abstract onChange(state: StoreData): void;

  protected abstract initialization(): void;

  protected abstract getProvider(): T;

  public abstract get isInstalled(): boolean;

  public abstract get name(): string;

  public abstract get installUrl(): string;

  public abstract get icon(): JSX.Element;

  public abstract connect(props: { eagerly: boolean }): Promise<void>;

  public abstract disconnect(): Promise<void>;

  public abstract signMessage(message: string): Promise<string>;

  protected destroy() {
    this._onlyProvider = undefined;
    this.unsubscribeFun?.();
  }
}

export abstract class EthConnector<T = any> extends BaseConnector<T> {
  private chainIdRef?: number;

  public web3Provider?: Web3Provider;

  protected onChange(state: StoreData): void {
    if (state.chainId !== this.chainIdRef) {
      this.chainIdRef = state.chainId;
      this.web3Provider = new Web3Provider(this.provider, state.chainId);
    }
  }
}
