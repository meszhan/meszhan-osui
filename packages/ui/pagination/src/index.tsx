import React from 'react';
import {Pagination as AntdPagination} from 'antd';
import {PaginationProps as AntdPaginationProps} from 'antd/es/pagination';
import classNames from 'classnames';
import {IconRightOutlined, IconLeftOutlined} from '@osui/icons';
import Button from '@osui/button';
import './index.less';

const clsPrefix = 'osui-pagination';

export type PaginationProps = AntdPaginationProps;

const itemRender: AntdPaginationProps['itemRender'] = (current, type, originalElement) => {
    if (type === 'prev') {
        return <IconLeftOutlined />;
    }
    if (type === 'next') {
        return <IconRightOutlined />;
    }
    return originalElement;
};

export const customPaginationProps = {
    itemRender,
    locale: {'jump_to': '跳转至', 'page': ''},
    showQuickJumper: (
        showQuickJumper: PaginationProps['showQuickJumper'],
        size: PaginationProps['size']
    ) => (
        showQuickJumper === true // 只有true的时候覆盖
            ? ({
                goButton: (
                    <Button
                        size={size === 'default' ? 'middle' : size}
                        className={`${clsPrefix}-jumper`}
                    >
                        Go
                    </Button>
                ),
            })
            : showQuickJumper
    ),
};

const Pagination: React.FC<PaginationProps> = props => {
    return (
        <AntdPagination
            {...props}
            className={classNames(props.className, clsPrefix)}
            itemRender={customPaginationProps.itemRender}
            locale={customPaginationProps.locale}
            showQuickJumper={
                customPaginationProps.showQuickJumper(props.showQuickJumper, props.size)
            }
        />
    );
};

export default Pagination;
