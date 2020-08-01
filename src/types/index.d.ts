import { Dispatch } from 'umi';

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
        data?: any[];
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
        lotSizeDel?: (value: any[]) => void;
    }

    interface TableFilter {
        queryName: string;
        handleQuery: (value: string) => void;
        add: () => void;
    }

    interface Columns {
        title: string;
        dataIndex: string;
        key?: string;
        other?: string;
    }

    interface CustomTables {
        columns: Columns[];
        data: any;
        loading: boolean;
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
        title?: string;
        editCheckList?: any[];
        form: any;
        visible: boolean;
        confirmLoading?: boolean;
        indexData?: any;
        resourceList?: any[];
        isRequired?: boolean;
        roleList?: any[];
        onCancel: () => void;
        onCreate: (value?: any) => void;
    }
}

declare namespace EquipmentAdd {
    interface Istate {
        visible: boolean;
        confirmLoading: boolean;
        data: any[];
        trem: any;
    }

    interface AddCard {
        showModa: (trem: string) => void;
    }

    interface AddInex {
        dispatch: Dispatch;
        location: any;
    }

    interface ModalFrom {
        title?: string;
        form: any;
        visible: boolean;
        onCancel: () => void;
        onCreate: () => void;
    }

    interface ModalFromVal {
        min: any;
        mxa: any;
        description: string;
    }
}

declare namespace IHistoryData {
    interface IindexState {
        dispatch: Dispatch;
        list: any;
        loading: boolean;
        deviceData: any[];
    }
}
