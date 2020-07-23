import { Dispatch } from 'umi';
import { ColumnProps } from 'antd/lib/table/interface';

declare namespace Layouts {
    interface IProps {
        children: React.ReactNode;
    }

    interface MenuItem {
        name: string;
        path: string;
    }

    interface Menu {
        name: string;
        path: string;
        icon: string;
        children: MenuItem[];
    }
}

declare namespace Common {
    interface LineChart {
        style?: React.CSSProperties;
        title: string;
    }

    interface TableListCardPage {
        columns: any[];
        loading?: boolean;
        dataSource: any[];
        selectable?: boolean;
        title: string;
        queryName: string;
        handleQuery: (value: string) => void;
        add: () => void;
        lotSizeDel: (value: any[]) => void;
    }

    interface TableFilter {
        queryName: string;
        handleQuery: (value: string) => void;
        add: () => void;
    }
}

declare namespace ILogin {
    interface Logins {
        form: any;
        dispatch: Dispatch;
    }
}

declare namespace Realtime {
    interface IndexProps {
        dataSource: any[];
    }
}

declare namespace AuthManagement {
    interface ModalFrom {
        form: any;
        visible: boolean;
        confirmLoading?: boolean;
        // treeData: any[]
        onCancel: () => void;
        onCreate: (value: any) => void;
    }
}

declare namespace EquipmentAdd {
    interface AddCard {
        showModa: (trem: string) => void;
    }

    interface AddInex {
        dispatch: Dispatch;
    }
}
