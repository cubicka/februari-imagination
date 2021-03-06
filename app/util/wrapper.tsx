import React from 'react';

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

/**
 * Returns a wrapped component with a given component and injecting props
 * @example
 * const DummyButton = wrap(<Button>, { onPress: () => null });
 */
export default function wrap<OwnProps extends InjectingProps, InjectingProps>(
    Compo: React.ComponentType<OwnProps>,
    props: InjectingProps,
): React.SFC<Omit<OwnProps, keyof InjectingProps>> {
    return passThrough => <Compo {...passThrough} {...props} />;
}
