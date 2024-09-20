# @vicimpa/react-decorators

`@vicimpa/react-decorators` — это библиотека, которая предоставляет набор
декораторов и хуков для улучшения компонентов React с помощью возможностей
внедрения зависимостей и управления контекстом. Эта библиотека позволяет легко
внедрять зависимости в ваши компоненты и управлять провайдерами и потребителями
контекста с минимальным количеством шаблонного кода.

## Использование

### `connect`

Декоратор `connect` позволяет прикреплять плагины (миксины) к компоненту React.
Эти плагины могут изменять экземпляр компонента или выполнять побочные эффекты.

#### Пример

```tsx
import React, { Component } from "react";
import { connect } from "@vicimpa/react-decorators";

// Определяем плагин
const loggerPlugin = (target: any) => {
  console.log("Компонент смонтирован:", target);
  return () => console.log("Компонент размонтирован:", target);
};

// Используем плагин
@connect(loggerPlugin)
class SomeComponent extends Component {
  render() {
    return <div>Some component</div>;
  }
}
```

### `provide`

Декоратор `provide` позволяет предоставлять значение контекста из компонента.
Это полезно для создания провайдеров контекста в виде компонентов.

#### Пример

```tsx
import React, { Component, PropsWithChildren } from "react";
import { provide } from "@vicimpa/react-decorators";

// Определяем компонент-провайдер
@provide()
class ProviderComponent extends Component<PropsWithChildren> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const App = () => {
  return (
    <ProviderComponent>
      {/** Using component context */}
    </ProviderComponent>
  );
};
```

### `inject`

Декоратор `inject` позволяет внедрять значение контекста провайдер компонента в
свойство компонента. Это полезно для внедрения зависимостей.

#### Пример

```tsx
import React, { Component } from "react";
import { inject, provide } from "@vicimpa/react-decorators";

// Определяем компонент-провайдер
@provide()
class ProviderComponent extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

// Определяем компонент-потребитель
class ConsumerComponent extends Component {
  @inject(() => ProviderComponent)
  provider!: ProviderComponent;

  render() {
    console.log(this.provider);

    return (
      <div>
        <p>Using inject</p>
      </div>
    );
  }
}

const App = () => {
  return (
    <ProviderComponent>
      <ConsumerComponent />
    </ProviderComponent>
  );
};
```

### `useInject`

Хук `useInject` позволяет использовать значение контекста провайдер компонента в
функциональном компоненте. Это полезно для доступа к значениям контекста без
использования классовых компонентов.

#### Пример

```tsx
import React from "react";
import { useInject } from "@vicimpa/react-decorators";
import { ProviderComponent } from "./path-to-provider-component";

const ConsumerComponent = () => {
  const provider = useInject(ProviderComponent);
  console.log(provider);
  return <p>Using inject</p>;
};

const App = () => {
  return (
    <ProviderComponent>
      <ConsumerComponent />
    </ProviderComponent>
  );
};
```
