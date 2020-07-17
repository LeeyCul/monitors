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

declare namespace Realtime {
    interface IndexProps {
        dataSource: any[];
    }
}
