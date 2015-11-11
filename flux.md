# flux

fluxはライブラリじゃない。アプリケーションの設計概念を示す言葉。データの流れを一方方向にする。

## 主要概念

- Views
- Stores
- Dispatcher

## 2次概念

- Actions
- Action Types
- Action Creators
- Web Utils


### Dispatcher

イベントシステム。イベントを監視して、コールバックを登録する。dispatcherは1つだけ。
Facebookの[dispatcherライブラリ](https://github.com/facebook/flux/blob/master/src/Dispatcher.js)がある。

### Views

React Component。Storeからデータを受け取る。


### Stores

アプリケーションの状態を管理する。シングルトンのグローバルオブジェクト。
データの更新手段をアプリケーション内で唯一知っている。
dispatcherのコールバックを登録することが許されるのは、storeのみ。



---
## ref:

- http://www.jackcallister.com/2015/02/26/the-flux-quick-start-guide.html
- http://blog.andrewray.me/flux-for-stupid-people/
- https://github.com/ruanyf/flux-for-stupid-people-demo

