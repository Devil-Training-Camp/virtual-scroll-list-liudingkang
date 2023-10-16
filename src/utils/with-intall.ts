import type { Component } from 'vue';

export function withInstall<T extends Component>(options: T) {
  console.log(options);
}
