import { createMuiTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors';

/**
 * 主题文件
 *
 * @see https://material-ui.com/customization/theming/
 */
export default createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
        text: {
            primary: '#666',
            secondary: '#999',
            hint: '#999',
            disabled: '#999',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: 'PingFang SC, Microsoft YaHei, Arial',
    },
    overrides: {
        MuiTableCell: {
            head: {
                color: '#333',
                fontSize: '0.875rem',
                fontWeight: 600,
            },
        },
        MuiDialogTitle: {
            root: {
                color: '#333',
            },
        },
        MuiInputBase: {
            input: {
                fontSize: '14px',
            },
        },
        MuiListItemText: {
            primary: {
                color: '#333',
                fontWeight: 500,
            },
            secondary: {
                color: '#666',
                textAlign: 'justify',
            },
        },
        MuiIconButton: {
            edgeEnd: {
                marginRight: -16,
            }
        },
    },
});
