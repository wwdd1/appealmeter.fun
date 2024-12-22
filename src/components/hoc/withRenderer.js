import 'server-only';

export default function withRenderer(Component) {
  const WrappedComponent = function ({ Renderer, rendererProps, ...restProps }) {
    if (!Renderer) {
      throw new TypeError('Renderer component needs to be passed as a prop.');
    }

    if (rendererProps && typeof rendererProps !== 'object') {
      throw new TypeError('rendererProps type needs to be "object".');
    }

    return <Component
      Renderer={Renderer}
      rendererProps={rendererProps}
      { ...restProps }
    ></Component>
  }
  WrappedComponent.displayName = `withRenderer(${Component.displayName})`;
  return WrappedComponent;
}