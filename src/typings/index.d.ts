export interface Options {
  namespace?: string;
  scope?: any;
  [key: string]: any;
}

export interface ConstructorOptions extends Options {
  strategy: any;
}

export interface SetOptions extends Options {
  expiration?: number;
  category?: 'essential' | 'functional' | 'analytics' | 'advertising';
}

export class BaseStorage {
  setItem(key: string, value: any, options?: SetOptions): Promise<void>;
  getItem(key: string, options?: Options): Promise<any>;
  removeItem(key: string, options?: Options): Promise<void>;
  getAllItems(options?: Options): Promise<{ [key: string]: any }>;
}

export class DataCapsule extends BaseStorage {
  constructor(options: ConstructorOptions);
}

export class LocalStorageStrategy extends BaseStorage {}
export class WixStorageStrategy extends BaseStorage {}
export class CachedStorageStrategy extends BaseStorage {
  constructor(options: { remoteStrategy: RemoteStrategy, localStrategy: LocalStrategy })
}
export class InMemoryStorageStrategy extends BaseStorage {}

export class FrameStorageStrategy extends BaseStorage {
  constructor(target: Window, origin: string, token: string, opts: object);
  setItem(...params: any[]): Promise<undefined>;
  getItem(...params: any[]): Promise<any>;
  removeItem(...params: any[]): Promise<undefined>;
  getAllItems(...params: any[]): Promise<{ [key: string]: any }>;
}

export class FrameStorageListener {
  constructor(strategy?: any);
  start(
    verifier: (source: string, origin: string, token: string) => boolean,
  ): void;
  stop(): void;
}

export const NOT_FOUND: Error;
export const COOKIE_CONSENT_DISALLOWED: Error;
export const LocalStorageCapsule: (options: Options) => DataCapsule;
export const LocalStorageCachedCapsule: (options: Options) => DataCapsule;
export const InMemoryStorageCapsule: (options: Options) => DataCapsule;

export type RemoteStrategy = WixStorageStrategy;
export type LocalStrategy = LocalStorageStrategy | InMemoryStorageStrategy;
