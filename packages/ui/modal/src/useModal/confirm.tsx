import {
    IconCheckCircleOutlined,
    IconCloseCircleOutlined,
    IconExclamationCircleFilled,
    IconInfoCircleFilled,
} from '@osui/icons';
import * as React from 'react';
import type {ModalFuncProps} from '../index';

// let defaultRootPrefixCls = '';

// function getRootPrefixCls() {
//     return defaultRootPrefixCls;
// }

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
    destroy: () => void;
    update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;

export function withWarn(props: ModalFuncProps): ModalFuncProps {
    return {
        icon: <IconExclamationCircleFilled />,
        okCancel: false,
        ...props,
        type: 'warning',
    };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
    return {
        icon: <IconInfoCircleFilled />,
        okCancel: false,
        ...props,
        type: 'info',
    };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
    return {
        icon: <IconCheckCircleOutlined />,
        okCancel: false,
        ...props,
        type: 'success',
    };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
    return {
        icon: <IconCloseCircleOutlined />,
        okCancel: false,
        ...props,
        type: 'error',
    };
}

type ConfirmType ='success' | 'warn' | 'warning' | 'info' | 'error' | 'confirm';

const confirmFunc: Record<ConfirmType, (props: ModalFuncProps) => ModalFuncProps> = {
    success: withSuccess,
    warn: withWarn,
    warning: withWarn,
    info: withInfo,
    error: withError,
    confirm: (props: ModalFuncProps) => {
        return {
            icon: <IconExclamationCircleFilled />,
            okCancel: true,
            ...props,
            type: 'confirm',
        };
    },
};

// confirm根据type配置对应的ConfirmDialog
export function withConfirm(props: ModalFuncProps): ModalFuncProps {
    return confirmFunc[props.type ?? 'confirm'](props) ?? confirmFunc.confirm(props);
}

// export function modalGlobalConfig({rootPrefixCls}: { rootPrefixCls: string }) {
//     warning(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
//     defaultRootPrefixCls = rootPrefixCls;
// }


/**
 *  暂时用不到confirm，confirm用于一般的Modal组件
 * */
// export default function confirm(config: ModalFuncProps) {
//     const container = document.createDocumentFragment();
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     let currentConfig = {...config, close, visible: true} as any;

//     function destroy(...args: any[]) {
//         const triggerCancel = args.some(param => param && param.triggerCancel);
//         if (config.onCancel && triggerCancel) {
//             config.onCancel(() => {}, ...args.slice(1));
//         }
//         for (let i = 0; i < destroyFns.length; i++) {
//             const fn = destroyFns[i];
//             // eslint-disable-next-line @typescript-eslint/no-use-before-define
//             if (fn === close) {
//                 destroyFns.splice(i, 1);
//                 break;
//             }
//         }

//         reactUnmount(container);
//     }

//     function render({okText, cancelText, prefixCls: customizePrefixCls, ...props}: any) {
//     /**
//      * https://github.com/ant-design/ant-design/issues/23623
//      *
//      * Sync render blocks React event. Let's make this async.
//      */
//         setTimeout(() => {
//             const runtimeLocale = getConfirmLocale();
//             const {getPrefixCls, getIconPrefixCls} = globalConfig();
//             // because Modal.config  set rootPrefixCls, which is different from other components
//             const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
//             const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
//             const iconPrefixCls = getIconPrefixCls();

//             reactRender(
//                 <ConfirmDialog
//                     {...props}
//                     prefixCls={prefixCls}
//                     rootPrefixCls={rootPrefixCls}
//                     iconPrefixCls={iconPrefixCls}
//                     okText={okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)}
//                     cancelText={cancelText || runtimeLocale.cancelText}
//                 />,
//                 container
//             );
//         });
//     }

//     function close(...args: any[]) {
//         currentConfig = {
//             ...currentConfig,
//             visible: false,
//             afterClose: () => {
//                 if (typeof config.afterClose === 'function') {
//                     config.afterClose();
//                 }

//                 // TODO: 这里有点问题, this类型影响构建
//                 destroy(args);
//                 // destroy.apply(this, args);
//             },
//         };
//         render(currentConfig);
//     }

//     function update(configUpdate: ConfigUpdate) {
//         if (typeof configUpdate === 'function') {
//             currentConfig = configUpdate(currentConfig);
//         } else {
//             currentConfig = {
//                 ...currentConfig,
//                 ...configUpdate,
//             };
//         }
//         render(currentConfig);
//     }

//     render(currentConfig);

//     destroyFns.push(close);

//     return {
//         destroy: close,
//         update,
//     };
// }
