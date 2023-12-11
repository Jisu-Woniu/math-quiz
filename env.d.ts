/// <reference types="vite/client" />

declare module "mathjs/number" {
  import type { MathJsStatic, ConfigOptions, FactoryFunctionMap } from "mathjs";

  export const create: (
    factories: FactoryFunctionMap,
    config?: ConfigOptions,
  ) => MathJsStatic;
  export const evaluateDependencies: FactoryFunctionMap;
  export const addDependencies: FactoryFunctionMap;
  export const subtractDependencies: FactoryFunctionMap;
  export const multiplyDependencies: FactoryFunctionMap;
  export const divideDependencies: FactoryFunctionMap;
  export const unaryMinusDependencies: FactoryFunctionMap;
}
