import canUseDom from 'rc-util/lib/Dom/canUseDom';

const noop = () => {};

const destroyFns: Array<() => void> = [];

const canUseDocElement = () => canUseDom() && window.document.documentElement;

type NoopType = () => void;

// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
const tuple = <T extends string[]>(...args: T) => args;

export {
    noop,
    NoopType,
    tuple,
    destroyFns,
    canUseDocElement,
};
