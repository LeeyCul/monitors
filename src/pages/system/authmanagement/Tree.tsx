import React from 'react';
import { connect, Dispatch } from 'umi';
import { Tree } from 'antd';
const { TreeNode } = Tree;

interface Props {
    treeData: any[];
    dispatch: Dispatch;
    resourceList: string[];
}

function TreeComponent({ treeData, dispatch, resourceList }: Props) {
    const renderTreeNodes = (data: any) =>
        data.map((item: any) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    const onCheck = (checkedKeys: any) => {
        dispatch({ type: 'auth/setRoleCheckList', payload: checkedKeys });
    };
    return (
        <Tree
            checkable
            autoExpandParent={true}
            onCheck={onCheck}
            checkedKeys={resourceList}
        >
            {renderTreeNodes(treeData)}
        </Tree>
    );
}

export default connect(({ auth }: any) => ({
    resourceList: auth.roleCheckList,
}))(TreeComponent);
