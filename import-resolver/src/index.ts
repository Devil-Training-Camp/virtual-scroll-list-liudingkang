export interface LdkResolverOptions {
  /**
   * import components css
   *
   * @default true
   */
  importStyle?: boolean;

  /**
   * cjs module
   *
   * @default false
   */
  cjs?: boolean;
}

/**
 * Button->button; ButtonGroup->button-group
 */
function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}
function getModuleType(cjs: boolean): string {
  return cjs ? 'lib' : 'es';
}
function getSideEffects(dirName: string, options: LdkResolverOptions) {
  const { importStyle = true, cjs = false } = options;
  const moduleType = getModuleType(cjs);

  if (!importStyle) return;
  return `virtual-scroll-list-liudingkang/${moduleType}/packages/${dirName}/style/index`;
}

export function LdkResolver(options: LdkResolverOptions = {}) {
  const { cjs = false } = options;

  const moduleType = getModuleType(cjs);

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // console.log(name)
      if (name.startsWith('Ldk')) {
        const partialName = name.slice(3);
        return {
          name: partialName,
          from: `virtual-scroll-list-liudingkang/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        };
      }
    },
  };
}
