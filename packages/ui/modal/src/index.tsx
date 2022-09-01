import React from 'react';
import {Modal as AntdModal} from 'antd';
import {ModalProps as AntdModalProps, ModalFuncProps} from 'antd/lib/modal';
import {modalGlobalConfig} from 'antd/lib/modal/confirm';
import classNames from 'classnames';
import {
    IconCloseOutlined,
    IconCheckCircleFilled,
    IconCloseCircleFilled,
    IconInfoCircleFilled,
    IconExclamationCircleFilled,
} from '@osui/icons';
import Button, {ButtonProps} from '@osui/button';
import './index.less';

const {destroyAll, config} = AntdModal;

type Size = 'small' | 'default' | 'large' | number;

const getModalSize = (size?: Size) => {
    if (typeof size === 'number') {
        return size;
    }
    switch (size) {
        case 'small':
            return 400;
        case 'default':
            return 600;
        case 'large':
            return 800;
        default:
            return 600;
    }
};

const clsPrefix = 'osui-modal';

export interface ModalProps extends AntdModalProps {
    /**
     * @description 是否展示body上的boder
     */
    bodyBorder?: boolean;
    /**
     * @description 支持small default large 三种宽度
     */
    size?: Size;
    /**
     * @deprecated 目前没有height的限制时，自动就是autoheight
     */
    autoHeight?: boolean;
    /**
     * 是否全屏展示modal
     */
    fullScreen?: boolean;
}

export interface ModalInterface extends React.FC<ModalProps> {
    useModal: typeof AntdModal.useModal;
}

const OriginModal: ModalInterface = ({className, bodyBorder, size, ...props}) => {
    const {
        okText = '确定',
        okType,
        cancelText = '取消',
        onOk,
        onCancel,
        confirmLoading,
        okButtonProps,
        cancelButtonProps,
        autoHeight = false,
        centered,
        width: widthProp,
        fullScreen,
    } = props;

    const width = getModalSize(size);

    const classes = classNames(
        clsPrefix,
        {
            [`${clsPrefix}-auto-height`]: autoHeight,
            [`${clsPrefix}-body-border`]: bodyBorder,
            [`${clsPrefix}-full-screen`]: fullScreen,
        },
        className
    );

    const footerStyle = React.useMemo(
        () => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }),
        []
    );

    const footer = (
        <div style={footerStyle}>
            <Button
                onClick={onCancel}
                {...cancelButtonProps}
            >
                {cancelText}
            </Button>
            <Button
                type={okType as ButtonProps['type'] ?? 'primary'}
                onClick={onOk}
                loading={confirmLoading}
                {...okButtonProps}
            >
                {okText}
            </Button>
        </div>
    );
    const innerCentered = centered ?? true;

    return (
        <AntdModal
            className={classNames(classes)}
            closeIcon={<IconCloseOutlined />}
            footer={footer}
            width={widthProp ?? width}
            centered={innerCentered}
            {...props}
        />
    );
};

OriginModal.useModal = AntdModal.useModal;

// Modal function component such as confirm
export type ModalFunc = (
    props: ConfirmProps,
) => {
    destroy: () => void;
    update: (newConfig: ModalFuncProps) => void;
};

export interface ModalStaticFunctions {
    info: ModalFunc;
    success: ModalFunc;
    error: ModalFunc;
    warn: ModalFunc;
    warning: ModalFunc;
    confirm: ModalFunc;
}

export type ModalType = typeof OriginModal &
    ModalStaticFunctions & { destroyAll: () => void, config: typeof modalGlobalConfig };

const Modal = OriginModal as ModalType;

// ======= Confirm ======

const confirmIconMap = {
    info: <IconInfoCircleFilled />,
    warning: <IconExclamationCircleFilled />,
    confirm: <IconExclamationCircleFilled />,
    error: <IconCloseCircleFilled />,
    success: <IconCheckCircleFilled />,
};
interface ConfirmProps extends ModalFuncProps {
    size?: Size;
}
const getConfirmConfig = (
    {size = 'small', width, okText, cancelText, okButtonProps, cancelButtonProps, closeIcon, ...config}: ConfirmProps,
    type: 'info'|'warning'|'success'|'error'|'confirm'
) => {
    const baseConfig = config;
    // 对confirm图表的样式调整处理
    Object.assign(baseConfig, {
        icon: config.hasOwnProperty('icon') ? config.icon : confirmIconMap[type],
    });

    return {
        ...baseConfig,
        width: width ?? getModalSize(size),
        okText: okText ?? '确定',
        cancelText: cancelText ?? '取消',
        closable: Boolean(config.title && config.closable), // 只有有title的时候，closable为true，才展示关闭icon
        closeIcon: closeIcon ?? <IconCloseOutlined />,
        okButtonProps: {
            ...okButtonProps,
            className: classNames(okButtonProps?.className, 'osui-button', 'osui-button-min-width'),
        },
        cancelButtonProps: {
            ...cancelButtonProps,
            className: classNames(okButtonProps?.className, 'osui-button', 'osui-button-min-width'),
        },
        className: classNames(`${clsPrefix}-confirm`, config.className),
    };
};

Modal.info = (config: ConfirmProps) => AntdModal.info(getConfirmConfig(config, 'info'));
Modal.warning = (config: ConfirmProps) => AntdModal.warning(getConfirmConfig(config, 'warning'));
Modal.warn = Modal.warning;
Modal.error = (config: ConfirmProps) => AntdModal.error(getConfirmConfig(config, 'error'));
Modal.success = (config: ConfirmProps) => AntdModal.success(getConfirmConfig(config, 'success'));
Modal.confirm = (config: ConfirmProps) => AntdModal.confirm(getConfirmConfig(config, 'confirm'));

Modal.destroyAll = destroyAll;
Modal.config = config;

export type {ModalFuncProps} from 'antd';
export default Modal;
